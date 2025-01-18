// IMPORTAR DEPENDENCIAS
import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";

import { adminModel } from "../src/models/admin.model.js";

// BLOQUES DE PRUEBA
describe(
    'Pruebas de controladores de los administradores',
    ()=>{
        //Limpiar la base de datos antes de cada prueba 
        beforeEach(async ()=>{
            await adminModel.deleteMany({});
        });

        // CERRAR ;a conexion a MongoDB despues de las pruebas
        afterAll(async ()=>{
            await mongoose.connection.close();
        });

        // PRUEBA DE PRODUCTO CREADO
        const testAdmin = {
            Nombre: "Chaqueta",
            Correo: "pepe@admin",
            Telefono: 1234455,
            Contrasena: "djhfsdjfh", 
        }

        // POST
        describe(
            'Pruebas POST para administradores',
            ()=>{
                it(
                    'Creacion de administradores correcta',
                    async()=>{
                        const res = await supertest(app).post('/administrador/crear').send(testAdmin)

                    // DEFINIR QUE SE ESPERA DE LA RESPUESTA
                    expect(res.statusCode).toBe(201);
                    }
                )

                it(
                    'ERROR al faltar informacion',
                    async()=>{
                        const res = await supertest(app).post('/administrador/crear').send({nombre:testAdmin.Nombre})

                        // DEFINIR QUE SE ESPERA DE LA RESPUESTA
                        expect(res.body).toHaveProperty('mensaje', 'Error al crear un administrador');
                    }
                )
            }
        )

        // GET
        describe(
            'Pruebas GET para administradores',
            ()=>{
                it(
                    'Deberia indicar que no se encontro el administrador para actualizar',
                    async()=>{
                        const res = await supertest(app).get('/administrador/obtener');
                        expect(res.statusCode).toBe(200);
                        expect(res.body).toHaveProperty('mensaje', 'No hay administradores en Ecocloset')
                    }
                )

                it(
                    'Deberia actualizar el administrador',
                    async()=>{
                        await adminModel.create(testAdmin);
                        const res = await supertest(app).get('/administrador/obtener');
                        
                        expect(res.statusCode).toBe(200);
                        expect(res.body).toHaveProperty('mensaje', 'Estos son los administradores encontrados')
                    }
                )
            }
        )

        // PUT
        describe(
            'Pruebas PUT para administradores',
            ()=>{
                it(
                    'Deberia decir que hay un error al ACTUALIZAR los administradores',
                    async()=>{
                        const res = await supertest(app).put('/administrador/actualizar/:id');
                        
                        expect(res.statusCode).toBe(400);
                        expect(res.body).toHaveProperty('mensaje', 'Ocurrio un error al actualizar el administrador')
                    }
                )
            }
        )

        // DELETE
        describe(
            'Pruebas DELETE para administradores',
            ()=>{
                it(
                    'Deberia decir que hay un error al ELIMINAR el administrador',
                    async()=>{
                        const res = await supertest(app).delete('/administrador/eliminar/:id');
                        
                        expect(res.statusCode).toBe(400);
                        expect(res.body).toHaveProperty('mensaje', 'Ocurrio un error al eliminar el administrador')
                    }
                )
            }
        )
    }
)