class Mantenimiento {
    private _diasMantenimiento: number;
    private _diasLimpieza: number;
    private _costoMantenimiento: number;

    constructor(diasMantenimiento: number, diasLimpieza: number, costoMantenimiento: number) {
        this._diasMantenimiento = diasMantenimiento;
        this._diasLimpieza = diasLimpieza;
        this._costoMantenimiento = costoMantenimiento;
    }

    // Getters y Setters
    get diasMantenimiento(): number { return this._diasMantenimiento; }
    set diasMantenimiento(value: number) { this._diasMantenimiento = value; }

    get diasLimpieza(): number { return this._diasLimpieza; }
    set diasLimpieza(value: number) { this._diasLimpieza = value; }

    get costoMantenimiento(): number { return this._costoMantenimiento; }
    set costoMantenimiento(value: number) { this._costoMantenimiento = value; }

    registrarAuto(): void {
        console.log("Auto registrado para mantenimiento");
    }
}

export default Mantenimiento;