"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorAutoYaAlquilado = void 0;
class ErrorAutoYaAlquilado extends Error {
    constructor() {
        super("El auto ya está alquilado y no puede volver a alquilarse.");
        this.name = "ErrorAutoYaAlquilado";
    }
}
exports.ErrorAutoYaAlquilado = ErrorAutoYaAlquilado;
//# sourceMappingURL=errorEstadoEnAlquiler.js.map