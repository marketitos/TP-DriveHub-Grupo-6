import Cliente from './Utils/Cliente';
import Auto from './Auto/Auto';
import Reserva from './Reserva';
import Temporadas from './Temporadas/Temporadas';
import { ReservaCreator } from './ReservaFactory';

export class ReservaDefaultCreator implements ReservaCreator {
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