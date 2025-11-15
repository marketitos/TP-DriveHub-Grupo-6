export class ErrorAutoEnLimpieza extends Error {
  constructor() {
    super("El auto está en limpieza y no puede alquilarse.");
    this.name = "ErrorAutoEnLimpieza";
  }
}