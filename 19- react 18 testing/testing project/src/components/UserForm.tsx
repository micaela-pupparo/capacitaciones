import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string({message: 'Solo se permiten letras'}).min(1, {message: 'El nombre es requerido'}),
});

type FormData = z.infer<typeof schema>;

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(() => {
        console.log("Submitted!");
      })}
    >
        <label htmlFor="name" className="form-label">
            Name
            <input {...register("name")} id="name" type="text" className="form-control"/>
        </label>
        {errors.name && <p className="text-danger">{errors.name.message}</p>}

        <button className="btn btn-primary">Submit</button>

    </form>
  );
};

export default UserForm;
