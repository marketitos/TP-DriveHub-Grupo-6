import Cliente from './Cliente';
import Auto from './Auto';
import Reserva from './Reserva';

class SistemaDeReserva {
    private _autos: Auto[];
    private _clientes: Cliente[];
    private _reservas: Reserva[];

    constructor() {
        this._autos = [];
        this._clientes = [];
        this._reservas = [];
    }

    get autos(): Auto[] { return this._autos; }
    get clientes(): Cliente[] { return this._clientes; }
    get reservas(): Reserva[] { return this._reservas; }

    crearReserva(): void {
        
    }

    verificarDisponibilidad(): boolean {
        return false;
    }

    agregarAuto(auto: Auto): void {
        this._autos.push(auto);
    }

    eliminarAuto(nroMatricula: number): void {
        this._autos = this._autos.filter(auto => auto.nroMatricula !== nroMatricula);
    }

    agregarCliente(cliente: Cliente): void {
        this._clientes.push(cliente);
    }

    eliminarCliente(legajo: number): void {
        this._clientes = this._clientes.filter(cliente => cliente.legajo !== legajo);
    }

    agregarReserva(reserva: Reserva): void {
        this._reservas.push(reserva);
    }

    eliminarReserva(idReserva: number): void {
        this._reservas = this._reservas.filter(reserva => reserva.idReserva !== idReserva);
    }
}

export default SistemaDeReserva;