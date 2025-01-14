// IMPORTAR DEPENDENCIAS
import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";

import { userModel } from "../src/models/user.model.js";

// BLOQUES DE PRUEBA
describe(
    'Pruebas de controladores de los usuarios',
    ()=>{
        //Limpiar la base de datos antes de cada prueba 
        beforeEach(async ()=>{
            await userModel.deleteMany({});
        });

        // CERRAR ;a conexion a MongoDB despues de las pruebas
        afterAll(async ()=>{
            await mongoose.connection.close();
        });

        // PRUEBA DE USUARIO CREADO
        const testUser = {
            Nombre: 'Juan Roman Riquelme',
            Correo: ' inventeroman@user.com',
            Contrasena: '123',
        }

        // POST
        describe(
            'Pruebas POST para usuarios',
            ()=>{
                it(
                    'Creacion de usuarios correcta',
                    async()=>{
                        const res = await supertest(app).post('/usuarios/crear').send(testUser)

                    // DEFINIR QUE SE ESPERA DE LA RESPUESTA
                    expect(res.statusCode).toBe(201);
                    }
                )

                it(
                    'ERROR al faltar informacion',
                    async()=>{
                        const res = await supertest(app).post('/usuarios/crear').send({email:testUser.email})

                        // DEFINIR QUE SE ESPERA DE LA RESPUESTA
                        expect(res.body).toHaveProperty('mensaje', 'Error al crear un usuario');
                    }
                )
            }
        )

        // GET
        describe(
            'Pruebas GET para usuarios',
            ()=>{
                it(
                    'Deberia indicar que no hay usuarios almacenados',
                    async()=>{
                        const res = await supertest(app).get('/usuarios/obtener');
                        expect(res.statusCode).toBe(200);
                        expect(res.body).toHaveProperty('mensaje', 'No hay usuarios en Ecocloset')
                    }
                )
            }
        )
    }
)
