export class ErrorEstadoRealizarMantenimiento extends Error {
  constructor() {
    super("El auto ya se encuentra en mantenimiento.");
    this.name = "ErrorEstadoRealizarMantenimiento";
  }
}