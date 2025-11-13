import Alta from '../src/models/Alta';
import Media from '../src/models/Media';
import Baja from '../src/models/Baja';

describe('Temporadas', () => {
    test('Alta tiene multiplicador 1.2 (+20%)', () => {
        const alta = new Alta();
        expect(alta.getMultiplicador()).toBe(1.2);
    });

    test('Media tiene multiplicador 1.0 (tarifa estándar)', () => {
        const media = new Media();
        expect(media.getMultiplicador()).toBe(1.0);
    });

    test('Baja tiene multiplicador 0.9 (-10%)', () => {
        const baja = new Baja();
        expect(baja.getMultiplicador()).toBe(0.9);
    });

    test('calcularTarifaAjustada funciona correctamente con Alta', () => {
        const alta = new Alta();
        const tarifaBase = 100;
        expect(alta.calcularTarifaAjustada(tarifaBase)).toBe(120);
    });

    test('calcularTarifaAjustada funciona correctamente con Media', () => {
        const media = new Media();
        const tarifaBase = 100;
        expect(media.calcularTarifaAjustada(tarifaBase)).toBe(100);
    });

    test('calcularTarifaAjustada funciona correctamente con Baja', () => {
        const baja = new Baja();
        const tarifaBase = 100;
        expect(baja.calcularTarifaAjustada(tarifaBase)).toBe(90);
    });

    test('setMultiplicador actualiza el multiplicador correctamente', () => {
        const alta = new Alta();
        expect(alta.getMultiplicador()).toBe(1.2);
        
        alta.setMultiplicador(1.5);
        expect(alta.getMultiplicador()).toBe(1.5);
        expect(alta.calcularTarifaAjustada(100)).toBe(150);
    });
});
