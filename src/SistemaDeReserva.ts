import Cliente from './Utils/Cliente';
import Auto from './Auto/Auto';
import Reserva from './Reserva';
import Temporadas from './Temporadas/Temporadas';
import { ReservaCreator } from './ReservaFactory';
import { ReservaDefaultCreator } from './ReservaDefaultCreator';

export default class SistemaDeReserva {
  private _autos: Auto[];
  private _clientes: Cliente[];
  private _reservas: Reserva[];
  private _reservaCreator: ReservaCreator;

  /**
   * Crea el sistema inicializando colecciones vacías.
   * Permite inyectar una estrategia de creación de reservas personalizada.
   * @param {ReservaCreator} [reservaCreator=new ReservaDefaultCreator()] Implementación del Factory Method.
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
   * Crea una nueva reserva delegando la construcción al Factory Method configurado.
   * Reglas:
   * - Verifica que el auto pueda iniciar alquiler (invoca `puedeAlquilarse` del estado actual).
   * - Genera un identificador incremental basado en la longitud del arreglo de reservas.
   * - Agrega la reserva creada al sistema.
   * @param {Cliente} cliente - Cliente que realiza la reserva.
   * @param {Auto} auto - Vehículo a reservar.
   * @param {Date} fechaInicio - Fecha de inicio (inclusive).
   * @param {Date} fechaFin - Fecha de fin (inclusive).
   * @param {number} [kilometraje=0] - Kilometraje estimado/recorrido asociado.
   * @param {Temporadas} temporada - Temporada que ajusta la tarifa.
   * @returns {Reserva} Nueva instancia de reserva creada y almacenada.
   * @throws {Error} Propaga cualquier error del estado del auto si no puede alquilarse.
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

  /**
   * Elimina un auto por número de matrícula.
   * @param {number} nroMatricula - Matrícula del auto a eliminar.
   */
  public eliminarAuto(nroMatricula: number): void {
    this._autos = this._autos.filter(
      (a) => a.getNroMatricula() !== nroMatricula
    );
  }


  public agregarCliente(cliente: Cliente): void {
    this._clientes.push(cliente);
  }

  /**
   * Elimina un cliente según su legajo.
   * @param {number} legajo - Identificador del cliente.
   */
  public eliminarCliente(legajo: number): void {
    this._clientes = this._clientes.filter((c) => c.getLegajo() !== legajo);
  }


  public agregarReserva(reserva: Reserva): void {
    this._reservas.push(reserva);
  }

  /**
   * Elimina una reserva por su identificador.
   * @param {number} idReserva - ID de la reserva a eliminar.
   */
  public eliminarReserva(idReserva: number): void {
    this._reservas = this._reservas.filter(
      (r) => r.getIdReserva() !== idReserva
    );
  }
}
