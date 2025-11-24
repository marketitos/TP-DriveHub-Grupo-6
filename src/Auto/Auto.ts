import { EstadoActual } from '../Estados/EstadoActual';
import Reserva from '../Reserva';

/**
 * Clase abstracta Auto
 * Define la estructura base de un vehículo del sistema y los métodos que
 * deben implementar las subclases concretas (Compacto, Sedan, SUV, etc.).
 */
abstract class Auto {
    private _nroMatricula: number;
    private _estado: EstadoActual;
    private _tarifa: number;
    private _cargoAdicional: number;
    private _kmDesdeUltimoMantenimiento: number;
    private _fechaUltMantenimiento: Date;
    private alquileresCompletados:number;


    /**
     * Crea una instancia base de Auto.
     * @param {number} nroMatricula - Número de matrícula del vehículo.
     * @param {EstadoActual} estado - Estado inicial del vehículo (usar Patron State `EstadoActual`).
     * @param {number} tarifa - Tarifa diaria base.
     * @param {number} [cargoAdicional=0] - Cargo adicional por defecto.
     */
    constructor(nroMatricula: number, estado: EstadoActual, tarifa: number, cargoAdicional: number = 0, kmDesdeUltimoMantenimiento: number, fechaUltMantenimiento: Date, alquileresCompletados: number) {
        this._nroMatricula = nroMatricula;
        this._estado = estado;
        this._tarifa = tarifa;
        this._cargoAdicional = cargoAdicional;
        this._kmDesdeUltimoMantenimiento = kmDesdeUltimoMantenimiento;
        this._fechaUltMantenimiento = fechaUltMantenimiento;
        this.alquileresCompletados = alquileresCompletados;
    }

    // Getters y Setters
    /**
     * Obtiene el número de matrícula.
     * @returns {number}
     */
    public getNroMatricula(): number { return this._nroMatricula; }

    /**
     * Establece el número de matrícula.
     * @param {number} value
     */
    public setNroMatricula(value: number) { this._nroMatricula = value; }

    /**
     * Obtiene el estado actual del vehículo.
     * @returns {EstadoActual}
     */
    public getEstado(): EstadoActual { return this._estado; }

    /**
     * Actualiza el estado del vehículo.
     * @param {EstadoActual} value
     */
    public actualizarEstado(value: EstadoActual) { this._estado = value; }

    /**
     * Obtiene la tarifa diaria base del vehículo.
     * @returns {number}
     */
    public getTarifa(): number { return this._tarifa; }

    /**
     * Establece la tarifa diaria base del vehículo.
     * @param {number} value
     */
    public setTarifa(value: number) { this._tarifa = value; }

    /**
     * Obtiene el cargo adicional configurado para el vehículo.
     * @returns {number}
     */
    public getCargoAdicional(): number { return this._cargoAdicional; }

    /**
     * Establece el cargo adicional del vehículo.
     * @param {number} value
     */
    public setCargoAdicional(value: number) { this._cargoAdicional = value; }

    // Métodos abstractos que deben implementar las subclases
    /**
     * Calcula los cargos adicionales aplicables a una reserva concreta.
     * @param {Reserva} reserva - Reserva a evaluar.
     * @returns {number} Monto de cargos adicionales.
     */
    abstract aplicarCargo(reserva: Reserva): number;

    /**
     * Calcula la base del costo de la reserva (tarifa diaria * días + cargos adicionales).
     * @param {Reserva} reserva - Reserva a evaluar.
     * @returns {number} Costo base calculado.
     */
    abstract calcularBase(reserva: Reserva): number;

    public getKmDesdeUltimoMantenimiento(): number {
        return this._kmDesdeUltimoMantenimiento;
    }
    public setKmDesdeUltimoMantenimiento(value: number) {
        this._kmDesdeUltimoMantenimiento = value;
    }

    public getFechaUltMantenimiento(): Date {
        return this._fechaUltMantenimiento;
    }

    public setFechaUltMantenimiento(value: Date) {
        this._fechaUltMantenimiento = value;
    }

    public getAlquileresCompletados(): number {
        return this.alquileresCompletados;
    }

    public setAlquileresCompletados(value: number) {
        this.alquileresCompletados = value;
    }

<<<<<<< HEAD:src/models/Auto.ts
    puedeAlquilarse(e:EstadoActual): void {
        this.actualizarEstado(e);
    }

    /**
     * Verifica si el vehículo necesita mantenimiento según los siguientes criterios:
     * - Ha superado los 10.000 km desde su último mantenimiento
     * - Han pasado 12 meses desde su último mantenimiento
     * - Ha completado 5 alquileres desde el último mantenimiento
     * @returns {boolean} true si necesita mantenimiento, false en caso contrario
     */
    public necesitaMantenimiento(): boolean {
        let necesitaMant=false;
        if (this._kmDesdeUltimoMantenimiento >= 10000) {
            necesitaMant= true
        }
        const hoy = new Date();
        const mesesDesdeMantenimiento = (hoy.getTime() - this._fechaUltMantenimiento.getTime()) / (1000 * 60 * 60 * 24 * 30);
        if (mesesDesdeMantenimiento >= 12) {
           necesitaMant = true
        }
      
        if (this.alquileresCompletados >= 5) {
            necesitaMant = true
        }

        return necesitaMant;
    }

    /**
     * Registra la finalización de un alquiler, actualiza los contadores
     * y verifica automáticamente si requiere mantenimiento
     * @param {number} kmRecorridos - Kilómetros recorridos durante el alquiler
     */
    public finalizarAlquiler(kmRecorridos: number): void {
        this._kmDesdeUltimoMantenimiento += kmRecorridos;
        this.alquileresCompletados++;
    }

    /**
     * Realiza el mantenimiento del vehículo, resetea los contadores
     * y actualiza la fecha del último mantenimiento
     */
    public realizarMantenimiento(): void {
        this._kmDesdeUltimoMantenimiento = 0;
        this.alquileresCompletados = 0;
        this._fechaUltMantenimiento = new Date();
=======
    puedeAlquilarse(): void {
        this._estado.puedeAlquilarse(this);
    }

    public necesitaMantenimiento(): boolean {
        return this._estado.necesitaMantenimiento(this);
    }

    public finalizarAlquiler(kmRecorridos: number): void {
        this._estado.finalizarAlquiler(kmRecorridos, this);
    }
    
    public realizarMantenimiento(): void {
        this._estado.realizarMantenimiento(this);
>>>>>>> TF_Develop:src/Auto/Auto.ts
    }

}

export default Auto;