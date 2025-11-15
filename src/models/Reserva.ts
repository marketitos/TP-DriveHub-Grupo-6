import Auto  from './Auto';
import Cliente  from './Cliente';
import Temporadas from './Temporadas';

class Reserva {
  // Propiedades privadas
  private _idReserva: number;
  private _cliente: Cliente;
  private _fechaInicio: Date;
  private _fechaFin: Date;
  private _auto: Auto;
  private _kilometraje: number;
  private _temporada: Temporadas;

  // Constructor
  constructor(
    idReserva: number,
    cliente: Cliente,
    fechaInicio: Date,
    fechaFin: Date,
    auto: Auto,
    kilometraje: number,
    temporada: Temporadas
  ) {
    this._idReserva = idReserva;
    this._cliente = cliente;
    this._fechaInicio = fechaInicio;
    this._fechaFin = fechaFin;
    this._auto = auto;
    this._kilometraje = kilometraje;
    this._temporada = temporada;
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

  public getTemporada(): Temporadas { return this._temporada; }
  public setTemporada(value: Temporadas) { this._temporada = value; }

  /**
   * Calcula el costo total de la reserva aplicando:
   * 1. La tarifa base del vehículo ajustada por temporada
   * 2. Los cargos adicionales específicos del tipo de vehículo
   * @returns {number} Costo total de la reserva
   */
  public costoTotalReserva(): number {
      const tarifaBase = this._auto.getTarifa();
      const tarifaAjustada = this._temporada.calcularTarifaAjustada(tarifaBase);
      
      const tarifaOriginal = this._auto.getTarifa();
      
      this._auto.setTarifa(tarifaAjustada);
      
      const costoTotal = this._auto.calcularBase(this);
      
      this._auto.setTarifa(tarifaOriginal);
    
    return costoTotal;
  }

  /**
   * Calcula la cantidad de días de la reserva
   * @returns {number} Número de días de la reserva (incluye el día de inicio)
   */
  public getDias():number{
    let diferenciaDias= this._fechaFin.getTime() - this._fechaInicio.getTime()
    return (diferenciaDias / (1000 * 60 * 60 * 24)) + 1;
  }

  /**
   * Obtiene la tarifa diaria ajustada por temporada
   * @returns {number} Tarifa diaria del vehículo ajustada según la temporada
   */
  public obtenerTarifaDiaria():number{
    return this._temporada.calcularTarifaAjustada(this._auto.getTarifa());
  }
}

export default Reserva;