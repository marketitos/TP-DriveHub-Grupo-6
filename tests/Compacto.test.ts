import ESTADO_VEHICULO from "../src/enums/ESTADO_VEHICULO"
import Cliente from "../src/models/Cliente"
import Compacto from "../src/models/Compacto"
import Reserva from "../src/models/Reserva"
import Alta from "../src/models/Alta"

describe("Tests clase compacto", ()=>{
    let cliente1: Cliente;
    let autocompacto: Compacto;
    let fechaInicio: Date;
    let fechaFin: Date;
    let reserva: Reserva;
    
    beforeEach(() =>{
        cliente1= new Cliente(46362499,"Marcos")
        autocompacto=new Compacto(566, ESTADO_VEHICULO.DISPONIBLE,30)
        fechaInicio = new Date("2025-10-01")
        fechaFin = new Date("2025-10-05")
        reserva = new Reserva(1, cliente1,fechaInicio,fechaFin,autocompacto,700, new Alta())
    })
    
    test('Prueba metodo calcularBase()', () => {
        expect(autocompacto.calcularBase(reserva)).toEqual(180)    
    })
    
    test('Prueba metodo aplicarCargo()', () => {
        let reserva = new Reserva(1, cliente1,fechaInicio,fechaFin,autocompacto,700, new Alta())
        expect(autocompacto.aplicarCargo(reserva)).toEqual(30)    
    })
})