/**
 * Clase abstracta Temporadas
 * Define el comportamiento base para las diferentes temporadas del año.
 * Cada temporada aplica un multiplicador diferente sobre la tarifa base.
 */
abstract class Temporadas {
    private _multiplicador: number;

    /**
     * Constructor de Temporadas
     * @param {number} multiplicador - Factor multiplicador para la tarifa base
     * - Temporada Baja: 0.9 (-10%)
     * - Temporada Media: 1.0 (tarifa estándar)
     * - Temporada Alta: 1.2 (+20%)
     */
    constructor(multiplicador: number) {
        this._multiplicador = multiplicador;
    }

    /**
     * Establece el multiplicador de la temporada
     * @param {number} value - Nuevo valor del multiplicador
     */
    public setMultiplicador(value: number) { this._multiplicador = value; }

    /**
     * Obtiene el multiplicador de la temporada
     * @returns {number} Multiplicador actual
     */
    public getMultiplicador(): number { return this._multiplicador; }

    /**
     * Calcula la tarifa ajustada según la temporada
     * @param {number} tarifaBase - Tarifa base del vehículo
     * @returns {number} Tarifa ajustada por temporada
     */
    public calcularTarifaAjustada(tarifaBase: number): number {
        return tarifaBase * this._multiplicador;
    }
}

export default Temporadas