import Auto from "./Auto";
import { EstadoActual } from "./EstadoActual";

export class estadoEnLimpieza implements EstadoActual{
    
    puedeAlquilarse(a: Auto): void {
        throw new ErrorAutoEnLimpieza();
    }
}