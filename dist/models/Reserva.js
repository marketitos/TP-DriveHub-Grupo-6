"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Reserva {
    _idReserva;
    _cliente;
    _fechaInicio;
    _fechaFin;
    _auto;
    _kilometraje;
    _temporada;
    constructor(idReserva, cliente, fechaInicio, fechaFin, auto, kilometraje, temporada) {
        this._idReserva = idReserva;
        this._cliente = cliente;
        this._fechaInicio = fechaInicio;
        this._fechaFin = fechaFin;
        this._auto = auto;
        this._kilometraje = kilometraje;
        this._temporada = temporada;
    }
    getIdReserva() { return this._idReserva; }
    setIdReserva(value) { this._idReserva = value; }
    getCliente() { return this._cliente; }
    setCliente(value) { this._cliente = value; }
    getFechaInicio() { return this._fechaInicio; }
    setFechaInicio(value) { this._fechaInicio = value; }
    getFechaFin() { return this._fechaFin; }
    setFechaFin(value) { this._fechaFin = value; }
    getAuto() { return this._auto; }
    setAuto(value) { this._auto = value; }
    getKilometraje() { return this._kilometraje; }
    setKilometraje(value) { this._kilometraje = value; }
    getTemporada() { return this._temporada; }
    setTemporada(value) { this._temporada = value; }
    costoTotalReserva() {
        const tarifaBase = this._auto.getTarifa();
        const tarifaAjustada = this._temporada.calcularTarifaAjustada(tarifaBase);
        const tarifaOriginal = this._auto.getTarifa();
        this._auto.setTarifa(tarifaAjustada);
        const costoTotal = this._auto.calcularBase(this);
        this._auto.setTarifa(tarifaOriginal);
        return costoTotal;
    }
    getDias() {
        let diferenciaDias = this._fechaFin.getTime() - this._fechaInicio.getTime();
        return (diferenciaDias / (1000 * 60 * 60 * 24)) + 1;
    }
    obtenerTarifaDiaria() {
        return this._temporada.calcularTarifaAjustada(this._auto.getTarifa());
    }
}
exports.default = Reserva;
//# sourceMappingURL=Reserva.js.map