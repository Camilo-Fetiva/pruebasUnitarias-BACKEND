//ESTABLECER LA CONEXION CON LA BASE DE DATOS

//1. Importar las dependencias necesarias
import mongoose from "mongoose";

//2. Crear funcion para conectar la base de datos (Funcion asincronica -> necesaria al esperar una respuesta)
export async function connectionMongo (){
    //try -> respuesta positiva
    //catch -> atrapa los errores

    try {
        await mongoose.connect(process.env.DB_URL, {}); //CONECTAR LA BASE DE DATOS
        console.log ('Conexion exitosa con la base de datos');
    } catch (error) {
        console.error ('Error de conexion: ' + error);
    }
}