// Importar las dependencias y los modulos
import { loginUser } from "../services/loginService.js"; //funcion
import express from 'express'; //dependencia

// Configurar el router de EXPRESS
export const loginRouter = express.Router();

// RUTAS PARA LAS PETICIONES DE LOGIN

// Ruta para la peticion POST
loginRouter.post ('/', loginUser);