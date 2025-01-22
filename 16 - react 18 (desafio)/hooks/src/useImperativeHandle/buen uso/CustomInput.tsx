import React, { useImperativeHandle, useRef, useState } from "react";

// se debe crear una interfaz porque React.Ref pide al menos un paramwtro de type
export interface CustomInputHandles {
  focus: () => void;
  clear: () => void;
}

const CustomInput = ({ ref }: { ref: React.Ref<CustomInputHandles> }) => {
  // se debe crear un ref aparte para que el componente padre no tenga acceso a todos los metodos del input
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => setValue(""),
    }),
    []
  );

  return (
    <input
      ref={inputRef}
      value={value}
      type="text"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default CustomInput;
