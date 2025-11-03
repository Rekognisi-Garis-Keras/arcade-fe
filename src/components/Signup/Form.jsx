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
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const validateName = (name) => {
    if (!name) return "Masukkan Nama";
    if (name.length < 3) return "Nama minimal memiliki panjang 3 karakter";
    if (name.length > 20) return "Nama maksimal 20 karakter";
    if (!/^[a-zA-Z]+$/.test(name)) return "Nama hanya boleh mengandung huruf";
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
      case "name":
        return validateName;
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

    setTouched({ name: true, email: true, password: true });

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
    });

    if (nameError || emailError || passwordError) return;

    setLoading(true);
    try {
      const res = await apiRequest("/auth/register", {
        method: "POST",
        body: {
          name: formData.name,
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
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
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
          {loading ? "Mendaftarkan" : "Daftar"}
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
