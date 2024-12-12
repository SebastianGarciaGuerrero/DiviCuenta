// src/utils/calculations.js

// Función para formatear valores en CLP
export const formatearCLP = (valor) => {
  return valor
    ? valor.toLocaleString("es-CL", { style: "currency", currency: "CLP" })
    : "";
};

// Función para eliminar el formato de CLP y obtener solo los números
export const eliminarFormato = (valor) => {
  return valor.replace(/\D/g, ""); // Elimina cualquier carácter no numérico
};

// Función para calcular porcentajes y cuentas
export const calcularPorcentajes = (valor1, valor2, totalCuenta) => {
  const suma = valor1 + valor2;
  const porcentaje1 = Math.round((valor1 * 100) / suma);
  const porcentaje2 = Math.round((valor2 * 100) / suma);
  const cuenta1 = (porcentaje1 * totalCuenta) / 100;
  const cuenta2 = (porcentaje2 * totalCuenta) / 100;

  return { porcentaje1, porcentaje2, cuenta1, cuenta2 };
};
