import Temporadas from "./Temporadas";

/**
 * Clase Baja - Temporada Baja
 * Aplica un descuento del 10% sobre la tarifa base diaria.
 * Multiplicador: 0.9
 */
class Baja extends Temporadas {

    constructor() {
        super(0.9); // -10% sobre la tarifa base
    }
}

export default Baja;