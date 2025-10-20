import Auto from './Auto';
import Reserva from './Reserva';


/**
 * Clase que representa un vehículo de tipo SUV.
 * 
 * Hereda de la clase abstracta {@link Auto} y define una política de cargos
 * basada en un monto fijo diario más un recargo por kilometraje excedente.
 */

class SUV extends Auto {
    private _cargoFijo: number;

    
    /**
     * Crea un nuevo vehículo SUV.
     * 
     * @param {number} nroMatricula - Número de matrícula del vehículo.
     * @param {any} estado - Estado actual del vehículo (por ejemplo: Disponible, EnAlquiler, etc.).
     * @param {number} tarifa - Tarifa base diaria del vehículo.
     * @param {number} cargoFijo - Cargo fijo diario que se aplicará durante la reserva.
     */

    constructor(nroMatricula: number, estado: any, tarifa: number, cargoFijo: number) {
        super(nroMatricula, estado, tarifa);
        this._cargoFijo = cargoFijo;
    }

    /**
     * Obtiene el cargo fijo diario del vehículo.
     * @returns {number} Cargo fijo diario aplicado.
     */
    public getCargoFijo(): number { return this._cargoFijo; }

    /**
     * Asigna un nuevo cargo fijo diario al vehículo.
     * @param {number} value - Nuevo cargo fijo diario.
     */
    public setCargoFijo(value: number) { this._cargoFijo = value; }

    /**
     * Calcula el costo base total de la reserva para el vehículo SUV.
     * 
     * Combina la tarifa diaria por la cantidad de días con el cargo adicional calculado.
     * 
     * @param {Reserva} reserva - Reserva asociada al vehículo.
     * @returns {number} Costo total base del alquiler.
     */
    public calcularBase(reserva: Reserva): number {
        return (this.getTarifa() * reserva.getDias()) + this.aplicarCargo(reserva);
    }

    /**
     * Calcula el cargo adicional de la reserva para el vehículo SUV.
     * 
     * Se aplica un cargo fijo diario multiplicado por los días de reserva.
     * Si el kilometraje supera los 500 km, se agrega un recargo de $0.25
     * por cada kilómetro excedente.
     * 
     * @param {Reserva} reserva - Reserva asociada al vehículo.
     * @returns {number} Cargo adicional total calculado.
     */
    public aplicarCargo(reserva: Reserva): number {
        let cargoFijoAdicional = reserva.getDias() * this._cargoFijo

        if(reserva.getKilometraje()>500){
            cargoFijoAdicional += (reserva.getKilometraje() - 500) *0.25
        }

        return cargoFijoAdicional;
    }

}

export default SUV;