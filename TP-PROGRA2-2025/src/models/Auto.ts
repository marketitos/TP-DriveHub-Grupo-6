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
    public getNroMatricula(): number { return this._nroMatricula; }
    public setNroMatricula(value: number) { this._nroMatricula = value; }

    public getEstado(): ESTADO_VEHICULO { return this._estado; }
    public actualizarEstado(value: ESTADO_VEHICULO) { this._estado = value; }

    public getTarifa(): number { return this._tarifa; }
    public setTarifa(value: number) { this._tarifa = value; }

    public getCargoAdicional(): number { return this._cargoAdicional; }
    public setCargoAdicional(value: number) { this._cargoAdicional = value; }

    // Métodos abstractos
    abstract aplicarCargo(reserva:Reserva): number;
    abstract calcularBase(reserva: Reserva): number;

}

export default Auto;