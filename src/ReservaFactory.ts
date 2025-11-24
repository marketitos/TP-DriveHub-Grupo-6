import Cliente from './Utils/Cliente';
import Auto from './Auto/Auto';
import Reserva from './Reserva';
import Temporadas from './Temporadas/Temporadas';

/**
 * Interfaz del Factory Method para crear reservas.
 */
export interface ReservaCreator {
  crearReserva(
    idReserva: number,
    cliente: Cliente,
    fechaInicio: Date,
    fechaFin: Date,
    auto: Auto,
    kilometraje: number,
    temporada: Temporadas
  ): Reserva;
}
