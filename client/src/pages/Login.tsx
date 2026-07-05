import { AtSignIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

const Login = () => {
  const [state, setState] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login, signup, user } = useAppContext();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (state === "login") {
      await login({ email, password });
    } else {
      await signup({ username, email, password });
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Toaster />
      <main className="login-page-container">
        <form onSubmit={handleSubmit} className="login-form">
          <FieldGroup>
            <h2 className="text-3xl font-medium ">{state == "login" ? "sign in" : "sign up"}</h2>
            <p className="mt-2 text-sm text-gray-500/90 dark:text-gray-400">
              {state == "login" ? "Please enter email and password to acces." : "Please enter your details to create an account."}
            </p>
            {/* Username */}
            {state !== "login" && (
              <Field>
                <FieldLabel htmlFor="username" className="font-medium text-sm">
                  Username
                </FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <AtSignIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    placeholder="enter a username"
                    required
                  />
                </InputGroup>
              </Field>
            )}
            {/* Email */}

            <Field>
              <FieldLabel htmlFor="email" className="font-medium text-sm">
                Email
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <MailIcon />
                </InputGroupAddon>
                <InputGroupInput
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Please enter your email"
                  required
                />
              </InputGroup>
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password" className="font-medium text-sm">
                Password
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <LockIcon />
                </InputGroupAddon>
                <InputGroupInput
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Please enter your password"
                  required
                  type={showPassword ? "text" : "password"}
                />
                <InputGroupAddon align="inline-end">
                  <Button type="button" variant="ghost" onClick={() => setShowPassword((p) => !p)}>
                    {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : state === "login" ? "Login" : "Sign up"}
            </Button>

            {state === "login" ? (
              <p className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
                Don"t have an account?{" "}
                <Button onClick={() => setState("sign up")} variant="link" className="ml-1 cursor-pointer hover:underline">
                  Sign up
                </Button>
              </p>
            ) : (
              <p className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Button onClick={() => setState("login")} variant="link" className="ml-1 cursor-pointer hover:underline">
                  Login
                </Button>
              </p>
            )}
          </FieldGroup>
        </form>
      </main>
    </>
  );
};

export default Login;
