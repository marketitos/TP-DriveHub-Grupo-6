import Auto  from './Auto';
import Cliente  from './Cliente';

class Reserva {
  // Propiedades privadas
  private _idReserva: number;
  private _cliente: Cliente;
  private _fechaInicio: Date;
  private _fechaFin: Date;
  private _auto: Auto;
  private _kilometraje: number;

  // Constructor
  constructor(
    idReserva: number,
    cliente: Cliente,
    fechaInicio: Date,
    fechaFin: Date,
    auto: Auto,
    kilometraje: number
  ) {
    this._idReserva = idReserva;
    this._cliente = cliente;
    this._fechaInicio = fechaInicio;
    this._fechaFin = fechaFin;
    this._auto = auto;
    this._kilometraje = kilometraje;
  }

  // Getters y Setters
  public getIdReserva(): number { return this._idReserva; }
  public setIdReserva(value: number) { this._idReserva = value; }

  public getCliente(): Cliente { return this._cliente; }
  public setCliente(value: Cliente) { this._cliente = value; }

  public getFechaInicio(): Date { return this._fechaInicio; }
  public setFechaInicio(value: Date) { this._fechaInicio = value; }

  public getFechaFin(): Date { return this._fechaFin; }
  public setFechaFin(value: Date) { this._fechaFin = value; }

  public getAuto(): Auto { return this._auto; }
  public setAuto(value: Auto) { this._auto = value; }

  public getKilometraje(): number { return this._kilometraje; }
  public setKilometraje(value: number) { this._kilometraje = value; }

  public costoTotalReserva(): number {
    return 0;
  }

  public getDias(){
    let diferenciaDias=this._fechaInicio.getTime() - this._fechaFin.getTime()
    return (diferenciaDias / (1000 * 60 * 60 * 24)) + 1;
  }
}

export default Reserva;