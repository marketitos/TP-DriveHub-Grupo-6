import Temporadas from "./Temporadas";

/**
 * Clase Alta - Temporada Alta
 * Aplica un recargo del 20% sobre la tarifa base diaria.
 * Multiplicador: 1.2
 */
class Alta extends Temporadas {

    constructor() {
        super(1.2); // +20% sobre la tarifa base
    }
}

export default Alta;