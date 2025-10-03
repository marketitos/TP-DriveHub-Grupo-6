import Cliente from './Cliente';
import Auto from './Auto';
import Reserva from './Reserva';

export default class SistemaDeReserva {
    private _autos: Auto[];
    private _clientes: Cliente[];
    private _reservas: Reserva[];

    constructor() {
        this._autos = [];
        this._clientes = [];
        this._reservas = [];
    }

    public getAutos(): Auto[] { 
        return this._autos; 
    }
    public getClientes(): Cliente[] {
         return this._clientes; 
        }
    public getReservas(): Reserva[] {
         return this._reservas; 
        }

    public crearReserva(): void {
        
    }

    public verificarDisponibilidad(): boolean {
        return false;
    }

    public agregarAuto(auto: Auto): void {
        this._autos.push(auto);
    }

    public eliminarAuto(nroMatricula: number): void {
        this._autos = this._autos.filter(auto => auto.getNroMatricula() !== nroMatricula);
    }

    public agregarCliente(cliente: Cliente): void {
        this._clientes.push(cliente);
    }

    public eliminarCliente(legajo: number): void {
        this._clientes = this._clientes.filter(cliente => cliente.getLegajo() !== legajo);
    }

    public agregarReserva(reserva: Reserva): void {
        this._reservas.push(reserva);
    }

    public eliminarReserva(idReserva: number): void {
        this._reservas = this._reservas.filter(reserva => reserva.getIdReserva() !== idReserva);
    }
}
