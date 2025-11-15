import ESTADO_VEHICULO from "../src/enums/ESTADO_VEHICULO"
import Compacto from "../src/models/Compacto"
import { EstadoDisponible } from '../src/models/estadoDisponible'
import { estadoEnAlquiler } from '../src/models/estadoEnAlquiler'
import { estadoEnLimpieza } from '../src/models/estadoEnLimpieza'
import { estadoEnMantenimiento } from '../src/models/estadoEnMantenimiento'
import { ErrorAutoYaAlquilado } from '../src/models/Errores/errorEstadoEnAlquiler'
import { ErrorAutoEnLimpieza } from '../src/models/Errores/estadoEnLimpieza'
import { ErrorAutoEnMantenimiento } from '../src/models/Errores/errorEstadoEnMantenimiento'

describe("Tests de Estados de Auto", () => {
    let autoCompacto: Compacto;
    let estadoDisponible: EstadoDisponible;
    let estadoAlquiler: estadoEnAlquiler;
    let estadoLimpieza: estadoEnLimpieza;
    let estadoMantenimiento: estadoEnMantenimiento;

    beforeEach(() => {
        autoCompacto = new Compacto(123, ESTADO_VEHICULO.DISPONIBLE, 100)
        estadoDisponible = new EstadoDisponible()
        estadoAlquiler = new estadoEnAlquiler()
        estadoLimpieza = new estadoEnLimpieza()
        estadoMantenimiento = new estadoEnMantenimiento()
    })

    test('Auto en estado Disponible puede alquilarse', () => {
        expect(() => {
            estadoDisponible.puedeAlquilarse(autoCompacto)
        }).not.toThrow()
    })

    test('Auto cambia de Disponible a EnAlquiler al alquilarse', () => {
        estadoDisponible.puedeAlquilarse(autoCompacto)
        
        expect(() => {
            autoCompacto.getEstado().puedeAlquilarse(autoCompacto)
        }).toThrow(ErrorAutoYaAlquilado)
    })

    test('Auto en estado EnAlquiler lanza ErrorAutoYaAlquilado', () => {
        autoCompacto.actualizarEstado(estadoAlquiler)

        expect(() => {
            estadoAlquiler.puedeAlquilarse(autoCompacto)
        }).toThrow(ErrorAutoYaAlquilado)
    })

    test('Auto en estado EnLimpieza lanza ErrorAutoEnLimpieza', () => {
        autoCompacto.actualizarEstado(estadoLimpieza)

        expect(() => {
            estadoLimpieza.puedeAlquilarse(autoCompacto)
        }).toThrow(ErrorAutoEnLimpieza)
    })

    test('Auto en estado EnMantenimiento lanza ErrorAutoEnMantenimiento', () => {
        autoCompacto.actualizarEstado(estadoMantenimiento)

        expect(() => {
            (autoCompacto.getEstado() as estadoEnMantenimiento).puedeAlquilarse()
        }).toThrow(ErrorAutoEnMantenimiento)
    })

    test('Transición de Disponible a EnAlquiler funciona correctamente', () => {
        expect(() => {
            estadoDisponible.puedeAlquilarse(autoCompacto)
        }).not.toThrow()

        expect(() => {
            autoCompacto.getEstado().puedeAlquilarse(autoCompacto)
        }).toThrow(ErrorAutoYaAlquilado)
    })

    test('Transición de Disponible a EnLimpieza impide alquilar', () => {
        autoCompacto.actualizarEstado(estadoLimpieza)

        expect(() => {
            autoCompacto.getEstado().puedeAlquilarse(autoCompacto)
        }).toThrow(ErrorAutoEnLimpieza)
    })

    test('Transición de Disponible a EnMantenimiento impide alquilar', () => {
        autoCompacto.actualizarEstado(estadoMantenimiento)

        expect(() => {
            (autoCompacto.getEstado() as estadoEnMantenimiento).puedeAlquilarse()
        }).toThrow(ErrorAutoEnMantenimiento)
    })

    test('Múltiples autos mantienen estados independientes', () => {
        const auto1 = new Compacto(101, ESTADO_VEHICULO.DISPONIBLE, 100)
        const auto2 = new Compacto(102, ESTADO_VEHICULO.DISPONIBLE, 100)
        const auto3 = new Compacto(103, ESTADO_VEHICULO.DISPONIBLE, 100)

        estadoDisponible.puedeAlquilarse(auto1)
        auto2.actualizarEstado(new estadoEnLimpieza())
        auto3.actualizarEstado(new estadoEnMantenimiento())

        expect(() => {
            auto1.getEstado().puedeAlquilarse(auto1)
        }).toThrow(ErrorAutoYaAlquilado)

        expect(() => {
            auto2.getEstado().puedeAlquilarse(auto2)
        }).toThrow(ErrorAutoEnLimpieza)

        expect(() => {
            (auto3.getEstado() as estadoEnMantenimiento).puedeAlquilarse()
        }).toThrow(ErrorAutoEnMantenimiento)
    })
})
