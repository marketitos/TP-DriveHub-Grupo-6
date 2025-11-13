class ErrorAutoEnMantenimiento extends Error {
  constructor() {
    super("El auto está en mantenimiento y no puede alquilarse.");
    this.name = "ErrorAutoEnMantenimiento";
  }
}