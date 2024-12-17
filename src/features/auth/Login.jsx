import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import InputWithIcons from "@/components/common/InputWithIcons";
import { illustrasi_login, logo } from "@/assets";
import { Eye, EyeClosed, Lock, User } from "lucide-react";

function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePasswordLength = (password) => password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi email
    if (!validateEmail(email)) {
      setErrorMessage("Format email tidak valid");
      if (errRef.current) {
        errRef.current.focus();
      }
      return;
    }

    // Validasi password
    if (!validatePasswordLength(password)) {
      setErrorMessage("Password minimal 8 karakter");
      if (errRef.current) {
        errRef.current.focus();
      }
      return;
    }

    try {
      const userData = await login({ email, password }).unwrap();

      dispatch(setCredentials({ email, accessToken: userData.data.token }));
      localStorage.setItem("accessToken", userData.data.token);
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      if (!err?.response) {
        setErrorMessage("Server Tidak Merespon");
      } else if (err?.response?.status === 102) {
        setErrorMessage("Parameter email tidak sesuai format");
      } else if (err?.response?.status === 103) {
        setErrorMessage("Email atau password salah");
      } else if (err?.response?.status === 400) {
        setIsShowPassword("Email atau password salah");
      } else {
        setErrorMessage("Login Gagal");
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  const tooglePassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const content = isLoading ? (
    <Loading size="medium" />
  ) : (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen relative">
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
                id="username"
                innerRef={userRef}
                value={email}
                onChange={handleEmailInput}
                autoComplete="off"
                required
                leftIcon={User}
                placeholder="masukkan email anda"
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
                placeholder="masukkan password anda"
              />
            </div>
            <div className="space-y-4 md:space-y-8">
              <Button
                type="submit"
                className="w-full p-5"
                isLoading={isLoading}
              >
                Masuk
              </Button>

              <div className="flex items-center">
                <p className="mr-1">Belum punya akun? register</p>
                <Link
                  to="/register"
                  className="text-red-500 font-semibold hover:text-red-700"
                >
                  disini
                </Link>
              </div>
            </div>
          </form>
          <div
            className={`absolute bottom-8 max-w-md w-full p-3 rounded-md bg-red-200 left-[13%] transform text-center ${
              errorMessage ? "block" : "hidden"
            }`}
          >
            <p
              ref={errRef}
              className="text-red-500 text-start"
              aria-live="assertive"
            >
              {errorMessage}
            </p>
          </div>
        </div>
        <img
          src={illustrasi_login}
          alt="illustrasi_login"
          className="w-full h-screen object-center object-cover hidden lg:block"
        />
      </section>
    </>
  );

  return content;
}

export default Login;
