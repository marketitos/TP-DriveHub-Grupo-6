import Auto from './Auto';
import Reserva from './Reserva';

class Compacto extends Auto {

    constructor(nroMatricula: number, estado: any, tarifa: number, descuentoDia: number = 0.1) {
        super(nroMatricula, estado, tarifa);
    }

    public aplicarCargo(reserva:Reserva): number {
        let kmpordia = 100 * reserva.getDias()
        let cargoAdicion=0
        if (reserva.getKilometraje() > kmpordia) {
            cargoAdicion = (reserva.getKilometraje() - kmpordia) * 0.15
        }

        return cargoAdicion;
    }

    public calcularBase(reserva: Reserva): number {
        return (this.getTarifa() * reserva.getDias()+this.aplicarCargo(reserva))
    }
}

export default Compacto;