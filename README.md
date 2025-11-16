# DriveHub - Sistema de Reserva de Vehículos

Este proyecto implementa la lógica de negocio completa para la gestión integral de un servicio de alquiler de vehículos. El sistema modela la flota, los estados de los vehículos, las reservas, la tarificación por temporada y un módulo estadístico avanzado para análisis de negocio.

## Características

- **Gestión de Vehículos**: Soporte para múltiples tipos de vehículos (Compacto, Sedán, SUV)
- **Sistema de Reservas**: Gestión completa del ciclo de vida de las reservas
- **Estados de Vehículos**: Disponible, En Alquiler, En Mantenimiento, En Limpieza
- **Temporadas**: Precios dinámicos según temporada (Alta, Media, Baja)
- **Estadísticas**: Seguimiento de vehículos más alquilados y clientes frecuentes

## Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/marketitos/TP-DriveHub-Grupo-6.git

# Entrar al directorio
cd TP-DriveHub-Grupo-6

# Instalar dependencias
npm install

# Compilar el proyecto TypeScript
npm run build

# Correr los tests
npx jest

# Generar documentación del código
npm run doc1

##Estructura del proyecto

├── src/
│   ├── models/        # Clases principales del sistema
│   ├── enums/         # Enumeraciones
│   └── index.ts       # Punto de entrada
├── tests/             # Pruebas unitarias
├── docs/              # Documentación generada
├── diagramas/         # Diagramas UML
└── package.json       # Configuración del proyecto
