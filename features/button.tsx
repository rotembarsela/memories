"use client";

import { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  variant?: "primary" | "secondary" | "warning" | "danger";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  children = "",
  type = "button",
  variant = "primary",
  fullWidth = false,
  disabled = false,
  onClick = () => {},
}: ButtonProps) {
  const variantClassNames =
    variant === "primary"
      ? "text-white bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
      : variant === "secondary"
      ? "text-white bg-zinc-400 hover:bg-zinc-500 focus-visible:outline-zinc-500"
      : variant === "warning"
      ? "text-white bg-amber-500 hover:bg-amber-600 focus-visible:outline-amber-600"
      : variant === "danger"
      ? "text-white bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600"
      : "";
  return (
    <div>
      <button
        className={clsx(
          `
            flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline
            focus-visible:outline-2 focus-visible:outline-offset-2
        `,
          fullWidth && "w-full",
          disabled && "opacity-50 cursor-default",
          variantClassNames
        )}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
}
