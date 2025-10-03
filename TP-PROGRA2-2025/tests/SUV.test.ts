import ESTADO_VEHICULO from "../src/enums/ESTADO_VEHICULO"
import Cliente from "../src/models/Cliente"
import Compacto from "../src/models/Compacto"
import Reserva from "../src/models/Reserva"
import SUV from "../src/models/SUV"

describe("Tests clase compacto", ()=>{
    let cliente1: Cliente;
    let autoSUV: SUV;
    let fechaInicio: Date;
    let fechaFin: Date;
    let reserva: Reserva;

    beforeEach(() =>{
        cliente1= new Cliente(46362499,"Marcos")
        autoSUV=new SUV(566, ESTADO_VEHICULO.DISPONIBLE,80,15)
        fechaInicio = new Date("2025-10-01")
        fechaFin = new Date("2025-10-15")
        reserva = new Reserva(1, cliente1,fechaInicio,fechaFin,autoSUV,700)
        
    })
    test('Prueba metodo calcularBase()', () => {
        expect(autoSUV.calcularBase(reserva)).toEqual(1475)    
    })

    test('Prueba metodo aplicarCargo()', () => {
        expect(autoSUV.aplicarCargo(reserva)).toEqual(275)
    })
    
})