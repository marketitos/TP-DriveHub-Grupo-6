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
  get idReserva(): number { return this._idReserva; }
  set idReserva(value: number) { this._idReserva = value; }

  get cliente(): Cliente { return this._cliente; }
  set cliente(value: Cliente) { this._cliente = value; }

  get fechaInicio(): Date { return this._fechaInicio; }
  set fechaInicio(value: Date) { this._fechaInicio = value; }

  get fechaFin(): Date { return this._fechaFin; }
  set fechaFin(value: Date) { this._fechaFin = value; }

  get auto(): Auto { return this._auto; }
  set auto(value: Auto) { this._auto = value; }

  get kilometraje(): number { return this._kilometraje; }
  set kilometraje(value: number) { this._kilometraje = value; }

  costoTotalReserva(): number {
    return 0;
  }

  calcularDiasReserva(): number {
    return 0;
  }
}

export default Reserva;