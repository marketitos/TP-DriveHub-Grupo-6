import Reserva from '../src/models/Reserva';
import Cliente from '../src/models/Cliente';
import Compacto from '../src/models/Compacto';
import ESTADO_VEHICULO from '../src/enums/ESTADO_VEHICULO';
import Alta from '../src/models/Alta';
import Media from '../src/models/Media';

describe('Reserva', () => {
  test('constructor y getters/setters funcionan correctamente', () => {
    const cliente = new Cliente(5, 'Test');
    const auto = new Compacto(111, ESTADO_VEHICULO.DISPONIBLE, 100);
    const inicio = new Date(2025, 0, 1);
    const fin = new Date(2025, 0, 1);
    const reserva = new Reserva(10, cliente, inicio, fin, auto, 50, new Alta());

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
    let fin = new Date(2025, 0, 1);
    fin = new Date(2025, 0, 31);
    const r3 = new Reserva(3, cliente, inicio, fin, auto, 0, new Alta());

    expect(r3.getDias()).toBe(31);
  });

  test('costoTotalReserva calcula correctamente con temporada Alta', () => {
    const cliente = new Cliente(1, 'A');
    const auto = new Compacto(1, ESTADO_VEHICULO.DISPONIBLE, 100);
    const inicio = new Date(2025, 0, 1);
    const fin = new Date(2025, 0, 2);
    const reserva = new Reserva(1, cliente, inicio, fin, auto, 100, new Alta());
    // Tarifa base: 100, Temporada Alta: +20% = 120, Días: 2, Costo: 120*2 = 240
    expect(reserva.costoTotalReserva()).toBe(240);
  });

  test('setters de Reserva funcionan correctamente', () => {
    const cliente = new Cliente(1, 'A');
    const auto = new Compacto(1, ESTADO_VEHICULO.DISPONIBLE, 100);
    const inicio = new Date(2025, 0, 1);
    const fin = new Date(2025, 0, 2);
    const reserva = new Reserva(1, cliente, inicio, fin, auto, 100, new Alta());

    reserva.setIdReserva(99);
    expect(reserva.getIdReserva()).toBe(99);

    const nuevoCliente = new Cliente(2, 'B');
    reserva.setCliente(nuevoCliente);
    expect(reserva.getCliente()).toBe(nuevoCliente);

    const nuevaFechaInicio = new Date(2025, 1, 1);
    reserva.setFechaInicio(nuevaFechaInicio);
    expect(reserva.getFechaInicio()).toBe(nuevaFechaInicio);

    const nuevoAuto = new Compacto(2, ESTADO_VEHICULO.DISPONIBLE, 150);
    reserva.setAuto(nuevoAuto);
    expect(reserva.getAuto()).toBe(nuevoAuto);
  });

  test('getTemporada y setTemporada funcionan correctamente', () => {
    const cliente = new Cliente(1, 'A');
    const auto = new Compacto(1, ESTADO_VEHICULO.DISPONIBLE, 100);
    const inicio = new Date(2025, 0, 1);
    const fin = new Date(2025, 0, 2);
    const alta = new Alta();
    const reserva = new Reserva(1, cliente, inicio, fin, auto, 100, alta);

    expect(reserva.getTemporada()).toBe(alta);

    const media = new Media();
    reserva.setTemporada(media);
    expect(reserva.getTemporada()).toBe(media);
  });

  test('obtenerTarifaDiaria retorna tarifa ajustada por temporada', () => {
    const cliente = new Cliente(1, 'A');
    const auto = new Compacto(1, ESTADO_VEHICULO.DISPONIBLE, 100);
    const inicio = new Date(2025, 0, 1);
    const fin = new Date(2025, 0, 2);
    const alta = new Alta();
    const reserva = new Reserva(1, cliente, inicio, fin, auto, 100, alta);

    // Tarifa base 100 * 1.2 (Alta) = 120
    expect(reserva.obtenerTarifaDiaria()).toBe(120);
  });
});
