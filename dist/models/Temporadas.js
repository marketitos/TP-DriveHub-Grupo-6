"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Temporadas {
    _multiplicador;
    constructor(multiplicador) {
        this._multiplicador = multiplicador;
    }
    setMultiplicador(value) { this._multiplicador = value; }
    getMultiplicador() { return this._multiplicador; }
    calcularTarifaAjustada(tarifaBase) {
        return tarifaBase * this._multiplicador;
    }
}
exports.default = Temporadas;
//# sourceMappingURL=Temporadas.js.map