import SistemaDeReserva from './models/SistemaDeReserva';
import Cliente from './models/Cliente';
import SUV from './models/SUV';
import ESTADO_VEHICULO from './enums/ESTADO_VEHICULO';

// Ejemplo de uso
const sistema = new SistemaDeReserva();

const cliente1 = new Cliente(1, "Juan Pérez");
const suv1 = new SUV(123, ESTADO_VEHICULO.DISPONIBLE, 100, 50);

sistema.agregarCliente(cliente1);
sistema.agregarAuto(suv1);

const fechaInicio = new Date('2024-01-01');
const fechaFin = new Date('2024-01-05');

//sistema.crearReserva();

console.log("Sistema de reservas inicializado");