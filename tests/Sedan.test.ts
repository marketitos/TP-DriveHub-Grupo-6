import ESTADO_VEHICULO from "../src/enums/ESTADO_VEHICULO"
import Cliente from "../src/models/Cliente"
import Reserva from "../src/models/Reserva"
import Sedan from "../src/models/Sedan"

describe("Tests clase compacto", ()=>{
    let cliente1: Cliente;
    let autoSedan: Sedan
    let fechaInicio: Date;
    let fechaFin: Date;
    let reserva: Reserva;

    beforeEach(() =>{
        cliente1= new Cliente(46362499,"Marcos")
        autoSedan = new Sedan(566, ESTADO_VEHICULO.DISPONIBLE,30)
        fechaInicio = new Date("2025-10-01")
        fechaFin = new Date("2025-10-15")
        reserva = new Reserva(1, cliente1,fechaInicio,fechaFin,autoSedan,700)
        
    })
    test('Prueba metodo calcularBase()', () => {
        
        expect(autoSedan.calcularBase(reserva)).toEqual(590)
    })

    test('Prueba metodo aplicarCargo()', () => {
        expect(autoSedan.aplicarCargo(reserva)).toEqual(140)
    })

    test('Prueba metodo setCargoPorKilometro', () => {
      autoSedan.setCargoPorKilometro(50)
      expect(autoSedan.getCargoPorKilometro()).toEqual(50)
    })
    
    
})