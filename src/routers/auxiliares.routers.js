import express from 'express';

const router = express.Router();
/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtener roles permitidos
 *     tags: [Auxiliares]
 *     responses:
 *       200:
 *         description: Lista de roles obtenida con éxito.
 */
router.get('/v1/roles', (req, res) => res.json(['Top', 'Jungle', 'Mid', 'ADC', 'Support']));

/**
 * @swagger
 * /estados:
 *   get:
 *     summary: Obtener estados permitidos
 *     tags: [Auxiliares]
 *     responses:
 *       200:
 *         description: Lista de estados obtenida con éxito.
 */
router.get('/v1/estados', (req, res) => res.json(['activo', 'inactivo']));

/**
 * @swagger
 * /tipos-roster:
 *   get:
 *     summary: Obtener tipos de roster permitidos
 *     tags: [Auxiliares]
 *     responses:
 *       200:
 *         description: Lista de tipos de roster obtenida con éxito.
 */
router.get('/v1/tipos-roster', (req, res) => res.json(['Principal', 'Academy']));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verificar el estado de salud de la API
 *     tags: [Auxiliares]
 *     responses:
 *       200:
 *         description: Estado de salud obtenido con éxito.
 */
router.get('/v1/health', (req, res) => res.json({ status: 'UP', timestamp: new Date() }));

export default router;