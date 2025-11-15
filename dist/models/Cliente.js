"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    _legajo;
    _nroReserva;
    _nombre;
    _reservas;
    constructor(legajo, nombre) {
        this._legajo = legajo;
        this._nombre = nombre;
        this._nroReserva = 0;
        this._reservas = [];
    }
    getLegajo() { return this._legajo; }
    setLegajo(value) { this._legajo = value; }
    getNroReserva() { return this._nroReserva; }
    setNroReserva(value) { this._nroReserva = value; }
    getNombre() { return this._nombre; }
    setNombre(value) { this._nombre = value; }
    getReservas() { return this._reservas; }
    agregarReserva(reserva) {
        this._reservas.push(reserva);
        this._nroReserva++;
    }
}
exports.default = Cliente;
//# sourceMappingURL=Cliente.js.map