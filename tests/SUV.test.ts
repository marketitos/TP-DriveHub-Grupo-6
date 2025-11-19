import ESTADO_VEHICULO from "../src/enums/ESTADO_VEHICULO"
import Cliente from "../src/models/Cliente"
import Reserva from "../src/models/Reserva"
import SUV from "../src/models/SUV"
import Alta from "../src/models/Alta"
import Media from "../src/models/Media"
import Baja from "../src/models/Baja"

describe("Tests clase compacto", ()=>{
    let cliente1: Cliente;
    let autoSUV: SUV;
    let fechaInicio: Date;
    let fechaFin: Date;
    let reserva: Reserva;

    beforeEach(() =>{
        cliente1= new Cliente(46362499,"Marcos")
        autoSUV = new SUV(12, ESTADO_VEHICULO.DISPONIBLE, 50, 10, 0, new Date("2023-01-01"), 0)
        fechaInicio = new Date("2025-10-01")
        fechaFin = new Date("2025-10-15")
        reserva = new Reserva(1, cliente1,fechaInicio,fechaFin,autoSUV,700, new Alta())
        
    })
    test('Prueba metodo calcularBase()', () => {
        expect(autoSUV.calcularBase(reserva)).toEqual(950)    
    })

    test('Prueba metodo aplicarCargo()', () => {

        expect(autoSUV.aplicarCargo(reserva)).toEqual(200)
    })
    test('Prueba metodo getCargoFijo', () => {
      expect(autoSUV.getCargoFijo()).toEqual(10)
    })

    test('Prueba metodo setCargoFijo', () => {
      autoSUV.setCargoFijo(15)
      expect(autoSUV.getCargoFijo()).toEqual(15)
    })
})
