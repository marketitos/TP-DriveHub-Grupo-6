import Reserva from './Reserva';

/**
 * Clase Cliente
 * Representa a un cliente que puede tener múltiples reservas.
 */
class Cliente {
    private _legajo: number;
    private _nroReserva: number;
    private _nombre: string;
    private _reservas: Reserva[];

    /**
     * Crea una nueva instancia de Cliente.
     * @param {number} legajo - Identificador numérico del cliente.
     * @param {string} nombre - Nombre completo del cliente.
     */
    constructor(legajo: number, nombre: string) {
        this._legajo = legajo;
        this._nombre = nombre;
        this._nroReserva = 0;
        this._reservas = [];
    }

    // Getters y Setters
    /**
     * Obtiene el legajo del cliente.
     * @returns {number} Legajo del cliente.
     */
    public getLegajo(): number { return this._legajo; }

    /**
     * Establece el legajo del cliente.
     * @param {number} value - Nuevo legajo.
     */
    public setLegajo(value: number) { this._legajo = value; }

    /**
     * Obtiene el número de reservas que tiene el cliente.
     * @returns {number} Contador de reservas.
     */
    public getNroReserva(): number { return this._nroReserva; }

    /**
     * Establece el número de reservas (útil para inicializaciones o pruebas).
     * @param {number} value - Nuevo número de reservas.
     */
    public setNroReserva(value: number) { this._nroReserva = value; }

    /**
     * Obtiene el nombre del cliente.
     * @returns {string} Nombre del cliente.
     */
    public getNombre(): string { return this._nombre; }

    /**
     * Establece el nombre del cliente.
     * @param {string} value - Nuevo nombre.
     */
    public setNombre(value: string) { this._nombre = value; }

    /**
     * Retorna el arreglo de reservas asociadas al cliente.
     * @returns {Reserva[]} Lista de reservas del cliente.
     */
    public getReservas(): Reserva[] { return this._reservas; }

    /**
     * Agrega una reserva a la lista del cliente y actualiza el contador de reservas.
     * @param {Reserva} reserva - Reserva a añadir.
     */
    public agregarReserva(reserva: Reserva): void {
        this._reservas.push(reserva);
        this._nroReserva++;
    }
}

export default Cliente;