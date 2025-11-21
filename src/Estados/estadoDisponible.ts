import Auto from '../Auto/Auto';
import { EstadoActual } from './EstadoActual';
import { estadoEnAlquiler } from './estadoEnAlquiler';
import { ErrorEstadoDisponible } from '../Errores/errorEstadoDisponible';
import { estadoEnMantenimiento } from './estadoEnMantenimiento';
import { errorEstadoNoMantenimiento } from '../Errores/errorEstadoNoMantenimiento';

export class EstadoDisponible implements EstadoActual {
  puedeAlquilarse(a: Auto): void {
    a.actualizarEstado(new estadoEnAlquiler());
  }

  realizarMantenimiento(a: Auto): void {
    a.setKmDesdeUltimoMantenimiento(0);
    a.setAlquileresCompletados(0);
    a.setFechaUltMantenimiento(new Date());
  }

  finalizarAlquiler(kmRecorridos: number, a: Auto): void {
    throw new ErrorEstadoDisponible();
  }

  necesitaMantenimiento(a: Auto): boolean {
    let necesita = false;
    if (a.getKmDesdeUltimoMantenimiento() >= 10000) {
      a.actualizarEstado(new estadoEnMantenimiento());
        necesita = true;

    }
    const hoy = new Date();
    const mesesDesdeMantenimiento =
      (hoy.getTime() - a.getFechaUltMantenimiento().getTime()) /
      (1000 * 60 * 60 * 24 * 30);
    if (mesesDesdeMantenimiento >= 12) {
      a.actualizarEstado(new estadoEnMantenimiento());
        necesita = true;
    }

    if (a.getAlquileresCompletados() >= 5) {
      a.actualizarEstado(new estadoEnMantenimiento());
        necesita = true;
    }

    return necesita;
  }

  finalizarMantenimiento(a: Auto): void {
    throw new errorEstadoNoMantenimiento();
  }
}
