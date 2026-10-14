import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Esports - Roster & Jugadores',
            version: '1.0.0',
            description: 'Documentación oficial de la API para la gestión de equipos y jugadores de esports.',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Servidor de Desarrollo',
            },
        ],
    },
    // Rutas donde Swagger buscará los comentarios de documentación
    apis: ['./src/routers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
   console.log(' Documentación disponible en http://localhost:3000/docs');
};