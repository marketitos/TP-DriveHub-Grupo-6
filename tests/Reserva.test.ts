import Reserva from '../src/models/Reserva';
import Cliente from '../src/models/Cliente';
import Compacto from '../src/models/Compacto';
import ESTADO_VEHICULO from '../src/enums/ESTADO_VEHICULO';

describe('Reserva', () => {
  test('constructor y getters/setters funcionan correctamente', () => {
    const cliente = new Cliente(5, 'Test');
  const auto = new Compacto(111, ESTADO_VEHICULO.DISPONIBLE, 100);
    const inicio = new Date(2025, 0, 1);
    const fin = new Date(2025, 0, 1);

    const reserva = new Reserva(10, cliente, inicio, fin, auto, 50);

    expect(reserva.getIdReserva()).toBe(10);
    expect(reserva.getCliente()).toBe(cliente);
    expect(reserva.getFechaInicio()).toBe(inicio);
    expect(reserva.getFechaFin()).toBe(fin);
    expect(reserva.getAuto()).toBe(auto);
    expect(reserva.getKilometraje()).toBe(50);

    reserva.setKilometraje(80);
    expect(reserva.getKilometraje()).toBe(80);

    const nuevoFin = new Date(2025, 0, 3);
    reserva.setFechaFin(nuevoFin);
    expect(reserva.getFechaFin()).toBe(nuevoFin);
  });

  test('getDias calcula correctamente (incluye ambos días)', () => {
    const cliente = new Cliente(1, 'A');
  const auto = new Compacto(1, ESTADO_VEHICULO.DISPONIBLE, 100);
    const inicio = new Date(2025, 0, 1);

    // mismo día -> 1
    let fin = new Date(2025, 0, 1);
    const r1 = new Reserva(1, cliente, inicio, fin, auto, 0);
    expect(r1.getDias()).toBe(1);

    // dos días consecutivos -> 2
    fin = new Date(2025, 0, 2);
    const r2 = new Reserva(2, cliente, inicio, fin, auto, 0);
    expect(r2.getDias()).toBe(2);

    // fin al final de mes: 1..31 -> 31 días
    fin = new Date(2025, 0, 31);
    const r3 = new Reserva(3, cliente, inicio, fin, auto, 0);
    expect(r3.getDias()).toBe(31);
  });

  test('costoTotalReserva por ahora devuelve 0 (stub)', () => {
    const cliente = new Cliente(1, 'A');
  const auto = new Compacto(1, ESTADO_VEHICULO.DISPONIBLE, 100);
    const inicio = new Date(2025, 0, 1);
    const fin = new Date(2025, 0, 2);

    const r = new Reserva(1, cliente, inicio, fin, auto, 100);
    expect(r.costoTotalReserva()).toBe(0);
  });
});
