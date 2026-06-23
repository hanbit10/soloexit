import React, { createContext, useContext, useEffect, useState } from "react";
import { initialState, type ActivityEntry, type Credentials, type FoodEntry, type User } from "../types";
import { useNavigate } from "react-router-dom";
// import mockApi from "../assets/mockApi";
import api from "../configs/api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const AppContext = createContext(initialState);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(null);
  const [isUserFetched, setIsUserFetched] = useState(localStorage.getItem("token") ? false : true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [allFoodLogs, setAllFoodLogs] = useState<FoodEntry[]>([]);
  const [allActivityLogs, setAllActivityLogs] = useState<ActivityEntry[]>([]);

  const signup = async (credentials: Credentials) => {
    try {
      const { data } = await api.post("/api/auth/local/register", credentials);

      setUser({ ...data.user, token: data.jwt });
      if (data?.user?.age && data?.user?.weight && data?.user?.goal) {
        setOnboardingCompleted(true);
      }
      localStorage.setItem("token", data.jwt);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.error?.message || "Failed to signup");
      }
    }
  };

  const login = async (credentials: Credentials) => {
    try {
      const { data } = await api.post("/api/auth/local", { identifier: credentials.email, password: credentials.password });
      setUser({ ...data.user, token: data.jwt });

      if (data?.user?.age && data?.user?.weight && data?.user?.goal) {
        setOnboardingCompleted(true);
      }
      localStorage.setItem("token", data.jwt);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.error?.message || "Failed to signup");
      }
    }
  };

  const fetchUser = async (token: string) => {
    const { data } = await api.get("/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser({ ...data, token });
    if (data?.age && data?.weight && data?.goal) {
      setOnboardingCompleted(true);
    }

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setIsUserFetched(true);
  };

  const fetchFoodLogs = async (token: string) => {
    const { data } = await api.get("/api/food-logs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAllFoodLogs(data);
  };

  const fetchActivityLogs = async (token: string) => {
    const { data } = await api.get("/api/activity-logs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAllActivityLogs(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setOnboardingCompleted(false);
    api.defaults.headers.common["Authorization"] = "";
    navigate("/");
  };

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        await fetchUser(token);
        await fetchFoodLogs(token);
        await fetchActivityLogs(token);
      }

      // setIsUserFetched(true);
    };

    init();
  }, []);

  const value = {
    user,
    setUser,
    isUserFetched,
    fetchUser,
    signup,
    login,
    logout,
    onboardingCompleted,
    setOnboardingCompleted,
    allFoodLogs,
    allActivityLogs,
    setAllFoodLogs,
    setAllActivityLogs,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
