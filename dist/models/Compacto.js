"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auto_1 = __importDefault(require("./Auto"));
class Compacto extends Auto_1.default {
    constructor(nroMatricula, estado, tarifa) {
        super(nroMatricula, estado, tarifa, 0, 0, new Date(), 0);
    }
    aplicarCargo(reserva) {
        let kmpordia = 100 * reserva.getDias();
        let cargoAdicion = 0;
        if (reserva.getKilometraje() > kmpordia) {
            cargoAdicion = (reserva.getKilometraje() - kmpordia) * 0.15;
        }
        return cargoAdicion;
    }
    calcularBase(reserva) {
        return (this.getTarifa() * reserva.getDias() + this.aplicarCargo(reserva));
    }
}
exports.default = Compacto;
//# sourceMappingURL=Compacto.js.map