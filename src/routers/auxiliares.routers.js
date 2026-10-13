import express from 'express';

const router = express.Router();

router.get('/v1/roles', (req, res) => res.json(['Top', 'Jungle', 'Mid', 'ADC', 'Support']));
router.get('/v1/estados', (req, res) => res.json(['activo', 'inactivo']));
router.get('/v1/tipos-roster', (req, res) => res.json(['Principal', 'Academy']));
router.get('/v1/health', (req, res) => res.json({ status: 'UP', timestamp: new Date() }));

export default router;