import Auto from './Auto';
import Reserva from './Reserva';

class Compacto extends Auto {
    private _descuentoDia: number;

    constructor(nroMatricula: number, estado: any, tarifa: number, descuentoDia: number = 0.1) {
        super(nroMatricula, estado, tarifa);
        this._descuentoDia = descuentoDia;
    }

    get descuentoDia(): number { return this._descuentoDia; }
    set descuentoDia(value: number) { this._descuentoDia = value; }

    aplicarCargo(dias: number): number {
        return 0;
    }

    calcularBase(reserva: Reserva): number {
        return 0;
    }
}

export default Compacto;