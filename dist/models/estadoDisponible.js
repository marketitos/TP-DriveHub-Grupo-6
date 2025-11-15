"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoDisponible = void 0;
const estadoEnAlquiler_1 = require("./estadoEnAlquiler");
class EstadoDisponible {
    puedeAlquilarse(a) {
        a.puedeAlquilarse(new estadoEnAlquiler_1.estadoEnAlquiler());
    }
}
exports.EstadoDisponible = EstadoDisponible;
//# sourceMappingURL=estadoDisponible.js.map