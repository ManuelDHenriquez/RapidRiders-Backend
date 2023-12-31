"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pedidos_controller_1 = require("../controllers/pedidos.controller");
const router = express_1.default.Router();
router.get('/', pedidos_controller_1.cargarPedidos);
router.get('/:id/pedido', pedidos_controller_1.obtenerPedido);
router.get('/:id', pedidos_controller_1.cargarProductosPedidos);
router.post('/', pedidos_controller_1.crearPedido);
router.put('/:id/estado', pedidos_controller_1.modificarEstadoPedido);
exports.default = router;
