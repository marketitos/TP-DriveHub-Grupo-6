import ESTADO_VEHICULO from "../src/enums/ESTADO_VEHICULO"
import Cliente from "../src/models/Cliente"
import Compacto from "../src/models/Compacto"
import Reserva from "../src/models/Reserva"

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
        fechaFin = new Date("2025-10-15")
        reserva = new Reserva(1, cliente1,fechaInicio,fechaFin,autocompacto,700)
        
    })
    test('Prueba metodo calcularBase()', () => {
        expect(autocompacto.calcularBase(reserva)).toEqual(450)    
    })

    test('Prueba metodo aplicarCargo()', () => {
        let fechaFin = new Date("2025-10-05")
        let reserva = new Reserva(1, cliente1,fechaInicio,fechaFin,autocompacto,700)
        expect(autocompacto.aplicarCargo(reserva)).toEqual(30)    
    })
    
})