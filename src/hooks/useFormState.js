import { useState } from "react";

export const useFormState = () => {
  const [ingreso1, setIngreso1] = useState("");
  const [ingreso2, setIngreso2] = useState("");
  const [resultado, setResultado] = useState(null);
  const [porcentaje1, setPorcentaje1] = useState(null);
  const [porcentaje2, setPorcentaje2] = useState(null);
  const [cuenta1, setCuenta1] = useState("");
  const [cuenta2, setCuenta2] = useState("");
  const [cuenta, setCuenta] = useState("");

  return {
    ingreso1,
    ingreso2,
    resultado,
    porcentaje1,
    porcentaje2,
    cuenta1,
    cuenta2,
    cuenta,
    setIngreso1,
    setIngreso2,
    setResultado,
    setPorcentaje1,
    setPorcentaje2,
    setCuenta1,
    setCuenta2,
    setCuenta,
  };
};
