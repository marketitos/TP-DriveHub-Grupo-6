import Auto from '../Auto/Auto';
import { EstadoActual } from './EstadoActual';
import { ErrorAutoYaAlquilado } from '../Errores/errorEstadoEnAlquiler';
import { EstadoDisponible } from './estadoDisponible';
import { errorEstadoNoMantenimiento } from '../Errores/errorEstadoNoMantenimiento';

export class estadoEnAlquiler implements EstadoActual {
  puedeAlquilarse(a: Auto): void {
    throw new ErrorAutoYaAlquilado();
  }

  realizarMantenimiento(): void {
    throw new errorEstadoNoMantenimiento();
  }
  
  finalizarAlquiler(kmRecorridos: number, a: Auto): void {
    a.setKmDesdeUltimoMantenimiento(a.getKmDesdeUltimoMantenimiento() + kmRecorridos);
    a.setAlquileresCompletados(a.getAlquileresCompletados() + 1);
    a.actualizarEstado(new EstadoDisponible());
  }

  necesitaMantenimiento(a: Auto): boolean {
    throw new errorEstadoNoMantenimiento();

  }

  finalizarMantenimiento(a: Auto): void {
    throw new errorEstadoNoMantenimiento();
  }
}
