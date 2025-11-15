import Auto from "./Auto";
import { EstadoActual } from "./EstadoActual";
import { ErrorAutoYaAlquilado } from "./Errores/errorEstadoEnAlquiler";

export class estadoEnAlquiler implements EstadoActual{
    
    puedeAlquilarse(a: Auto): void {
        throw new ErrorAutoYaAlquilado();
    }

}