import * as rostersService from '../services/rosters.service.js';

export const listarRosters = async (req, res) => {
    try {
        const rosters = await rostersService.listarRostersService();
        res.status(200).json(rosters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const verDetalleRoster = async (req, res) => {
    try {
        const roster = await rostersService.verDetalleRosterService(req.params.id);
        res.status(200).json(roster);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const crearRoster = async (req, res) => {
    try { 
        const nuevoRoster = await rostersService.crearRosterService(req.body); 
        res.status(201).json(nuevoRoster); 
    }
    catch (e) { res.status(400).json({ error: e.message }); }
};

export const editarRoster = async (req, res) => {
    try {
        const rosterActualizado = await rostersService.editarRosterService(req.params.id, req.body);
        res.status(200).json({ mensaje: 'Roster actualizado con éxito', roster: rosterActualizado });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const eliminarRoster = async (req, res) => {
    try {
        const resultado = await rostersService.eliminarRosterService(req.params.id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const asignarJugador = async (req, res) => {
    try {
        const id_roster = req.params.id; 
        const { id_jugador, rol_en_roster } = req.body;
        const asignacion = await rostersService.asignarJugadorService(id_roster, id_jugador, rol_en_roster);
        res.status(201).json({ mensaje: 'Jugador asignado al roster exitosamente', asignacion });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const actualizarRolJugador = async (req, res) => {
    try {
        const { id, id_jugador } = req.params;
        const { rol_en_roster } = req.body;
        const resultado = await rostersService.actualizarRolJugadorService(id, id_jugador, rol_en_roster);
        res.status(200).json({ mensaje: 'Rol actualizado exitosamente', resultado });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const quitarJugador = async (req, res) => {
    try {
        const { id, id_jugador } = req.params; 
        const resultado = await rostersService.quitarJugadorService(id, id_jugador); 
        res.status(200).json(resultado);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};