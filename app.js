import express from 'express';
import cors from 'cors'; 
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import jugadoresRouters from './src/routers/jugadores.routers.js';
import rostersRouters from './src/routers/rosters.routers.js';
import auxiliaresRouters from './src/routers/auxiliares.routers.js';
import authRouters from './src/routers/auth.routers.js';
import { swaggerDocs } from './src/config/swagger.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const csrfProtection = csurf({ 
    cookie: { 
        key: '_csrf',
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict' 
    } 
});


app.get('/v1/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

app.use('/v1/auth', authRouters);

app.use('/', auxiliaresRouters);
app.use('/', csrfProtection, jugadoresRouters);
app.use('/', csrfProtection, rostersRouters);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;