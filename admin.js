import bcrypt from 'bcrypt';
import db from './models/index.js';

// Función para crear el primer usuario administrador
const crearPrimerUsuario = async () => {
    try {
        await db.sequelize.sync();
        const hashedPassword = await bcrypt.hash('tu_password_segura', 10); 

        await db.usuario.create({
            nombre: 'admin',
            password: hashedPassword,
            rol: 'admin'
        });

        console.log('Usuario administrador creado con éxito');
        process.exit(0);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        process.exit(1);
    }
};

crearPrimerUsuario();