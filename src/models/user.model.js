// DEFINIR LA ESTRUCTURA DE LOS DATOS A GUARDAR EN LA BASE DE DATOS

//1.IMPORTAR LAS DEPENDENCIAS
import mongoose from "mongoose";

//2.Plantilla de datos definida como SCHEMA -> esquema de datos solicitado a guardar en la base de datos
const userSchema = new mongoose.Schema({
    Nombre:{type: String, required: true}, //Crear el tipo de dato dentro del esquema, en este caso el nombre
    Correo:{type: String, required: true, unique:true},
    Telefono: {type: Number},
    Contrasena:{type: String, required: true},
    Imagen: {type: String},
    roleUser: {type: String, default: 'user'}
});

//3. La base de datos debe crear una coleccion con el esquma anterior (Nombre de la caracteristica, estructura de los datos)
export const userModel = mongoose.model('user', userSchema);