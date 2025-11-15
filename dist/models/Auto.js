"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Auto {
    _nroMatricula;
    _estado;
    _tarifa;
    _cargoAdicional;
    _kmDesdeUltimoMantenimiento;
    _fechaUltMantenimiento;
    alquileresCompletados;
    constructor(nroMatricula, estado, tarifa, cargoAdicional = 0, kmDesdeUltimoMantenimiento, fechaUltMantenimiento, alquileresCompletados) {
        this._nroMatricula = nroMatricula;
        this._estado = estado;
        this._tarifa = tarifa;
        this._cargoAdicional = cargoAdicional;
        this._kmDesdeUltimoMantenimiento = kmDesdeUltimoMantenimiento;
        this._fechaUltMantenimiento = fechaUltMantenimiento;
        this.alquileresCompletados = alquileresCompletados;
    }
    getNroMatricula() { return this._nroMatricula; }
    setNroMatricula(value) { this._nroMatricula = value; }
    getEstado() { return this._estado; }
    actualizarEstado(value) { this._estado = value; }
    getTarifa() { return this._tarifa; }
    setTarifa(value) { this._tarifa = value; }
    getCargoAdicional() { return this._cargoAdicional; }
    setCargoAdicional(value) { this._cargoAdicional = value; }
    getKmDesdeUltimoMantenimiento() {
        return this._kmDesdeUltimoMantenimiento;
    }
    setKmDesdeUltimoMantenimiento(value) {
        this._kmDesdeUltimoMantenimiento = value;
    }
    getFechaUltMantenimiento() {
        return this._fechaUltMantenimiento;
    }
    setFechaUltMantenimiento(value) {
        this._fechaUltMantenimiento = value;
    }
    getAlquileresCompletados() {
        return this.alquileresCompletados;
    }
    setAlquileresCompletados(value) {
        this.alquileresCompletados = value;
    }
    puedeAlquilarse(e) {
        try {
            this.actualizarEstado(e);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = Auto;
//# sourceMappingURL=Auto.js.map