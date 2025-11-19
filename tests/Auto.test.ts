import Compacto from '../src/models/Compacto';
import Cliente from '../src/models/Cliente';
import Reserva from '../src/models/Reserva';
import ESTADO_VEHICULO from '../src/enums/ESTADO_VEHICULO';
import Alta from '../src/models/Alta';
import { EstadoDisponible } from '../src/models/estadoDisponible';

describe('Auto (vía Compacto)', () => {
	test('getters y setters heredados de Auto funcionan correctamente', () => {
	const compacto = new Compacto(123, ESTADO_VEHICULO.DISPONIBLE, 150);

		expect(compacto.getNroMatricula()).toBe(123);
		expect(compacto.getTarifa()).toBe(150);
		expect(compacto.getCargoAdicional()).toBe(0);

		compacto.setTarifa(200);
		compacto.setCargoAdicional(25);

		expect(compacto.getTarifa()).toBe(200);
		expect(compacto.getCargoAdicional()).toBe(25);
	});

	test('aplicarCargo devuelve 0 cuando kilometraje dentro del tope', () => {
		const cliente = new Cliente(1, 'X');
		const compacto = new Compacto(1, ESTADO_VEHICULO.DISPONIBLE, 100);
		const inicio = new Date(2025, 0, 1);
		const fin = new Date(2025, 0, 2); // 2 días -> kmpordia = 100*2 = 200
		const reserva = new Reserva(1, cliente, inicio, fin, compacto, 150, new Alta());
		expect(compacto.aplicarCargo(reserva)).toBe(0);
		expect(compacto.aplicarCargo(reserva)).toBe(0);
	});

	test('aplicarCargo calcula cargo por exceso de km y calcularBase suma tarifa + cargo', () => {
		const cliente = new Cliente(2, 'Y');
	const compacto = new Compacto(2, ESTADO_VEHICULO.DISPONIBLE, 100);
		const inicio = new Date(2025, 0, 1);
		const fin = new Date(2025, 0, 2); // 2 días -> kmpordia = 200
		const reserva = new Reserva(2, cliente, inicio, fin, compacto, 260, new Alta());

		// exceso = 260 - 200 = 60; cargo = 60 * 0.15 = 9
		// exceso = 260 - 200 = 60; cargo = 60 * 0.15 = 9
		expect(compacto.aplicarCargo(reserva)).toBeCloseTo(9);

		// calcularBase = tarifa * dias + aplicarCargo = 100*2 + 9 = 209
		expect(compacto.calcularBase(reserva)).toBeCloseTo(209);
	});

	test('setNroMatricula actualiza correctamente el número de matrícula', () => {
		const compacto = new Compacto(123, ESTADO_VEHICULO.DISPONIBLE, 150);
		compacto.setNroMatricula(456);
		expect(compacto.getNroMatricula()).toBe(456);
	});

	test('getEstado retorna el estado del vehículo', () => {
		const compacto = new Compacto(123, ESTADO_VEHICULO.DISPONIBLE, 150);
		expect(compacto.getEstado()).toBe(ESTADO_VEHICULO.DISPONIBLE);
	});

	test('getters y setters de km, fecha mantenimiento y alquileres funcionan', () => {
		const compacto = new Compacto(123, ESTADO_VEHICULO.DISPONIBLE, 150);
		
		expect(compacto.getKmDesdeUltimoMantenimiento()).toBe(0);
		compacto.setKmDesdeUltimoMantenimiento(5000);
		expect(compacto.getKmDesdeUltimoMantenimiento()).toBe(5000);

		const nuevaFecha = new Date('2025-06-01');
		compacto.setFechaUltMantenimiento(nuevaFecha);
		expect(compacto.getFechaUltMantenimiento()).toBe(nuevaFecha);

		expect(compacto.getAlquileresCompletados()).toBe(0);
		compacto.setAlquileresCompletados(10);
		expect(compacto.getAlquileresCompletados()).toBe(10);
	});
});

describe('necesitaMantenimiento', () => {
	test('necesitaMantenimiento retorna true cuando km >= 10000', () => {
		const fechaReciente = new Date();
		const compacto = new Compacto(123, new EstadoDisponible(), 150, 0, 10000, fechaReciente, 0);
		expect(compacto.necesitaMantenimiento()).toBe(true);
	});

	test('necesitaMantenimiento retorna true cuando han pasado 12 meses', () => {
		const hace13Meses = new Date();
		hace13Meses.setMonth(hace13Meses.getMonth() - 13);
		const compacto = new Compacto(123, new EstadoDisponible(), 150, 0, 0, hace13Meses, 0);
		expect(compacto.necesitaMantenimiento()).toBe(true);
	});

	test('necesitaMantenimiento retorna true cuando alquileres >= 5', () => {
		const fechaReciente = new Date();
		const compacto = new Compacto(123, new EstadoDisponible(), 150, 0, 0, fechaReciente, 5);
		expect(compacto.necesitaMantenimiento()).toBe(true);
	});

	test('realizarMantenimiento ', () => {
		const compacto = new Compacto(123, new EstadoDisponible(), 150, 0, 11000, new Date(), 3);
		
		expect(compacto.necesitaMantenimiento()).toBe(true);
		
		compacto.realizarMantenimiento();
		
		expect(compacto.necesitaMantenimiento()).toBe(false);
		expect(compacto.getKmDesdeUltimoMantenimiento()).toBe(0);
	});



});
