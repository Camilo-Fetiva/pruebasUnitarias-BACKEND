// Los controllers -> gestionan la logica de las peticiones (GET, POST, PUT, DELETE)

// 1. Importar los modelos de datos y deppendencias a manipular
import { productModel } from "../models/products.models.js";
import { request, response } from 'express';

//2. CREAR las logicas de las peticiones

// 2.1 CREAR (POST)
export const postProduct = async (request, response) =>{

    try{
        const newProduct = await productModel.create(request.body); // Coleccion en la base de datos
        return response.status(201).json({
            mensaje: "Vestimenta creada satisfactoriamente",
            datos: newProduct
        });
    }catch (error){
        return response.status(400).json({
            mensaje: "Ocurrio un error al crear la vestimenta",
            problem: error || error.message
        });
    };
}

// 2.2 OBTENER (GET)

export const getProduct = async (request, response) => {

    try{
        let searchProducts = await productModel.find();
        // Agregar validaciones
        if(searchProducts.length === 0){
            return response.status(200).json({
                mensaje : "No hay vestimentas en la base de datos",
            });
        }

        // Si hay productos almacenados
        return response.status(200).json({
            mensaje: "Estas son las vestimentas encontradas",
            datos: searchProducts
        });

    }catch (error){
        return response.status(400).json({
            mensaje: "Ocurrio un error al buscar las vestimentas",
            problem: error || error.message
        });
    };
}

// 2.3. ACTUALIZAR (PUT)
export const putProductById = async (request, response) => {

    try {
        let idForPut = request.params.id; //Parametro ID del producto a actualizar
        let dataForUpdate = request.body; // Informacion actualizada

        const productUpdated = await productModel.findByIdAndUpdate(idForPut, dataForUpdate); // Parametro del ID  y luego parametro de la info actualizada

        if(!productUpdated){
            return response.status(404).json ({
                mensaje: "No se encontro vestimenta para actualizar"
            });
        }

        return response.status(200).json({
            mensaje: "Se actualizo la vestimenta correctamente",
            datos: productUpdated
        })

    } catch (error) {
        return response.status(400).json({
            mensaje: "Ocurrio un error al actualizar la vestimenta",
            problem: error || error.message
        });
    }
}

// 2.4 ELIMINAR (DELETE)
export const deleteProductById = async (request, response) => {

    try {
        let idForDelete = request.params.id;

        await productModel.findByIdAndDelete(idForDelete); //Encotrar el producto por ID y eliminarlo
        return response.status(200).json({
            mensaje: "Vestimenta eliminada satisfactoriamente" 
        });

    } catch (error) {
        return response.status(400).json({
            mensaje: "Ocurrio un error al eliminar la vestimenta",
            problem: error || error.message
        });
    }
}