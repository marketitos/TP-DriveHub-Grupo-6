export default class Mantenimiento {
    private _diasMantenimiento: number;
    private _diasLimpieza: number;
    private _costoMantenimiento: number;

    constructor(diasMantenimiento: number, diasLimpieza: number, costoMantenimiento: number) {
        this._diasMantenimiento = diasMantenimiento;
        this._diasLimpieza = diasLimpieza;
        this._costoMantenimiento = costoMantenimiento;
    }

    // Getters y Setters
    public getDiasMantenimiento(): number { return this._diasMantenimiento; }
    public setDiasMantenimiento(value: number) { this._diasMantenimiento = value; }

    public getDiasLimpieza(): number { return this._diasLimpieza; }
    public setDiasLimpieza(value: number) { this._diasLimpieza = value; }

    public getCostoMantenimiento(): number { return this._costoMantenimiento; }
    public setCostoMantenimiento(value: number) { this._costoMantenimiento = value; }

    public registrarAuto(): void {
        console.log("Auto registrado para mantenimiento");
    }
}

