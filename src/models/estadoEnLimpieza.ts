import Auto from "./Auto";
import { EstadoActual } from "./EstadoActual";
import { ErrorAutoEnLimpieza } from "./Errores/estadoEnLimpieza";

export class estadoEnLimpieza implements EstadoActual{
    
    puedeAlquilarse(a: Auto): void {
        throw new ErrorAutoEnLimpieza();
    }
}