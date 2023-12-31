"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMotorista = exports.updateMotorista = exports.obtenerOrdenesMotoristas = exports.addPedido = exports.obtenerPedidos = exports.addMotorista = exports.login = exports.obtenerMotorista = exports.cargarMotorista = exports.cargarMotoristas = void 0;
const motoristas_schema_1 = require("../models/motoristas.schema");
const mongoose_1 = __importDefault(require("mongoose"));
const cargarMotoristas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const motoristas = yield motoristas_schema_1.Motoristas.find();
    res.send(motoristas);
    res.end();
});
exports.cargarMotoristas = cargarMotoristas;
const cargarMotorista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const motorista = yield motoristas_schema_1.Motoristas.findById(req.params.id);
    if (motorista)
        res.send(motorista);
    else
        res.send({ status: false, message: 'No se encontró el motorista' });
    res.end();
});
exports.cargarMotorista = cargarMotorista;
const obtenerMotorista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const motorista = yield motoristas_schema_1.Motoristas.findById(req.params.id);
    if (motorista) {
        res.send({ status: true, motorista: motorista });
    }
    else {
        res.send({ status: false, message: 'Motorista no encontrado' });
    }
    res.end();
});
exports.obtenerMotorista = obtenerMotorista;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const motorista = yield motoristas_schema_1.Motoristas.findOne({ correo: req.body.correo, password: req.body.password });
    if (motorista != null) {
        res.send({ exito: true, mensaje: 'Inicio de sesión exitoso', motorista: motorista });
    }
    else {
        res.send({ status: false, message: 'Usuario o contraseña incorrectos' });
    }
    res.end();
});
exports.login = login;
const addMotorista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoMotorista = new motoristas_schema_1.Motoristas({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        imagenPerfil: req.body.fotoPerfil,
        identificacion: req.body.identificacion,
        fechaNacimiento: req.body.fechaNacimiento,
        correo: req.body.correo,
        password: req.body.contrasena,
        celular: req.body.celular,
        descripcionVehiculo: req.body.placaVehiculo,
        placaVehiculo: req.body.placaVehiculo,
        ordenes: []
    });
    yield nuevoMotorista.save();
    res.send({
        status: true, message: 'Motorista agregado correctamente', motorista: { nombre: req.body.nombre, apellido: req.body.apellido, correo: req.body.correo, placa: req.body.placa, tipoVehiculo: req.body.tipoVehiculo }
    });
    res.end();
});
exports.addMotorista = addMotorista;
const obtenerPedidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const motorista = yield motoristas_schema_1.Motoristas.findById(req.params.id);
    if (motorista) {
        res.send({ status: true, ordenes: motorista.ordenes });
    }
    else {
        res.send({ status: false, message: 'Motorista no encontrado' });
    }
    res.end();
});
exports.obtenerPedidos = obtenerPedidos;
const addPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield motoristas_schema_1.Motoristas.updateOne({ _id: req.params.id }, {
        $push: {
            ordenes: {
                _id: new mongoose_1.default.Types.ObjectId(req.body.idOrden)
            }
        }
    });
    res.send(resultado);
    res.end();
});
exports.addPedido = addPedido;
const obtenerOrdenesMotoristas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const motoristaId = req.params.id; // Obtener el id del motorista de la solicitud
    // Buscar el motorista por su id
    const motorista = yield motoristas_schema_1.Motoristas.findById(motoristaId);
    if (!motorista) {
        // Si no se encuentra el motorista, enviar una respuesta adecuada
        return res.send({ status: false, message: 'Motorista no encontrado' });
    }
    const motoristaConOrdenes = yield motoristas_schema_1.Motoristas.aggregate([
        {
            $match: { _id: motorista._id } // Filtrar por el id del motorista encontrado
        },
        {
            $lookup: {
                from: 'pedidos',
                localField: 'ordenes._id',
                foreignField: '_id',
                as: 'ordenesMotorista',
            },
        },
    ]);
    res.send(motoristaConOrdenes[0]);
    res.end();
});
exports.obtenerOrdenesMotoristas = obtenerOrdenesMotoristas;
const updateMotorista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield motoristas_schema_1.Motoristas.updateOne({ _id: req.params.id }, {
        $set: {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            identificacion: req.body.identificacion,
            fechaNacimiento: req.body.fechaNacimiento,
            correo: req.body.correo,
            celular: req.body.celular,
            descripcionVehiculo: req.body.descripcionVehiculo,
            placaVehiculo: req.body.placaVehiculo,
        }
    });
    res.send(resultado);
    res.end();
});
exports.updateMotorista = updateMotorista;
const deleteMotorista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    motoristas_schema_1.Motoristas.deleteOne({ _id: req.params.id })
        .then((removeResult) => {
        res.send({ message: 'Registro eliminado', removeResult });
        res.end();
    });
});
exports.deleteMotorista = deleteMotorista;
