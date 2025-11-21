import { mock } from 'jest-mock-extended';
import Cliente from '../src/Utils/Cliente';
import Reserva from '../src/Reserva';

describe('Cliente Tests', () => {
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

	test('agregarReserva incrementa contador y almacena la reserva', () => {
		const cliente = new Cliente(10, 'Ana');
		const r1 = mock<Reserva>();
		expect(cliente.getNroReserva()).toBe(0);
		cliente.agregarReserva(r1);
		expect(cliente.getNroReserva()).toBe(1);
		expect(cliente.getReservas()).toHaveLength(1);
		expect(cliente.getReservas()[0]).toBe(r1);
	});

	test('agregar varias reservas actualiza correctamente', () => {
		const cliente = new Cliente(11, 'Multi');
		const r1 = mock<Reserva>();
		const r2 = mock<Reserva>();
		const r3 = mock<Reserva>();
		cliente.agregarReserva(r1);
		cliente.agregarReserva(r2);
		cliente.agregarReserva(r3);
		expect(cliente.getNroReserva()).toBe(3);
		expect(cliente.getReservas()).toEqual([r1, r2, r3]);
	});

	test('agregarReserva permite repetir el mismo mock', () => {
		const cliente = new Cliente(12, 'Repetir');
		const r = mock<Reserva>();
		cliente.agregarReserva(r);
		cliente.agregarReserva(r);
		expect(cliente.getNroReserva()).toBe(2);
		expect(cliente.getReservas()).toEqual([r, r]);
	});

	test('setNroReserva manual y luego agregar mantiene coherencia', () => {
		const cliente = new Cliente(13, 'Manual');
		cliente.setNroReserva(5);
		const r1 = mock<Reserva>();
		const r2 = mock<Reserva>();
		cliente.agregarReserva(r1);
		cliente.agregarReserva(r2);
		expect(cliente.getNroReserva()).toBe(7);
		expect(cliente.getReservas()).toHaveLength(2);
	});

	test('agregar muchas reservas incrementa correctamente', () => {
		const cliente = new Cliente(14, 'Stress');
		const reservas = Array.from({ length: 20 }, () => mock<Reserva>());
		reservas.forEach(r => cliente.agregarReserva(r));
		expect(cliente.getNroReserva()).toBe(20);
		expect(cliente.getReservas()).toHaveLength(20);
	});
});

