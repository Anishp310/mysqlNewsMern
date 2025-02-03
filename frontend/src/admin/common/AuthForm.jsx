import React from "react";
import { useForm } from "react-hook-form";

const AuthForm = ({ onSubmit, formFields }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        {formFields.map(({ name, type, placeholder, validation }) => (
          <div key={name} className="mb-4">
            <label
              htmlFor={name}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {placeholder}
            </label>
            {type === "textarea" ? (
              <textarea
                {...register(name, validation)}
                id={name}
                placeholder={placeholder}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              />
            ) : (
              <input
                {...register(name, validation)}
                type={type}
                id={name}
                placeholder={placeholder}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
                autoComplete={
                  type === "email"
                    ? "username"
                    : type === "password"
                    ? "current-password"
                    : "on"
                }
              />
            )}
            {errors[name] && (
              <p className="text-red-500 text-xs italic">
                {errors[name]?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white px-8 py-2 rounded font-bold focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
