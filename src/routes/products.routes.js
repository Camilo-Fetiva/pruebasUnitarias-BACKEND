// PERMITE CREAR LAS RUTAS PARA PODER HACER LAS PETICIONES (GET, POST, PUT, DELETE)

// 1. Importar los controladores y las dependencias
import { postProduct, getProduct, putProductById, deleteProductById } from "../controllers/products.controller.js";
import express from 'express';
import { authToken } from "../middleware/auth.js";

// 2. Configurar el router de Express
export const productRouter = express.Router();

// 3. Crear la rutas para las peticiones de los productos

// 3.1 Ruta para la peticion POST
productRouter.post ('/crear', postProduct);

// 3.2 Ruta para la peticion GET
productRouter.get ('/obtener', getProduct);

// 3.3 Ruta para la peticion PUT
productRouter.put ('/actualizar/:id', putProductById);

// 3.4 Ruta para la peticion DELETE
productRouter.delete ('/eliminar/:id', deleteProductById);