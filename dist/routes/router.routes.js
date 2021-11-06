"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapa = void 0;
var express_1 = require("express");
var server_models_1 = require("../models/server.models");
var grafica_1 = require("../classes/grafica");
//import { mapa } from '../controllers/sockets.controller';
var mapa_1 = require("../classes/mapa");
var router = express_1.Router();
var grafica = new grafica_1.Grafica;
// Mapa
exports.mapa = new mapa_1.Mapa();
var lugares = [
    {
        id: '1',
        nombre: 'Udemy',
        lat: 37.784679,
        lng: -122.395936
    },
    {
        id: '2',
        nombre: 'Bahía de San Francisco',
        lat: 37.798933,
        lng: -122.377732
    },
    {
        id: '3',
        nombre: 'The Palace Hotel',
        lat: 37.788578,
        lng: -122.401745
    }
];
(_a = exports.mapa.marcadores).push.apply(_a, lugares);
// Mapa
router.get('/mapa', function (req, res) {
    res.json(exports.mapa.getMarcadores());
});
////
router.get('/grafica', function (req, res) {
    var data = grafica.getDataGrafica();
    res.json({
        ok: true,
        data: data
    });
});
router.post('/grafica', function (req, res) {
    var numPregunta = req.body.pregunta;
    var valor = Number(req.body.valor);
    var payload = { numPregunta: numPregunta, valor: valor };
    var server = server_models_1.Server.instance;
    grafica.incrementarValor(numPregunta, valor);
    var data = grafica.getDataGrafica();
    server.io.emit('cambiar-grafica', data);
    res.json({
        ok: true,
        data: data
    });
});
exports.default = router;
