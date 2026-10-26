import db from '../../models/index.js';
const { Jugador, Roster, Roster_Jugador } = db;
import { Op, Sequelize } from 'sequelize';

export const listarRostersService = async () => {
    const rosters = await Roster.findAll({
        attributes: [
            'id', 
            'Nombre', 
            'Tipo', 
            'Temporada', 
            'Juego',
            [Sequelize.fn("COUNT", Sequelize.col("Jugadores.id")), "cantidad_jugadores"]
        ],
        include: [{
            model: Jugador,
            as: 'Jugadores',
            attributes: [] 
        }],
        group: ['Roster.id']
    });
    return rosters;
};

export const verDetalleRosterService = async (id) => {
    const roster = await Roster.findByPk(id, {
        include: [{ model: Jugador, as: 'Jugadores' }] 
    });
    if (!roster) throw new Error('Roster no encontrado');
    return roster;
};

export const crearRosterService = async (datos) => {
    const payload = {
        Nombre: datos.Nombre || datos.nombre,
        Juego: datos.Juego || datos.juego,
        Tipo: datos.Tipo || datos.tipo,         
        Temporada: datos.Temporada || datos.temporada
    };
    return await Roster.create(payload);
};

export const editarRosterService = async (id, datosNuevos) => {
    const roster = await Roster.findByPk(id);
    if (!roster) throw new Error('Roster no encontrado');

    const payload = {
        Nombre: datosNuevos.Nombre || datosNuevos.nombre,
        Juego: datosNuevos.Juego || datosNuevos.juego,
        Tipo: datosNuevos.Tipo || datosNuevos.tipo,       
        Temporada: datosNuevos.Temporada || datosNuevos.temporada
    };

    return await roster.update(payload); 
};

export const eliminarRosterService = async (id) => {
    const roster = await Roster.findByPk(id);
    if (!roster) throw new Error('Roster no encontrado');
    await roster.destroy(); 
    return { mensaje: 'Roster eliminado correctamente' };
};

export const asignarJugadorService = async (id_roster, id_jugador, rol_en_roster) => {
    const roster = await Roster.findByPk(id_roster, {
        include: [{ model: Jugador, as: 'Jugadores' }]
    });
    const jugador = await Jugador.findByPk(id_jugador);

    if (!roster || !jugador) throw new Error('Roster o Jugador no encontrado');

    if (rol_en_roster === 'titular') {
        const titularesActuales = roster.Jugadores.filter(j => j.Roster_Jugador.rol_en_roster === 'titular').length;
        if (titularesActuales >= 5) {
            throw new Error('RN-02 Violada: El roster ya cuenta con el límite máximo de 5 titulares.');
        }

        const yaTieneRolTitular = roster.Jugadores.some(j => 
            j.Rol === jugador.Rol && j.Roster_Jugador.rol_en_roster === 'titular'
        );
        if (yaTieneRolTitular) {
            throw new Error(`RN-03 Violada: Ya existe un titular con el rol de ${jugador.Rol} en este roster.`);
        }
    }

    const relacionExistente = await Roster_Jugador.findOne({ where: { id_roster, id_jugador } });
    if (relacionExistente) {
        throw new Error('El jugador ya se encuentra asignado a este roster.');
    }

    return await Roster_Jugador.create({
        id_roster,
        id_jugador,
        rol_en_roster
    });
};

export const quitarJugadorService = async (id_roster, id_jugador) => {
    const relacion = await Roster_Jugador.findOne({ where: { id_roster, id_jugador } });
    if (!relacion) throw new Error('La relación entre el jugador y el roster no existe');

    await relacion.destroy();
    return { mensaje: 'Jugador removido del roster exitosamente' };
};

export const actualizarRolJugadorService = async (id_roster, id_jugador, rol_en_roster) => {
    const relacion = await Roster_Jugador.findOne({ where: { id_roster, id_jugador } });
    if (!relacion) throw new Error('La relación no existe');
    return await relacion.update({ rol_en_roster });
};