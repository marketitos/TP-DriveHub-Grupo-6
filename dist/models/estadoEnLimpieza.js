"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estadoEnLimpieza = void 0;
const estadoEnLimpieza_1 = require("./Errores/estadoEnLimpieza");
class estadoEnLimpieza {
    puedeAlquilarse(a) {
        throw new estadoEnLimpieza_1.ErrorAutoEnLimpieza();
    }
}
exports.estadoEnLimpieza = estadoEnLimpieza;
//# sourceMappingURL=estadoEnLimpieza.js.map