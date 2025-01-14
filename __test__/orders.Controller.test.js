// IMPORTAR DEPENDENCIAS
import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";

import { orderModel } from "../src/models/orders.models.js";

// BLOQUES DE PRUEBA
describe(
    'Pruebas de controladores de las ordenes',
    ()=>{
        //Limpiar la base de datos antes de cada prueba 
        beforeEach(async ()=>{
            await orderModel.deleteMany({});
        });

        // CERRAR ;a conexion a MongoDB despues de las pruebas
        afterAll(async ()=>{
            await mongoose.connection.close();
        });

        // PRUEBA DE ORDEN CREADA
        const testOrder = {
            numeroOrden: 123,
            priceOrder: 1
        }

        // POST
        describe(
            'Pruebas POST para ordenes',
            ()=>{
                it(
                    'Creacion de ordenes correcta',
                    async()=>{
                        const res = await supertest(app).post('/ordenes/crear').send(testOrder)

                    // DEFINIR QUE SE ESPERA DE LA RESPUESTA
                    expect(res.statusCode).toBe(201);
                    }
                )

                it(
                    'ERROR al faltar informacion',
                    async()=>{
                        const res = await supertest(app).post('/ordenes/crear').send({numeroOrden:testOrder.numeroOrden})

                        // DEFINIR QUE SE ESPERA DE LA RESPUESTA
                        expect(res.body).toHaveProperty('mensaje', 'Ocurrio un error al crear la orden');
                    }
                )
            }
        )

        // GET
        describe(
            'Pruebas GET para ordenes',
            ()=>{
                it(
                    'Deberia indicar que no hay ordenes almacenadas',
                    async()=>{
                        const res = await supertest(app).get('/ordenes/obtener');
                        expect(res.statusCode).toBe(200);
                        expect(res.body).toHaveProperty('mensaje', 'No hay ordenes en la base de datos')
                    }
                )
            }
        )
    }
)