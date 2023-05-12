"use client";

import clsx from "clsx";
import { HTMLInputTypeAttribute } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps = {
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

export function Input({
  id = "",
  label = "",
  type = "text",
  required = false,
  disabled = false,
  register,
  errors,
}: InputProps) {
  return (
    <div className="my-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          {...register(id, { required })}
          className={clsx(
            `
            form-input block w-full rounded-md border-0 py-1.5
            text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset
            focus:ring-sky-600 sm:text-sm sm:leading-6
          `,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-not-default"
          )}
          id={id}
          autoComplete={id}
          type={type}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
