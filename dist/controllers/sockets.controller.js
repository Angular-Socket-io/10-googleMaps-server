"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketscontroller = void 0;
var router_routes_1 = require("./../routes/router.routes");
//export const mapa = new Mapa();
var socketscontroller = function (cliente, io) {
    console.log('Cliente Conectado');
    cliente.on('disconnect', function () {
        console.log('Cliente Desconectado');
    });
    cliente.on('marcador-nuevo', function (marcador) {
        router_routes_1.mapa.agregarMarcador(marcador);
        cliente.broadcast.emit('marcador-nuevo', marcador);
        console.log(marcador);
    });
    cliente.on('marcador-borrado', function (id) {
        router_routes_1.mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrado', id);
    });
    cliente.on('marcador-mover', function (marcador) {
        router_routes_1.mapa.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover', marcador);
    });
};
exports.socketscontroller = socketscontroller;
