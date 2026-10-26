import bcrypt from 'bcrypt';
import db from './models/index.js';

const actualizarPassword = async () => {
    try {
        await db.sequelize.sync();
        const hashedPassword = await bcrypt.hash('12345', 10); 

        await db.usuario.update(
            { password: hashedPassword },
            { where: { nombre: 'admin' } }
        );

        console.log('Contraseña actualizada con éxito a: 123456');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

actualizarPassword();