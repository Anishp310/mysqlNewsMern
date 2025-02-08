import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const AuthForm = ({ onSubmit, formFields, editData }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Set default values when data is passed
  useEffect(() => {
    formFields.forEach(field => {
      if (field.defaultValue) {
        setValue(field.name, field.defaultValue);
      }
    });
  }, [formFields, setValue]);

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        {formFields.map(({ name, type, placeholder, validation, defaultValue }) => (
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
            ) : type === "file" ? (
              <div>
                {editData?.image_data && (
                  <div className="mb-2">
                    <img
                      src={editData.image_data} // Assuming `image_data` contains the image URL
                      alt="Current image"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <p>Current Image</p>
                  </div>
                )}
                <input
                  {...register(name, validation)}
                  type={type}
                  id={name}
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
                />
              </div>
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
