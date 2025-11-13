import { EstadoActual } from "./EstadoActual";

export class estadoEnMantenimiento implements EstadoActual{

    puedeAlquilarse(): void {
        throw new ErrorAutoEnMantenimiento();
    }
}