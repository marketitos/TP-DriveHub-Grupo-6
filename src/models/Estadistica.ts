import Auto from "./Auto";
import SistemaDeReserva from "./SistemaDeReserva";

export class Estadistica{
    private sistema:SistemaDeReserva

    constructor(sistema:SistemaDeReserva){
        this.sistema=sistema
    }

    /**
     * 
     * @param fechaInicio 
     * @param fechaFin 
     * @returns 
     */
    public obtenerVehiculoMasAlquilados(fechaInicio:Date, fechaFin:Date):Auto | undefined{
        const contadorDeAutos:Map<Auto, number> = new Map();

        const reservasRango = this.sistema.getReservas().filter(reserva => {
            return reserva.getFechaInicio() >= fechaInicio && reserva.getFechaFin() <= fechaFin;
        });

        for (const reserva of reservasRango) {
            const auto = reserva.getAuto();
            const cantidadActual = contadorDeAutos.get(auto) || 0; // Puse el || 0 por que puede ser undefined
            contadorDeAutos.set(auto, cantidadActual + 1);
        }

        let autoMasAlquilado:Auto | undefined = undefined;
        let cantidadMayor=0

        for (const [auto, cantidadActual] of contadorDeAutos.entries()) {
            if(cantidadActual>cantidadMayor){
                cantidadMayor=cantidadActual
                autoMasAlquilado=auto
            }
        }

        return autoMasAlquilado;
    }

    public obtenerVehiculoMenosAlquilados(fechaInicio:Date, fechaFin:Date):Auto | undefined{
        const contadorDeAutos:Map<Auto, number> = new Map();

        const reservasRango = this.sistema.getReservas().filter(reserva => {
            return reserva.getFechaInicio() >= fechaInicio && reserva.getFechaFin() <= fechaFin;
        });

        for (const reserva of reservasRango) {
            const auto = reserva.getAuto();
            const cantidadActual = contadorDeAutos.get(auto) || 0; // Puse el || 0 por que puede ser undefined
            contadorDeAutos.set(auto, cantidadActual + 1);
        }

        let valoresMap = contadorDeAutos.entries()

        let primerAuto = valoresMap.next().value 

        if (!primerAuto) {
            return undefined;
        }

        let autoMenosAlquilado:Auto = primerAuto[0] ;
        let cantidadMenor:number = primerAuto[1];
        for (const [auto, cantidadActual] of contadorDeAutos.entries()) {
            if(cantidadActual<cantidadMenor){
                cantidadMenor=cantidadActual
                autoMenosAlquilado=auto
            }
        }

        return autoMenosAlquilado;
    }
    

    public calcularVehiculoMayorRentabilidad():Auto | undefined{
        const rentabilidadTotal: Map<Auto, number> = new Map();

        
        for (const reserva of this.sistema.getReservas()) {
            const auto = reserva.getAuto();
            const costoReserva = reserva.costoTotalReserva();
            

            const acumuladoActual = rentabilidadTotal.get(auto) || 0;
            rentabilidadTotal.set(auto, acumuladoActual + costoReserva);
        }

        if (rentabilidadTotal.size === 0) {
            return undefined; 
        }
       
        const valoresMapa = rentabilidadTotal.entries();
        const primeraEntrada = valoresMapa.next().value;

        if (!primeraEntrada) {
            return undefined;
        }
        let autoMayorRentable: Auto = primeraEntrada[0];
        let maxRentabilidad: number = primeraEntrada[1];

        for (const [auto, rentabilidadActual] of valoresMapa) {
            if (rentabilidadActual > maxRentabilidad) {
                maxRentabilidad = rentabilidadActual;
                autoMayorRentable = auto;
            }
        }

        return autoMayorRentable;
    }

    public calcularVehiculoMenorRentabilidad():Auto | undefined{
        const rentabilidadTotal: Map<Auto, number> = new Map();

    for (const reserva of this.sistema.getReservas()) {
        const auto = reserva.getAuto();
        const costoReserva = reserva.costoTotalReserva();
        
        const acumuladoActual = rentabilidadTotal.get(auto) || 0;
        rentabilidadTotal.set(auto, acumuladoActual + costoReserva);
        }

        if (rentabilidadTotal.size === 0) {
            return undefined; 
        }

    
        const valoresMapa = rentabilidadTotal.entries();
        const primeraEntrada = valoresMapa.next().value;
        
        if (!primeraEntrada) {
            return undefined;
        }

        let autoMenorRentable: Auto = primeraEntrada[0];
        let minRentabilidad: number = primeraEntrada[1];

        for (const [auto, rentabilidadActual] of valoresMapa) {
            if (rentabilidadActual < minRentabilidad) {
                minRentabilidad = rentabilidadActual;
                autoMenorRentable = auto;
            }
        }

        return autoMenorRentable;
    }

    public ocupacionFlota():number{
        const totalAutos = this.sistema.getAutos().length;
        if (totalAutos === 0) {
            return 0;
        }

        const hoy: Date = new Date();
        const autosOcupados: Map<Auto, boolean> = new Map();

        for (const reserva of this.sistema.getReservas()) {
            const inicio = reserva.getFechaInicio();
            const fin = reserva.getFechaFin();

            if (inicio <= hoy && fin >= hoy) {
                const auto = reserva.getAuto();
                
                autosOcupados.set(auto, true); 
            }
        }

        const nAutosOcupados = autosOcupados.size; 
        return nAutosOcupados / totalAutos as number;
        
    }
}