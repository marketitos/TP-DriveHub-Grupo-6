import Cliente from './Cliente';
import Auto from './Auto';
import Reserva from './Reserva';
import { estadoEnMantenimiento } from './estadoEnMantenimiento';

/**
 * Clase principal del sistema de reservas de autos
 * @class SistemaDeReserva
 * @description Gestiona la administración de autos, clientes y reservas del sistema
 */
export default class SistemaDeReserva {
    private _autos: Auto[];
    private _clientes: Cliente[];
    private _reservas: Reserva[];

    /**
     * Constructor de la clase SistemaDeReserva
     * @constructor
     * @description Inicializa las listas vacías de autos, clientes y reservas
     */
    constructor() {
        this._autos = [];
        this._clientes = [];
        this._reservas = [];
    }

    /**
     * Obtiene la lista de autos del sistema
     * @returns {Auto[]} Array con todos los autos registrados
     */
    public getAutos(): Auto[] { 
        return this._autos; 
    }

    /**
     * Obtiene la lista de clientes del sistema
     * @returns {Cliente[]} Array con todos los clientes registrados
     */
    public getClientes(): Cliente[] {
         return this._clientes; 
    }

    /**
     * Obtiene la lista de reservas del sistema
     * @returns {Reserva[]} Array con todas las reservas activas
     */
    public getReservas(): Reserva[] {
         return this._reservas; 
    }

    /**
     * Crea una nueva reserva en el sistema
     * @param {Cliente} cliente - Cliente que realiza la reserva
     * @param {Auto} auto - Auto a reservar
     * @param {Date} fechaInicio - Fecha de inicio de la reserva
     * @param {Date} fechaFin - Fecha de fin de la reserva
     * @param {number} kilometraje - Kilometraje estimado de la reserva
     * @param {Temporadas} temporada - Temporada en la que se realiza la reserva
     * @throws {Error} Si el auto no está disponible para alquilar
     */
    public crearReserva(cliente: Cliente, auto: Auto, fechaInicio: Date, fechaFin: Date, kilometraje: number = 0, temporada: any): void {
        try {
            auto.getEstado().puedeAlquilarse(auto);
        } catch (error) {
            throw error;
        }
        
        const nuevaReserva = new Reserva(this._reservas.length + 1, cliente, fechaInicio, fechaFin, auto, kilometraje, temporada);
        this._reservas.push(nuevaReserva);
    }

    /**
     * Agrega un nuevo auto al sistema
     * @param {Auto} auto - Instancia del auto a agregar
     */
    public agregarAuto(auto: Auto): void {
        this._autos.push(auto);
    }

    /**
     * Elimina un auto del sistema por su número de matrícula
     * @param {number} nroMatricula - Número de matrícula del auto a eliminar
     */
    public eliminarAuto(nroMatricula: number): void {
        this._autos = this._autos.filter(auto => auto.getNroMatricula() !== nroMatricula);
    }

    /**
     * Agrega un nuevo cliente al sistema
     * @param {Cliente} cliente - Instancia del cliente a agregar
     */
    public agregarCliente(cliente: Cliente): void {
        this._clientes.push(cliente);
    }

    /**
     * Elimina un cliente del sistema por su número de legajo
     * @param {number} legajo - Número de legajo del cliente a eliminar
     */
    public eliminarCliente(legajo: number): void {
        this._clientes = this._clientes.filter(cliente => cliente.getLegajo() !== legajo);
    }

    /**
     * Agrega una reserva existente al sistema
     * @param {Reserva} reserva - Instancia de la reserva a agregar
     */
    public agregarReserva(reserva: Reserva): void {
        this._reservas.push(reserva);
    }

    /**
     * Elimina una reserva del sistema por su ID
     * @param {number} idReserva - ID de la reserva a eliminar
     */
    public eliminarReserva(idReserva: number): void {
        this._reservas = this._reservas.filter(reserva => reserva.getIdReserva() !== idReserva);
    }

    /**
     * Finaliza un alquiler, actualiza los contadores del vehículo
     * y verifica automáticamente si necesita mantenimiento
     * @param {Auto} auto - Vehículo que finaliza el alquiler
     * @param {number} kmRecorridos - Kilómetros recorridos durante el alquiler
     */
    public finalizarAlquiler(auto: Auto, kmRecorridos: number): void {
        auto.finalizarAlquiler(kmRecorridos);
    
        if (auto.necesitaMantenimiento()) {
            auto.actualizarEstado(new estadoEnMantenimiento());
        }
    }
}