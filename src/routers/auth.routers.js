import express from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso y cookie establecida.
 *       401:
 *         description: Credenciales inválidas.
 */
// Cambiado de '/v1/auth/login' a solo '/login'
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente.
 */
// Cambiado de '/v1/auth/logout' a solo '/logout'
router.post('/logout', authController.logout);

export default router;