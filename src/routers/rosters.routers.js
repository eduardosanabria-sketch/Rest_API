import express from 'express';
import * as controller from '../controllers/rosters.controller.js';

const router = express.Router();

/**
 * @swagger
 * /v1/rosters:
 *   get:
 *     summary: Obtener lista de todos los rosters
 *     tags: [Rosters]
 *     responses:
 *       200:
 *         description: Lista de rosters obtenida con éxito.
 *   post:
 *     summary: Crear un nuevo roster
 *     tags: [Rosters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               juego:
 *                 type: string
 *               tipo:
 *                 type: string
 *               temporada:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Roster creado exitosamente.
 */
router.get('/v1/rosters', controller.listarRosters);
router.post('/v1/rosters', controller.crearRoster);

/**
 * @swagger
 * /v1/rosters/{id}:
 *   get:
 *     summary: Obtener el detalle de un roster por ID
 *     tags: [Rosters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del roster
 *     responses:
 *       200:
 *         description: Datos del roster encontrados.
 *       404:
 *         description: Roster no encontrado.
 *   put:
 *     summary: Actualizar un roster existente
 *     tags: [Rosters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del roster
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Roster actualizado con éxito.
 *   delete:
 *     summary: Eliminar un roster
 *     tags: [Rosters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del roster
 *     responses:
 *       200:
 *         description: Roster eliminado con éxito.
 */
router.get('/v1/rosters/:id', controller.verDetalleRoster);
router.put('/v1/rosters/:id', controller.editarRoster);
router.delete('/v1/rosters/:id', controller.eliminarRoster);

// Asignaciones
/**
 * @swagger
 * /v1/rosters/{id}/jugadores:
 *   get:
 *     summary: Ver los jugadores asignados a un roster
 *     tags: [Asignaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del roster
 *     responses:
 *       200:
 *         description: Lista de jugadores del roster obtenida con éxito.
 *   post:
 *     summary: Asignar un jugador a un roster
 *     tags: [Asignaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del roster
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_jugador:
 *                 type: integer
 *               rol_en_roster:
 *                 type: string
 *     responses:
 *       201:
 *         description: Jugador asignado al roster con éxito.
 */
router.get('/v1/rosters/:id/jugadores', controller.verDetalleRoster);
router.post('/v1/rosters/:id/jugadores', controller.asignarJugador);

/**
 * @swagger
 * /v1/rosters/{id}/jugadores/{id_jugador}:
 *   put:
 *     summary: Actualizar el rol de un jugador dentro del roster
 *     tags: [Asignaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del roster
 *       - in: path
 *         name: id_jugador
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del jugador
 *     responses:
 *       200:
 *         description: Rol del jugador actualizado con éxito.
 *   delete:
 *     summary: Quitar un jugador de un roster
 *     tags: [Asignaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del roster
 *       - in: path
 *         name: id_jugador
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del jugador
 *     responses:
 *       200:
 *         description: Jugador removido del roster con éxito.
 */
router.put('/v1/rosters/:id/jugadores/:id_jugador', controller.actualizarRolJugador);
router.delete('/v1/rosters/:id/jugadores/:id_jugador', controller.quitarJugador);

export default router;