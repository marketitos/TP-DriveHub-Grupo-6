"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auto_1 = __importDefault(require("./Auto"));
class SUV extends Auto_1.default {
    _cargoFijo;
    constructor(nroMatricula, estado, tarifa, cargoFijo, kmDesdeUltimoMantenimiento, fechaUltMantenimiento, alquileresCompletados) {
        super(nroMatricula, estado, tarifa, 0, kmDesdeUltimoMantenimiento, fechaUltMantenimiento, alquileresCompletados);
        this._cargoFijo = cargoFijo;
    }
    getCargoFijo() { return this._cargoFijo; }
    setCargoFijo(value) { this._cargoFijo = value; }
    calcularBase(reserva) {
        return (this.getTarifa() * reserva.getDias()) + this.aplicarCargo(reserva);
    }
    aplicarCargo(reserva) {
        let cargoFijoAdicional = reserva.getDias() * this._cargoFijo;
        if (reserva.getKilometraje() > 500) {
            cargoFijoAdicional += (reserva.getKilometraje() - 500) * 0.25;
        }
        return cargoFijoAdicional;
    }
}
exports.default = SUV;
//# sourceMappingURL=SUV.js.map