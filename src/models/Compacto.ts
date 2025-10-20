import Auto from './Auto';
import Reserva from './Reserva';

/**
 * Clase que representa un automóvil de tipo compacto.
 * 
 * Hereda de la clase abstracta {@link Auto} y define la forma de calcular
 * los cargos adicionales y el costo base de la reserva.
 */

class Compacto extends Auto {
    /**
     * Crea un nuevo automóvil compacto.
     * 
     * @param {number} nroMatricula - Número de matrícula del auto.
     * @param {any} estado - Estado actual del vehículo.
     * @param {number} tarifa - Tarifa base diaria del auto.
     * @param {number} [descuentoDia=0.1] - Descuento opcional por día de uso (no utilizado actualmente).
     */
    constructor(nroMatricula: number, estado: any, tarifa: number, descuentoDia: number = 0.1) {
        super(nroMatricula, estado, tarifa);
    }

    /**
     * Calcula el cargo adicional en función del kilometraje excedente.
     * 
     * Si el vehículo recorre más de 100 km por día, se aplica un cargo
     * de $0.15 por cada kilómetro extra.
     * 
     * @param {Reserva} reserva - Reserva asociada al vehículo.
     * @returns {number} Monto adicional calculado.
     */

    public aplicarCargo(reserva:Reserva): number {
        let kmpordia = 100 * reserva.getDias()
        let cargoAdicion=0
        if (reserva.getKilometraje() > kmpordia) {
            cargoAdicion = (reserva.getKilometraje() - kmpordia) * 0.15
        }

        return cargoAdicion;
    }

    
    /**
     * Calcula el costo base total de la reserva para el vehículo compacto
     * 
     * Se multiplica la tarifa diaria por la cantidad de días y se suma el cargo adicional calculado
     * 
     * @param {Reserva} reserva - Reserva asociada al vehículo.
     * @returns {number} Costo total base del alquiler.
     */
    public calcularBase(reserva: Reserva): number {
        return (this.getTarifa() * reserva.getDias()+this.aplicarCargo(reserva))
    }
}

export default Compacto;