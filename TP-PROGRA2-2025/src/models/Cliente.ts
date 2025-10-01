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
    get legajo(): number { return this._legajo; }
    set legajo(value: number) { this._legajo = value; }

    get nroReserva(): number { return this._nroReserva; }
    set nroReserva(value: number) { this._nroReserva = value; }

    get nombre(): string { return this._nombre; }
    set nombre(value: string) { this._nombre = value; }

    get reservas(): Reserva[] { return this._reservas; }

    agregarReserva(reserva: Reserva): void {
        this._reservas.push(reserva);
        this._nroReserva++;
    }
}

export default Cliente;