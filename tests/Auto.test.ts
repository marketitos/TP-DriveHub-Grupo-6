import Auto from '../src/models/Auto';
import ESTADO_VEHICULO from '../src/enums/ESTADO_VEHICULO';
import Reserva from '../src/models/Reserva';

class AutoMock extends Auto {
  aplicarCargo = jest.fn().mockReturnValue(50);
  calcularBase = jest.fn().mockReturnValue(200);
}


describe('Clase Auto', () => {
  let auto: AutoMock;
  let reservaMock: Reserva;

  beforeEach(() => {
    reservaMock = {} as Reserva;
    auto = new AutoMock(1234, ESTADO_VEHICULO.DISPONIBLE, 100, 20);
  });

  test('Probar metodo getNroMatricula', () =>{
    expect(auto.getNroMatricula()).toEqual(1234)
  })

  test('Probar metodo setNroMatricula', () => {
    auto.setNroMatricula(123)
    expect(auto.getNroMatricula()).toEqual(123)
    
  })
test('Probar metodo getEstado', () => {
    expect(auto.getEstado()).toBe(ESTADO_VEHICULO.DISPONIBLE);
  });

  test('Probar metodo getTarifa', () => {
    expect(auto.getTarifa()).toBe(100);
  });

  test('Probar metodo getCargoAdicional', () => {
    expect(auto.getCargoAdicional()).toBe(20);
  });
  test('Probar metodo actualizarEstado', () => {
    auto.actualizarEstado(ESTADO_VEHICULO.EN_ALQUILER);
    expect(auto.getEstado()).toBe(ESTADO_VEHICULO.EN_ALQUILER);
  });


});