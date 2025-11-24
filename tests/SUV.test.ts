import { mock } from 'jest-mock-extended';
import SUV from '../src/Auto/SUV';
import { EstadoActual } from '../src/Estados/EstadoActual';
import { EstadoDisponible } from '../src/Estados/estadoDisponible';
import Reserva from '../src/Reserva';
import Alta from '../src/Temporadas/Alta';

const crearEstado = () => mock<EstadoActual>();

const crearReservaMock = (dias: number, km: number) => {
  const r = mock<Reserva>();
  r.getDias.mockReturnValue(dias);
  r.getKilometraje.mockReturnValue(km);
  return r;
};

describe('SUV Tests', () => {
  test('aplicarCargo sin exceso (km <= 500) = cargoFijo * días', () => {
    const suv = new SUV(1, crearEstado(), 100, 10, 0, new Date(), 0);
    const reserva = crearReservaMock(4, 500);
    expect(suv.aplicarCargo(reserva)).toBe(40);
  });

  test('aplicarCargo con exceso (km > 500)', () => {
    const suv = new SUV(2, crearEstado(), 80, 15, 0, new Date(), 0);
    const reserva = crearReservaMock(2, 650); // exceso 150 -> 37.5
    expect(suv.aplicarCargo(reserva)).toBeCloseTo(30 + 37.5);
  });

  test('aplicarCargo con km = 0', () => {
    const suv = new SUV(3, crearEstado(), 50, 12, 0, new Date(), 0);
    const reserva = crearReservaMock(3, 0);
    expect(suv.aplicarCargo(reserva)).toBe(36);
  });

  test('calcularBase sin exceso', () => {
    const suv = new SUV(4, crearEstado(), 40, 5, 0, new Date(), 0);
    const reserva = crearReservaMock(3, 300);
    expect(suv.calcularBase(reserva)).toBe(40 * 3 + 15);
  });

  test('calcularBase con exceso', () => {
    const suv = new SUV(5, crearEstado(), 60, 10, 0, new Date(), 0);
    const reserva = crearReservaMock(2, 750); // exceso 250 -> 62.5
    expect(suv.calcularBase(reserva)).toBeCloseTo(60 * 2 + (20 + 62.5));
  });

  test('setCargoFijo afecta aplicarCargo', () => {
    const suv = new SUV(6, crearEstado(), 90, 8, 0, new Date(), 0);
    const reserva = crearReservaMock(2, 400);
    expect(suv.aplicarCargo(reserva)).toBe(16);
    suv.setCargoFijo(12);
    expect(suv.getCargoFijo()).toBe(12);
    expect(suv.aplicarCargo(reserva)).toBe(24);
  });

  test('aplicarCargo responde a cambio de km', () => {
    const suv = new SUV(7, crearEstado(), 70, 10, 0, new Date(), 0);
    const reserva = crearReservaMock(2, 450);
    expect(suv.aplicarCargo(reserva)).toBe(20);
    reserva.getKilometraje.mockReturnValue(520);
    expect(suv.aplicarCargo(reserva)).toBe(25);
  });

  test('calcularBase refleja cambio de tarifa', () => {
    const suv = new SUV(8, crearEstado(), 55, 5, 0, new Date(), 0);
    const reserva = crearReservaMock(3, 550); // exceso 50 -> 12.5
    expect(suv.calcularBase(reserva)).toBeCloseTo(55 * 3 + (15 + 12.5));
    suv.setTarifa(70);
    expect(suv.calcularBase(reserva)).toBeCloseTo(70 * 3 + (15 + 12.5));
  });

  test('consistencia en escenarios múltiples', () => {
    const suv = new SUV(9, crearEstado(), 30, 6, 0, new Date(), 0);
    const r1 = crearReservaMock(1, 100);
    const r2 = crearReservaMock(5, 800); // exceso 300 -> 75
    expect(suv.calcularBase(r1)).toBe(30 * 1 + 6);
    expect(suv.calcularBase(r2)).toBe(30 * 5 + (30 + 75));
  });
});

describe('SUV (integración con Reserva real)', () => {
  test('Reserva real con temporada Alta', () => {
    const estado = new EstadoDisponible();
    const suv = new SUV(10, estado, 50, 10, 0, new Date(), 0);
    const clienteFake = mock<any>();
    const inicio = new Date(2025, 0, 1);
    const fin = new Date(2025, 0, 5);
    const reservaReal = new Reserva(1, clienteFake, inicio, fin, suv, 700, new Alta());
    expect(suv.calcularBase(reservaReal)).toBe(50 * 5 + (50 + 50));
  });
});
