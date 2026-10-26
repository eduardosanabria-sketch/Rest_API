import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_jwt');
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};