import React, { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const inputClassName =
  "text-md w-full text-neutralColors-darkCharcoal bg-neutralColors-lightGray placeholder-neutralColors-mediumGray outline-none border-[1px] rounded-[8px] px-4 py-2";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        autoFocus
        className={`${className} ${inputClassName}`}
        {...props}
      />
    );
  }
);

export default Input;
