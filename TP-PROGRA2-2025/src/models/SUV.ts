import Auto from './Auto';
import Reserva from './Reserva';

class SUV extends Auto {
    private _cargoFijo: number;

    constructor(nroMatricula: number, estado: any, tarifa: number, cargoFijo: number) {
        super(nroMatricula, estado, tarifa);
        this._cargoFijo = cargoFijo;
    }

    public getCargoFijo(): number { return this._cargoFijo; }
    public setCargoFijo(value: number) { this._cargoFijo = value; }

    public aplicarCargo(reserva: Reserva): number {
        return this._cargoFijo * reserva.getDias();
    }

    public calcularBase(reserva: Reserva): number {
        let cargoFijoAdicional = this._cargoFijo * 15

        if(reserva.getKilometraje()>500){
            cargoFijoAdicional += (reserva.getKilometraje() - 500) *0.25
        }

        return cargoFijoAdicional;
    }

}

export default SUV;