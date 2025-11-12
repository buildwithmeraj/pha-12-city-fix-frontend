import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink, useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import Error from "../../components/utilities/Error";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, UserRoundPlus, ExternalLink, LogIn } from "lucide-react";

const Register = () => {
  const {
    registerUsingEmail,
    signInUsingGoogle,
    setUser,
    user,
    firebaseErrors,
    updateUserProfile,
  } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  if (user && user?.email) {
    navigate("/profile");
  }

  useEffect(() => {
    if (user && user.email) {
      navigate(location.state ? location.state : "/");
    }
  }, [user, location.state, navigate]);

  const [error, setError] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const photoURLRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i;
  const NameRegex = /([a-z\s]+)/i;

  const handleForm = (e) => {
    e.preventDefault();
    setError(null);
    let email = e.target.email.value;
    let password = e.target.password.value;
    let displayName = e.target.name.value;
    let photoURL = e.target.photoURL.value;
    if (!emailRegex.test(email)) {
      return setError("Please enter a valid email address");
    }
    if (!passRegex.test(password)) {
      return setError(
        "Password Must have at least one uppercase letter, one lowercase letter and at least 6 characters long"
      );
    }

    if (!NameRegex.test(displayName)) {
      return setError("Please enter a valid name");
    }
    if (photoURL && !photoURLRegex.test(photoURL)) {
      return setError("Please enter a valid photo URL");
    }
    registerUsingEmail(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        updateUserProfile({ displayName, photoURL });
        toast.success("Registration Successful, Redirecting to Homepage...");
        setInterval(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch((error) => {
        const errMsg = firebaseErrors.find(
          (err) => err.code === error.code
        ).message;
        setError(errMsg);
      });
  };
  const handleGoogleSignUp = () => {
    signInUsingGoogle()
      .then((result) => {
        setUser(result.user);
        toast.success("Conneccted with Google, Redirecting to Homepage...");
        setInterval(() => {
          window.location.href = "/";
        }, 2000);
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
      <title>Register - CityFix</title>
      <form onSubmit={handleForm}>
        <div className="hero-content flex-col">
          <div className="card bg-base-100 w-[320px] md:w-lg lg:w-xl shadow-2xl">
            <div className="card-body">
              <h1>Register</h1>
              {error && <Error message={error} />}
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  name="email"
                />
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Your Name"
                  name="name"
                />
                <label className="label">Photo URL</label>
                <input
                  type="url"
                  className="input w-full"
                  placeholder="Photo URL"
                  name="photoURL"
                />
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    className="input w-full"
                    placeholder="Password"
                    name="password"
                  />
                  <span
                    className="absolute right-2 top-2 cursor-pointer text-2xl text-gray-600"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <Eye /> : <EyeOff />}
                  </span>
                </div>

                <a
                  href="https://imgbb.com"
                  className="link link-hover flex items-center ml-1 mt-2 gap-2"
                  target="_blank"
                >
                  <ExternalLink size={18} />
                  Upload a Photo
                </a>
                <button className="btn btn-primary mt-4" type="submit">
                  <UserRoundPlus size={16} />
                  Register
                </button>
                <div className="flex flex-col md:flex-row items-center justify-between gap-2 lg:mt-2">
                  <button
                    className="btn btn-block btn-outline lg:flex-1 "
                    type="button"
                    onClick={handleGoogleSignUp}
                  >
                    <FcGoogle />
                    Connect with Google
                  </button>
                  <NavLink
                    to="/login"
                    className="btn btn-success text-white flex btn-block lg:flex-1 items-center gap-2"
                  >
                    <LogIn size={16} />
                    Login
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

export default Register;
