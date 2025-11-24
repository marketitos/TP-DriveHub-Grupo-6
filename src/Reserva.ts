 import Auto from './Auto/Auto';
import Cliente from './Utils/Cliente';
import Temporadas from './Temporadas/Temporadas';
import { estadoEnMantenimiento } from './Estados/estadoEnMantenimiento';

class Reserva {
  private _idReserva: number;
  private _cliente: Cliente;
  private _fechaInicio: Date;
  private _fechaFin: Date;
  private _auto: Auto;
  private _kilometraje: number;
  private _temporada: Temporadas;

  /**
   * Crea una instancia de Reserva.
   * @param {number} idReserva - Identificador único de la reserva.
   * @param {Cliente} cliente - Cliente que realiza la reserva.
   * @param {Date} fechaInicio - Fecha de inicio (inclusive).
   * @param {Date} fechaFin - Fecha de fin (inclusive).
   * @param {Auto} auto - Vehículo reservado.
   * @param {number} kilometraje - Kilómetros recorridos durante la reserva.
   * @param {Temporadas} temporada - Temporada que ajusta la tarifa.
   */
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

  public getIdReserva(): number {
    return this._idReserva;
  }
  public setIdReserva(value: number) {
    this._idReserva = value;
  }

  public getCliente(): Cliente {
    return this._cliente;
  }
  public setCliente(value: Cliente) {
    this._cliente = value;
  }

  public getFechaInicio(): Date {
    return this._fechaInicio;
  }
  public setFechaInicio(value: Date) {
    this._fechaInicio = value;
  }

  public getFechaFin(): Date {
    return this._fechaFin;
  }
  public setFechaFin(value: Date) {
    this._fechaFin = value;
  }

  public getAuto(): Auto {
    return this._auto;
  }
  public setAuto(value: Auto) {
    this._auto = value;
  }

  public getKilometraje(): number {
    return this._kilometraje;
  }
  public setKilometraje(value: number) {
    this._kilometraje = value;
  }

  public getTemporada(): Temporadas {
    return this._temporada;
  }
  public setTemporada(value: Temporadas) {
    this._temporada = value;
  }

  /**
   * Calcula el costo total de la reserva:
   * 1. Ajusta la tarifa del auto según la temporada.
   * 2. Delegando en el vehículo (incluye cargos variables).
   * @returns {number} Costo total final.
   */
  public costoTotalReserva(): number {
    const tarifaAjustada = this.obtenerTarifaDiaria();
    this._auto.setTarifa(tarifaAjustada);
    const costoTotal = this._auto.calcularBase(this);
    return costoTotal;
  }

  /**
   * Calcula la cantidad de días de la reserva, incluyendo ambos extremos.
   * Si inicio == fin -> retorna 1.
   * @returns {number} Días totales (inclusive).
   */
  public getDias(): number {
    const diferenciaMs = this._fechaFin.getTime() - this._fechaInicio.getTime();
    return diferenciaMs / (1000 * 60 * 60 * 24) + 1;
  }

  /**
   * Obtiene la tarifa diaria ajustada por la temporada.
   * @returns {number} Tarifa diaria ajustada.
   */
  public obtenerTarifaDiaria(): number {
    return this._temporada.calcularTarifaAjustada(this._auto.getTarifa());
  }

  /**
   * Finaliza la reserva:
   * - Actualiza métricas del auto con el kilometraje recorrido.
   * - Verifica necesidad de mantenimiento; si aplica cambia a estado en mantenimiento.
   * @returns {void}
   */
  public finalizarReserva(): void {
    this._auto.finalizarAlquiler(this._kilometraje);
    if (this._auto.necesitaMantenimiento()) {
      this._auto.actualizarEstado(new estadoEnMantenimiento());
    }
  }
}

export default Reserva;
