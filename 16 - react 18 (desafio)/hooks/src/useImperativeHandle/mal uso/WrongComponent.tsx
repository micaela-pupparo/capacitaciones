import React, { useImperativeHandle, useRef } from "react";

interface CustomInputHandles {
  logValue: () => void;
}

const WrongComponent = ({ ref }: { ref: React.Ref<CustomInputHandles> }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    inputRef,
    logValue: () => console.log(inputRef.current?.value),
  }));

  return <input ref={inputRef} />;
};

export default WrongComponent;

// exponiendo directamente inputRef rompe la encapsulacion. el componente padre puede manipular directamente el dom del componente hijo.
// el no uso de dependencias hace que se vuelva a crear la funcion createHandle
