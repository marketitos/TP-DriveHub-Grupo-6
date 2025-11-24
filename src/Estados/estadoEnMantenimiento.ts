import { EstadoActual } from './EstadoActual';
import { ErrorEstadoRealizarMantenimiento } from '../Errores/errorEstadoRealizarMantenimiento';
import Auto from '../Auto/Auto';
import { EstadoDisponible } from './estadoDisponible';


export class estadoEnMantenimiento implements EstadoActual {
  /**
   * Intenta verificar si el auto puede alquilarse; en mantenimiento nunca se permite.
   * @param {Auto} a - Instancia del auto.
   * @throws {ErrorEstadoRealizarMantenimiento} Siempre, el auto no puede alquilarse mientras está en mantenimiento.
   */
  puedeAlquilarse(a: Auto): void {
    throw new ErrorEstadoRealizarMantenimiento();
  }

  /**
   * Ejecutar mantenimiento adicional mientras ya está en mantenimiento no es válido.
   * @throws {ErrorEstadoRealizarMantenimiento} Siempre, ya se está realizando mantenimiento.
   */
  realizarMantenimiento(): void {
    throw new ErrorEstadoRealizarMantenimiento();
  }

  /**
   * Finalizar un alquiler en estado de mantenimiento no es una operación válida.
   * @param {number} kmRecorridos - Kilómetros recorridos (ignorado en este estado).
   * @param {Auto} a - Instancia del auto.
   * @throws {ErrorEstadoRealizarMantenimiento} Siempre, no hay alquiler activo en mantenimiento.
   */
  finalizarAlquiler(kmRecorridos: number, a: Auto): void {
    throw new ErrorEstadoRealizarMantenimiento();
  }

  /**
   * Consulta si el auto necesita mantenimiento. En este estado la operación no aplica
   * porque ya está siendo intervenido.
   * @param {Auto} a - Instancia del auto.
   * @returns {boolean} No retorna; lanza excepción.
   * @throws {ErrorEstadoRealizarMantenimiento} Siempre, la consulta no aplica en mantenimiento activo.
   */
  necesitaMantenimiento(a: Auto): boolean {
    throw new ErrorEstadoRealizarMantenimiento();
  }

  /**
   * Marca el fin del mantenimiento y devuelve el auto al estado disponible.
   * @param {Auto} a - Instancia del auto que termina su mantenimiento.
   */
  finalizarMantenimiento(a: Auto): void {
    a.actualizarEstado(new EstadoDisponible());
  }
}
