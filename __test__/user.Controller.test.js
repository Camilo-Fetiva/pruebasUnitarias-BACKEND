// IMPORTAR DEPENDENCIAS
import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";

import { userModel } from "../src/models/user.model.js";

// BLOQUES DE PRUEBA
describe(
    'Pruebas de controladores de los usuarios',
    () => {
        //Limpiar la base de datos antes de cada prueba 
        beforeEach(async () => {
            await userModel.deleteMany({});
        });

        // CERRAR ;a conexion a MongoDB despues de las pruebas
        afterAll(async () => {
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
            () => {
                it(
                    'Creacion de usuarios correcta',
                    async () => {
                        const res = await supertest(app).post('/usuarios/crear').send(testUser)

                        // DEFINIR QUE SE ESPERA DE LA RESPUESTA
                        expect(res.statusCode).toBe(201);
                    }
                )

                it(
                    'ERROR al faltar informacion',
                    async () => {
                        const res = await supertest(app).post('/usuarios/crear').send({ email: testUser.email })

                        // DEFINIR QUE SE ESPERA DE LA RESPUESTA
                        expect(res.body).toHaveProperty('mensaje', 'Error al crear un usuario');
                    }
                )
            }
        )

        // GET
        describe(
            'Pruebas GET para usuarios',
            () => {
                it(
                    'Deberia indicar que no hay usuarios almacenados',
                    async () => {
                        const res = await supertest(app).get('/usuarios/obtener');
                        expect(res.statusCode).toBe(200);
                        expect(res.body).toHaveProperty('mensaje', 'No hay usuarios en Ecocloset')
                    }
                )

                it(
                    'Deberia obtener los usuarios',
                    async () => {
                        await userModel.create(testUser);
                        const res = await supertest(app).get('/usuarios/obtener');

                        expect(res.statusCode).toBe(200);
                        expect(res.body).toHaveProperty('mensaje', 'Estos son los usuarios encontrados')
                    }
                )
            }
        )

        // PUT
        describe(
            'Pruebas PUT para usuarios',
            () => {
                it(
                    'Deberia decir que hay un error al ACTUALIZAR el usuario',
                    async () => {
                        const res = await supertest(app).put('/usuarios/actualizar/:id');

                        expect(res.statusCode).toBe(400);
                        expect(res.body).toHaveProperty('mensaje', 'Ocurrio un error al actualizar el usuario')
                    }
                )

                it(
                    'Deberia actualizar el usuario',
                    async () => {
                        // CREAR EL USUARIO
                        const newUser = (await userModel.create(testUser)).save();

                        // CAMBIAR UN DATO
                        const updatedUser = { ...testUser, Nombre: 'Joe' };

                        const res = await supertest(app).put('/usuarios/actualizar/' + (await newUser).id).send(updatedUser);

                        expect(res.statusCode).toBe(200);
                        expect(res.body).toHaveProperty('mensaje', 'Se actualizo el usuario correctamente')
                    }
                )

                it(
                    'No deberia encontrar un usuario para actualizar',
                    async () => {
                        // CREAR EL USUARIO
                        const newUser = (await userModel.create(testUser)).save();

                        // CAMBIAR EL ID DEL USUARIO
                        const idUser = '673ffb2b5ea00ead048d0327';

                        // CAMBIAR UN DATO
                        const updatesUser = { ...testUser, Nombre: 'Joe' };

                        const res = await supertest(app).put('/usuarios/actualizar/' + idUser).send(updatesUser);

                        expect(res.statusCode).toBe(404);
                        expect(res.body).toHaveProperty('mensaje', 'No se encontro un usuario para actualizar')
                    }
                )
            }
        )

        // DELETE
        describe(
            'Pruebas DELETE para usuarios',
            () => {
                it(
                    'Deberia decir que hay un error al ELIMINAR el usuario',
                    async () => {
                        const res = await supertest(app).delete('/usuarios/eliminar/:id');

                        expect(res.statusCode).toBe(400);
                        expect(res.body).toHaveProperty('mensaje', 'Ocurrio un error al eliminar el usuario')
                    }
                )

                it(
                    'Deberia eliminar el usuario',
                    async () => {
                        // CREAR EL USUARIO
                        const newUser = (await userModel.create(testUser)).save();

                        const res = await supertest(app).delete('/usuarios/eliminar/' + (await newUser).id);

                        expect(res.statusCode).toBe(200);
                        expect(res.body).toHaveProperty('mensaje', 'Usuario eliminado satisfactoriamente')
                    }
                )
            }
        )
    }
)
