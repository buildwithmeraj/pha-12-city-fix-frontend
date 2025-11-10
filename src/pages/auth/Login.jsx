import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import Error from "../../components/utilities/Error";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaSignInAlt } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";

const Login = () => {
  const { signInUsingEmail, signInUsingGoogle, setUser, user, firebaseErrors } =
    useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      navigate(location.state ? location.state : "/");
    }
  }, [user, location.state, navigate]);

  const [error, setError] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const emailRef = useRef();

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleForm = (e) => {
    e.preventDefault();
    setError(null);

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!emailRegex.test(email)) {
      return setError("Please enter a valid email address");
    }
    if (!passRegex.test(password)) {
      return setError(
        "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
    }

    signInUsingEmail(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        toast.success("Login Successful");
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        const match = firebaseErrors.find((err) => err.code === error.code);
        const errMsg = match
          ? match.message
          : "Login failed. Please try again.";
        setError(errMsg);
      });
  };

  const handleGoogleSignIn = () => {
    signInUsingGoogle()
      .then((result) => {
        setUser(result.user);
        toast.success("Login Successful");
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        const match = firebaseErrors.find((err) => err.code === error.code);
        const errMsg = match
          ? match.message
          : "Login failed. Please try again.";
        setError(errMsg);
      });
  };

  return (
    <div className="hero min-h-[60vh]">
      <title>Login - CityFix</title>

      <form onSubmit={handleForm}>
        <div className="hero-content flex-col">
          <div className="card bg-base-100 w-[320px] md:w-lg lg:w-xl shadow-2xl">
            <div className="card-body">
              <h2>Login</h2>

              {error && <Error message={error} />}

              <fieldset className="fieldset">
                <label className="label font-medium">Email</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Enter your email"
                  name="email"
                  ref={emailRef}
                />

                <label className="label font-medium mt-2">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    className="input w-full pr-10"
                    placeholder="Enter your password"
                    name="password"
                  />
                  <span
                    className="absolute right-2 top-2 cursor-pointer text-2xl text-gray-600"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <IoEye /> : <IoEyeOff />}
                  </span>
                </div>

                <button className="btn btn-primary mt-4 w-full" type="submit">
                  <FaSignInAlt />
                  Login
                </button>
                <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-2">
                  <button
                    className="btn  btn-block lg:flex-1 "
                    type="button"
                    onClick={handleGoogleSignIn}
                  >
                    <FcGoogle />
                    Google Login
                  </button>
                  <NavLink
                    to="/register"
                    className="btn btn-success text-white flex btn-block lg:flex-1 items-center gap-2"
                  >
                    <FaUserPlus />
                    Register
                  </NavLink>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
