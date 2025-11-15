"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorAutoEnLimpieza = void 0;
class ErrorAutoEnLimpieza extends Error {
    constructor() {
        super("El auto está en limpieza y no puede alquilarse.");
        this.name = "ErrorAutoEnLimpieza";
    }
}
exports.ErrorAutoEnLimpieza = ErrorAutoEnLimpieza;
//# sourceMappingURL=estadoEnLimpieza.js.map