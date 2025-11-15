"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estadistica = void 0;
class Estadistica {
    sistema;
    constructor(sistema) {
        this.sistema = sistema;
    }
    obtenerVehiculoMasAlquilados(fechaInicio, fechaFin) {
        const contadorDeAutos = new Map();
        const reservasRango = this.sistema.getReservas().filter(reserva => {
            return reserva.getFechaInicio() >= fechaInicio && reserva.getFechaFin() <= fechaFin;
        });
        for (const reserva of reservasRango) {
            const auto = reserva.getAuto();
            const cantidadActual = contadorDeAutos.get(auto) || 0;
            contadorDeAutos.set(auto, cantidadActual + 1);
        }
        let autoMasAlquilado = undefined;
        let cantidadMayor = 0;
        for (const [auto, cantidadActual] of contadorDeAutos.entries()) {
            if (cantidadActual > cantidadMayor) {
                cantidadMayor = cantidadActual;
                autoMasAlquilado = auto;
            }
        }
        return autoMasAlquilado;
    }
    obtenerVehiculoMenosAlquilados(fechaInicio, fechaFin) {
        const contadorDeAutos = new Map();
        const reservasRango = this.sistema.getReservas().filter(reserva => {
            return reserva.getFechaInicio() >= fechaInicio && reserva.getFechaFin() <= fechaFin;
        });
        for (const reserva of reservasRango) {
            const auto = reserva.getAuto();
            const cantidadActual = contadorDeAutos.get(auto) || 0;
            contadorDeAutos.set(auto, cantidadActual + 1);
        }
        let valoresMap = contadorDeAutos.entries();
        let primerAuto = valoresMap.next().value;
        if (!primerAuto) {
            return undefined;
        }
        let autoMenosAlquilado = primerAuto[0];
        let cantidadMenor = primerAuto[1];
        for (const [auto, cantidadActual] of contadorDeAutos.entries()) {
            if (cantidadActual < cantidadMenor) {
                cantidadMenor = cantidadActual;
                autoMenosAlquilado = auto;
            }
        }
        return autoMenosAlquilado;
    }
    calcularVehiculoMayorRentabilidad() {
        const rentabilidadTotal = new Map();
        for (const reserva of this.sistema.getReservas()) {
            const auto = reserva.getAuto();
            const costoReserva = reserva.costoTotalReserva();
            const acumuladoActual = rentabilidadTotal.get(auto) || 0;
            rentabilidadTotal.set(auto, acumuladoActual + costoReserva);
        }
        if (rentabilidadTotal.size === 0) {
            return undefined;
        }
        const iteradorEntradas = rentabilidadTotal.entries();
        const primeraEntrada = iteradorEntradas.next().value;
        if (!primeraEntrada) {
            return undefined;
        }
        let autoMayorRentable = primeraEntrada[0];
        let maxRentabilidad = primeraEntrada[1];
        for (const [auto, rentabilidadActual] of iteradorEntradas) {
            if (rentabilidadActual > maxRentabilidad) {
                maxRentabilidad = rentabilidadActual;
                autoMayorRentable = auto;
            }
        }
        return autoMayorRentable;
    }
    calcularVehiculoMenorRentabilidad() {
        const rentabilidadTotal = new Map();
        for (const reserva of this.sistema.getReservas()) {
            const auto = reserva.getAuto();
            const costoReserva = reserva.costoTotalReserva();
            const acumuladoActual = rentabilidadTotal.get(auto) || 0;
            rentabilidadTotal.set(auto, acumuladoActual + costoReserva);
        }
        if (rentabilidadTotal.size === 0) {
            return undefined;
        }
        const iteradorEntradas = rentabilidadTotal.entries();
        const primeraEntrada = iteradorEntradas.next().value;
        if (!primeraEntrada) {
            return undefined;
        }
        let autoMenorRentable = primeraEntrada[0];
        let minRentabilidad = primeraEntrada[1];
        for (const [auto, rentabilidadActual] of iteradorEntradas) {
            if (rentabilidadActual < minRentabilidad) {
                minRentabilidad = rentabilidadActual;
                autoMenorRentable = auto;
            }
        }
        return autoMenorRentable;
    }
    ocupacionFlota() {
        const totalAutos = this.sistema.getAutos().length;
        if (totalAutos === 0) {
            return 0;
        }
        const hoy = new Date();
        const autosOcupados = new Map();
        for (const reserva of this.sistema.getReservas()) {
            const inicio = reserva.getFechaInicio();
            const fin = reserva.getFechaFin();
            if (inicio <= hoy && fin >= hoy) {
                const auto = reserva.getAuto();
                autosOcupados.set(auto, true);
            }
        }
        const nAutosOcupados = autosOcupados.size;
        return nAutosOcupados / totalAutos;
    }
}
exports.Estadistica = Estadistica;
//# sourceMappingURL=Estadistica.js.map