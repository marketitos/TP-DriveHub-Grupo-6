import Auto from './Auto';
import Reserva from './Reserva';

class SUV extends Auto {
    private _cargoFijo: number;

    constructor(nroMatricula: number, estado: any, tarifa: number, cargoFijo: number) {
        super(nroMatricula, estado, tarifa);
        this._cargoFijo = cargoFijo;
    }

    get cargoFijo(): number { return this._cargoFijo; }
    set cargoFijo(value: number) { this._cargoFijo = value; }

    override aplicarCargo(dias: number): number {
        return this._cargoFijo * dias;
    }

    override calcularBase(reserva: Reserva): number {
        const dias = reserva.calcularDiasReserva();
        return (dias * this.tarifa) + this.aplicarCargo(dias);
    }

    actualizarEstado(): void {}

}

export default SUV;