export class ErrorEstadoDisponible extends Error {
  constructor() {
    super("Este auto no esta alquilado.");
    this.name = "ErrorEstadoDisponible";
  }
}