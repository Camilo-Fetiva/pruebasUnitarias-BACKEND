// Configuracion de los metodos para generar y verificar los token de autentificacion

// 1. Instalar la libreria
// 2. Crear una clave secreta


// 3. Importar modulos y dependencias
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

// 4. CONFIGURAR EL USO DE LA CLAVE SECRETA CREADA EN EL .ENV
const key = process.env.SECRET_KEY;

// 5. Crear las funciones para generar y verificar el token

// FUNCION PARA GENERAR EL TOKEN
export function generateToken(payload){
    // funcion promesa que devuelve una respuesta despues de un delay -> Callback
    return new Promise((resolve, reject) => {

        jwt.sign(payload, key, {expiresIn: '1h'}, (error, token)=>{
            if(error){
                reject (new Error('Error al generar token ' + error.message));
            }else{
                resolve(token);
            }
        });
    });
}

// FUNCION PARA VERIFICAR
export function verifyToken(token){
    // funcion promesa que devuelve una respuesta despues de un delay -> Callback
    return new Promise((resolve, reject) => {

        jwt.verify(token, key, (error, decoded)=>{
            if(error){
                reject (new Error('Error al generar JWT ' + error.message));
            }else{
                resolve(decoded);
            }
        });
    });
}