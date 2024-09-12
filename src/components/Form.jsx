import { useState } from "react";
import { Button, TextInput } from "evergreen-ui";
import { useCurrencyFormatter } from "../hooks/useCurrencyFormatter";
import { calcularPorcentajes } from "../utils/calculos";

const Form = () => {
  // Definir el estado para los valores ingresados y los resultados
  const [ingreso1, setIngreso1] = useState("");
  const [ingreso2, setIngreso2] = useState("");
  const [porcentaje1, setPorcentaje1] = useState(null);
  const [porcentaje2, setPorcentaje2] = useState(null);
  const [cuenta, setCuenta] = useState("");
  const [cuenta1, setCuenta1] = useState("");
  const [cuenta2, setCuenta2] = useState("");

  // Usar el hook para formatear valores CLP
  const { formatearCLP, eliminarFormato } = useCurrencyFormatter();

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

    // Calcular porcentajes y cuentas
    const { porcentaje1, porcentaje2, cuenta1, cuenta2 } = calcularPorcentajes(
      valor1,
      valor2,
      totalCuenta
    );

    // Actualizar el estado con los resultados
    setPorcentaje1(porcentaje1);
    setPorcentaje2(porcentaje2);
    setCuenta1(cuenta1);
    setCuenta2(cuenta2);
  };

  return (
    <div>
      <section id="form" className="py-10 flex items-center justify-center">
        <form
          onSubmit={calcularResultado}
          className="flex flex-col items-center w-full max-w-md bg-gray-800 p-8 rounded-lg"
        >
          <h2 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            Divi Cuentas
          </h2>
          <div className="mb-6">
            <label
              htmlFor="cuenta"
              className="text-white block mb-2 text-sm font-medium"
            >
              Gasto a pagar:{" "}
            </label>
            <TextInput
              type="text"
              id="cuenta"
              name="cuenta"
              value={cuenta}
              onChange={handleIngresoChange(setCuenta)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="ingreso1"
              className="text-white block mb-2 text-sm font-medium"
            >
              Primer Ingreso:{" "}
            </label>
            <TextInput
              type="text"
              id="ingreso1"
              name="ingreso1"
              value={ingreso1}
              onChange={handleIngresoChange(setIngreso1)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="ingreso2"
              className="text-white block mb-2 text-sm font-medium"
            >
              Segundo Ingreso:{" "}
            </label>
            <TextInput
              type="text"
              id="ingreso2"
              name="ingreso2"
              value={ingreso2}
              onChange={handleIngresoChange(setIngreso2)}
            />
          </div>

          <Button
            type="submit"
            className="h-10 w-20 flex items-center justify-center"
          >
            Calcular
          </Button>
        </form>
      </section>
      {/* Mostrar los resultados si ya fueron calculados */}
      {porcentaje1 !== null && porcentaje2 !== null && (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-center bg-gray-800 max-w-md w-full p-6 rounded-xl mx-auto">
            <p className="mb-5 text-white">
              A la primera persona le corresponde pagar:{" "}
              {porcentaje1.toFixed(0)}% del total
              <br />
              lo que corresponde a: {formatearCLP(cuenta1)}
            </p>
            <p className="mb-5 text-white">
              A la segunda persona le corresponde pagar:{" "}
              {porcentaje2.toFixed(0)}% del total
              <br />
              lo que corresponde a: {formatearCLP(cuenta2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
