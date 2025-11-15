"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estadoEnAlquiler = void 0;
const errorEstadoEnAlquiler_1 = require("./Errores/errorEstadoEnAlquiler");
class estadoEnAlquiler {
    puedeAlquilarse(a) {
        throw new errorEstadoEnAlquiler_1.ErrorAutoYaAlquilado();
    }
}
exports.estadoEnAlquiler = estadoEnAlquiler;
//# sourceMappingURL=estadoEnAlquiler.js.map