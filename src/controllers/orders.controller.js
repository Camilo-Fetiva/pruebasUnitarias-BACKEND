// Los controllers -> gestionan la logica de las peticiones (GET, POST, PUT, DELETE)

// 1. Importar los modelos de datos y deppendencias a manipular
import { orderModel } from '../models/orders.models.js';
import { request, response } from 'express';

//2. CREAR las logicas de las peticiones

// 2.1 CREAR (POST)
export const postOrder = async (request, response) =>{

    try{
        const newOrder = await orderModel.create(request.body); // Coleccion en la base de datos
        return response.status(201).json({
            mensaje: "Orden creada satisfactoriamente",
            datos: newOrder
        });
    }catch (error){
        return response.status(400).json({
            mensaje: "Ocurrio un error al crear la orden",
            problem:  error.message
        });
    };
}

// 2.2 OBTENER (GET)

export const getOrder = async (request, response) => {

    try{
        let searchOrder = await orderModel.find().populate({
            path :'products',
            select: ''

        });
        // Agregar validaciones
        if(searchOrder.length === 0){
            return response.status(200).json({
                mensaje : "No hay ordenes en la base de datos",
            });
        }

        // Si hay ordenes almacenadas
        return response.status(200).json({
            mensaje: "Estas son las ordenes encontradas",
            datos: searchOrder
        });

    }catch (error){
        return response.status(400).json({
            mensaje: "Ocurrio un error al buscar las ordenes",
            problem: error || error.message
        });
    };
}


// 2.3 ELIMINAR (DELETE)
export const deleteOrderById = async (request, response) => {

    try {
        let idForDelete = request.params.id;

        await orderModel.findByIdAndDelete(idForDelete); //Encotrar la orden por ID y eliminarla
        return response.status(200).json({
            mensaje: "Orden eliminada satisfactoriamente" 
        });

    } catch (error) {
        return response.status(400).json({
            mensaje: "Ocurrio un error al eliminar la orden",
            problem: error || error.message
        });
    }
}

// 2.4 EDITAR (PUT)
export const putOrderById = async (request, response) => {

    try {
        let idForPut = request.params.id; //Parametro ID del producto a actualizar
        let dataForUpdate = request.body; // Informacion actualizada

        const orderUpdated = await orderModel.findByIdAndUpdate(idForPut, dataForUpdate); // Parametro del ID  y luego parametro de la info actualizada

    
        if(!orderUpdated){
            return response.status(404).json ({
                mensaje: "No se encontro orden para actualizar"
            });
        }

        return response.status(200).json({
            mensaje: "Se actualizo la orden correctamente",
            datos: orderUpdated
        })

    } catch (error) {
        return response.status(400).json({
            mensaje: "Ocurrio un error al actualizar la orden",
            problem: error || error.message
        });
    }
} 