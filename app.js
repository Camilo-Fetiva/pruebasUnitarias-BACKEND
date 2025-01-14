// 1. Importar las dependencias y módulos necesarios 
import express from 'express'; //importar express para la prueba en la terminal
import dotenv from 'dotenv'; //Dependencia para manejar variables de entorno
import { connectionMongo } from './src/config/dataBase.js'; // dependencia para conectar la base de datos
import { productRouter } from './src/routes/products.routes.js';
import { userRouter } from './src/routes/users.routes.js';
import { orderRouter } from './src/routes/order.routes.js';
import { loginRouter } from './src/routes/login.routes.js';
import { adminRouter } from './src/routes/admin.routes.js';

// Dependencia para la conexion con el frontend
import cors from 'cors';


// 2. CONFIGURAR EL USO DEL SERVIDOR
const app = express();
dotenv.config();
const port = process.env.PORT
app.use(cors()); // <- Uso para utilizar el backend en el navegador

app.use(express.json()); //Usar formato JSON, CREAR y ACTUALIZAR datos
app.use ( '/productos', productRouter);
app.use ('/usuarios', userRouter);
app.use ('/ordenes', orderRouter);
app.use ('/login', loginRouter);
app.use ( '/administrador', adminRouter);

//INVOCAR LA FUNCION DE LA BASE DE DATOS
connectionMongo ();

export default app;