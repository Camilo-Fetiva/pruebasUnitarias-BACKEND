// DEFINIR LA ESTRUCTURA DE LOS DATOS A GUARDAR EN LA BASE DE DATOS

//1.IMPORTAR LAS DEPENDENCIAS
import mongoose from "mongoose";

//2.Plantilla de datos definida como SCHEMA -> esquema de datos solicitado a guardar en la base de datos
const adminSchema = new mongoose.Schema({
    Nombre: {type: String, required: true},
    Correo:{type: String, required: true, unique:true},
    Telefono: {type: Number, required: true},
    Contrasena:{type: String, required: true},
    Imagen:{type: String},
    roleUser: {type: String, default: 'admin'}
});

//3. La base de datos debe crear una coleccion con el esquma anterior (Nombre de la caracteristica, estructura de los datos)
export const adminModel = mongoose.model('admin', adminSchema);