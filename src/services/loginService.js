// ARCHIVO PARA LA LOGICA NECESARIO DE LOS INICIOS DE SESION DE LOS USUARIOS

// 1. Importar las dependencias y los modulos
import { userModel } from "../models/user.model.js";
import { adminModel } from "../models/admin.model.js";

// 2. Importar funcion para crear los tokens
import { generateToken } from "../lib/jwt.js";

// 3. IMPORTAR LA DEPENDENCIA DE ENCRIPTACION
import bcrypt from 'bcryptjs';



// 4. CREAR LA FUNCION PARA GESTIONAR EL INICIO
export async function loginUser(request, response){
    // MANEJO DE ERRORES
    try {
        // VALIDACION = CORREO
        const {emailLogin, passwordLogin} = request.body;

        // VALIDACION usuario existe
        let userFound = await userModel.findOne({
            Correo: emailLogin,
        });

        let adminFound = null;
        if(!userFound) {
            adminFound = await adminModel.findOne({
            Correo: emailLogin,
            });
        }

        // QUE OCURRE SI NO SE ENCUENTRA EL EMAIL EN LA BASE DE DATOS
        if(!userFound && !adminFound){
            return response.status(404).json({mensaje: 'Usuario o administrador no encontrado'});
        }
        
        const user = userFound || adminFound;
        const role = userFound ? 'user' : 'admin';

        // VALIDACION DE LA CONTRASENA -> comparar la contrasena

        let isValidPassword = await bcrypt.compare(passwordLogin, user.Contrasena);
        

        // QUE OCURRE SI LA CONTRASENA ES INCORRECTA
        if(!isValidPassword){
            return response.status(401).json({mensaje: 'Contraseña invalida'});
        };

        // VERIFICAR EL ROL Y LOS PERMISOS DEL USUARIO
        const payload = {
            id: user._id,
            name: user.nameUser|| user.nameAdmin,
            role: role,
        }

        // GENERAR EL TOKEN
        const token = await generateToken(payload);

        // TODO CORRECTO
        return response.status(200).json({
            mensaje: 'Inicio de sesion existoso', 
            token
        });

    } catch (error) {
        return response.status(400).json({
            mensaje: 'Inicio de sesion incorrecto',
            error: error.message || error
        });
    }
}