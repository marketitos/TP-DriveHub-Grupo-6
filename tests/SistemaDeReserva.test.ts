import SistemaDeReserva from '../src/models/SistemaDeReserva';
import Cliente from '../src/models/Cliente';
import SUV from '../src/models/SUV';
import Reserva from '../src/models/Reserva';
import ESTADO_VEHICULO from '../src/enums/ESTADO_VEHICULO';


describe('SistemaDeReserva', () => {
  let sistema: SistemaDeReserva;
  let cliente: Cliente;
  let suv: SUV;
  let fechaInicio: Date;
  let fechaFin: Date;

  beforeEach(() => {
    sistema = new SistemaDeReserva();
    cliente = new Cliente(1, 'Juan Perez');
    suv = new SUV(123, ESTADO_VEHICULO.DISPONIBLE, 50, 10);
    fechaInicio = new Date('2024-01-01');
    fechaFin = new Date('2024-01-10');
  });

  describe('Constructor', () => {
    test('debe inicializar con arrays vacíos', () => {
      expect(sistema.getAutos()).toEqual([]);
      expect(sistema.getClientes()).toEqual([]);
      expect(sistema.getReservas()).toEqual([]);
    });
  });

  describe('Gestión de Autos', () => {
    test('debe agregar y eliminar autos correctamente', () => {
      sistema.agregarAuto(suv);
      expect(sistema.getAutos()).toHaveLength(1);
      
      sistema.eliminarAuto(123);
      expect(sistema.getAutos()).toHaveLength(0);
    });
  });

  describe('Gestión de Clientes', () => {
    test('debe agregar y eliminar clientes correctamente', () => {
      sistema.agregarCliente(cliente);
      expect(sistema.getClientes()).toHaveLength(1);
      
      sistema.eliminarCliente(1);
      expect(sistema.getClientes()).toHaveLength(0);
    });
  });

  describe('Gestión de Reservas', () => {
    test('debe crear reservas correctamente', () => {
      sistema.crearReserva(cliente, suv, fechaInicio, fechaFin);
      expect(sistema.getReservas()).toHaveLength(1);
    });

    test('debe agregar y eliminar reservas existentes', () => {
      const reserva = new Reserva(1, cliente, fechaInicio, fechaFin, suv, 0);
      
      sistema.agregarReserva(reserva);
      expect(sistema.getReservas()).toHaveLength(1);
      
      sistema.eliminarReserva(1);
      expect(sistema.getReservas()).toHaveLength(0);
    });
  });

  describe('Métodos varios', () => {
    test('verificarDisponibilidad debe retornar false', () => {
      expect(sistema.verificarDisponibilidad()).toBe(false);
    });
    test('getters deben retornar arrays', () => {
      expect(Array.isArray(sistema.getAutos())).toBe(true);
      expect(Array.isArray(sistema.getClientes())).toBe(true);
      expect(Array.isArray(sistema.getReservas())).toBe(true);
    });


  });
});