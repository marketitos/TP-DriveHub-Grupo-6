import Auto from './Auto';
import Reserva from '../Reserva';
import { EstadoActual } from '../Estados/EstadoActual';
            


/**
 * Clase SUV
 * Extiende de Auto y aplica cargos específicos para vehiculos tipo SUV.
 */
class SUV extends Auto {
    private _cargoFijo: number;

    /**
     * Crea una instancia de SUV.
     * @param {number} nroMatricula - Número de matrícula del vehículo.
     * @param {EstadoActual} estado - Estado inicial del vehículo (usar el enum ESTADO_VEHICULO del proyecto).
     * @param {number} tarifa - Tarifa diaria base del vehículo.
     * @param {number} cargoFijo - Cargo fijo por día aplicado a la reserva.
     */
    constructor(nroMatricula: number, estado: EstadoActual, tarifa: number, cargoFijo: number,kmDesdeUltimoMantenimiento:number, fechaUltMantenimiento:Date, alquileresCompletados:number) {
        super(nroMatricula, estado, tarifa, 0, kmDesdeUltimoMantenimiento, fechaUltMantenimiento, alquileresCompletados);
        this._cargoFijo = cargoFijo;
    }

    /**
     * Obtiene el cargo fijo por día del SUV.
     * @returns {number} Cargo fijo diario.
     */
    public getCargoFijo(): number { return this._cargoFijo; }

    /**
     * Actualiza el cargo fijo por día del SUV.
     * @param {number} value - Nuevo cargo fijo diario.
     */
    public setCargoFijo(value: number) { this._cargoFijo = value; }

    /**
     * Calcula la base del costo de la reserva para este SUV.
     * Suma la tarifa diaria multiplicada por los días más los cargos adicionales.
     * @param {Reserva} reserva - La reserva para la cual se calcula la base.
     * @returns {number} Costo base calculado.
     */
    public calcularBase(reserva: Reserva): number {
        return (this.getTarifa() * reserva.getDias()) + this.aplicarCargo(reserva);
    }

    /**
     * Calcula el cargo adicional para la reserva.
     * - Aplica un cargo fijo por día (cargoFijo * días).
     * - Si el kilometraje total de la reserva excede 500 km, aplica un cargo por km adicional (0.25 por km excedente).
     * @param {Reserva} reserva - La reserva para la cual se calculan los cargos.
     * @returns {number} Cargo adicional total.
     */
    public aplicarCargo(reserva: Reserva): number {
        let cargoFijoAdicional = reserva.getDias() * this._cargoFijo;

        if (reserva.getKilometraje() > 500) {
            cargoFijoAdicional += (reserva.getKilometraje() - 500) * 0.25;
        }

        return cargoFijoAdicional;
    }

}

export default SUV;