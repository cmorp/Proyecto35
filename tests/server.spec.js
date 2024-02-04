const request = require("supertest")
const server = require("../index")


describe("Operaciones CRUD de cafés", () => {
    test("Status 200. El tipo de dato recibido es un arreglo con por lo menos 1 objeto.", async () => {
        const response = await request(server).get("/cafes").send()
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBeGreaterThanOrEqual(1)
    });


    test("Status 404 al eliminar un café que no existe", async () => {
        const invalidId = 10
        const response = await request(server).delete(`/cafes/${invalidId}`)
        expect(response.status).toBe(404);
    });


    test("Status 201 al agregar un nuevo café.", async () => {
        const newCafe = {
            id: 5,
            nombre: "Caramel Macchiato",
        }
        const response = await request(server)
            .post("/cafes")
            .send(newCafe);
        expect(response.status).toBe(201)
        expect(Array.isArray(response.body)).toBe(true)
    });


    test("Status 400 al actualizar un café con id diferente.", async () => {
        const cafeToUpdate = {
            id: 3,
            nombre: "Mocha Blanco",
        }
        const response = await request(server)
            .put(`/cafes/${cafeToUpdate.id + 1}`)
            .send(cafeToUpdate)
        expect(response.status).toBe(400)
    });
});