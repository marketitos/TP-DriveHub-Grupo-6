import Auto from '../Auto/Auto';
import { EstadoActual } from './EstadoActual';
import { ErrorAutoYaAlquilado } from '../Errores/errorEstadoEnAlquiler';
import { EstadoDisponible } from './estadoDisponible';
import { errorEstadoNoMantenimiento } from '../Errores/errorEstadoNoMantenimiento';


export class estadoEnAlquiler implements EstadoActual {
  /**
   * Verifica si el auto puede alquilarse; estando en alquiler nunca es posible.
   * @param {Auto} a - Auto que se intenta alquilar.
   * @throws {ErrorAutoYaAlquilado} Siempre, el auto ya está alquilado.
   */
  puedeAlquilarse(a: Auto): void {
    throw new ErrorAutoYaAlquilado();
  }

  /**
   * Intenta iniciar mantenimiento mientras el auto está alquilado.
   * @throws {errorEstadoNoMantenimiento} Siempre, no puede realizarse mantenimiento durante el alquiler.
   */
  realizarMantenimiento(): void {
    throw new errorEstadoNoMantenimiento();
  }
  
  /**
   * Finaliza el alquiler, actualizando kilómetros recorridos y conteo de alquileres completados.
   * Luego el auto vuelve al estado disponible.
   * @param {number} kmRecorridos - Kilómetros recorridos durante este alquiler.
   * @param {Auto} a - Auto cuyo alquiler se está finalizando.
   */
  finalizarAlquiler(kmRecorridos: number, a: Auto): void {
    a.setKmDesdeUltimoMantenimiento(a.getKmDesdeUltimoMantenimiento() + kmRecorridos);
    a.setAlquileresCompletados(a.getAlquileresCompletados() + 1);
    a.actualizarEstado(new EstadoDisponible());
  }

  /**
   * Consulta si el auto necesita mantenimiento. En este estado la consulta no aplica.
   * @param {Auto} a - Auto consultado.
   * @returns {boolean} No retorna; siempre lanza excepción.
   * @throws {errorEstadoNoMantenimiento} Siempre, la verificación se hace fuera del estado de alquiler.
   */
  necesitaMantenimiento(a: Auto): boolean {
    throw new errorEstadoNoMantenimiento();
  }

  /**
   * Finalizar mantenimiento en estado de alquiler no es válido.
   * @param {Auto} a - Auto involucrado.
   * @throws {errorEstadoNoMantenimiento} Siempre, no hay mantenimiento activo mientras está alquilado.
   */
  finalizarMantenimiento(a: Auto): void {
    throw new errorEstadoNoMantenimiento();
  }
}
