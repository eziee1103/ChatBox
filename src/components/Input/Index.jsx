import React from "react";

const Input = ({
  label = "",
  name = "",
  type = "text",
  placeholder = "",
  isRequired = false,
  className = "",
  labebClassName = "",
  inputClassName = "",
  value = "",
  onchange = () => {},
  onKeyDown = () => {},
}) => {
  return (
    <>
      <div className={`${className}`}>
        <label
          htmlFor={name}
          className={`block mb-2 text-sm font-medium text-gray-900 ${labebClassName}`}
        >
          {label}
        </label>
        <input
          className={`bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-full p-2.5 ${inputClassName}`}
          placeholder={placeholder}
          required={isRequired}
          id={name}
          type={type}
          value={value}
          onChange={onchange}
          onKeyDown={onKeyDown}
        />
      </div>
    </>
  );
};

export default Input;
