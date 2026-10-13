import express from 'express';
import * as controller from '../controllers/jugadores.controller.js';

const router = express.Router();

router.get('/v1/jugadores/buscar', controller.buscarJugadores);
router.get('/v1/jugadores', controller.listarJugadores);
router.get('/v1/jugadores/:id', controller.verDetalleJugador);
router.post('/v1/jugadores', controller.crearJugador);
router.put('/v1/jugadores/:id', controller.editarJugador);
router.delete('/v1/jugadores/:id', controller.eliminarJugador);

export default router;