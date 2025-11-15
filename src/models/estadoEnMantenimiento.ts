import { EstadoActual } from "./EstadoActual";
import { ErrorAutoEnMantenimiento } from "./Errores/errorEstadoEnMantenimiento";

export class estadoEnMantenimiento implements EstadoActual{

    puedeAlquilarse(): void {
        throw new ErrorAutoEnMantenimiento();
    }
}