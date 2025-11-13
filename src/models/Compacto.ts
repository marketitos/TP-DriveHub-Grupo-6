import Auto from './Auto';
import Reserva from './Reserva';

/**
 * Clase Compacto
 * Vehículo de tipo compacto con lógica específica para cargos por kilometraje.
 */
class Compacto extends Auto {

    /**
     * Crea una instancia de Compacto.
     * @param {number} nroMatricula - Número de matrícula del vehículo.
     * @param {any} estado - Estado inicial del vehículo (usar el enum ESTADO_VEHICULO del proyecto).
     * @param {number} tarifa - Tarifa diaria base del vehículo.
     */
    constructor(nroMatricula: number, estado: any, tarifa: number) {
        super(nroMatricula, estado, tarifa, 0, 0, new Date(), 0);
    }

    /**
     * Calcula el cargo adicional por kilómetro de una reserva.
     * Lógica: se considera un tope de 100 km por día (kmpordia = 100 * dias).
     * Si el kilometraje total de la reserva excede ese tope, se cobra 0.15 por km excedente.
     * @param {Reserva} reserva - Reserva para la cual calcular el cargo.
     * @returns {number} Cargo adicional por exceso de kilometraje.
     */
    public aplicarCargo(reserva: Reserva): number {
        let kmpordia = 100 * reserva.getDias();
        let cargoAdicion = 0;
        if (reserva.getKilometraje() > kmpordia) {
            cargoAdicion = (reserva.getKilometraje() - kmpordia) * 0.15;
        }

        return cargoAdicion;
    }

    /**
     * Calcula la base del costo de la reserva para este Compacto.
     * Suma la tarifa diaria multiplicada por los días más los cargos adicionales calculados por aplicarCargo.
     * @param {Reserva} reserva - Reserva para la cual se calcula la base.
     * @returns {number} Costo base calculado.
     */
    public calcularBase(reserva: Reserva): number {
        return (this.getTarifa() * reserva.getDias() + this.aplicarCargo(reserva));
    }
}

export default Compacto;