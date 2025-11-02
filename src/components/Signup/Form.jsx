import GoogleLoginButton from "@/components/Login/GoogleLoginButton";
import HeaderForm from "@/components/Login/HeaderForm";
import InputField from "@/components/Login/InputField";
import SubmitButton from "@/components/Login/SubmitButton";

import { useState } from "react";

// Sign Up Form Component
const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });

  // Validasi username
  const validateUsername = (username) => {
    if (!username) return "Masukkan Username";
    if (username.length < 3)
      return "Username minimal memiliki panjang 3 karakter";
    if (username.length > 20) return "Username maksimal 20 karakter";
    // Hanya boleh huruf, angka, underscore, dan dash
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(username))
      return "Username hanya boleh mengandung huruf, angka, underscore, dan dash";
    return "";
  };

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

  // Get validator function based on field name
  const getValidator = (name) => {
    switch (name) {
      case "username":
        return validateUsername;
      case "email":
        return validateEmail;
      case "password":
        return validatePassword;
      default:
        return () => "";
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const validator = getValidator(name);
      const error = validator(value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const validator = getValidator(name);
    const error = validator(value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ username: true, email: true, password: true });

    // Validate all fields
    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
    });

    // Check if there are any errors
    if (usernameError || emailError || passwordError) {
      console.log("Form error ❌", {
        usernameError,
        emailError,
        passwordError,
      });
      return;
    }

    console.log("Form valid ✅", formData);

    alert("Form berhasil dikirim");
  };

  // Handle Google signup
  const handleGoogleSuccess = () => {
    alert("Google sign up simulated");
  };

  const handleGoogleError = () => {
    alert("Google sign up failed");
  };

  return (
    <>
      <HeaderForm
        header="Buat Akun ARcade"
        paragraph="Daftar untuk memulai pembelajaran seru!"
      />

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          <InputField
            label="Nama"
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username}
            touched={touched.username}
            placeholder="Nama Kamu"
            helpText="Nama kamu minimal memiliki panjang 3 karakter"
          />

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

        <SubmitButton type="submit">Daftar</SubmitButton>

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
          <span className="text-sm text-gray-600">Sudah punya akun? </span>
          <a
            href="#"
            className="text-sm text-sky-500 hover:text-sky-600 font-medium"
          >
            Masuk di sini
          </a>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
