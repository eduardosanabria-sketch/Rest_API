import express from 'express';
import * as controller from '../controllers/jugadores.controller.js';

const router = express.Router();
/**
 * @swagger
 * /v1/jugadores/buscar:
 *   get:
 *     summary: Buscar jugadores por filtros
 *     tags: [Jugadores]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Nombre o nickname del jugador a buscar
 *     responses:
 *       200:
 *         description: Lista de jugadores encontrados.
 */

router.get('/v1/jugadores/buscar', controller.buscarJugadores);
/**
 * @swagger
 * /v1/jugadores:
 *   get:
 *     summary: Obtener lista de todos los jugadores
 *     tags: [Jugadores]
 *     responses:
 *       200:
 *         description: Lista de jugadores obtenida con éxito.
 *   post:
 *     summary: Crear un nuevo jugador
 *     tags: [Jugadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               nombre:
 *                 type: string
 *               pais:
 *                 type: string
 *               rol:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Jugador creado exitosamente.
 */
router.get('/v1/jugadores', controller.listarJugadores);
router.post('/v1/jugadores', controller.crearJugador);
/**
 * @swagger
 * /v1/jugadores/{id}:
 *   get:
 *     summary: Obtener el detalle de un jugador por ID
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del jugador
 *     responses:
 *       200:
 *         description: Datos del jugador encontrados.
 *       404:
 *         description: Jugador no encontrado.
 *   put:
 *     summary: Actualizar un jugador existente
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del jugador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Jugador actualizado con éxito.
 *   delete:
 *     summary: Eliminar un jugador
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del jugador
 *     responses:
 *       200:
 *         description: Jugador eliminado con éxito.
 */
router.get('/v1/jugadores/:id', controller.verDetalleJugador);

router.put('/v1/jugadores/:id', controller.editarJugador);

router.delete('/v1/jugadores/:id', controller.eliminarJugador);

export default router;