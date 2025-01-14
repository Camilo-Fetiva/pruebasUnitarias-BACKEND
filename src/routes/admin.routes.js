// PERMITE CREAR LAS RUTAS PARA PODER HACER LAS PETICIONES (GET, POST, DELETE)

// 1. Importar los controladores y las dependencias
import { postAdmin, getAdmin, putAdminById, deleteAdminById } from "../controllers/admin.controller.js";
import express from 'express';
import { authToken } from "../middleware/auth.js";

// 2. Configurar el router de Express
export const adminRouter = express.Router();

// 3. Crear la rutas para las peticiones de los productos

// 3.1 Ruta para la peticion POST
adminRouter.post ('/crear', postAdmin);

// 3.2 Ruta para la peticion GET
adminRouter.get ('/obtener', getAdmin);

// 3.3 Ruta para la peticion DELETE
adminRouter.delete ('/eliminar/:id', authToken('admin'), deleteAdminById);

// 3.4 Ruta para la peticion PUT
adminRouter.put ('/actualizar/:id', authToken('admin'), putAdminById);