import { useState } from "react";
import { Button, TextInput } from "evergreen-ui";
import { useCurrencyFormatter } from "../hooks/useCurrencyFormatter";

const Form = () => {
  // Definir el estado para los valores ingresados y los resultados
  const [ingresos, setIngresos] = useState([{ valor: "" }]);
  const [porcentajes, setPorcentajes] = useState([]);
  const [cuentas, setCuentas] = useState([]);
  const [cuenta, setCuenta] = useState("");

  // Usar el hook para formatear valores CLP
  const { formatearCLP, eliminarFormato } = useCurrencyFormatter();

  // Handler para agregar más ingresos dinámicamente
  const handleAgregarIngreso = () => {
    setIngresos([...ingresos, { valor: "" }]);
  };

  // Handler para cambiar el valor de los ingresos
  const handleIngresoChange = (index) => (e) => {
    const newIngresos = [...ingresos];
    newIngresos[index].valor = formatearCLP(
      Number(eliminarFormato(e.target.value))
    );
    setIngresos(newIngresos);
  };

  const calcularResultado = (e) => {
    e.preventDefault();

    const totalCuenta = parseFloat(eliminarFormato(cuenta)); // Asegurarse que 'cuenta' es un número válido

    if (isNaN(totalCuenta)) {
      alert("Por favor, ingresa un número válido para el total a pagar");
      return;
    }

    // Obtener el valor de todos los ingresos
    const ingresosNumericos = ingresos.map((ingreso) =>
      parseFloat(eliminarFormato(ingreso.valor))
    );

    // Verificar si algún ingreso no es válido
    if (ingresosNumericos.some(isNaN)) {
      alert("Por favor, ingresa números válidos en todos los ingresos");
      return;
    }

    // Sumar los ingresos para calcular los porcentajes
    const totalIngresos = ingresosNumericos.reduce((acc, curr) => acc + curr, 0);

    if (totalIngresos === 0) {
      alert("Los ingresos no pueden ser cero");
      return;
    }

    // Calcular los porcentajes y cuánto le corresponde a cada persona
    const nuevosPorcentajes = ingresosNumericos.map(
      (ingreso) => (ingreso / totalIngresos) * 100
    );
    const nuevasCuentas = ingresosNumericos.map(
      (ingreso) => (ingreso / totalIngresos) * totalCuenta
    );

    // Actualizar el estado con los resultados
    setPorcentajes(nuevosPorcentajes);
    setCuentas(nuevasCuentas);
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

          {/* Campo para el total de la cuenta */}
          <div className="mb-6">
            <label
              htmlFor="cuenta"
              className="text-white block mb-2 text-sm font-medium"
            >
              Gasto total a pagar:
            </label>
            <TextInput
              type="text"
              id="cuenta"
              name="cuenta"
              value={cuenta}
              onChange={(e) => setCuenta(formatearCLP(Number(eliminarFormato(e.target.value))))}
            />
          </div>

          {/* Botón para agregar más ingresos */}
          <Button onClick={handleAgregarIngreso} className="mb-4">
            Agregar Ingreso
          </Button>

          {/* Campos dinámicos de ingreso */}
          {ingresos.map((ingreso, index) => (
            <div key={index} className="mb-4">
              <TextInput
                type="text"
                value={ingreso.valor}
                onChange={handleIngresoChange(index)}
                placeholder={`Ingreso ${index + 1}`}
              />
            </div>
          ))}

          {/* Botón para calcular */}
          <Button
            type="submit"
            className="h-10 w-20 flex items-center justify-center"
          >
            Calcular
          </Button>
        </form>
      </section>

      {/* Mostrar los resultados si ya fueron calculados */}
      {porcentajes.length > 0 && (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-center bg-gray-800 max-w-md w-full p-6 rounded-xl mx-auto">
            {porcentajes.map((porcentaje, index) => (
              <p key={index} className="mb-5 text-white">
                A la persona {index + 1} le corresponde pagar:{" "}
                {porcentaje.toFixed(2)}% del total
                <br />
                lo que corresponde a: {formatearCLP(cuentas[index])}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
