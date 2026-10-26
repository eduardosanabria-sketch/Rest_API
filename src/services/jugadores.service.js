import db from '../../models/index.js';
const { Jugador, Roster } = db;
import { Op } from 'sequelize';

export const listarJugadoresService = async () => {
    return await Jugador.findAll();
};

export const verDetalleJugadorService = async (id) => {
    const jugador = await Jugador.findByPk(id, {
        include: [{ model: Roster, as: 'Rosters' }] 
    });
    if (!jugador) throw new Error('Jugador no encontrado');
    return jugador;
};

export const crearJugadorService = async (datos) => {
    return await Jugador.create(datos);
};

export const editarJugadorService = async (id, datosNuevos) => {
    const jugador = await Jugador.findByPk(id);
    if (!jugador) throw new Error('Jugador no encontrado');
    return await jugador.update(datosNuevos); 
};

export const eliminarJugadorService = async (id) => {
    const jugador = await Jugador.findByPk(id);
    if (!jugador) throw new Error('Jugador no encontrado');
    await jugador.destroy(); 
    return { mensaje: 'Jugador eliminado correctamente' };
};

export const buscarJugadoresService = async (querys) => {
    const { rol, estado, nickname } = querys;
    let whereClause = {};

    if (rol) whereClause.Rol = rol;
    if (estado) whereClause.Estado = estado;
    if (nickname) {
        whereClause.Nickname = { [Op.like]: `%${nickname}%` };
    }

    return await Jugador.findAll({ where: whereClause });
};