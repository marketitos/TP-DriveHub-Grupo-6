"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Reserva_1 = __importDefault(require("./Reserva"));
class SistemaDeReserva {
    _autos;
    _clientes;
    _reservas;
    constructor() {
        this._autos = [];
        this._clientes = [];
        this._reservas = [];
    }
    getAutos() {
        return this._autos;
    }
    getClientes() {
        return this._clientes;
    }
    getReservas() {
        return this._reservas;
    }
    crearReserva(cliente, auto, fechaInicio, fechaFin, kilometraje = 0, temporada) {
        const nuevaReserva = new Reserva_1.default(this._reservas.length + 1, cliente, fechaInicio, fechaFin, auto, kilometraje, temporada);
        this._reservas.push(nuevaReserva);
    }
    verificarDisponibilidad() {
        return false;
    }
    agregarAuto(auto) {
        this._autos.push(auto);
    }
    eliminarAuto(nroMatricula) {
        this._autos = this._autos.filter(auto => auto.getNroMatricula() !== nroMatricula);
    }
    agregarCliente(cliente) {
        this._clientes.push(cliente);
    }
    eliminarCliente(legajo) {
        this._clientes = this._clientes.filter(cliente => cliente.getLegajo() !== legajo);
    }
    agregarReserva(reserva) {
        this._reservas.push(reserva);
    }
    eliminarReserva(idReserva) {
        this._reservas = this._reservas.filter(reserva => reserva.getIdReserva() !== idReserva);
    }
}
exports.default = SistemaDeReserva;
//# sourceMappingURL=SistemaDeReserva.js.map