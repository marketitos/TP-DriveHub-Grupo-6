import Auto from "./Auto";
import { EstadoActual } from "./EstadoActual";
import { estadoEnAlquiler } from "./estadoEnAlquiler";

export class EstadoDisponible implements EstadoActual {

    puedeAlquilarse(a:Auto): void {
        a.puedeAlquilarse(new estadoEnAlquiler())
        
    }

}