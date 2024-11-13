const todoModel = require("../../models/todo_model");
const todoController = require("../../controllers/todo_controller");
const httpMocks = require("node-mocks-http");
const newTask = require("../mockups/todo_mockup.json");

todoModel.create = jest.fn()

let req, res, next;
beforeEach(() => {
    res = httpMocks.createResponse();
    req = httpMocks.createRequest();
    next = null;
})

describe("Test Create method exists in controller", () => {
    // Checar si el metodo create existe
    it("Should have a create method", () => {
        expect(typeof todoController.todoCreate).toBe("function");
    });

    // Probar el metodo create
    it("Should call todoModel.create", () => {
        req.body = newTask;
        todoController.todoCreate(req, res, next);
        expect(todoModel.create).toBeCalledWith(newTask);
    });

    // Checar la respuesta 201 (201 es para creado)
    // Funciona porque en el controlador esta explicitamente 201
    it("Should return 201 status code", () => {
        req.body = newTask;
        todoController.todoCreate(req, res, next);
        expect(res.statusCode).toBe(201); 
    })
})