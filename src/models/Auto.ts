import ESTADO_VEHICULO from '../enums/ESTADO_VEHICULO';
import Reserva from './Reserva';

/**
 * Clase abstracta que representa un vehículo dentro del sistema de reservas.
 * 
 * Define los atributos y comportamientos comunes a todos los tipos de autos.
 * Las clases hijas deben implementar los métodos abstractos `aplicarCargo` y `calcularBase`.
 * 
 * @abstract
 */

abstract class Auto {
    private _nroMatricula: number;
    private _estado: ESTADO_VEHICULO;
    private _tarifa: number;
    private _cargoAdicional: number;
    
    /**
     * Crea una nueva instancia de un vehículo.
     * 
     * @param {number} nroMatricula - Número de matrícula del auto.
     * @param {ESTADO_VEHICULO} estado - Estado actual del vehículo.
     * @param {number} tarifa - Tarifa base diaria del vehículo.
     * @param {number} [cargoAdicional=0] - Cargo adicional opcional aplicado al costo total.
     */
    constructor(nroMatricula: number, estado: ESTADO_VEHICULO, tarifa: number, cargoAdicional: number = 0) {
        this._nroMatricula = nroMatricula;
        this._estado = estado;
        this._tarifa = tarifa;
        this._cargoAdicional = cargoAdicional;
    }

    // Getters y Setters
    /** @returns {number} Retorna el número de matrícula del auto. */
    public getNroMatricula(): number { return this._nroMatricula; }

    /** @param {number} value - Asigna un nuevo número de matrícula. */
    public setNroMatricula(value: number) { this._nroMatricula = value; }

    /** @returns {ESTADO_VEHICULO} Retorna el estado actual del vehículo. */
    public getEstado(): ESTADO_VEHICULO { return this._estado; }

     /** 
     * Actualiza el estado actual del vehículo.
     * @param {ESTADO_VEHICULO} value - Nuevo estado del vehículo.
     */
    public actualizarEstado(value: ESTADO_VEHICULO) { this._estado = value; }

    /** @returns {number} Retorna la tarifa base diaria del vehículo. */
    public getTarifa(): number { return this._tarifa; }

    /** @param {number} value - Asigna una nueva tarifa base diaria. */
    public setTarifa(value: number) { this._tarifa = value; }
    
    /** @returns {number} Retorna el cargo adicional del vehículo. */
    public getCargoAdicional(): number { return this._cargoAdicional; }


     /** @param {number} value - Asigna un nuevo cargo adicional. */
    public setCargoAdicional(value: number) { this._cargoAdicional = value; }

     /**
     * Calcula el cargo adicional que se debe aplicar por cada km recorrido extra a cada auto
     * 
     * @abstract
     * @param {Reserva} reserva - Reserva asociada al vehículo.
     * @returns {number} Cargo adicional calculado.
     */
    abstract aplicarCargo(reserva:Reserva): number;

    /**
     * Calcula el costo base total de cada auto
     * 
     * @abstract
     * @param {Reserva} reserva - Reserva asociada al vehículo.
     * @returns {number} Costo base total calculado.
     */
    abstract calcularBase(reserva: Reserva): number;

}

export default Auto;