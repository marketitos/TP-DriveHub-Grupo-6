export class errorEstadoNoMantenimiento extends Error {
  constructor() {
    super("Al auto no se le puede puede realizar mantenimiento en su estado actual.");
    this.name = "errorEstadoNoMantenimiento";
  }
}