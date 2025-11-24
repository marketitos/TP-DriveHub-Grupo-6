import Auto from './Auto';
import Reserva from '../Reserva';
import { EstadoActual } from '../Estados/EstadoActual';

/**
 * Clase Sedan
 * Extiende de Auto y define la lógica de cargos específica para sedanes.
 */
export default class Sedan extends Auto {
    private _cargoPorKilometro: number;

    /**
     * Crea una instancia de Sedan.
     * @param {number} nroMatricula - Número de matrícula del vehículo.
     * @param {EstadoActual} estado - Estado inicial del vehículo (usar el enum ESTADO_VEHICULO del proyecto).
     * @param {number} tarifa - Tarifa diaria base del vehículo.
     * @param {number} [cargoPorKilometro=0.5] - Cargo por kilómetro (valor por defecto si no se provee).
     */
    constructor(nroMatricula: number, estado: EstadoActual, tarifa: number, cargoPorKilometro: number = 0.5, kmDesdeUltimoMantenimiento: number = 0, fechaUltMantenimiento: Date = new Date(), alquileresCompletados: number = 0) {
        super(nroMatricula, estado, tarifa, 0, kmDesdeUltimoMantenimiento, fechaUltMantenimiento, alquileresCompletados);
        this._cargoPorKilometro = cargoPorKilometro;
    }

    /**
     * Obtiene el cargo por kilómetro configurado para el sedán.
     * @returns {number} Cargo por kilómetro.
     */
    public getCargoPorKilometro(): number {
        return this._cargoPorKilometro;
    }

    /**
     * Establece el cargo por kilómetro para el sedán.
     * @param {number} value - Nuevo cargo por kilómetro.
     */
    public setCargoPorKilometro(value: number) {
        this._cargoPorKilometro = value;
    }

    /**
     * Calcula el cargo adicional para la reserva según el kilometraje.
     * Actualmente la implementación aplica un porcentaje fijo (20%) sobre el kilometraje total.
     * @param {Reserva} reserva - Reserva sobre la cual calcular el cargo.
     * @returns {number} Cargo calculado basado en km.
     */
    public aplicarCargo(reserva: Reserva): number {
        return reserva.getKilometraje() * 0.2;
    }

    /**
     * Calcula la base del costo de la reserva para este Sedan.
     * Suma la tarifa diaria multiplicada por los días más los cargos calculados.
     * @param {Reserva} reserva - Reserva para la cual se calcula la base.
     * @returns {number} Costo base calculado.
     */
    public calcularBase(reserva: Reserva): number {
        return this.getTarifa() * reserva.getDias() + this.aplicarCargo(reserva);
    }
}
