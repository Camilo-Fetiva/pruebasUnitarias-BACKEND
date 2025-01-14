// 1. Importar los modelos de datos y deppendencias a manipular
import { adminModel } from "../models/admin.model.js";
import bcrypt from "bcryptjs";


// 2. Crear la logica de las peticiones

// 2.1 peticion POST -> Crear administrador
export const postAdmin = async (request, response) =>{

    try {

        // Deestructuracion ->  Permite acceder a cada una de las variables suministradas por el usuario en el Schema de datos
        const {Nombre, Correo, Telefono, Contrasena, Imagen} = request.body;
        
        // encriptar la contrasena
        // hash -> metodo para encriptar la contrasena
        const codedPassword = await bcrypt.hash(Contrasena, 10);

        const newAdmin = await adminModel.create({Nombre, Correo, Telefono,  Contrasena:codedPassword, Imagen});

        return response.status(201).json({
            mensaje: "Administrador creado satisfactoriamente",
            datos: newAdmin
        });
        
    } catch (error) {
        return response.status(400).json({
            mensaje: 'Error al crear un administrador',
            problema: error || error.message
        });
    }
}


// 2.2 peticions GET
export const getAdmin = async (request, response) => {

    // Logica de la peticion GET
    try {
        let admin = await adminModel.find() //Encontrar los usuarios

        if(admin.length === 0){
            return response.status(200).json({
                mensaje : 'No hay administradores en Ecocloset',
            });
        }

        return response.status(200).json({
            mensaje :'Estos son los administradores encontrados',
            datos: admin
        });

    } catch (error) { 
        return response.status(400).json({
            mensaje: 'Error al mostrar los administradores',
            problema: error || error.message
        });
    }
}

// 2.3 peticion PUT
export const putAdminById = async (request, response) => {

    try {
        let idForPut = request.params.id; //Parametro ID del producto a actualizar
        let dataForUpdate = request.body; // Informacion actualizada

        const adminUpdated = await adminModel.findByIdAndUpdate(idForPut, dataForUpdate); // Parametro del ID  y luego parametro de la info actualizada

        if(!adminUpdated){
            return response.status(404).json ({
                mensaje: "No se encontro administrador para actualizar"
            });
        }

        return response.status(200).json({
            mensaje: "Se actualizo el administrador correctamente",
            datos: adminUpdated
        })

    } catch (error) {
        return response.status(400).json({
            mensaje: "Ocurrio un error al actualizar el administrador",
            problem: error || error.message
        });
    }
}

// 2.4 ELIMINAR (DELETE)
export const deleteAdminById = async (request, response) => {

    try {
        let idForDelete = request.params.id;

        await adminModel.findByIdAndDelete(idForDelete); 
        return response.status(200).json({
            mensaje: "Administrador eliminado satisfactoriamente" 
        });

    } catch (error) {
        return response.status(400).json({
            mensaje: "Ocurrio un error al eliminar el administrador",
            problem: error || error.message
        });
    }
}