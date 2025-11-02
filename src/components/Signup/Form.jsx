"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/api";
import HeaderForm from "@/components/Login/HeaderForm";
import InputField from "@/components/Login/InputField";
import SubmitButton from "@/components/Login/SubmitButton";
import Link from "next/link";

const SignUpForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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

  const validateUsername = (username) => {
    if (!username) return "Masukkan Nama";
    if (username.length < 3) return "Nama minimal memiliki panjang 3 karakter";
    if (username.length > 20) return "Nama maksimal 20 karakter";
    if (!/^[a-zA-Z]+$/.test(username)) return "Nama hanya boleh mengandung huruf";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Masukkan Email";
    if (!emailRegex.test(email)) return "Masukkan email yang valid";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Masukkan password";
    if (password.length < 8) return "Password minimal 8 karakter";
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasLetter || !hasNumber)
      return "Password harus mengandung huruf dan angka";
    return "";
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const validator = getValidator(name);
      const error = validator(value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validator = getValidator(name);
    const error = validator(value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ username: true, email: true, password: true });

    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
    });

    if (usernameError || emailError || passwordError) return;

    setLoading(true);
    try {
      const res = await apiRequest("/auth/register", {
        method: "POST",
        body: {
          name: formData.username,
          email: formData.email,
          password: formData.password,
        },
      });

      router.push("/login");
    } catch (err) {
      alert("❌ Gagal registrasi: " + err.message);
    } finally {
      setLoading(false);
    }
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
            helpText="Nama mengandung 3-20 karakter, hanya huruf"
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
            placeholder="●●●●●●●●"
            helpText="Password harus minimal 8 karakter dengan huruf dan angka"
          />
        </div>

        <SubmitButton type="submit">
          {loading ? "Mendaftarkan..." : "Daftar"}
        </SubmitButton>

        <div className="text-center">
          <span className="text-sm text-gray-600">Sudah punya akun? </span>
          <Link
            className="text-sm text-sky-500 hover:text-sky-600 font-medium"
            href="/login"
          >
            Masuk di sini
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
