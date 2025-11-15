"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estadoEnMantenimiento = void 0;
const errorEstadoEnMantenimiento_1 = require("./Errores/errorEstadoEnMantenimiento");
class estadoEnMantenimiento {
    puedeAlquilarse() {
        throw new errorEstadoEnMantenimiento_1.ErrorAutoEnMantenimiento();
    }
}
exports.estadoEnMantenimiento = estadoEnMantenimiento;
//# sourceMappingURL=estadoEnMantenimiento.js.map