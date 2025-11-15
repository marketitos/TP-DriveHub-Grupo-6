"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auto_1 = __importDefault(require("./Auto"));
class Sedan extends Auto_1.default {
    _cargoPorKilometro;
    constructor(nroMatricula, estado, tarifa, cargoPorKilometro = 0.5, kmDesdeUltimoMantenimiento = 0, fechaUltMantenimiento = new Date(), alquileresCompletados = 0) {
        super(nroMatricula, estado, tarifa, 0, kmDesdeUltimoMantenimiento, fechaUltMantenimiento, alquileresCompletados);
        this._cargoPorKilometro = cargoPorKilometro;
    }
    getCargoPorKilometro() {
        return this._cargoPorKilometro;
    }
    setCargoPorKilometro(value) {
        this._cargoPorKilometro = value;
    }
    aplicarCargo(reserva) {
        return reserva.getKilometraje() * 0.2;
    }
    calcularBase(reserva) {
        return this.getTarifa() * reserva.getDias() + this.aplicarCargo(reserva);
    }
}
exports.default = Sedan;
//# sourceMappingURL=Sedan.js.map