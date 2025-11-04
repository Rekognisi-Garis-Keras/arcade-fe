"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiRequest } from "@/utils/api";
import Link from "next/link";
import HeaderForm from "@/components/Login/HeaderForm";
import InputField from "@/components/Login/InputField";
import SubmitButton from "@/components/Login/SubmitButton";
import GoogleLoginButton from "@/components/Login/GoogleLoginButton";
import { toast } from "sonner";
import { Button } from "../UI/button";

const Form = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  // Toaster berhasil register
  useEffect(() => {
    const isRegistered = searchParams.get("registered") === "true";

    if (isRegistered) {
      toast.success("Registrasi berhasil!", {
        description: "Selamat belajar dengan pengalaman menggunakan AR👾",
        icon: "🎉",
      });
    }
    router.replace("/login", { shallow: true });
  }, [searchParams, router]);

  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Masukkan Email";
    if (!emailRegex.test(email))
      return "Tolong masukkan alamat email yang valid";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error =
        name === "email" ? validateEmail(value) : validatePassword(value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error =
      name === "email" ? validateEmail(value) : validatePassword(value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    setLoading(true);

    try {
      const res = await apiRequest("/auth/login", {
        method: "POST",
        body: formData,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      if (res.data.user.role === "admin") {
        router.push("/admin?loggedIn=true");
      } else {
        router.push("/subjects?loggedIn=true");
      }
    } catch (error) {
      alert(error.message || "Login gagal, coba lagi!");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = () => {
    window.location.href = "https://api-arcade.vercel.app/auth/google";
  };

  const handleGoogleError = () => {
    alert("Google login failed");
  };
  const [isShowing, setIsShowing] = useState(false);
  const togglePassword = () => setIsShowing((prev) => !prev);

  return (
    <>
      <HeaderForm
        header="Selamat Datang Kembali!"
        paragraph="Tolong masukkan email dan password kamu"
      />

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
            placeholder="●●●●●●●●"
            helpText="Password harus minimal 8 karakter dengan huruf dan angka"
            showToggle
            isShowing={isShowing}
            onToggle={togglePassword}
          />
        </div>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Sedang masuk" : "Masuk"}
        </SubmitButton>

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
          disabled={loading}
        />

        <div className="gap-3 mt-5 flex justify-evenly">
          <Link href="#" className="text-sm text-sky-500 hover:text-sky-600">
            Lupa password?
          </Link>
          <div className="border border-slate-200 h-5"></div>
          <Link
            href="/signup"
            className="text-sm text-sky-500 hover:text-sky-600"
          >
            Belum punya akun?
          </Link>
        </div>
      </form>
    </>
  );
};

export default Form;
