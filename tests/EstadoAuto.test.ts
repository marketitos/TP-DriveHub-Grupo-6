import Compacto from '../src/Auto/Compacto';
import { EstadoDisponible } from '../src/Estados/estadoDisponible';
import { estadoEnAlquiler } from '../src/Estados/estadoEnAlquiler';
import { estadoEnMantenimiento } from '../src/Estados/estadoEnMantenimiento';
import { ErrorAutoYaAlquilado } from '../src/Errores/errorEstadoEnAlquiler';
import { ErrorEstadoRealizarMantenimiento } from '../src/Errores/errorEstadoRealizarMantenimiento';

describe('Patrón State de Auto (Compacto) sin estado de limpieza', () => {
  const nuevoAuto = (estado: any = new EstadoDisponible()) =>
    new Compacto(100, estado, 150, 0, 0, new Date(), 0);

  describe('EstadoDisponible', () => {
    test('puedeAlquilarse cambia a estadoEnAlquiler', () => {
      const auto = nuevoAuto(new EstadoDisponible());
      expect(() => auto.getEstado().puedeAlquilarse(auto)).not.toThrow();
      expect(auto.getEstado()).toBeInstanceOf(estadoEnAlquiler);
    });

    test('realizarMantenimiento resetea métricas', () => {
      const auto = nuevoAuto(new EstadoDisponible());
      auto.setKmDesdeUltimoMantenimiento(9000);
      auto.setAlquileresCompletados(4);
      auto.realizarMantenimiento();
      expect(auto.getKmDesdeUltimoMantenimiento()).toBe(0);
      expect(auto.getAlquileresCompletados()).toBe(0);
      expect(auto.getEstado()).toBeInstanceOf(EstadoDisponible);
    });
  });

  describe('estadoEnAlquiler', () => {
    test('puedeAlquilarse lanza ErrorAutoYaAlquilado', () => {
      const auto = nuevoAuto(new estadoEnAlquiler());
      expect(() => auto.getEstado().puedeAlquilarse(auto)).toThrow(ErrorAutoYaAlquilado);
    });

    test('finalizarAlquiler actualiza métricas y vuelve a disponible', () => {
      const auto = nuevoAuto(new estadoEnAlquiler());
      auto.setKmDesdeUltimoMantenimiento(500);
      auto.setAlquileresCompletados(2);
      auto.finalizarAlquiler(300);
      expect(auto.getKmDesdeUltimoMantenimiento()).toBe(800);
      expect(auto.getAlquileresCompletados()).toBe(3);
      expect(auto.getEstado()).toBeInstanceOf(EstadoDisponible);
    });
  });

  describe('estadoEnMantenimiento', () => {
    test('puedeAlquilarse lanza ErrorEstadoRealizarMantenimiento', () => {
      const auto = nuevoAuto(new estadoEnMantenimiento());
      expect(() => auto.getEstado().puedeAlquilarse(auto)).toThrow(ErrorEstadoRealizarMantenimiento);
    });

    test('finalizarMantenimiento vuelve a disponible', () => {
      const auto = nuevoAuto(new estadoEnMantenimiento());
      auto.getEstado().finalizarMantenimiento(auto);
      expect(auto.getEstado()).toBeInstanceOf(EstadoDisponible);
    });
  });

  describe('Transiciones básicas', () => {
    test('Disponible -> EnAlquiler -> finalizar -> Disponible', () => {
      const auto = nuevoAuto(new EstadoDisponible());
      auto.getEstado().puedeAlquilarse(auto);
      expect(auto.getEstado()).toBeInstanceOf(estadoEnAlquiler);
      auto.finalizarAlquiler(200);
      expect(auto.getEstado()).toBeInstanceOf(EstadoDisponible);
    });

    test('Autos independientes mantienen su propio estado', () => {
      const a1 = nuevoAuto(new EstadoDisponible());
      const a2 = nuevoAuto(new estadoEnAlquiler());
      const a3 = nuevoAuto(new estadoEnMantenimiento());

      a1.getEstado().puedeAlquilarse(a1);
      expect(a1.getEstado()).toBeInstanceOf(estadoEnAlquiler);
      expect(() => a2.getEstado().puedeAlquilarse(a2)).toThrow(ErrorAutoYaAlquilado);
      expect(() => a3.getEstado().puedeAlquilarse(a3)).toThrow(ErrorEstadoRealizarMantenimiento);
    });
  });

  describe('Necesidad de mantenimiento tras finalizar alquiler', () => {
    test('finalizarAlquiler dispara transición a mantenimiento si criterios se cumplen', () => {
      const auto = nuevoAuto(new estadoEnAlquiler());
      auto.setKmDesdeUltimoMantenimiento(9900);
      auto.setAlquileresCompletados(4);
      auto.finalizarAlquiler(200);
      expect(auto.getKmDesdeUltimoMantenimiento()).toBe(10100);
      expect(auto.getAlquileresCompletados()).toBe(5);
      const necesita = auto.necesitaMantenimiento();
      expect(necesita).toBe(true);
      expect(auto.getEstado()).toBeInstanceOf(estadoEnMantenimiento);
    });
  });
});
