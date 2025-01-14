// PERMITE CREAR LAS RUTAS PARA PODER HACER LAS PETICIONES (GET, POST)

// 1. Importar los controladores y las dependencias
import { postUser, getUser, putUserById, deleteUserById } from "../controllers/user.controller.js";
import express from 'express';
import { authToken } from "../middleware/auth.js";

// 2. Configurar el router de Express
export const userRouter = express.Router();

// 3. Crear la rutas para las peticiones de los productos

// 3.1 Ruta para la peticion POST
userRouter.post ('/crear', postUser);

// 3.2 Ruta para la peticion GET
userRouter.get ('/obtener', getUser);

// 3.3 Ruta para la peticion PUT
userRouter.put ('/actualizar/:id', putUserById);

// 3.4 Ruta para la peticion DELETE
userRouter.delete ('/eliminar/:id',deleteUserById);
