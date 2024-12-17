import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import Loading from "@/components/common/Loading";

function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      localStorage.setItem("accessToken", userData.data.token);
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrorMessage("Server Tidak Merespon");
      } else if (err?.response?.status === 102) {
        setErrorMessage("Parameter email tidak sesuai format");
      } else if (err?.response?.status === 103) {
        setErrorMessage("Username atau password salah");
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

  const content = isLoading ? (
    <Loading size="medium" />
  ) : (
    <section>
      <p
        ref={errRef}
        className={errorMessage ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errorMessage}
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          ref={userRef}
          autoComplete="off"
          onChange={handleEmailInput}
          value={email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={handlePasswordInput}
          value={password}
        />
        <button type="submit">Login</button>
      </form>
    </section>
  );

  return content;
}

export default Login;
