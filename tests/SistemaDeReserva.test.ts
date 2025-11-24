import { mock } from 'jest-mock-extended';
import SistemaDeReserva from '../src/SistemaDeReserva';
import Cliente from '../src/Utils/Cliente';
import Reserva from '../src/Reserva';
import Auto from '../src/Auto/Auto';
import Temporadas from '../src/Temporadas/Temporadas';
import { EstadoActual } from '../src/Estados/EstadoActual';
import { ReservaCreator } from '../src/ReservaFactory';

const crearAutoMock = (matricula: number) => {
  const estado = mock<EstadoActual>();
  const auto = mock<Auto>();
  auto.getNroMatricula.mockReturnValue(matricula);
  auto.getEstado.mockReturnValue(estado);
  return { auto, estado };
};

const crearTemporadaMock = () => {
  const t = mock<Temporadas>();
  t.calcularTarifaAjustada.mockImplementation((base: number) => base);
  return t;
};

describe('SistemaDeReserva Tests', () => {
  let sistema: SistemaDeReserva;

  beforeEach(() => {
    sistema = new SistemaDeReserva();
  });

  test('constructor inicia arrays vacíos', () => {
    expect(sistema.getAutos()).toEqual([]);
    expect(sistema.getClientes()).toEqual([]);
    expect(sistema.getReservas()).toEqual([]);
  });

  test('agregar y eliminar autos', () => {
    const { auto: a1 } = crearAutoMock(101);
    const { auto: a2 } = crearAutoMock(202);
    sistema.agregarAuto(a1);
    sistema.agregarAuto(a2);
    expect(sistema.getAutos()).toHaveLength(2);
    sistema.eliminarAuto(101);
    expect(sistema.getAutos()).toHaveLength(1);
    expect(sistema.getAutos()[0]).toBe(a2);
  });

  test('eliminarAuto de matrícula inexistente no rompe', () => {
    const { auto: a1 } = crearAutoMock(10);
    sistema.agregarAuto(a1);
    sistema.eliminarAuto(999);
    expect(sistema.getAutos()).toHaveLength(1);
  });

  test('agregar y eliminar clientes', () => {
    const c1 = new Cliente(1, 'Uno');
    const c2 = new Cliente(2, 'Dos');
    sistema.agregarCliente(c1);
    sistema.agregarCliente(c2);
    expect(sistema.getClientes()).toHaveLength(2);
    sistema.eliminarCliente(1);
    expect(sistema.getClientes()).toHaveLength(1);
    expect(sistema.getClientes()[0]).toBe(c2);
  });

  test('eliminarCliente inexistente no modifica lista', () => {
    const c1 = new Cliente(1, 'Solo');
    sistema.agregarCliente(c1);
    sistema.eliminarCliente(999);
    expect(sistema.getClientes()).toHaveLength(1);
  });

  test('agregarReserva inserta instancia existente', () => {
    const c = new Cliente(10, 'Cliente');
    const { auto } = crearAutoMock(555);
    const temporada = crearTemporadaMock();
    const r = new Reserva(1, c, new Date(), new Date(), auto, 0, temporada);
    sistema.agregarReserva(r);
    expect(sistema.getReservas()).toHaveLength(1);
    expect(sistema.getReservas()[0]).toBe(r);
  });

  test('eliminarReserva quita por id', () => {
    const c = new Cliente(10, 'Cliente');
    const { auto } = crearAutoMock(555);
    const temporada = crearTemporadaMock();
    const r1 = new Reserva(1, c, new Date(), new Date(), auto, 0, temporada);
    const r2 = new Reserva(2, c, new Date(), new Date(), auto, 0, temporada);
    sistema.agregarReserva(r1);
    sistema.agregarReserva(r2);
    sistema.eliminarReserva(1);
    expect(sistema.getReservas()).toHaveLength(1);
    expect(sistema.getReservas()[0].getIdReserva()).toBe(2);
  });

  test('eliminarReserva inexistente no altera lista', () => {
    const c = new Cliente(10, 'Cliente');
    const { auto } = crearAutoMock(1);
    const temporada = crearTemporadaMock();
    const r = new Reserva(1, c, new Date(), new Date(), auto, 0, temporada);
    sistema.agregarReserva(r);
    sistema.eliminarReserva(999);
    expect(sistema.getReservas()).toHaveLength(1);
  });

  test('crearReserva agrega una nueva reserva con id incremental', () => {
    const cliente = new Cliente(1, 'Juan');
    const { auto, estado } = crearAutoMock(999);
    estado.puedeAlquilarse.mockImplementation(() => {});
    const inicio = new Date(2025, 0, 1);
    const fin = new Date(2025, 0, 3);
    const temporada = crearTemporadaMock();

    const result = sistema.crearReserva(
      cliente,
      auto,
      inicio,
      fin,
      150,
      temporada
    );

    expect(result.getIdReserva()).toBe(1);
    expect(result.getKilometraje()).toBe(150);
    expect(sistema.getReservas()).toHaveLength(1);
    expect(estado.puedeAlquilarse).toHaveBeenCalledWith(auto);
  });

  test('crearReserva con kilometraje por defecto usa 0', () => {
    const cliente = new Cliente(2, 'Defecto');
    const { auto, estado } = crearAutoMock(100);
    estado.puedeAlquilarse.mockImplementation(() => {});
    const reserva = sistema.crearReserva(
      cliente,
      auto,
      new Date(),
      new Date(),
      0,
      crearTemporadaMock()
    );
    expect(reserva.getKilometraje()).toBe(0);
  });

  test('crearReserva propaga error si auto no puede alquilarse', () => {
    const cliente = new Cliente(3, 'Error');
    const { auto, estado } = crearAutoMock(1000);
    const temporada = crearTemporadaMock();
    const err = new Error('No disponible');
    estado.puedeAlquilarse.mockImplementation(() => {
      throw err;
    });

    expect(() =>
      sistema.crearReserva(cliente, auto, new Date(), new Date(), 0, temporada)
    ).toThrow(err);

    expect(sistema.getReservas()).toHaveLength(0);
  });

  test('ids incrementan correctamente con múltiples creaciones usando factory por defecto', () => {
    const cliente = new Cliente(5, 'Multi');
    const { auto, estado } = crearAutoMock(222);
    estado.puedeAlquilarse.mockImplementation(() => {});
    const temporada = crearTemporadaMock();
    const r1 = sistema.crearReserva(
      cliente,
      auto,
      new Date(),
      new Date(),
      10,
      temporada
    );
    const r2 = sistema.crearReserva(
      cliente,
      auto,
      new Date(),
      new Date(),
      20,
      temporada
    );
    expect(r1.getIdReserva()).toBe(1);
    expect(r2.getIdReserva()).toBe(2);
  });

  test('setReservaCreator reemplaza la estrategia de creación', () => {
    const customCreator = mock<ReservaCreator>();
    customCreator.crearReserva.mockImplementation(
      (id, cl, fi, ff, au, km, temp) =>
        new Reserva(id, cl, fi, ff, au, km + 999, temp)
    );

    sistema.setReservaCreator(customCreator);

    const cliente = new Cliente(77, 'Factory');
    const { auto, estado } = crearAutoMock(321);
    estado.puedeAlquilarse.mockImplementation(() => {});
    const temporada = crearTemporadaMock();

    const reserva = sistema.crearReserva(
      cliente,
      auto,
      new Date(),
      new Date(),
      1,
      temporada
    );

    expect(reserva.getKilometraje()).toBe(1000);
    expect(customCreator.crearReserva).toHaveBeenCalledTimes(1);
  });
});
