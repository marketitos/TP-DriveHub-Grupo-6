import ESTADO_VEHICULO from '../enums/ESTADO_VEHICULO';
import Reserva from './Reserva';

abstract class Auto {
    private _nroMatricula: number;
    private _estado: ESTADO_VEHICULO;
    private _tarifa: number;
    private _cargoAdicional: number;

    constructor(nroMatricula: number, estado: ESTADO_VEHICULO, tarifa: number, cargoAdicional: number = 0) {
        this._nroMatricula = nroMatricula;
        this._estado = estado;
        this._tarifa = tarifa;
        this._cargoAdicional = cargoAdicional;
    }

    // Getters y Setters
    get nroMatricula(): number { return this._nroMatricula; }
    set nroMatricula(value: number) { this._nroMatricula = value; }

    get estado(): ESTADO_VEHICULO { return this._estado; }
    set estado(value: ESTADO_VEHICULO) { this._estado = value; }

    get tarifa(): number { return this._tarifa; }
    set tarifa(value: number) { this._tarifa = value; }

    get cargoAdicional(): number { return this._cargoAdicional; }
    set cargoAdicional(value: number) { this._cargoAdicional = value; }

    // Métodos abstractos
    abstract aplicarCargo(dias: number): number;
    abstract calcularBase(reserva: Reserva): number;

    actualizarEstado(): void {
        console.log(`Estado del auto ${this._nroMatricula} actualizado: ${this._estado}`);
    }
}

export default Auto;