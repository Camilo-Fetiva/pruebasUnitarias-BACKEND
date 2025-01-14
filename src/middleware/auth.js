// 1. IMPORTAR LAS DEPENDENCIAS Y MODULOS
import { verifyToken } from "../lib/jwt.js";

// 2. CREAR EL MIDDLEWARE PARA VERIFICAR EL TOKEN -> funcion
    // 2.1 VERIFICAR LA EXISTENCIA DEL TOKEN
    // 2.2 VERIFICAR QUE EL TOKEN SEA PERMITIDO
    // 2.4 VALIDAR -> VERIFICAR PERMISOS

export function authToken(requieredRole){
    return async (request, response, next) => { //next-> Middleware

    // VERIFICACIONES
        // 1.Existencia
        let token = request.headers['authorization']; // Accediendo al token
    
        if (!token) {
            return response.status(401).json({
                mensaje: 'No se puede acceder al contenido'
            });
        }

        // 2. Token permitido
        token = token.split(' ')[1];
        // console.log('sin bearer ' + token);

       // 3. Verificacion de errores 
       try {
        const decoded = await verifyToken(token);
        console.log (decoded);
        // 4. Verificar rol
        if(requieredRole === 'admin' && !decoded.role === 'admin'){
            return response.status(403).json({
                mensaje: "Acceso denegado",
            });
        }

        // Guardar la informacion decodificada en la peticion
        request.user = decoded;

       } catch (error) {
        return response.status(400).json({
            mensaje: "Ocurrio un error al verificar el acceso",
            problem:  error.message
        });
       }

    //Continuar con el siguiente proceso
    next();
    }
};