import Auto from './Auto';
import Reserva from './Reserva';

/**
 * Clase que representa un vehículo de tipo Sedán.
 * 
 * Hereda de la clase abstracta {@link Auto} y redefine los métodos de cálculo
 * para aplicar un cargo adicional por kilómetro recorrido.
 */

export default class Sedan extends Auto {
    private _cargoPorKilometro: number;

    /**
     * Crea un nuevo vehículo Sedán.
     * 
     * @param {number} nroMatricula - Número de matrícula del vehículo.
     * @param {any} estado - Estado actual del vehículo (por ejemplo: Disponible, EnAlquiler, etc.).
     * @param {number} tarifa - Tarifa base diaria del vehículo.
     * @param {number} [cargoPorKilometro=0.5] - Cargo adicional por kilómetro recorrido.
     */
    constructor(nroMatricula: number, estado: any, tarifa: number, cargoPorKilometro: number = 0.5) {
        super(nroMatricula, estado, tarifa);
        this._cargoPorKilometro = cargoPorKilometro;
    }

    /**
     * Obtiene el valor del cargo adicional por kilómetro.
     * @returns {number} Cargo por kilómetro recorrido.
     */
    public getCargoPorKilometro(): number {
         return this._cargoPorKilometro; 
        }

    /**
     * Asigna un nuevo valor al cargo adicional por kilómetro.
     * @param {number} value - Nuevo cargo por kilómetro.
     */
    public setCargoPorKilometro(value: number) {
         this._cargoPorKilometro = value; 
        }

    /**
     * Calcula el cargo adicional de la reserva en base al kilometraje recorrido.
     * 
     * Se aplica un recargo de $0.20 por cada kilómetro registrado durante la reserva.
     * 
     * @param {Reserva} reserva - Reserva asociada al vehículo.
     * @returns {number} Monto del cargo adicional calculado.
     */
    public aplicarCargo(reserva: Reserva): number {
        return reserva.getKilometraje()*0.2;
    }

     /**
     * Calcula el costo base total de la reserva para el vehículo Sedán.
     * 
     * Combina la tarifa diaria por la cantidad de días y el cargo adicional por kilometraje.
     * 
     * @param {Reserva} reserva - Reserva asociada al vehículo.
     * @returns {number} Costo total base del alquiler.
     */
    public calcularBase(reserva: Reserva): number {
        return this.getTarifa() * reserva.getDias() + this.aplicarCargo(reserva);
    }
}
