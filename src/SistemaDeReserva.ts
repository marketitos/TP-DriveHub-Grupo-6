import Cliente from './Utils/Cliente';
import Auto from './Auto/Auto';
import Reserva from './Reserva';
import Temporadas from './Temporadas/Temporadas';
import { ReservaCreator } from './ReservaFactory';
import { ReservaDefaultCreator } from './ReservaDefaultCreator';

/**
 * Clase principal del sistema de reservas de autos
 * Gestiona la administración de autos, clientes y reservas.
 */
export default class SistemaDeReserva {
  private _autos: Auto[];
  private _clientes: Cliente[];
  private _reservas: Reserva[];
  private _reservaCreator: ReservaCreator;

  /**
   * @param reservaCreator (opcional) Implementación del Factory Method.
   */
  constructor(reservaCreator: ReservaCreator = new ReservaDefaultCreator()) {
    this._autos = [];
    this._clientes = [];
    this._reservas = [];
    this._reservaCreator = reservaCreator;
  }

  public setReservaCreator(creator: ReservaCreator): void {
    this._reservaCreator = creator;
  }

  public getAutos(): Auto[] {
    return this._autos;
  }
  public getClientes(): Cliente[] {
    return this._clientes;
  }
  public getReservas(): Reserva[] {
    return this._reservas;
  }

  /**
   * Crea una nueva reserva delegando la construcción al Factory Method.
   */
  public crearReserva(
    cliente: Cliente,
    auto: Auto,
    fechaInicio: Date,
    fechaFin: Date,
    kilometraje: number = 0,
    temporada: Temporadas
  ): Reserva {
    auto.getEstado().puedeAlquilarse(auto);

    const nuevaReserva = this._reservaCreator.crearReserva(
      this._reservas.length + 1,
      cliente,
      fechaInicio,
      fechaFin,
      auto,
      kilometraje,
      temporada
    );

    this._reservas.push(nuevaReserva);
    return nuevaReserva;
  }

  public agregarAuto(auto: Auto): void {
    this._autos.push(auto);
  }

  public eliminarAuto(nroMatricula: number): void {
    this._autos = this._autos.filter(
      (a) => a.getNroMatricula() !== nroMatricula
    );
  }

  public agregarCliente(cliente: Cliente): void {
    this._clientes.push(cliente);
  }

  public eliminarCliente(legajo: number): void {
    this._clientes = this._clientes.filter((c) => c.getLegajo() !== legajo);
  }

  public agregarReserva(reserva: Reserva): void {
    this._reservas.push(reserva);
  }

  public eliminarReserva(idReserva: number): void {
    this._reservas = this._reservas.filter(
      (r) => r.getIdReserva() !== idReserva
    );
  }
}
