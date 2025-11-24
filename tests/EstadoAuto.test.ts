import Compacto from '../src/Auto/Compacto';
import { EstadoDisponible } from '../src/Estados/estadoDisponible';
import { estadoEnAlquiler } from '../src/Estados/estadoEnAlquiler';
import { estadoEnMantenimiento } from '../src/Estados/estadoEnMantenimiento';
import { ErrorAutoYaAlquilado } from '../src/Errores/errorEstadoEnAlquiler';
import { ErrorEstadoRealizarMantenimiento } from '../src/Errores/errorEstadoRealizarMantenimiento';

<<<<<<< HEAD
describe("Tests de Estados de Auto - Patrón State", () => {
    let auto: Compacto;

    beforeEach(() => {
        auto = new Compacto(123, new EstadoDisponible(), 100, 0, 0, new Date(), 0)
    })

    describe("Estado Disponible", () => {
        test('Auto en estado Disponible puede alquilarse sin lanzar error', () => {
            expect(() => {
                auto.getEstado().puedeAlquilarse(auto)
            }).not.toThrow()
        })

        test('Después de alquilarse, el estado cambia a EnAlquiler', () => {
            auto.getEstado().puedeAlquilarse(auto)
            
            expect(auto.getEstado()).toBeInstanceOf(estadoEnAlquiler)
        })

        test('Un auto alquilado no puede volver a alquilarse', () => {
            auto.getEstado().puedeAlquilarse(auto)
            
            expect(() => {
                auto.getEstado().puedeAlquilarse(auto)
            }).toThrow(ErrorAutoYaAlquilado)
        })
    })

    describe("Estado EnAlquiler", () => {
        beforeEach(() => {
            auto.actualizarEstado(new estadoEnAlquiler())
        })

        test('Auto en estado EnAlquiler lanza ErrorAutoYaAlquilado al intentar alquilar', () => {
            expect(() => {
                auto.getEstado().puedeAlquilarse(auto)
            }).toThrow(ErrorAutoYaAlquilado)
        })

        test('El mensaje de error es claro y descriptivo', () => {
            expect(() => {
                auto.getEstado().puedeAlquilarse(auto)
            }).toThrow('El auto ya está alquilado y no puede volver a alquilarse.')
        })
    })

    describe("Estado EnLimpieza", () => {
        beforeEach(() => {
            auto.actualizarEstado(new estadoEnLimpieza())
        })

        test('Auto en estado EnLimpieza lanza ErrorAutoEnLimpieza al intentar alquilar', () => {
            expect(() => {
                auto.getEstado().puedeAlquilarse(auto)
            }).toThrow(ErrorAutoEnLimpieza)
        })

        test('El mensaje de error indica que está en limpieza', () => {
            expect(() => {
                auto.getEstado().puedeAlquilarse(auto)
            }).toThrow('El auto está en limpieza y no puede alquilarse.')
        })
    })

    describe("Estado EnMantenimiento", () => {
        beforeEach(() => {
            auto.actualizarEstado(new estadoEnMantenimiento())
        })

        test('Auto en estado EnMantenimiento lanza ErrorAutoEnMantenimiento al intentar alquilar', () => {
            expect(() => {
                (auto.getEstado() as estadoEnMantenimiento).puedeAlquilarse()
            }).toThrow(ErrorAutoEnMantenimiento)
        })

        test('El mensaje de error indica que está en mantenimiento', () => {
            expect(() => {
                (auto.getEstado() as estadoEnMantenimiento).puedeAlquilarse()
            }).toThrow('El auto está en mantenimiento y no puede alquilarse.')
        })
    })

    describe("Probando el state", () => {
        test('probando el metodo puedeAlquilarse', () => {
 
            const autoDisponible = new Compacto(100, new EstadoDisponible(), 50, 0, 0, new Date(), 0)
            expect(() => autoDisponible.getEstado().puedeAlquilarse(autoDisponible)).not.toThrow()

   
            const autoAlquilado = new Compacto(200, new estadoEnAlquiler(), 50, 0, 0, new Date(), 0)
            expect(() => autoAlquilado.getEstado().puedeAlquilarse(autoAlquilado)).toThrow(ErrorAutoYaAlquilado)


            const autoLimpieza = new Compacto(300, new estadoEnLimpieza(), 50, 0, 0, new Date(), 0)
            expect(() => autoLimpieza.getEstado().puedeAlquilarse(autoLimpieza)).toThrow(ErrorAutoEnLimpieza)


            const autoMantenimiento = new Compacto(400, new estadoEnMantenimiento(), 50, 0, 0, new Date(), 0)
            expect(() => autoMantenimiento.getEstado().puedeAlquilarse(autoMantenimiento)).toThrow(ErrorAutoEnMantenimiento)
        })

        test('Múltiples autos con diferentes estados se comportan independientemente', () => {
            const auto1 = new Compacto(101, new EstadoDisponible(), 100, 0, 0, new Date(), 0)
            const auto2 = new Compacto(102, new EstadoDisponible(), 100, 0, 0, new Date(), 0)
            const auto3 = new Compacto(103, new EstadoDisponible(), 100, 0, 0, new Date(), 0)

            // Cambio el estado de cada auto independientemente
            auto1.getEstado().puedeAlquilarse(auto1)  // Disponible -> EnAlquiler
            auto2.actualizarEstado(new estadoEnLimpieza())
            auto3.actualizarEstado(new estadoEnMantenimiento())

            // Cada auto mantiene su propio estado
            expect(auto1.getEstado()).toBeInstanceOf(estadoEnAlquiler)
            expect(auto2.getEstado()).toBeInstanceOf(estadoEnLimpieza)
            expect(auto3.getEstado()).toBeInstanceOf(estadoEnMantenimiento)

            // Cada estado se comporta de manera diferente
            expect(() => auto1.getEstado().puedeAlquilarse(auto1)).toThrow(ErrorAutoYaAlquilado)
            expect(() => auto2.getEstado().puedeAlquilarse(auto2)).toThrow(ErrorAutoEnLimpieza)
            expect(() => (auto3.getEstado() as estadoEnMantenimiento).puedeAlquilarse()).toThrow(ErrorAutoEnMantenimiento)
        })
    })

    describe("Transiciones de Estado", () => {
        test('Transición: Disponible -> EnAlquiler -> se mantiene EnAlquiler', () => {
            expect(auto.getEstado()).toBeInstanceOf(EstadoDisponible)
            
            auto.getEstado().puedeAlquilarse(auto)
            expect(auto.getEstado()).toBeInstanceOf(estadoEnAlquiler)
            
            expect(() => auto.getEstado().puedeAlquilarse(auto)).toThrow(ErrorAutoYaAlquilado)
            expect(auto.getEstado()).toBeInstanceOf(estadoEnAlquiler)
        })

        test('Cambio manual de estado funciona correctamente', () => {
            expect(auto.getEstado()).toBeInstanceOf(EstadoDisponible)
            
            auto.actualizarEstado(new estadoEnLimpieza())
            expect(auto.getEstado()).toBeInstanceOf(estadoEnLimpieza)
            
            auto.actualizarEstado(new EstadoDisponible())
            expect(auto.getEstado()).toBeInstanceOf(EstadoDisponible)
        })
    })
})
=======
describe('Patrón State de Auto (Compacto)', () => {
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
>>>>>>> TF_Develop
