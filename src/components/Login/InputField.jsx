import React from "react";
import { Eye, EyeOff } from "lucide-react";

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
  showToggle,
  isShowing,
  onToggle,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={isShowing && type === "password" ? "text" : type}
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
        {showToggle && type === "password" && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {isShowing ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && touched && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {!error && touched && value && helpText && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default InputField;
