import { Estadistica } from '../src/models/Estadistica';
import SistemaDeReserva from '../src/models/SistemaDeReserva';
import Cliente from '../src/models/Cliente';
import Compacto from '../src/models/Compacto';
import Sedan from '../src/models/Sedan';
import SUV from '../src/models/SUV';
import Reserva from '../src/models/Reserva';
import ESTADO_VEHICULO from '../src/enums/ESTADO_VEHICULO';
import Alta from '../src/models/Alta';
import Media from '../src/models/Media';
import Baja from '../src/models/Baja';

describe('Tests clase Estadistica', () => {
    let sistema: SistemaDeReserva;
    let estadistica: Estadistica;
    let cliente1: Cliente;
    let cliente2: Cliente;
    let compacto: Compacto;
    let sedan: Sedan;
    let suv: SUV;

    beforeEach(() => {
        sistema = new SistemaDeReserva();
        estadistica = new Estadistica(sistema);
        
        cliente1 = new Cliente(1, 'Juan Pérez');
        cliente2 = new Cliente(2, 'María García');
        
        compacto = new Compacto(100, ESTADO_VEHICULO.DISPONIBLE, 50);
        sedan = new Sedan(200, ESTADO_VEHICULO.DISPONIBLE, 80);
        suv = new SUV(300, ESTADO_VEHICULO.DISPONIBLE, 120, 30, 0, new Date(), 0);
        
        sistema.agregarAuto(compacto);
        sistema.agregarAuto(sedan);
        sistema.agregarAuto(suv);
        sistema.agregarCliente(cliente1);
        sistema.agregarCliente(cliente2);
    });

    describe('obtenerVehiculoMasAlquilados', () => {
        test('debe retornar el vehículo más alquilado en el rango de fechas', () => {
            const inicio1 = new Date('2025-01-01');
            const fin1 = new Date('2025-01-05');
            const inicio2 = new Date('2025-01-10');
            const fin2 = new Date('2025-01-15');
            const inicio3 = new Date('2025-01-20');
            const fin3 = new Date('2025-01-25');

            const reserva1 = new Reserva(1, cliente1, inicio1, fin1, compacto, 100, new Alta());
            const reserva2 = new Reserva(2, cliente2, inicio2, fin2, compacto, 150, new Media());
            const reserva3 = new Reserva(3, cliente1, inicio3, fin3, sedan, 200, new Baja());

            sistema.agregarReserva(reserva1);
            sistema.agregarReserva(reserva2);
            sistema.agregarReserva(reserva3);

            const fechaInicio = new Date('2025-01-01');
            const fechaFin = new Date('2025-01-31');
            const resultado = estadistica.obtenerVehiculoMasAlquilados(fechaInicio, fechaFin);

            expect(resultado).toBe(compacto);
        });

        test('debe retornar undefined cuando no hay reservas en el rango', () => {
            const fechaInicio = new Date('2025-01-01');
            const fechaFin = new Date('2025-01-31');
            const resultado = estadistica.obtenerVehiculoMasAlquilados(fechaInicio, fechaFin);

            expect(resultado).toBeUndefined();
        });

        test('debe retornar el primer vehículo cuando todos tienen igual cantidad de alquileres', () => {
            const inicio1 = new Date('2025-01-01');
            const fin1 = new Date('2025-01-05');
            const inicio2 = new Date('2025-01-10');
            const fin2 = new Date('2025-01-15');

            const reserva1 = new Reserva(1, cliente1, inicio1, fin1, compacto, 100, new Alta());
            const reserva2 = new Reserva(2, cliente2, inicio2, fin2, sedan, 150, new Media());

            sistema.agregarReserva(reserva1);
            sistema.agregarReserva(reserva2);

            const fechaInicio = new Date('2025-01-01');
            const fechaFin = new Date('2025-01-31');
            const resultado = estadistica.obtenerVehiculoMasAlquilados(fechaInicio, fechaFin);

            expect(resultado).toBeDefined();
            expect([compacto, sedan]).toContain(resultado);
        });
    });

    describe('obtenerVehiculoMenosAlquilados', () => {
        test('debe retornar el vehículo menos alquilado en el rango de fechas', () => {
            const inicio1 = new Date('2025-01-01');
            const fin1 = new Date('2025-01-05');
            const inicio2 = new Date('2025-01-10');
            const fin2 = new Date('2025-01-15');
            const inicio3 = new Date('2025-01-20');
            const fin3 = new Date('2025-01-25');

            const reserva1 = new Reserva(1, cliente1, inicio1, fin1, compacto, 100, new Alta());
            const reserva2 = new Reserva(2, cliente2, inicio2, fin2, compacto, 150, new Media());
            const reserva3 = new Reserva(3, cliente1, inicio3, fin3, sedan, 200, new Baja());

            sistema.agregarReserva(reserva1);
            sistema.agregarReserva(reserva2);
            sistema.agregarReserva(reserva3);

            const fechaInicio = new Date('2025-01-01');
            const fechaFin = new Date('2025-01-31');
            const resultado = estadistica.obtenerVehiculoMenosAlquilados(fechaInicio, fechaFin);

            expect(resultado).toBe(sedan);
        });

        test('debe retornar undefined cuando no hay reservas en el rango', () => {
            const fechaInicio = new Date('2025-01-01');
            const fechaFin = new Date('2025-01-31');
            const resultado = estadistica.obtenerVehiculoMenosAlquilados(fechaInicio, fechaFin);

            expect(resultado).toBeUndefined();
        });
    });

    describe('calcularVehiculoMayorRentabilidad', () => {
        test('debe retornar el vehículo con mayor rentabilidad total', () => {
            const inicio1 = new Date('2025-01-01');
            const fin1 = new Date('2025-01-05'); 
            const inicio2 = new Date('2025-02-01');
            const fin2 = new Date('2025-02-10'); 

            const reserva1 = new Reserva(1, cliente1, inicio1, fin1, compacto, 100, new Alta());
            const reserva2 = new Reserva(2, cliente2, inicio2, fin2, suv, 600, new Alta());

            sistema.agregarReserva(reserva1);
            sistema.agregarReserva(reserva2);

            const resultado = estadistica.calcularVehiculoMayorRentabilidad();

            expect(resultado).toBe(suv);
        });

        test('debe retornar undefined cuando no hay reservas', () => {
            const resultado = estadistica.calcularVehiculoMayorRentabilidad();

            expect(resultado).toBeUndefined();
        });

        test('debe acumular correctamente la rentabilidad de múltiples reservas del mismo vehículo', () => {
            const inicio1 = new Date('2025-01-01');
            const fin1 = new Date('2025-01-02');
            const inicio2 = new Date('2025-01-10');
            const fin2 = new Date('2025-01-11');

            const reserva1 = new Reserva(1, cliente1, inicio1, fin1, sedan, 100, new Media());
            const reserva2 = new Reserva(2, cliente2, inicio2, fin2, sedan, 100, new Media());
            const reserva3 = new Reserva(2, cliente2, inicio2, fin2, compacto, 100, new Media());
            sistema.agregarReserva(reserva1);
            sistema.agregarReserva(reserva2);

            const resultado = estadistica.calcularVehiculoMayorRentabilidad();

            expect(resultado).toBe(sedan);
        });
    });

    describe('calcularVehiculoMenorRentabilidad', () => {
        test('debe retornar el vehículo con menor rentabilidad total', () => {
            const inicio1 = new Date('2025-01-01');
            const fin1 = new Date('2025-01-05');
            const inicio2 = new Date('2025-02-01');
            const fin2 = new Date('2025-02-10'); 

            const reserva1 = new Reserva(1, cliente1, inicio1, fin1, compacto, 100, new Baja());
            const reserva2 = new Reserva(2, cliente2, inicio2, fin2, suv, 600, new Alta());

            sistema.agregarReserva(reserva1);
            sistema.agregarReserva(reserva2);

            const resultado = estadistica.calcularVehiculoMenorRentabilidad();

            expect(resultado).toBe(compacto);
        });

        test('debe retornar undefined cuando no hay reservas', () => {
            const resultado = estadistica.calcularVehiculoMenorRentabilidad();

            expect(resultado).toBeUndefined();
        });
    });

    describe('ocupacionFlota', () => {
        test('debe retornar 0 cuando no hay autos en el sistema', () => {
            const sistemaVacio = new SistemaDeReserva();
            const estadisticaVacia = new Estadistica(sistemaVacio);

            const resultado = estadisticaVacia.ocupacionFlota();

            expect(resultado).toBe(0);
        });

        test('debe calcular correctamente la ocupación con reservas activas hoy', () => {
            const hoy = new Date();
            const ayer = new Date(hoy);
            ayer.setDate(hoy.getDate() - 1);
            const manana = new Date(hoy);
            manana.setDate(hoy.getDate() + 1);

            const reserva1 = new Reserva(1, cliente1, ayer, manana, compacto, 100, new Alta());

            sistema.agregarReserva(reserva1);

            const resultado = estadistica.ocupacionFlota();

            expect(resultado).toBeCloseTo(1 / 3, 2);
        });

        test('debe retornar 0 cuando no hay reservas activas hoy', () => {
            const fechaPasada = new Date('2025-01-01');
            const fechaPasadaFin = new Date('2025-01-05');

            const reserva1 = new Reserva(1, cliente1, fechaPasada, fechaPasadaFin, compacto, 100, new Alta());

            sistema.agregarReserva(reserva1);

            const resultado = estadistica.ocupacionFlota();

            expect(resultado).toBe(0);
        });

    });
})
