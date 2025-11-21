import { mock } from 'jest-mock-extended';
import { Estadistica } from '../src/Utils/Estadistica';
import SistemaDeReserva from '../src/SistemaDeReserva';
import Auto from '../src/Auto/Auto';
import Reserva from '../src/Reserva';

const autoMock = (id: number) => {
  const a = mock<Auto>();
  // Usamos la referencia como clave, sin necesitar propiedades extra
  return a;
};

const reservaMock = (
  id: number,
  auto: Auto,
  inicio: Date,
  fin: Date,
  costo: number
) => {
  const r = mock<Reserva>();
  r.getAuto.mockReturnValue(auto);
  r.getFechaInicio.mockReturnValue(inicio);
  r.getFechaFin.mockReturnValue(fin);
  r.costoTotalReserva.mockReturnValue(costo);
  return r;
};

<<<<<<< Updated upstream
<<<<<<< Updated upstream
describe('Estadistica Tests', () => {
=======
describe('Estadistica con mocks', () => {
>>>>>>> Stashed changes
=======
describe('Estadistica con mocks', () => {
>>>>>>> Stashed changes
  let sistema: jest.Mocked<SistemaDeReserva>;
  let estadistica: Estadistica;

  beforeEach(() => {
    sistema = mock<SistemaDeReserva>();
    sistema.getReservas.mockReturnValue([]);
    sistema.getAutos.mockReturnValue([]);
    estadistica = new Estadistica(sistema as any);
  });

  test('obtenerVehiculoMasAlquilados retorna el más frecuente', () => {
    const a1 = autoMock(1);
    const a2 = autoMock(2);
    const rangoInicio = new Date('2025-01-01');
    const rangoFin = new Date('2025-01-31');

    const r1 = reservaMock(1, a1, new Date('2025-01-05'), new Date('2025-01-06'), 100);
    const r2 = reservaMock(2, a1, new Date('2025-01-10'), new Date('2025-01-12'), 150);
    const r3 = reservaMock(3, a2, new Date('2025-01-15'), new Date('2025-01-16'), 80);

    sistema.getReservas.mockReturnValue([r1, r2, r3]);

    const res = estadistica.obtenerVehiculoMasAlquilados(rangoInicio, rangoFin);
    expect(res).toBe(a1);
  });

  test('obtenerVehiculoMasAlquilados sin reservas en rango retorna undefined', () => {
    sistema.getReservas.mockReturnValue([]);
    const res = estadistica.obtenerVehiculoMasAlquilados(
      new Date('2025-01-01'),
      new Date('2025-01-31')
    );
    expect(res).toBeUndefined();
  });

  test('obtenerVehiculoMasAlquilados empate retorna uno de los autos', () => {
    const a1 = autoMock(1);
    const a2 = autoMock(2);
    const r1 = reservaMock(1, a1, new Date('2025-01-05'), new Date('2025-01-06'), 50);
    const r2 = reservaMock(2, a2, new Date('2025-01-07'), new Date('2025-01-08'), 60);
    sistema.getReservas.mockReturnValue([r1, r2]);
    const res = estadistica.obtenerVehiculoMasAlquilados(
      new Date('2025-01-01'),
      new Date('2025-01-31')
    );
    expect([a1, a2]).toContain(res);
  });

  test('obtenerVehiculoMenosAlquilados retorna el menos frecuente', () => {
    const a1 = autoMock(1);
    const a2 = autoMock(2);
    const a3 = autoMock(3);
    const r1 = reservaMock(1, a1, new Date('2025-01-05'), new Date('2025-01-06'), 70);
    const r2 = reservaMock(2, a1, new Date('2025-01-07'), new Date('2025-01-08'), 90);
    const r3 = reservaMock(3, a2, new Date('2025-01-09'), new Date('2025-01-10'), 40);
    const r4 = reservaMock(4, a3, new Date('2025-01-11'), new Date('2025-01-12'), 30);
    sistema.getReservas.mockReturnValue([r1, r2, r3, r4]);
    const res = estadistica.obtenerVehiculoMenosAlquilados(
      new Date('2025-01-01'),
      new Date('2025-01-31')
    );
    expect([a2, a3]).toContain(res); // ambos con 1
  });

  test('obtenerVehiculoMenosAlquilados sin reservas retorna undefined', () => {
    sistema.getReservas.mockReturnValue([]);
    const res = estadistica.obtenerVehiculoMenosAlquilados(
      new Date('2025-01-01'),
      new Date('2025-01-31')
    );
    expect(res).toBeUndefined();
  });

  test('calcularVehiculoMayorRentabilidad retorna el mayor acumulado', () => {
    const a1 = autoMock(1);
    const a2 = autoMock(2);
    const r1 = reservaMock(1, a1, new Date('2025-02-01'), new Date('2025-02-02'), 100);
    const r2 = reservaMock(2, a2, new Date('2025-02-03'), new Date('2025-02-04'), 300);
    const r3 = reservaMock(3, a2, new Date('2025-02-05'), new Date('2025-02-06'), 250);
    sistema.getReservas.mockReturnValue([r1, r2, r3]);
    const res = estadistica.calcularVehiculoMayorRentabilidad();
    expect(res).toBe(a2);
  });

  test('calcularVehiculoMayorRentabilidad sin reservas retorna undefined', () => {
    sistema.getReservas.mockReturnValue([]);
    const res = estadistica.calcularVehiculoMayorRentabilidad();
    expect(res).toBeUndefined();
  });

  test('calcularVehiculoMenorRentabilidad retorna el menor acumulado', () => {
    const a1 = autoMock(1);
    const a2 = autoMock(2);
    const a3 = autoMock(3);
    const r1 = reservaMock(1, a1, new Date('2025-03-01'), new Date('2025-03-02'), 500);
    const r2 = reservaMock(2, a2, new Date('2025-03-03'), new Date('2025-03-04'), 50);
    const r3 = reservaMock(3, a3, new Date('2025-03-05'), new Date('2025-03-06'), 300);
    sistema.getReservas.mockReturnValue([r1, r2, r3]);
    const res = estadistica.calcularVehiculoMenorRentabilidad();
    expect(res).toBe(a2);
  });

  test('calcularVehiculoMenorRentabilidad sin reservas retorna undefined', () => {
    sistema.getReservas.mockReturnValue([]);
    const res = estadistica.calcularVehiculoMenorRentabilidad();
    expect(res).toBeUndefined();
  });

  test('ocupacionFlota retorna 0 si no hay autos', () => {
    sistema.getAutos.mockReturnValue([]);
    sistema.getReservas.mockReturnValue([]);
    expect(estadistica.ocupacionFlota()).toBe(0);
  });

  test('ocupacionFlota calcula proporción (2 ocupados de 5)', () => {
    const autos = [autoMock(1), autoMock(2), autoMock(3), autoMock(4), autoMock(5)];
    sistema.getAutos.mockReturnValue(autos);
    const hoy = new Date();
    const ayer = new Date(hoy.getTime() - 24 * 3600 * 1000);
    const manana = new Date(hoy.getTime() + 24 * 3600 * 1000);
    const fueraInicio = new Date('2024-01-01');
    const fueraFin = new Date('2024-01-02');
    const r1 = reservaMock(1, autos[0], ayer, manana, 100);
    const r2 = reservaMock(2, autos[2], ayer, manana, 200);
    const r3 = reservaMock(3, autos[4], fueraInicio, fueraFin, 50);
    sistema.getReservas.mockReturnValue([r1, r2, r3]);
    expect(estadistica.ocupacionFlota()).toBeCloseTo(2 / 5);
  });

  test('ocupacionFlota sin reservas activas hoy devuelve 0', () => {
    const autos = [autoMock(1), autoMock(2)];
    sistema.getAutos.mockReturnValue(autos);
    const pasadoInicio = new Date('2025-01-01');
    const pasadoFin = new Date('2025-01-02');
    const r = reservaMock(1, autos[0], pasadoInicio, pasadoFin, 10);
    sistema.getReservas.mockReturnValue([r]);
    expect(estadistica.ocupacionFlota()).toBe(0);
  });
});
