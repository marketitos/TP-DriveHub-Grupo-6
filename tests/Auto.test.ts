import { mock } from 'jest-mock-extended';
import Compacto from '../src/Auto/Compacto';
import Reserva from '../src/Reserva';
import { EstadoActual } from '../src/Estados/EstadoActual';
import { estadoEnAlquiler } from '../src/Estados/estadoEnAlquiler';
import { EstadoDisponible } from '../src/Estados/estadoDisponible';
import { estadoEnMantenimiento } from '../src/Estados/estadoEnMantenimiento';
import Alta from '../src/Temporadas/Alta';

describe('Test Auto-Compacto', () => {
  test('aplicarCargo sin exceso de km', () => {
    const estado = mock<EstadoActual>();
    const auto = new Compacto(1, estado, 100);
    const reserva = mock<Reserva>();
    reserva.getDias.mockReturnValue(2);
    reserva.getKilometraje.mockReturnValue(200);
    expect(auto.aplicarCargo(reserva)).toBe(0);
  });

  test('aplicarCargo con exceso de km', () => {
    const estado = mock<EstadoActual>();
    const auto = new Compacto(2, estado, 100);
    const reserva = mock<Reserva>();
    reserva.getDias.mockReturnValue(2);
    reserva.getKilometraje.mockReturnValue(260);
    expect(auto.aplicarCargo(reserva)).toBeCloseTo(9);
  });

  test('calcularBase suma tarifa*días + cargo', () => {
    const estado = mock<EstadoActual>();
    const auto = new Compacto(3, estado, 100);
    const reserva = mock<Reserva>();
    reserva.getDias.mockReturnValue(2);
    reserva.getKilometraje.mockReturnValue(260);
    auto.setTarifa(100);
    expect(auto.calcularBase(reserva)).toBeCloseTo(209);
  });

  test('delegación puedeAlquilarse llama estado.puedeAlquilarse', () => {
    const estado = mock<EstadoActual>();
    const auto = new Compacto(4, estado, 150);
    auto.puedeAlquilarse(estado);
    expect(estado.puedeAlquilarse).toHaveBeenCalledTimes(1);
    expect(estado.puedeAlquilarse).toHaveBeenCalledWith(auto);
  });

  test('finalizarAlquiler en estadoEnAlquiler actualiza km, alquileres y estado', () => {
    const inicial = new estadoEnAlquiler();
    const auto = new Compacto(5, inicial, 120, 0, 5000, new Date(), 2);
    auto.finalizarAlquiler(300);
    expect(auto.getKmDesdeUltimoMantenimiento()).toBe(5300);
    expect(auto.getAlquileresCompletados()).toBe(3);
    expect(auto.getEstado()).toBeInstanceOf(EstadoDisponible);
  });

  test('necesitaMantenimiento por km cambia a estadoEnMantenimiento', () => {
    const estado = new EstadoDisponible();
    const auto = new Compacto(6, estado, 100, 0, 10000, new Date(), 0);
    expect(auto.necesitaMantenimiento()).toBe(true);
    expect(auto.getEstado()).toBeInstanceOf(estadoEnMantenimiento);
  });

  test('necesitaMantenimiento por meses cambia a estadoEnMantenimiento', () => {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() - 13);
    const auto = new Compacto(7, new EstadoDisponible(), 100, 0, 0, fecha, 0);
    expect(auto.necesitaMantenimiento()).toBe(true);
    expect(auto.getEstado()).toBeInstanceOf(estadoEnMantenimiento);
  });

  test('necesitaMantenimiento por alquileres cambia a estadoEnMantenimiento', () => {
    const auto = new Compacto(8, new EstadoDisponible(), 100, 0, 0, new Date(), 5);
    expect(auto.necesitaMantenimiento()).toBe(true);
    expect(auto.getEstado()).toBeInstanceOf(estadoEnMantenimiento);
  });

  test('realizarMantenimiento en EstadoDisponible resetea métricas', () => {
    const auto = new Compacto(9, new EstadoDisponible(), 100, 0, 9000, new Date(), 3);
    auto.realizarMantenimiento();
    expect(auto.getKmDesdeUltimoMantenimiento()).toBe(0);
    expect(auto.getAlquileresCompletados()).toBe(0);
  });

  test('costo total reserva integra tarifa ajustada y cálculo base', () => {
    const estado = mock<EstadoActual>({
      puedeAlquilarse: jest.fn(),
      necesitaMantenimiento: jest.fn().mockReturnValue(false),
      finalizarAlquiler: jest.fn(),
      realizarMantenimiento: jest.fn(),
      finalizarMantenimiento: jest.fn()
    });
    const auto = new Compacto(10, estado, 100);
    const reservaReal = new Reserva(1, mock<any>(), new Date(2025,0,1), new Date(2025,0,2), auto, 260, new Alta());
    const total = reservaReal.costoTotalReserva();
    expect(total).toBeCloseTo(249);
  });
});
 
