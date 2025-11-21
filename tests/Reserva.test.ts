import { mock } from 'jest-mock-extended';
import Reserva from '../src/Reserva';
import Cliente from '../src/Utils/Cliente';
import { estadoEnMantenimiento } from '../src/Estados/estadoEnMantenimiento';
import Auto from '../src/Auto/Auto';
import Temporadas from '../src/Temporadas/Temporadas';

const crearAutoMock = (tarifaInicial: number) => {
  const auto = mock<Auto>();
  let tarifa = tarifaInicial;

  auto.getTarifa.mockImplementation(() => tarifa);
  auto.setTarifa.mockImplementation((nueva) => {
    tarifa = nueva;
  });
  auto.calcularBase.mockImplementation((reserva: Reserva) => {
    // Simula cálculo base: tarifa actual * días + 10 (cargo fijo para observar efecto del cambio de tarifa)
    return tarifa * reserva.getDias() + 10;
  });
  auto.finalizarAlquiler.mockImplementation(() => {});
  auto.necesitaMantenimiento.mockReturnValue(false);
  auto.actualizarEstado.mockImplementation(() => {});

  return auto;
};

const crearTemporadaMock = (multiplicador: number) => {
  const temporada = mock<Temporadas>();
  temporada.getMultiplicador.mockReturnValue(multiplicador);
  temporada.calcularTarifaAjustada.mockImplementation((tarifaBase: number) => tarifaBase * multiplicador);
  return temporada;
};

<<<<<<< Updated upstream
<<<<<<< Updated upstream
describe('Reserva Tests', () => {
=======
describe('Reserva (mocks)', () => {
>>>>>>> Stashed changes
=======
describe('Reserva (mocks)', () => {
>>>>>>> Stashed changes
  test('constructor asigna propiedades y getters retornan valores', () => {
    const cliente = new Cliente(1, 'Cliente X');
    const auto = crearAutoMock(100);
    const temporada = crearTemporadaMock(1.2);
    const inicio = new Date(2025, 0, 1);
    const fin = new Date(2025, 0, 3);
    const reserva = new Reserva(10, cliente, inicio, fin, auto, 250, temporada);

    expect(reserva.getIdReserva()).toBe(10);
    expect(reserva.getCliente()).toBe(cliente);
    expect(reserva.getFechaInicio()).toBe(inicio);
    expect(reserva.getFechaFin()).toBe(fin);
    expect(reserva.getAuto()).toBe(auto);
    expect(reserva.getKilometraje()).toBe(250);
    expect(reserva.getTemporada()).toBe(temporada);
  });

  test('getDias (mismo día) retorna 1', () => {
    const reserva = new Reserva(
      1,
      new Cliente(2, 'A'),
      new Date(2025, 0, 5),
      new Date(2025, 0, 5),
      crearAutoMock(100),
      0,
      crearTemporadaMock(1)
    );
    expect(reserva.getDias()).toBe(1);
  });

  test('getDias (rango de varios días) incluye ambos extremos', () => {
    const reserva = new Reserva(
      2,
      new Cliente(3, 'B'),
      new Date(2025, 0, 1),
      new Date(2025, 0, 10),
      crearAutoMock(50),
      0,
      crearTemporadaMock(1)
    );
    expect(reserva.getDias()).toBe(10);
  });

  test('obtenerTarifaDiaria aplica multiplicador de temporada', () => {
    const auto = crearAutoMock(200);
    const temporada = crearTemporadaMock(1.2);
    const reserva = new Reserva(3, new Cliente(4, 'C'), new Date(), new Date(), auto, 0, temporada);
    expect(reserva.obtenerTarifaDiaria()).toBe(240);
    expect(temporada.calcularTarifaAjustada).toHaveBeenCalledWith(200);
  });

  test('costoTotalReserva ajusta tarifa del auto antes de calcular base', () => {
    const auto = crearAutoMock(100);
    const temporada = crearTemporadaMock(1.2);
    const inicio = new Date(2025, 0, 1);
    const fin = new Date(2025, 0, 2); // 2 días
    const reserva = new Reserva(4, new Cliente(5, 'D'), inicio, fin, auto, 0, temporada);

    const total = reserva.costoTotalReserva();
    // Tarifa ajustada 100 * 1.2 = 120; base simulada = 120 * 2 + 10 = 250
    expect(total).toBe(250);
    expect(auto.setTarifa).toHaveBeenCalledWith(120);
    expect(auto.calcularBase).toHaveBeenCalledWith(reserva);
  });

  test('costoTotalReserva usa nueva tarifa si se llama dos veces (idempotencia sobre tarifa modificada)', () => {
    const auto = crearAutoMock(80);
    const temporada = crearTemporadaMock(1.5); // Ajuste a 120
    const reserva = new Reserva(5, new Cliente(6, 'E'), new Date(2025, 0, 1), new Date(2025, 0, 3), auto, 0, temporada); // 3 días

    const t1 = reserva.costoTotalReserva(); // 120 * 3 + 10 = 370
    const t2 = reserva.costoTotalReserva(); // vuelve a ajustar (120*1.5=180) => 180 * 3 + 10 = 550
    expect(t1).toBe(370);
    expect(t2).toBe(550);
    expect(auto.setTarifa).toHaveBeenNthCalledWith(1, 120);
    expect(auto.setTarifa).toHaveBeenNthCalledWith(2, 180);
  });

  test('finalizarReserva llama finalizarAlquiler con kilometraje', () => {
    const auto = crearAutoMock(100);
    auto.necesitaMantenimiento.mockReturnValue(false);
    const reserva = new Reserva(
      6,
      new Cliente(7, 'F'),
      new Date(),
      new Date(),
      auto,
      345,
      crearTemporadaMock(1)
    );
    reserva.finalizarReserva();
    expect(auto.finalizarAlquiler).toHaveBeenCalledWith(345);
    expect(auto.actualizarEstado).not.toHaveBeenCalled();
  });

  test('finalizarReserva actualiza estado si necesita mantenimiento', () => {
    const auto = crearAutoMock(100);
    auto.necesitaMantenimiento.mockReturnValue(true);
    const reserva = new Reserva(
      7,
      new Cliente(8, 'G'),
      new Date(),
      new Date(),
      auto,
      100,
      crearTemporadaMock(1)
    );
    reserva.finalizarReserva();
    expect(auto.finalizarAlquiler).toHaveBeenCalledWith(100);
    expect(auto.actualizarEstado).toHaveBeenCalledTimes(1);
    const argumentoEstado = auto.actualizarEstado.mock.calls[0][0];
    expect(argumentoEstado).toBeInstanceOf(estadoEnMantenimiento);
  });

  test('setters modifican estado interno correctamente', () => {
    const cliente = new Cliente(9, 'H');
    const auto = crearAutoMock(100);
    const reserva = new Reserva(
      8,
      cliente,
      new Date(2025, 0, 1),
      new Date(2025, 0, 2),
      auto,
      10,
      crearTemporadaMock(1)
    );

    const cliente2 = new Cliente(10, 'I');
    reserva.setCliente(cliente2);
    reserva.setIdReserva(99);
    const nuevoInicio = new Date(2025, 1, 1);
    const nuevoFin = new Date(2025, 1, 5);
    reserva.setFechaInicio(nuevoInicio);
    reserva.setFechaFin(nuevoFin);
    reserva.setKilometraje(777);
    const temporada2 = crearTemporadaMock(2);
    reserva.setTemporada(temporada2);

    expect(reserva.getCliente()).toBe(cliente2);
    expect(reserva.getIdReserva()).toBe(99);
    expect(reserva.getFechaInicio()).toBe(nuevoInicio);
    expect(reserva.getFechaFin()).toBe(nuevoFin);
    expect(reserva.getKilometraje()).toBe(777);
    expect(reserva.getTemporada()).toBe(temporada2);
  });
});
