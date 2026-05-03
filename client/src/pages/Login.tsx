import { AtSignIcon } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const [state, setState] = useState("sign up");
    const [state, setState] = useState("sign up");

  return (
    <>
      <main className="login-page-container">
        <form className="login-form">
          <h2 className="text-3xl font-medium text-gray-900 dark:text-white">
            {state == "login" ? "sign in" : "sign up"}
          </h2>
          <p className="mt-2 text-sm text-gray-500/90 dark:text-gray-400">
            {state == "login"
              ? "Please enter email and password to acces."
              : "Please enter your details to create an account."}
          </p>
          {/* Username */}
          {state !== "login" && (
            <div className="mt-4">
              <label
                htmlFor=""
                className="font-medium text-sm text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <div className="relative mt-2">
                <AtSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5" />
                <input
                  type="text"
                  placeholder="enter a username"
                  className="login-input"
                  required
                />
              </div>
            </div>
          )}
        </form>
      </main>
    </>
  );
};

export default Login;
