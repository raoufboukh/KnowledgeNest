"use client";
import AuthImagePattern from "@/components/AuthImagePattern";
import { checkAuth, login } from "@/redux/Slices/AuthSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(form))
      .unwrap()
      .then(() => router.push("/"));
    setForm({
      email: "",
      password: "",
    });
  };
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };
  useEffect(() => {
    dispatch(checkAuth())
      .unwrap()
      .then(() => router.push("/"))
      .catch((err) => console.log(err));
  }, [dispatch, router]);
  return (
    <section className="grid lg:grid-cols-2 h-screen bg-accent">
      <div className="flex items-center justify-center">
        <div className="sm:w-80 text-center border border-primary rounded-xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg mb-4">Please login to your account</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="em" className="block text-left mb-1 px-1">
                Email
              </label>
              <input
                id="em"
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-primary rounded-xl outline-none"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="pas" className="block text-left mb-1 px-1">
                Password
              </label>
              <input
                id="pas"
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-primary rounded-xl outline-none"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-accent cursor-pointer py-2 rounded-xl"
            >
              Login
            </button>
            <button
              onClick={handleGoogleLogin}
              className="w-full text-primary border border-primary cursor-pointer py-2 rounded-xl flex items-center justify-center gap-2"
            >
              <FaGoogle className="text-sm" /> <span>Continue with Google</span>
            </button>
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary font-semibold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
      <AuthImagePattern />
    </section>
  );
};

export default Login;
