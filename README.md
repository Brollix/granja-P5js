# Simulador de Jardinería - Física de Objetos 2D

**Materia:** Física de Objetos 2D  
**Estudiante:** [Tu Nombre]  
**Fecha:** [Fecha]  

## Descripción

Juego de jardinería interactivo que implementa conceptos de física 2D usando P5.js. El objetivo es plantar semillas, regarlas con una manguera y cosechar las plantas cuando estén listas.

## Conceptos Físicos Implementados

- **MRUV (Movimiento Rectilíneo Uniformemente Variado):** Las partículas de agua siguen trayectorias parabólicas
- **Gravedad:** Aceleración constante hacia abajo
- **Colisiones:** Detección entre agua y plantas para activar el crecimiento
- **Rebote:** Las partículas rebotan en los bordes laterales
- **Fricción:** Reducción de velocidad al tocar el suelo

## Controles

- **Click:** Plantar semilla
- **R:** Activar/desactivar manguera
- **C:** Cosechar plantas maduras

## Funcionamiento

1. Las semillas aparecen como círculos marrones pequeños
2. Al regar con la manguera, las partículas de agua caen con gravedad
3. Cuando el agua toca una semilla, se convierte en planta verde grande
4. Las plantas maduras muestran "¡LISTA!" y pueden cosecharse

## Tecnologías

- P5.js para gráficos y física
- JavaScript para lógica del juego
- HTML5 para la interfaz

## Archivos

- `index.html` - Página principal
- `sketch.js` - Código del juego
- `README.md` - Este archivo