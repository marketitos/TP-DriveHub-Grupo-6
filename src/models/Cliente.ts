import Reserva from './Reserva';

class Cliente {
    private _legajo: number;
    private _nroReserva: number;
    private _nombre: string;
    private _reservas: Reserva[];

    constructor(legajo: number, nombre: string) {
        this._legajo = legajo;
        this._nombre = nombre;
        this._nroReserva = 0;
        this._reservas = [];
    }

    // Getters y Setters
    public getLegajo(): number { return this._legajo; }
    public setLegajo(value: number) { this._legajo = value; }

    public getNroReserva(): number { return this._nroReserva; }
    public setNroReserva(value: number) { this._nroReserva = value; }

    public getNombre(): string { return this._nombre; }
    public setNombre(value: string) { this._nombre = value; }

    public getReservas(): Reserva[] { return this._reservas; }

    public agregarReserva(reserva: Reserva): void {
        this._reservas.push(reserva);
        this._nroReserva++;
    }
}

export default Cliente;