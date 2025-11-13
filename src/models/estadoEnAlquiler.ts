import Auto from "./Auto";
import { EstadoActual } from "./EstadoActual";

export class estadoEnAlquiler implements EstadoActual{
    
    puedeAlquilarse(a: Auto): void {
        throw new ErrorAutoYaAlquilado();
    }

}