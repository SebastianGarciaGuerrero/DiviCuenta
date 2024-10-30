import { useState } from "react";
import { Button, TextInput } from "evergreen-ui";
import { useCurrencyFormatter } from "../hooks/useCurrencyFormatter";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoPersonRemoveOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import InfoTooltip from "./InfoTooltip";

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

    if (isNaN(Number(totalCuenta))) {
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
    const totalIngresos = ingresosNumericos.reduce(
      (acc, curr) => acc + curr,
      0
    );

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
          className="flex flex-col items-center w-full max-w-md bg-[#629584] p-8 rounded-lg shadow-xl"
        >
          <h2 className="animate-fadeIn text-transparent bg-gradient-to-r from-[#243642] via-[#3a5a68] to-[#4e6f7c] bg-clip-text drop-shadow-lg mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-wider">
            Divi Cuenta
          </h2>

          <InfoTooltip />

          {/* Campo para el total de la cuenta */}
          <div className="mb-6">
            <label
              htmlFor="cuenta"
              className="text-black block mb-2 text-sm font-medium"
            >
              Gasto total a pagar:
            </label>
            <TextInput
              type="text"
              id="cuenta"
              name="cuenta"
              value={cuenta}
              onChange={(e) =>
                setCuenta(formatearCLP(Number(eliminarFormato(e.target.value))))
              }
            />
          </div>

          <div className="flex flex-auto">
            {/* Botón para eliminar ingresos */}
            <button
              type="button"
              onClick={() => setIngresos(ingresos.slice(0, -1))}
              className="mb-4 mx-4"
            >
              <IoPersonRemoveOutline className="text-black" />
            </button>

            {/* Botón para agregar más ingresos */}
            <button
              type="button"
              onClick={handleAgregarIngreso}
              className="mb-4 mx-4"
            >
              <IoPersonAddOutline className="text-black" />
            </button>
          </div>

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
            className="h-10 w-20 flex items-center justify-center bg-[#E2F1E7]"
          >
            Calcular
          </Button>
        </form>
      </section>

      {/* Mostrar los resultados si ya fueron calculados */}
      {porcentajes.length > 0 && (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-center bg-white max-w-md w-full p-6 rounded-xl mx-auto shadow-xl">
            {porcentajes.map((porcentaje, index) => (
              <p key={index} className="mb-5 text-black">
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
