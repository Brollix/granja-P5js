# Simulador de Jardinería - Física de Objetos 2D

**Materia:** Física de Objetos 2D  
**Estudiantes:** Agustin Brollo, Agustin Murgia, Nazareno Scala  
**Fecha:** 25/9/2025

## Descripción

Juego de jardinería interactivo que implementa conceptos de física 2D usando P5.js. El objetivo es plantar semillas, regarlas con una manguera y cosechar las plantas cuando estén listas.

## Demo en Vivo

🌐 **Juega:** [https://brollix.github.io/granja-P5js/](https://brollix.github.io/granja-P5js/)

## Conceptos Físicos Implementados

- **MRUV (Movimiento Rectilíneo Uniformemente Variado):** Las partículas de agua siguen trayectorias parabólicas
- **Gravedad:** Aceleración constante hacia abajo
- **Colisiones:** Detección entre agua y plantas para activar el crecimiento
- **Rebote:** Las partículas rebotan en los bordes laterales
- **Fricción:** Reducción de velocidad al tocar el suelo

## Controles

- **Click:** Plantar semilla en posición disponible
- **R:** Activar/desactivar manguera (requiere agua en el tanque)
- **C:** Cosechar plantas maduras
- **Arrastrar bomba:** Click y arrastrar la bomba hacia abajo para extraer agua del pozo

## Funcionamiento

1. **Plantación:** Las semillas aparecen como círculos marrones pequeños en posiciones predefinidas
2. **Sistema de agua:** Debes bombear agua desde el pozo arrastrando la bomba hacia abajo
3. **Riego:** Al activar la manguera (tecla R), las partículas de agua caen con física realista
4. **Crecimiento:** Cuando el agua toca una semilla, se acumula en una barra de progreso
5. **Maduración:** Al llenar la barra de agua, la planta madura y muestra "¡LISTA!"
6. **Cosecha:** Las plantas maduras pueden cosecharse con la tecla C por 25 puntos cada una
7. **Gestión de recursos:** El agua es limitada, debes bombear más cuando se agote

## Tecnologías

- P5.js para gráficos y física
- JavaScript para lógica del juego
- HTML5 para la interfaz

## Archivos

- `index.html` - Página principal
- `main.js` - Código principal del juego
- `Plant.js` - Clase para las plantas y semillas
- `HoseWater.js` - Clase para las partículas de agua
- `PlantPreview.js` - Vista previa de plantación
- `Pump.js` - Sistema de bomba y extracción de agua
- `README.md` - Este archivo
