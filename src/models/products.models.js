// DEFINIR LA ESTRUCTURA DE LOS DATOS A GUARDAR EN LA BASE DE DATOS

//1.IMPORTAR LAS DEPENDENCIAS A UTILIZAR
import mongoose from "mongoose";

//2.Plantilla de datos definida como SCHEMA -> esquema de datos solicitado a guardar en la base de datos
const productSchema = new mongoose.Schema({
    Nombre:{type: String, required: true},
    Imagen:{type: String, required: true}, //Crear el tipo de dato dentro del esquema
    Coleccion:{type: String},
    Tallas:{type: String, required: true},
    Precio: {type: Number, required:true},
    Descripcion: {type: String},
});

//3. La base de datos debe crear una coleccion con el esquma anterior (Nombre de la caracteristica, estructura de los datos)
export const productModel = mongoose.model('product', productSchema);