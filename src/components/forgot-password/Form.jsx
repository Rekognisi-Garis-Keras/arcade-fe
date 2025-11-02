import HeaderForm from "@/components/Login/HeaderForm";
import InputField from "@/components/Login/InputField";
import SubmitButton from "@/components/Login/SubmitButton";

import { useState } from "react";

// Forgot Password Form Component
const ForgotPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const [touched, setTouched] = useState({
    email: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validasi email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Masukkan Email";
    if (!emailRegex.test(email))
      return "Tolong masukkan alamat email yang valid";
    return "";
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateEmail(value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateEmail(value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark field as touched
    setTouched({ email: true });

    // Validate email
    const emailError = validateEmail(formData.email);

    setErrors({
      email: emailError,
    });

    // Check if there are any errors
    if (emailError) {
      console.log("Form error ❌", { emailError });
      return;
    }

    console.log("Form valid ✅", formData);

    // Di sini Anda bisa menambahkan logic untuk mengirim email reset password
    // Contoh:
    // await fetch('/api/forgot-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });

    setIsSubmitted(true);
  };

  // Jika form sudah disubmit, tampilkan pesan sukses
  if (isSubmitted) {
    return (
      <>
        <HeaderForm
          header="Email Terkirim!"
          paragraph="Kami telah mengirimkan link reset password ke email kamu"
        />

        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              Silakan cek inbox email <strong>{formData.email}</strong> untuk
              melanjutkan proses reset password.
            </p>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">Tidak menerima email?</p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ email: "" });
                setTouched({ email: false });
              }}
              className="text-sm text-sky-500 hover:text-sky-600 font-medium"
            >
              Kirim ulang
            </button>
          </div>

          <div className="text-center pt-4">
            <a
              href="#"
              className="text-sm text-sky-500 hover:text-sky-600 font-medium"
            >
              Kembali ke halaman login
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderForm
        header="Lupa Password?"
        paragraph="Masukkan email Kamu dan kami akan mengirimkan link untuk reset password"
      />

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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

        <SubmitButton type="submit">Kirim Link Reset Password</SubmitButton>

        <div className="text-center">
          <a
            href="#"
            className="text-sm text-sky-500 hover:text-sky-600 font-medium"
          >
            Kembali ke halaman login
          </a>
        </div>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
