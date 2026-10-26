import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../models/index.js';

const Usuario = db.usuario;
//login
export const login = async (req, res) => {
    try { 
        const { nombre, password } = req.body;

        //buscar usuario en la base de datos por el nombre
        const usuario = await Usuario.findOne({ where: { nombre } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        //comparar la contraseña ingresada con la almacenada en la base de datos
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        //generar token JWT
        const token = jwt.sign(
            { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
            process.env.JWT_SECRET || 'tu_secreto_jwt', 
            { expiresIn: '1h' }
        );

        //enviar token en una cookie segura
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 // 1 hora
        });
        
        return res.json({ message: 'Inicio de sesión exitoso', rol: usuario.rol });
        
    } catch (error) { 
        return res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};
//logout
export const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Cierre de sesión exitoso' });
};

