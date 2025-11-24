import Auto from '../Auto/Auto';
import { EstadoActual } from './EstadoActual';
import { estadoEnAlquiler } from './estadoEnAlquiler';
import { ErrorEstadoDisponible } from '../Errores/errorEstadoDisponible';
import { estadoEnMantenimiento } from './estadoEnMantenimiento';
import { errorEstadoNoMantenimiento } from '../Errores/errorEstadoNoMantenimiento';


export class EstadoDisponible implements EstadoActual {
  /**
   * Inicia un alquiler cambiando el estado del auto a `estadoEnAlquiler`.
   * @param {Auto} a - Auto que se va a alquilar.
   */
  puedeAlquilarse(a: Auto): void {
    a.actualizarEstado(new estadoEnAlquiler());
  }

  /**
   * Realiza mantenimiento preventivo: resetea kilómetros y alquileres,
   * y actualiza la fecha del último mantenimiento a la fecha actual.
   * (No cambia a estado de mantenimiento porque se asume mantenimiento express en disponibilidad.)
   * @param {Auto} a - Auto intervenido.
   */
  realizarMantenimiento(a: Auto): void {
    a.setKmDesdeUltimoMantenimiento(0);
    a.setAlquileresCompletados(0);
    a.setFechaUltMantenimiento(new Date());
  }

  /**
   * No se puede finalizar un alquiler estando disponible (no hay alquiler activo).
   * @param {number} kmRecorridos - Kilómetros hipotéticos (ignorado).
   * @param {Auto} a - Auto involucrado.
   * @throws {ErrorEstadoDisponible} Siempre, porque no hay alquiler en curso.
   */
  finalizarAlquiler(kmRecorridos: number, a: Auto): void {
    throw new ErrorEstadoDisponible();
  }

  /**
   * Evalúa si el auto debe entrar en mantenimiento según tres criterios:
   * - Kilómetros acumulados desde el último mantenimiento >= 10000
   * - Meses transcurridos desde el último mantenimiento >= 12
   * - Alquileres completados >= 5
   * Si cualquiera se cumple, actualiza el estado a `estadoEnMantenimiento` y retorna true.
   * @param {Auto} a - Auto evaluado.
   * @returns {boolean} true si se dispara mantenimiento, false en caso contrario.
   */
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

  /**
   * No se puede finalizar mantenimiento estando disponible (no hay mantenimiento en curso).
   * @param {Auto} a - Auto involucrado.
   * @throws {errorEstadoNoMantenimiento} Siempre, no hay mantenimiento activo que finalizar.
   */
  finalizarMantenimiento(a: Auto): void {
    throw new errorEstadoNoMantenimiento();
  }
}
