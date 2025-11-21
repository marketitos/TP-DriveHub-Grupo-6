import { mock } from 'jest-mock-extended';
import Cliente from '../src/Utils/Cliente';
import Compacto from '../src/Auto/Compacto';
import { EstadoActual } from '../src/Estados/EstadoActual';
import Reserva from '../src/Reserva';
import Alta from '../src/Temporadas/Alta';

const crearEstadoMock = () => mock<EstadoActual>();

const crearReservaReal = (id: number, auto: Compacto, dias: number, km: number) => {
  const inicio = new Date(2025, 0, 1);
  const fin = new Date(2025, 0, 1 + (dias - 1));
  return new Reserva(id, mock<Cliente>(), inicio, fin, auto, km, new Alta());
};

const crearReservaMock = (dias: number, km: number) => {
  const r = mock<Reserva>();
  r.getDias.mockReturnValue(dias);
  r.getKilometraje.mockReturnValue(km);
  return r;
};

describe('Compacto (tests con mocks)', () => {
  test('aplicarCargo sin exceso (km == tope)', () => {
    const auto = new Compacto(1, crearEstadoMock(), 100);
    const reserva = crearReservaMock(3, 300);
    expect(auto.aplicarCargo(reserva)).toBe(0);
  });

  test('aplicarCargo sin exceso (km < tope)', () => {
    const auto = new Compacto(2, crearEstadoMock(), 100);
    const reserva = crearReservaMock(2, 150);
    expect(auto.aplicarCargo(reserva)).toBe(0);
  });

  test('aplicarCargo con exceso (cargo calculado)', () => {
    const auto = new Compacto(3, crearEstadoMock(), 100);
    const reserva = crearReservaMock(5, 700);
    expect(auto.aplicarCargo(reserva)).toBeCloseTo(30);
  });

  test('calcularBase sin cargo', () => {
    const auto = new Compacto(4, crearEstadoMock(), 80);
    const reserva = crearReservaMock(4, 400);
    expect(auto.calcularBase(reserva)).toBe(320);
  });

  test('calcularBase con cargo', () => {
    const auto = new Compacto(5, crearEstadoMock(), 30);
    const reserva = crearReservaMock(5, 700);
    expect(auto.calcularBase(reserva)).toBe(180);
  });

  test('calcularBase refleja tarifa modificada antes del cálculo', () => {
    const auto = new Compacto(6, crearEstadoMock(), 50);
    auto.setTarifa(75);
    const reserva = crearReservaMock(2, 250);
    expect(auto.calcularBase(reserva)).toBeCloseTo(157.5);
  });

  test('aplicarCargo recalcula con cambios en mock de kilometraje', () => {
    const auto = new Compacto(7, crearEstadoMock(), 40);
    const reserva = crearReservaMock(2, 250);
    expect(auto.aplicarCargo(reserva)).toBeCloseTo(7.5);
    reserva.getKilometraje.mockReturnValue(210);
    expect(auto.aplicarCargo(reserva)).toBeCloseTo(1.5);
  });

  test('integración calcularBase con Reserva real (exceso km)', () => {
    const auto = new Compacto(8, crearEstadoMock(), 60);
    const reservaReal = crearReservaReal(1, auto, 3, 400);
    expect(auto.calcularBase(reservaReal)).toBe(60 * 3 + 15);
  });

  test('integración aplicarCargo con Reserva real (sin exceso)', () => {
    const auto = new Compacto(9, crearEstadoMock(), 90);
    const reservaReal = crearReservaReal(2, auto, 2, 200);
    expect(auto.aplicarCargo(reservaReal)).toBe(0);
  });

  test('calcularBase varía al cambiar días en el mock', () => {
    const auto = new Compacto(10, crearEstadoMock(), 55);
    const reserva = crearReservaMock(2, 260); // exceso 60 cargo 9
    expect(auto.calcularBase(reserva)).toBeCloseTo(55 * 2 + 9);
    reserva.getDias.mockReturnValue(3); // nuevo tope 300 sin exceso
    reserva.getKilometraje.mockReturnValue(260);
    expect(auto.calcularBase(reserva)).toBe(55 * 3);
  });

  // Bloque adicional (desde 0 con mocks) integrado:
  const crearAuto = (tarifa = 100) => {
    const estado = mock<EstadoActual>();
    return new Compacto(11, estado, tarifa);
  };

  const reservaMockAlt = (dias: number, kilometraje: number) => {
    const r = mock<Reserva>();
    r.getDias.mockReturnValue(dias);
    r.getKilometraje.mockReturnValue(kilometraje);
    return r;
  };

  test('aplicarCargo sin exceso (kilometraje igual al tope)', () => {
    const auto = crearAuto();
    const reserva = reservaMockAlt(3, 300);
    expect(auto.aplicarCargo(reserva)).toBe(0);
  });

  test('aplicarCargo sin exceso (kilometraje menor al tope)', () => {
    const auto = crearAuto();
    const reserva = reservaMockAlt(2, 150);
    expect(auto.aplicarCargo(reserva)).toBe(0);
  });

  test('aplicarCargo con exceso (cargo calculado)', () => {
    const auto = crearAuto();
    const reserva = reservaMockAlt(5, 700);
    expect(auto.aplicarCargo(reserva)).toBeCloseTo(30);
  });

  test('calcularBase sin cargo (solo tarifa * días)', () => {
    const auto = crearAuto(80);
    const reserva = reservaMockAlt(4, 400);
    expect(auto.calcularBase(reserva)).toBe(320);
  });

  test('calcularBase con cargo (tarifa*días + cargo)', () => {
    const auto = crearAuto(30);
    const reserva = reservaMockAlt(5, 700);
    expect(auto.calcularBase(reserva)).toBe(180);
  });

  test('calcularBase tras cambio de tarifa', () => {
    const auto = crearAuto(50);
    auto.setTarifa(75);
    const reserva = reservaMockAlt(2, 250);
    expect(auto.calcularBase(reserva)).toBeCloseTo(157.5);
  });

  test('aplicarCargo múltiples veces refleja cambios de mock', () => {
    const auto = crearAuto(40);
    const reserva = reservaMockAlt(2, 250);
    expect(auto.aplicarCargo(reserva)).toBeCloseTo(7.5);
    reserva.getKilometraje.mockReturnValue(210);
    expect(auto.aplicarCargo(reserva)).toBeCloseTo(1.5);
  });
});
