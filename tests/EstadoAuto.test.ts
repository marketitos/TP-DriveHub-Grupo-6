import ESTADO_VEHICULO from "../src/enums/ESTADO_VEHICULO"
import Compacto from "../src/models/Compacto"
import { EstadoDisponible } from '../src/models/estadoDisponible'
import { estadoEnAlquiler } from '../src/models/estadoEnAlquiler'
import { estadoEnLimpieza } from '../src/models/estadoEnLimpieza'
import { estadoEnMantenimiento } from '../src/models/estadoEnMantenimiento'
import { ErrorAutoYaAlquilado } from '../src/models/Errores/errorEstadoEnAlquiler'
import { ErrorAutoEnLimpieza } from '../src/models/Errores/estadoEnLimpieza'
import { ErrorAutoEnMantenimiento } from '../src/models/Errores/errorEstadoEnMantenimiento'

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
