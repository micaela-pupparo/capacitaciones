import { useId } from "react";

const FormFieldId = ({ label }: { label: string }) => {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" placeholder={`Ingrese ${label}`} />
    </div>
  );
};

export default FormFieldId;

// evitamos la duplicacion de identificadores en multiples instancias del componente
