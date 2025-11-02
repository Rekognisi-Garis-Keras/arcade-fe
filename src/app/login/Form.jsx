import GoogleLoginButton from "./GoogleLoginButton";
import HeaderForm from "./HeaderForm";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

import { useState } from "react";

// Main Form Component (Parent)
const Form = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // Validasi email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Masukkan Email";
    if (!emailRegex.test(email))
      return "Tolong masukkan alamat email yang valid";
    return "";
  };

  // Validasi password
  const validatePassword = (password) => {
    if (!password) return "Masukkan password";
    if (password.length < 8)
      return "Password minimal memiliki panjang 8 karakter";
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasLetter || !hasNumber)
      return "Password harus mengandung huruf dan angka";
    return "";
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error =
        name === "email" ? validateEmail(value) : validatePassword(value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error =
      name === "email" ? validateEmail(value) : validatePassword(value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    setTouched({ email: true, password: true });

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError) {
      console.log("Form error ❌", { emailError, passwordError });
      return;
    }

    console.log("Form valid", formData);
    alert("Form berhasil disubmit");
  };

  // Handle Google login
  const handleGoogleSuccess = () => {
    alert("Google login simulated");
  };

  const handleGoogleError = () => {
    alert("Google login failed");
  };

  return (
    <>
      <HeaderForm />

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          <InputField
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            placeholder="emailkamu@mail.com"
          />

          <InputField
            label="Password"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            placeholder="········"
            helpText="Password harus minimal 8 karakter dengan huruf dan angka"
          />
        </div>

        <SubmitButton type="submit">Masuk</SubmitButton>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">atau</span>
          </div>
        </div>

        <GoogleLoginButton
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          disabled={false}
        />

        <div className="text-center">
          <a href="#" className="text-sm text-sky-500 hover:text-sky-600">
            Lupa password kamu?
          </a>
        </div>
      </form>
    </>
  );
};

export default Form;
