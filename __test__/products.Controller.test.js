// IMPORTAR DEPENDENCIAS
import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";

import { productModel } from "../src/models/products.models.js";

// BLOQUES DE PRUEBA
describe(
    'Pruebas de controladores de los productos',
    () => {
        //Limpiar la base de datos antes de cada prueba 
        beforeEach(async () => {
            await productModel.deleteMany({});
        });

        // CERRAR ;a conexion a MongoDB despues de las pruebas
        afterAll(async () => {
            await mongoose.connection.close();
        });

        // PRUEBA DE PRODUCTO CREADO
        const testProduct = {
            Nombre: "Chaqueta",
            Imagen: "https://images.unsplash.com/photo-1587367336516-887f58881b13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzk5fHxmYXNoaW9ufGVufDB8fDB8fHww",
            Tallas: "S, M, L, XL",
            Precio: "450000",
            Descripcion: "Chaqueta cafe a cuadros",
        }

        // POST
        describe(
            'Pruebas POST para productos',
            () => {
                it(
                    'Creacion de productos correcta',
                    async () => {
                        const res = await supertest(app).post('/productos/crear').send(testProduct)

                        // DEFINIR QUE SE ESPERA DE LA RESPUESTA
                        expect(res.statusCode).toBe(201);
                    }
                )

                it(
                    'ERROR al faltar informacion',
                    async () => {
                        const res = await supertest(app).post('/productos/crear').send({ nombre: testProduct.Nombre })

                        // DEFINIR QUE SE ESPERA DE LA RESPUESTA
                        expect(res.body).toHaveProperty('mensaje', 'Ocurrio un error al crear la vestimenta');
                    }
                )
            }
        )

        // GET
        describe(
            'Pruebas GET para productos',
            () => {
                it(
                    'Deberia indicar que no se encontro el producto',
                    async () => {
                        const res = await supertest(app).get('/productos/obtener');
                        expect(res.statusCode).toBe(200);
                        expect(res.body).toHaveProperty('mensaje', 'No hay vestimentas en la base de datos')
                    }
                )

                it(
                    'Deberia obtener el producto',
                    async () => {
                        await productModel.create(testProduct);
                        const res = await supertest(app).get('/productos/obtener');

                        expect(res.statusCode).toBe(200);
                        expect(res.body).toHaveProperty('mensaje', 'Estas son las vestimentas encontradas')
                    }
                )
            }
        )

        // PUT
        describe(
            'Pruebas PUT para productos',
            () => {
                it(
                    'Deberia actualizar el producto',
                    async () => {
                        // CREAR EL PRODUCTO
                        const newProduct = (await productModel.create(testProduct)).save();

                        // CAMBIAR UN DATO
                        const updatedProduct = { ...testProduct, Nombre: 'Camisa' };

                        const res = await supertest(app).put('/productos/actualizar/' + (await newProduct).id).send(updatedProduct);

                        expect(res.statusCode).toBe(200);
                        expect(res.body).toHaveProperty('mensaje', 'Se actualizo la vestimenta correctamente')
                    }
                )

                it(
                    'No deberia encontrar un producto para actualizar',
                    async () => {
                        // CREAR EL PRODUCTO
                        const newProduct = (await productModel.create(testProduct)).save();

                        // CAMBIAR EL ID DEL PRODUCTO
                        const idProduct = '673ffb2b5ea00ead048d0327';

                        // CAMBIAR UN DATO
                        const updatedProduct = { ...testProduct, Nombre: 'Camisa' };

                        const res = await supertest(app).put('/productos/actualizar/' + idProduct).send(updatedProduct);

                        expect(res.statusCode).toBe(404);
                        expect(res.body).toHaveProperty('mensaje', 'No se encontro vestimenta para actualizar')
                    }
                )

                it(
                    'Deberia decir que hay un error al ACTUALIZAR el producto',
                    async () => {
                        const res = await supertest(app).put('/productos/actualizar/:id');

                        expect(res.statusCode).toBe(400);
                        expect(res.body).toHaveProperty('mensaje', 'Ocurrio un error al actualizar la vestimenta')
                    }
                )
            }
        )

        // DELETE
        describe(
            'Pruebas DELETE para productos',
            () => {
                it(
                    'Deberia eliminar el producto',
                    async () => {
                        // CREAR EL PRODUCTO
                        const newProduct = (await productModel.create(testProduct)).save();

                        const res = await supertest(app).delete('/productos/eliminar/' + (await newProduct).id);

                        expect(res.statusCode).toBe(200);
                        expect(res.body).toHaveProperty('mensaje', 'Vestimenta eliminada satisfactoriamente')
                    }
                )

                it(
                    'Deberia decir que hay un error al ELIMINAR el producto',
                    async () => {
                        const res = await supertest(app).delete('/productos/eliminar/:id');

                        expect(res.statusCode).toBe(400);
                        expect(res.body).toHaveProperty('mensaje', 'Ocurrio un error al eliminar la vestimenta')
                    }
                )
            }
        )
    }
)