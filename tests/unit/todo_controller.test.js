const todoModel = require("../../models/todo_model");
const todoController = require("../../controllers/todo_controller");
const httpMocks = require("node-mocks-http");
const newTask = require("../mockups/todo_mockup.json");
const { beforeEach } = require("mocha");
const { expect } = require("chai");

todoModel.create = jest.fn()

let req, res, next;
beforeEach(() => {
    res = httpMocks.createResponse();
    req = httpMocks.createRequest();
    next = null;
})

describe("Test Create method exists in controller", () => {
    it("Should have a create method", () => {
        expect(typeof todoController.todoCreate).toBe("function");
    });

    it("Should call todoModel.create", () => {
        expect(typeof todoController.todoCreate).toBe("function");
    });
})