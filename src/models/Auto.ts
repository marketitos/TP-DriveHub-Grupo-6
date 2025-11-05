import ESTADO_VEHICULO from '../enums/ESTADO_VEHICULO';
import Reserva from './Reserva';

/**
 * Clase abstracta Auto
 * Define la estructura base de un vehículo del sistema y los métodos que
 * deben implementar las subclases concretas (Compacto, Sedan, SUV, etc.).
 */
abstract class Auto {
    private _nroMatricula: number;
    private _estado: ESTADO_VEHICULO;
    private _tarifa: number;
    private _cargoAdicional: number;

    /**
     * Crea una instancia base de Auto.
     * @param {number} nroMatricula - Número de matrícula del vehículo.
     * @param {ESTADO_VEHICULO} estado - Estado inicial del vehículo (usar enum `ESTADO_VEHICULO`).
     * @param {number} tarifa - Tarifa diaria base.
     * @param {number} [cargoAdicional=0] - Cargo adicional por defecto.
     */
    constructor(nroMatricula: number, estado: ESTADO_VEHICULO, tarifa: number, cargoAdicional: number = 0) {
        this._nroMatricula = nroMatricula;
        this._estado = estado;
        this._tarifa = tarifa;
        this._cargoAdicional = cargoAdicional;
    }

    // Getters y Setters
    /**
     * Obtiene el número de matrícula.
     * @returns {number}
     */
    public getNroMatricula(): number { return this._nroMatricula; }

    /**
     * Establece el número de matrícula.
     * @param {number} value
     */
    public setNroMatricula(value: number) { this._nroMatricula = value; }

    /**
     * Obtiene el estado actual del vehículo.
     * @returns {ESTADO_VEHICULO}
     */
    public getEstado(): ESTADO_VEHICULO { return this._estado; }

    /**
     * Actualiza el estado del vehículo.
     * @param {ESTADO_VEHICULO} value
     */
    public actualizarEstado(value: ESTADO_VEHICULO) { this._estado = value; }

    /**
     * Obtiene la tarifa diaria base del vehículo.
     * @returns {number}
     */
    public getTarifa(): number { return this._tarifa; }

    /**
     * Establece la tarifa diaria base del vehículo.
     * @param {number} value
     */
    public setTarifa(value: number) { this._tarifa = value; }

    /**
     * Obtiene el cargo adicional configurado para el vehículo.
     * @returns {number}
     */
    public getCargoAdicional(): number { return this._cargoAdicional; }

    /**
     * Establece el cargo adicional del vehículo.
     * @param {number} value
     */
    public setCargoAdicional(value: number) { this._cargoAdicional = value; }

    // Métodos abstractos que deben implementar las subclases
    /**
     * Calcula los cargos adicionales aplicables a una reserva concreta.
     * @param {Reserva} reserva - Reserva a evaluar.
     * @returns {number} Monto de cargos adicionales.
     */
    abstract aplicarCargo(reserva: Reserva): number;

    /**
     * Calcula la base del costo de la reserva (tarifa diaria * días + cargos adicionales).
     * @param {Reserva} reserva - Reserva a evaluar.
     * @returns {number} Costo base calculado.
     */
    abstract calcularBase(reserva: Reserva): number;

}

export default Auto;