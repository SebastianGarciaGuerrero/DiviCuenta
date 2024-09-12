// src/hooks/useCurrencyFormatter.js
export const useCurrencyFormatter = () => {
  const formatearCLP = (valor) => {
    return valor
      ? valor.toLocaleString("es-CL", { style: "currency", currency: "CLP" })
      : "";
  };

  const eliminarFormato = (valor) => {
    return valor.replace(/\D/g, ""); // Elimina cualquier carácter no numérico
  };

  return { formatearCLP, eliminarFormato };
};
