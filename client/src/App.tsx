import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import FoodLog from "./pages/Nutrition/FoodLog";
import ActivityLog from "./pages/Activity/ActivityLog";
import Profile from "./pages/Profile";
import { useAppContext } from "./context/AppContext";
import Login from "./pages/Login";
import Loading from "./components/ui/Loading";
import Onboarding from "./pages/Onboarding";
import { Toaster } from "react-hot-toast";
import Settings from "./pages/Settings/Settings";
import Routine from "./pages/Routine/BeautyLog";
import Timer from "./pages/Timer/Timer";

const App = () => {
  const { user, isUserFetched, onboardingCompleted } = useAppContext();
  if (!user) {
    return isUserFetched ? <Login /> : <Loading />;
  }

  if (!onboardingCompleted) {
    return <Onboarding />;
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="food" element={<FoodLog />} />
          <Route path="activity" element={<ActivityLog />} />
          <Route path="profile" element={<Profile />} />
          <Route path="routine" element={<Routine />} />
          <Route path="timer" element={<Timer />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
