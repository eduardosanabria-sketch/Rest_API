import * as jugadoresService from '../services/jugadores.service.js';

export const listarJugadores = async (req, res) => {
    try {
        const jugadores = await jugadoresService.listarJugadoresService();
        res.status(200).json(jugadores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const verDetalleJugador = async (req, res) => {
    try {
        const jugador = await jugadoresService.verDetalleJugadorService(req.params.id);
        res.status(200).json(jugador);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const crearJugador = async (req, res) => {
    try { 
        const nuevoJugador = await jugadoresService.crearJugadorService(req.body); 
        res.status(201).json(nuevoJugador); 
    }
    catch (e) { res.status(400).json({ error: e.message }); }
};

export const editarJugador = async (req, res) => {
    try {
        const jugadorActualizado = await jugadoresService.editarJugadorService(req.params.id, req.body);
        res.status(200).json({ mensaje: 'Actualizado con éxito', jugador: jugadorActualizado });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const eliminarJugador = async (req, res) => {
    try {
        const resultado = await jugadoresService.eliminarJugadorService(req.params.id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const buscarJugadores = async (req, res) => {
    try {
        const jugadores = await jugadoresService.buscarJugadoresService(req.query);
        res.status(200).json(jugadores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};