"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorAutoEnMantenimiento = void 0;
class ErrorAutoEnMantenimiento extends Error {
    constructor() {
        super("El auto está en mantenimiento y no puede alquilarse.");
        this.name = "ErrorAutoEnMantenimiento";
    }
}
exports.ErrorAutoEnMantenimiento = ErrorAutoEnMantenimiento;
//# sourceMappingURL=errorEstadoEnMantenimiento.js.map