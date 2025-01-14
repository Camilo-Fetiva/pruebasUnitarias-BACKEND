// DEFINIR LA ESTRUCTURA DE LOS DATOS A GUARDAR EN LA BASE DE DATOS

//1.IMPORTAR LAS DEPENDENCIAS
import mongoose, { now } from "mongoose";

//2.Plantilla de datos definida como SCHEMA -> esquema de datos solicitado a guardar en la base de datos
const orderSchema = new mongoose.Schema({
    numeroOrden: {type: Number, required: true},
    userOrder:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},// Referencia al modelo userSchema (USAMOS EL mongoose. PARA LA PRUEBA)
    productOrder:[{type: mongoose.Schema.Types.ObjectId, ref: 'product'}], // Referencia al modelo productSchema (USAMOS EL mongoose. PARA LA PRUEBA)
    priceOrder:{type: Number, required: true},
});

//3. La base de datos debe crear una coleccion con el esquma anterior (Nombre de la caracteristica, estructura de los datos)
export const orderModel = mongoose.model('orden', orderSchema);