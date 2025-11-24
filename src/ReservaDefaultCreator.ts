import Cliente from './Utils/Cliente';
import Auto from './Auto/Auto';
import Reserva from './Reserva';
import Temporadas from './Temporadas/Temporadas';
import { ReservaCreator } from './ReservaFactory';

/**
 * Implementación por defecto del Factory Method para crear reservas.
 * Centraliza la construcción de `Reserva` permitiendo intercambiar estrategias
 * sin acoplar al cliente a la clase concreta.
 */
export class ReservaDefaultCreator implements ReservaCreator {
  /**
   * Crea una nueva reserva con los datos proporcionados.
   * @param {number} idReserva - Identificador único de la reserva.
   * @param {Cliente} cliente - Cliente que realiza la reserva.
   * @param {Date} fechaInicio - Fecha de inicio (inclusive).
   * @param {Date} fechaFin - Fecha de fin (inclusive).
   * @param {Auto} auto - Vehículo reservado.
   * @param {number} kilometraje - Kilómetros recorridos durante la reserva.
   * @param {Temporadas} temporada - Temporada que ajusta la tarifa.
   * @returns {Reserva} Instancia de la reserva creada.
   */
  crearReserva(
    idReserva: number,
    cliente: Cliente,
    fechaInicio: Date,
    fechaFin: Date,
    auto: Auto,
    kilometraje: number,
    temporada: Temporadas
  ): Reserva {
    return new Reserva(
      idReserva,
      cliente,
      fechaInicio,
      fechaFin,
      auto,
      kilometraje,
      temporada
    );
  }
}