import React from "react";

const InputField = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  onKeyDown,
  error,
  touched,
  placeholder,
  helpText,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        className={`w-full px-4 py-2 border border-b-3 border-r-3 rounded-lg focus:outline-none focus:ring-1 transition-colors ${
          error && touched
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-sky-500"
        }`}
        placeholder={placeholder}
      />
      {error && touched && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {!error && touched && value && helpText && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default InputField;
