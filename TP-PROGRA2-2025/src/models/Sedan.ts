import Auto from './Auto';
import Reserva from './Reserva';

export default class Sedan extends Auto {
    private _cargoPorKilometro: number;

    constructor(nroMatricula: number, estado: any, tarifa: number, cargoPorKilometro: number = 0.5) {
        super(nroMatricula, estado, tarifa);
        this._cargoPorKilometro = cargoPorKilometro;
    }

    public getCargoPorKilometro(): number {
         return this._cargoPorKilometro; 
        }
    public setCargoPorKilometro(value: number) {
         this._cargoPorKilometro = value; 
        }

    public aplicarCargo(reserva: Reserva): number {
        return reserva.getKilometraje()*0.2;
    }

    public calcularBase(reserva: Reserva): number {
        return this.getTarifa() * reserva.getDias() + this.aplicarCargo(reserva);
    }
}
