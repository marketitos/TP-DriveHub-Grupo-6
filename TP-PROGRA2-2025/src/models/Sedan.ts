import Auto from './Auto';
import Reserva from './Reserva';

class Sedan extends Auto {
    private _cargoPorKilometro: number;

    constructor(nroMatricula: number, estado: any, tarifa: number, cargoPorKilometro: number = 0.5) {
        super(nroMatricula, estado, tarifa);
        this._cargoPorKilometro = cargoPorKilometro;
    }

    get cargoPorKilometro(): number { return this._cargoPorKilometro; }
    set cargoPorKilometro(value: number) { this._cargoPorKilometro = value; }

    aplicarCargo(dias: number): number {
        return 0;
    }

    calcularBase(reserva: Reserva): number {
        return 0;
    }
}

export default Sedan;