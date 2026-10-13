import express from 'express';
import jugadoresRouters from './src/routers/jugadores.routers.js';
import rostersRouters from './src/routers/rosters.routers.js';
import auxiliaresRouters from './src/routers/auxiliares.routers.js';

const app = express();

app.use(express.json());

app.use('/api', jugadoresRouters);
app.use('/api', rostersRouters);
app.use('/api', auxiliaresRouters);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;