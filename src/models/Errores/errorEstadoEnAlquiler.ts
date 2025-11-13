class ErrorAutoYaAlquilado extends Error {
  constructor() {
    super("El auto ya está alquilado y no puede volver a alquilarse.");
    this.name = "ErrorAutoYaAlquilado";
  }
}