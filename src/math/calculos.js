export const calcularPorcentajes = (valor1, valor2) => {
    const suma = valor1 + valor2;
    const porcentaje1 = (valor1 * 100) / suma;
    const porcentaje2 = (valor2 * 100) / suma;
  
    return { porcentaje1, porcentaje2 };
  };
  
  export const calcularCuentas = (cuenta, porcentaje1, porcentaje2) => {
    const cuenta1 = (porcentaje1 * cuenta) / 100;
    const cuenta2 = (porcentaje2 * cuenta) / 100;
  
    return { cuenta1, cuenta2 };
  };