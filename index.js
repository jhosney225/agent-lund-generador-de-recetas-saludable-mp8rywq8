```javascript
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Database de ingredientes con calorías por 100g
const ingredientesDB = {
  pollo: { calorias: 165, proteina: 31, grasa: 3.6, carbohidratos: 0 },
  arroz: { calorias: 130, proteina: 2.7, grasa: 0.3, carbohidratos: 28 },
  brocoli: { calorias: 34, proteina: 2.8, grasa: 0.4, carbohidratos: 7 },
  zanahoria: { calorias: 41, proteina: 0.9, grasa: 0.2, carbohidratos: 10 },
  limon: { calorias: 29, proteina: 1.1, grasa: 0.3, carbohidratos: 9 },
  aceiteoliva: { calorias: 884, proteina: 0, grasa: 100, carbohidratos: 0 },
  salmon: { calorias: 208, proteina: 20, grasa: 13, carbohidratos: 0 },
  huevo: { calorias: 155, proteina: 13, grasa: 11, carbohidratos: 1.1 },
  espinaca: { calorias: 23, proteina: 2.9, grasa: 0.4, carbohidratos: 3.6 },
  tomate: { calorias: 18, proteina: 0.9, grasa: 0.2, carbohidratos: 3.9 },
  lechuga: { calorias: 15, proteina: 1.2, grasa: 0.3, carbohidratos: 2.9 },
  pechugapollo: { calorias: 165, proteina: 31, grasa: 3.6, carbohidratos: 0 },
  batata: { calorias: 86, proteina: 1.6, grasa: 0.1, carbohidratos: 20 },
  garbanzos: { calorias: 164, proteina: 8.9, grasa: 2.6, carbohidratos: 27 },
  quinoa: { calorias: 120, proteina: 4.4, grasa: 1.9, carbohidratos: 21 },
  almendras: { calorias: 579, proteina: 21, grasa: 50, carbohidratos: 22 },
  platano: { calorias: 89, proteina: 1.1, grasa: 0.3, carbohidratos: 23 },
  manzana: { calorias: 52, proteina: 0.3, grasa: 0.2, carbohidratos: 14 },
  yogur: { calorias: 59, proteina: 10, grasa: 0.4, carbohidratos: 3.6 },
  queso: { calorias: 402, proteina: 25, grasa: 33, carbohidratos: 1.3 }
};

// Recetas predefinidas saludables
const recetasDB = {
  'ensalada cesar saludable': {
    ingredientes: { lechuga: 100, tomate: 80, queso: 30, aceiteoliva: 10, limon: 15 },
    preparacion: 'Lavar la lechuga, cortar tomate en cubos, agregar queso rallado, rociar con aceite de oliva y jugo de limón. Mezclar bien.',
    dificultad: 'fácil',
    tiempo: 10
  },
  'pechuga a la plancha': {
    ingredientes: { pechugapollo: 200, brocoli: 150, zanahoria: 100, aceiteoliva: 5, limon: 10 },
    preparacion: 'Cocinar pechuga en plancha caliente por 8 minutos. Vapor brócoli y zanahoria. Servir con limón.',
    dificultad: 'fácil',
    tiempo: 20
  },
  'bowl de quinoa': {
    ingredientes: { quinoa: 100, garbanzos: 80, espinaca: 50, tomate: 60, aceiteoliva: 8 },
    preparacion: 'Cocinar quinoa según instrucciones. Mezclar con garbanzos cocidos, espinaca fresca y tomate. Aliñar con aceite.',
    dificultad: 'medio',
    tiempo: 25
  },
  'salmon al horno': {
    ingredientes: { salmon: 180, brocoli: 120, batata: 150, limon: 10, aceiteoliva: 5 },
    preparacion: 'Hornear salmón a 180°C por 15 minutos. Asar brócoli y batata con aceite. Servir con limón.',
    dificultad: 'medio',
    tiempo: 30
  },
  'omelette proteico': {
    ingredientes: { huevo: 150, espinaca: 80, tomate: 60, queso: 20, aceiteoliva: 5 },
    preparacion: 'Batir huevos, agregar espinaca y tomate picado. Cocinar en sartén con aceite. Cubrir con queso al final.',
    dificultad: 'fácil',
    tiempo: 15
  }
};

class GeneradorRecetas {
  constructor() {
    this.recetas = recetasDB;
    this.ingredientes = ingredientesDB;
    this.recetasUsuario = [];
    this.cargarRecetasGu