// IMPORTAR DEPENDENCIAS
import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";

import { productModel } from "../src/models/products.models.js";

// BLOQUES DE PRUEBA
describe(
    'Pruebas de controladores de los productos',
    ()=>{
        //Limpiar la base de datos antes de cada prueba 
        beforeEach(async ()=>{
            await productModel.deleteMany({});
        });

        // CERRAR ;a conexion a MongoDB despues de las pruebas
        afterAll(async ()=>{
            await mongoose.connection.close();
        });

        // PRUEBA DE PRODUCTO CREADO
        const testProduct = {
            Nombre: 'Chaqueta',
            Imagen: 'https://images.unsplash.com/photo-1587367336516-887f58881b13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzk5fHxmYXNoaW9ufGVufDB8fDB8fHww',
            Tallas: "S, M, L, XL",
            Precio: "450000",
            Descripcion:"Chaqueta cafe a cuadros"
        }

        // POST
        describe(
            'Pruebas POST para productos',
            ()=>{
                it(
                    'Creacion de productos correcta',
                    async()=>{
                        const res = await supertest(app).post('/productos/crear').send(testProduct)

                    // DEFINIR QUE SE ESPERA DE LA RESPUESTA
                    expect(res.statusCode).toBe(201);
                    }
                )

                it(
                    'ERROR al faltar informacion',
                    async()=>{
                        const res = await supertest(app).post('/productos/crear').send({nombre:testProduct.Nombre})

                        // DEFINIR QUE SE ESPERA DE LA RESPUESTA
                        expect(res.body).toHaveProperty('mensaje', 'Ocurrio un error al crear la vestimenta');
                    }
                )
            }
        )

        // GET
        describe(
            'Pruebas GET para productos',
            ()=>{
                it(
                    'Deberia indicar que no hay productos almacenados',
                    async()=>{
                        const res = await supertest(app).get('/productos/obtener');
                        expect(res.statusCode).toBe(200);
                        expect(res.body).toHaveProperty('mensaje', 'No hay vestimentas en la base de datos')
                    }
                )
            }
        )
    }
)