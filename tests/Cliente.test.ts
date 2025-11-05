import Cliente from '../src/models/Cliente';
import Compacto from '../src/models/Compacto';
import ESTADO_VEHICULO from '../src/enums/ESTADO_VEHICULO';
import Reserva from '../src/models/Reserva';
import Alta from '../src/models/Alta';

describe('Cliente', () => {
	test('constructor inicializa correctamente', () => {
		const cliente = new Cliente(123, 'Juan Perez');

		expect(cliente.getLegajo()).toBe(123);
		expect(cliente.getNombre()).toBe('Juan Perez');
		expect(cliente.getNroReserva()).toBe(0);
		expect(cliente.getReservas()).toHaveLength(0);
	});

	test('setters actualizan valores', () => {
		const cliente = new Cliente(1, 'A');

		cliente.setLegajo(42);
		cliente.setNombre('Berto');
		cliente.setNroReserva(7);

		expect(cliente.getLegajo()).toBe(42);
		expect(cliente.getNombre()).toBe('Berto');
		expect(cliente.getNroReserva()).toBe(7);
	});

	test('agregarReserva agrega la reserva y aumenta nroReserva', () => {
		const cliente = new Cliente(10, 'Ana');

		// Crear dependencias mínimas para Reserva
		const auto = new Compacto(111, ESTADO_VEHICULO.DISPONIBLE, 100);
		const temporada = new Alta();

		const fechaInicio = new Date(2025, 0, 1); // 1 Ene 2025
		const fechaFin = new Date(2025, 0, 2); // 2 Ene 2025

		const reserva1 = new Reserva(1, cliente, fechaInicio, fechaFin, auto, 50);

		expect(cliente.getNroReserva()).toBe(0);
		cliente.agregarReserva(reserva1);
		expect(cliente.getNroReserva()).toBe(1);
		expect(cliente.getReservas()).toHaveLength(1);
		expect(cliente.getReservas()[0]).toBe(reserva1);

		// agregar una segunda reserva
		const reserva2 = new Reserva(2, cliente, fechaInicio, fechaFin, auto, 120);
		cliente.agregarReserva(reserva2);
		expect(cliente.getNroReserva()).toBe(2);
		expect(cliente.getReservas()).toHaveLength(2);
		expect(cliente.getReservas()[1]).toBe(reserva2);
	});
});

