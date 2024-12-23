import { illustrasi_login, logo } from "@/assets";
import InputWithIcons from "@/components/common/InputWithIcons";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { AtSign, Eye, EyeClosed, Lock, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./authApiSlice";

const Registration = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, firstName, lastName, password]);

  const tooglePassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const toogleConfirmPassword = () => {
    setIsShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      if (errRef.current) errRef.current.focus();
      return;
    }

    if (password.length < 8) {
      if (errRef.current) errRef.current.focus();
      return;
    }

    try {
      await register({
        email,
        firstName,
        lastName,
        password,
      }).unwrap();

      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.log("Error Response:", err);

      if (!err?.originalStatus) {
        setErrorMessage("Server tidak merespon");
      } else if (err.originalStatus === 400) {
        setErrorMessage("Terjadi kesalahan pada inputan");
      } else if (err.originalStatus === 401) {
        setErrorMessage("Akun tidak ditemukan");
      } else {
        setErrorMessage("Registrasi Gagal");
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleFirstNameInput = (e) => setFirstName(e.target.value);
  const handleLastNameInput = (e) => setLastName(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handleConfirmPasswordInput = (e) => setConfirmPassword(e.target.value);

  const content = isLoading ? (
    <Loading />
  ) : (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen">
      <div className="space-y-8 md:space-y-12 md:max-w-lg mx-4 sm:mx-auto ">
        <div className="flex items-center justify-center gap-2">
          <img src={logo} alt="LOGO" className="h-8 w-auto" />
          <h3 className="text-2xl font-semibold">SIMS PPOB</h3>
        </div>
        <h1 className="font-bold text-3xl text-center">
          Masuk atau buat akun untuk memulai
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4 md:space-y-8">
            <InputWithIcons
              type="text"
              id="email"
              innerRef={userRef}
              value={email}
              onChange={handleEmailInput}
              autoComplete="off"
              required
              leftIcon={AtSign}
              placeholder="masukkan email anda"
            />

            <InputWithIcons
              type="text"
              id="firstName"
              innerRef={userRef}
              value={firstName}
              onChange={handleFirstNameInput}
              autoComplete="off"
              required
              leftIcon={User}
              placeholder="nama depan"
            />

            <InputWithIcons
              type="text"
              id="lastName"
              innerRef={userRef}
              value={lastName}
              onChange={handleLastNameInput}
              autoComplete="off"
              required
              leftIcon={User}
              placeholder="nama belakang"
            />

            <InputWithIcons
              id="password"
              onChange={handlePasswordInput}
              onClickRightIcon={tooglePassword}
              value={password}
              required
              leftIcon={Lock}
              rightIcon={isShowPassword ? EyeClosed : Eye}
              type={isShowPassword ? "text" : "password"}
              placeholder="buat password"
            />

            <InputWithIcons
              id="confirmPassword"
              onChange={handleConfirmPasswordInput}
              onClickRightIcon={toogleConfirmPassword}
              value={confirmPassword}
              required
              leftIcon={Lock}
              rightIcon={isShowConfirmPassword ? EyeClosed : Eye}
              type={isShowConfirmPassword ? "text" : "password"}
              placeholder="konfirmasi password"
            />
          </div>
          <div className="space-y-4 md:space-y-8">
            <Button type="submit" className="w-full p-5" isLoading={isLoading}>
              Registrasi
            </Button>

            <div className="flex items-center">
              <p className="mr-1">Sudah punya akun? login</p>
              <Link
                to="/login"
                className="text-red-500 font-semibold hover:text-red-700"
              >
                disini
              </Link>
            </div>
          </div>
        </form>
        <p
          ref={errRef}
          className={errorMessage ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errorMessage}
        </p>
      </div>
      <img
        src={illustrasi_login}
        alt="illustrasi_login"
        className="w-full h-screen object-center object-cover hidden lg:block"
      />
    </section>
  );

  return content;
};

export default Registration;
