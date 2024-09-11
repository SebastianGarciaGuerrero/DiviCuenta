import { useState } from "react";

const Form = () => {
  // Definir el estado para los valores ingresados y los resultados
  const [ingreso1, setIngreso1] = useState("");
  const [ingreso2, setIngreso2] = useState("");
  const [resultado, setResultado] = useState(null);
  const [porcentaje1, setPorcentaje1] = useState(null);
  const [porcentaje2, setPorcentaje2] = useState(null);
  const [cuenta, setCuenta] = useState(""); // Aquí es importante usar 'cuenta'
  const [cuenta1, setCuenta1] = useState("");
  const [cuenta2, setCuenta2] = useState("");

  const formatearCLP = (valor) => {
    return valor
      ? valor.toLocaleString("es-CL", { style: "currency", currency: "CLP" })
      : "";
  };

  const eliminarFormato = (valor) => {
    return valor.replace(/\D/g, ""); // Elimina cualquier carácter no numérico
  };

  const handleIngresoChange = (setter) => (e) => {
    const valor = e.target.value;
    setter(formatearCLP(Number(eliminarFormato(valor)))); // Actualiza el valor con formato
  };

  const calcularResultado = (e) => {
    e.preventDefault();

    // Convertir los valores ingresados eliminando el formato de CLP
    const valor1 = parseInt(eliminarFormato(ingreso1));
    const valor2 = parseInt(eliminarFormato(ingreso2));
    const totalCuenta = parseFloat(eliminarFormato(cuenta)); // Asegurarse que 'cuenta' es un número válido

    // Verificar que los valores sean válidos
    if (isNaN(valor1) || isNaN(valor2) || isNaN(totalCuenta)) {
      alert("Por favor, ingresa números válidos en todos los campos");
      return;
    }

    const suma = valor1 + valor2;
    const porcentaje1 = (valor1 * 100) / suma;
    const porcentaje2 = (valor2 * 100) / suma;
    const cuenta1 = (porcentaje1 * totalCuenta) / 100;
    const cuenta2 = (porcentaje2 * totalCuenta) / 100;

    // Actualizar el estado con los resultados
    setResultado(suma);
    setPorcentaje1(porcentaje1);
    setPorcentaje2(porcentaje2);
    setCuenta1(cuenta1);
    setCuenta2(cuenta2);
  };

  return (
    <div>
      <form onSubmit={calcularResultado}>
        <h2>Divi Cuentas</h2>

        <label htmlFor="cuenta">Gasto a pagar:</label>
        <input
          type="text"
          id="cuenta"
          name="cuenta"
          value={cuenta}
          onChange={handleIngresoChange(setCuenta)}
        />

        <label htmlFor="ingreso1">Primer Ingreso:</label>
        <input
          type="text"
          id="ingreso1"
          name="ingreso1"
          value={ingreso1}
          onChange={handleIngresoChange(setIngreso1)}
        />

        <label htmlFor="ingreso2">Segundo Ingreso:</label>
        <input
          type="text"
          id="ingreso2"
          name="ingreso2"
          value={ingreso2}
          onChange={handleIngresoChange(setIngreso2)}
        />

        <button type="submit">Calcular</button>
      </form>

      {/* Mostrar los resultados si ya fueron calculados */}
      {resultado !== null && (
        <div>
          <p>
            A la primera persona le corresponde pagar: {porcentaje1.toFixed(2)}%
            del total, lo que corresponde a: {formatearCLP(cuenta1)}
          </p>
          <p>
            A la segunda persona le corresponde pagar: {porcentaje2.toFixed(2)}%
            del total, lo que corresponde a: {formatearCLP(cuenta2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Form;
