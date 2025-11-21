import { mock } from 'jest-mock-extended';
import Sedan from '../src/Auto/Sedan';
import { EstadoActual } from '../src/Estados/EstadoActual';
import Reserva from '../src/Reserva';
import Alta from '../src/Temporadas/Alta';

const crearEstado = () => mock<EstadoActual>();

const crearReservaMock = (dias: number, km: number) => {
  const r = mock<Reserva>();
  r.getDias.mockReturnValue(dias);
  r.getKilometraje.mockReturnValue(km);
  return r;
};

describe('Sedan Tests', () => {
  test('aplicarCargo = km * 0.2', () => {
    const sedan = new Sedan(1, crearEstado(), 100, 0.5);
    const reserva = crearReservaMock(2, 400);
    expect(sedan.aplicarCargo(reserva)).toBe(80);
  });

  test('aplicarCargo con km = 0', () => {
    const sedan = new Sedan(2, crearEstado(), 150);
    const reserva = crearReservaMock(3, 0);
    expect(sedan.aplicarCargo(reserva)).toBe(0);
  });

  test('calcularBase = tarifa * días + aplicarCargo', () => {
    const sedan = new Sedan(3, crearEstado(), 50);
    const reserva = crearReservaMock(4, 200);
    expect(sedan.calcularBase(reserva)).toBe(240);
  });

  test('calcularBase refleja cambio de tarifa', () => {
    const sedan = new Sedan(4, crearEstado(), 60);
    const reserva = crearReservaMock(2, 300);
    expect(sedan.calcularBase(reserva)).toBe(180);
    sedan.setTarifa(80);
    expect(sedan.calcularBase(reserva)).toBe(220);
  });

  test('get/set cargoPorKilometro no afecta aplicarCargo (implementación actual)', () => {
    const sedan = new Sedan(5, crearEstado(), 100, 0.5);
    const reserva = crearReservaMock(1, 100);
    expect(sedan.getCargoPorKilometro()).toBe(0.5);
    expect(sedan.aplicarCargo(reserva)).toBe(20);
    sedan.setCargoPorKilometro(0.9);
    expect(sedan.getCargoPorKilometro()).toBe(0.9);
    expect(sedan.aplicarCargo(reserva)).toBe(20);
  });

  test('aplicarCargo reacciona a cambios de km en mock', () => {
    const sedan = new Sedan(6, crearEstado(), 70);
    const reserva = crearReservaMock(3, 150);
    expect(sedan.aplicarCargo(reserva)).toBe(30);
    reserva.getKilometraje.mockReturnValue(180);
    expect(sedan.aplicarCargo(reserva)).toBe(36);
  });

  test('calcularBase con varios escenarios', () => {
    const sedan = new Sedan(7, crearEstado(), 40);
    const r1 = crearReservaMock(1, 50);
    const r2 = crearReservaMock(5, 500);
    expect(sedan.calcularBase(r1)).toBe(50);
    expect(sedan.calcularBase(r2)).toBe(300);
  });

  test('integración con Reserva real y temporada Alta', () => {
    const estado = crearEstado();
    const sedan = new Sedan(8, estado, 100);
    const clienteFake = mock<any>();
    const inicio = new Date(2025, 0, 1);
    const fin = new Date(2025, 0, 3);
    const reservaReal = new Reserva(1, clienteFake, inicio, fin, sedan, 250, new Alta());
    expect(sedan.calcularBase(reservaReal)).toBe(350);
  });
});