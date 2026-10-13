import express from 'express';
import * as controller from '../controllers/rosters.controller.js';

const router = express.Router();

router.get('/v1/rosters', controller.listarRosters);
router.get('/v1/rosters/:id', controller.verDetalleRoster);
router.post('/v1/rosters', controller.crearRoster);
router.put('/v1/rosters/:id', controller.editarRoster);
router.delete('/v1/rosters/:id', controller.eliminarRoster);

// Asignaciones
router.get('/v1/rosters/:id/jugadores', controller.verDetalleRoster);
router.post('/v1/rosters/:id/jugadores', controller.asignarJugador);
router.put('/v1/rosters/:id/jugadores/:id_jugador', controller.actualizarRolJugador);
router.delete('/v1/rosters/:id/jugadores/:id_jugador', controller.quitarJugador);

export default router;