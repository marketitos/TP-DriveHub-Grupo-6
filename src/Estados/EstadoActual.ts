import Auto from "../Auto/Auto";

export interface EstadoActual {
    puedeAlquilarse(a:Auto):void;
    necesitaMantenimiento(a: Auto): boolean;
    finalizarAlquiler(kmRecorridos: number, a: Auto): void;
    realizarMantenimiento(a: Auto): void;
    finalizarMantenimiento(a: Auto): void;
}