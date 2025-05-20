import React, { FC, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean; // Controls loading state
  disabled?: boolean;  // Controls disabled state
}

const Button: FC<ButtonProps> = ({
  isLoading = false,
  disabled = false,
  children,
  onClick,
  className,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={clsx(
        "relative flex items-center justify-center px-4 py-2 rounded-md font-medium transition duration-200",
        {
          "bg-gray-400 text-gray-700 cursor-not-allowed": isLoading || disabled,
          "bg-green-600 text-white hover:bg-blue-700": !isLoading && !disabled,
        },
        className
      )}
      {...rest}
    >
      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Button text (hidden when loading) */}
      <span className={clsx('flex items-center', { "opacity-0": isLoading, "opacity-100": !isLoading })}>
        {children}
      </span>
    </button>
  );
};

export default Button;
