import Temporadas from "./Temporadas";

/**
 * Clase Media - Temporada Media
 * Mantiene la tarifa base diaria sin modificaciones.
 * Multiplicador: 1.0
 */
class Media extends Temporadas {

    constructor() {
        super(1); // Tarifa base estándar sin cambios
    }
}

export default Media;