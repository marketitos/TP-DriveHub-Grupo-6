import { mock } from 'jest-mock-extended';
import Alta from '../src/Temporadas/Alta';
import Media from '../src/Temporadas/Media';
import Baja from '../src/Temporadas/Baja';
import Reserva from '../src/Reserva';
import Auto from '../src/Auto/Auto';
import Temporadas from '../src/Temporadas/Temporadas';

const crearAutoMock = (tarifa: number) => {
  const a = mock<Auto>();
  let t = tarifa;
  a.getTarifa.mockImplementation(() => t);
  a.setTarifa.mockImplementation(n => { t = n; });
  a.calcularBase.mockImplementation((r: Reserva) => a.getTarifa() * r.getDias());
  return a;
};

const crearReservaMock = (dias: number) => {
  const r = mock<Reserva>();
  r.getDias.mockReturnValue(dias);
  r.getKilometraje.mockReturnValue(0);
  return r;
};

describe('Temporadas multiplicadores', () => {
  test('Alta multiplicador 1.2', () => {
    expect(new Alta().getMultiplicador()).toBe(1.2);
  });
  test('Media multiplicador 1.0', () => {
    expect(new Media().getMultiplicador()).toBe(1.0);
  });
  test('Baja multiplicador 0.9', () => {
    expect(new Baja().getMultiplicador()).toBe(0.9);
  });
});

describe('calcularTarifaAjustada', () => {
  test('Alta ajusta 100 -> 120', () => {
    expect(new Alta().calcularTarifaAjustada(100)).toBe(120);
  });
  test('Media no altera 100', () => {
    expect(new Media().calcularTarifaAjustada(100)).toBe(100);
  });
  test('Baja ajusta 100 -> 90', () => {
    expect(new Baja().calcularTarifaAjustada(100)).toBe(90);
  });
});

describe('setMultiplicador afecta cuenta', () => {
  test('Alta cambia a 1.5', () => {
    const alta = new Alta();
    alta.setMultiplicador(1.5);
    expect(alta.getMultiplicador()).toBe(1.5);
    expect(alta.calcularTarifaAjustada(200)).toBe(300);
  });
});

describe('Temporadas Tests', () => {
  test('Reserva 3 días con Alta aplica tarifa ajustada antes de base', () => {
    const auto = crearAutoMock(100);
    const alta = new Alta();
    const reserva = crearReservaMock(3);
    const tarifaAjustada = alta.calcularTarifaAjustada(auto.getTarifa());
    auto.setTarifa(tarifaAjustada);
    const total = auto.calcularBase(reserva);
    expect(total).toBe(120 * 3);
  });
  test('Cambio de multiplicador recalcula distinto total', () => {
    const auto = crearAutoMock(80);
    const media = new Media();
    const reserva = crearReservaMock(2);
    auto.setTarifa(media.calcularTarifaAjustada(auto.getTarifa()));
    const t1 = auto.calcularBase(reserva);
    media.setMultiplicador(1.3);
    auto.setTarifa(media.calcularTarifaAjustada(80));
    const t2 = auto.calcularBase(reserva);
    expect(t1).toBe(160);
    expect(t2).toBe(208);
  });
  test('Baja seguido de ajuste manual', () => {
    const auto = crearAutoMock(200);
    const baja = new Baja();
    const reserva = crearReservaMock(1);
    auto.setTarifa(baja.calcularTarifaAjustada(200));
    const t1 = auto.calcularBase(reserva);
    baja.setMultiplicador(0.5);
    auto.setTarifa(baja.calcularTarifaAjustada(200));
    const t2 = auto.calcularBase(reserva);
    expect(t1).toBe(180);
    expect(t2).toBe(100);
  });
});
