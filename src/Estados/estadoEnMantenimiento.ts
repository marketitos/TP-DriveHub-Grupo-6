import { EstadoActual } from './EstadoActual';
import { ErrorEstadoRealizarMantenimiento } from '../Errores/errorEstadoRealizarMantenimiento';
import Auto from '../Auto/Auto';
import { EstadoDisponible } from './estadoDisponible';

export class estadoEnMantenimiento implements EstadoActual {
  puedeAlquilarse(a: Auto): void {
    throw new ErrorEstadoRealizarMantenimiento();
  }

  realizarMantenimiento(): void {
    throw new ErrorEstadoRealizarMantenimiento();
  }

  finalizarAlquiler(kmRecorridos: number, a: Auto): void {
    throw new ErrorEstadoRealizarMantenimiento();
  }

  necesitaMantenimiento(a: Auto): boolean {
    throw new ErrorEstadoRealizarMantenimiento();
  }

  finalizarMantenimiento(a: Auto): void {
    a.actualizarEstado(new EstadoDisponible());
  }
}
