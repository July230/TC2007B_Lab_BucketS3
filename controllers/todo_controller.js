const todoModel = require("../models/todo_model");

exports.todoCreate = async (req, res, next) => {
    todoModel.create(req.body);
    res.status(201).send(); // 201 es para creado exitosamente, pero 200 también es válido
}