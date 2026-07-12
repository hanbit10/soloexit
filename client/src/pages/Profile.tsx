/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import type { ProfileFormData } from "../types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Calendar, LogOutIcon, MoonIcon, Scale, SunIcon, Target, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { goalLabels } from "../assets/assets";
// import mockApi from "../assets/mockApi";
import toast from "react-hot-toast";
import api from "../configs/api";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EightFigure from "@/components/EightFigure";

const Profile = () => {
  const { user, logout, fetchUser, allFoodLogs, allActivityLogs } = useAppContext();
  const { theme, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    age: 0,
    weight: 0,
    height: 0,
    goal: "maintain",
    dailyCalorieIntake: 2000,
    dailyCalorieBurn: 400,
  });

  const fetchUserData = () => {
    if (user) {
      setFormData({
        age: user?.age || 0,
        weight: user?.weight || 0,
        height: user?.height || 0,
        goal: user?.goal || "maintain",
        dailyCalorieIntake: user?.dailyCalorieIntake || 2000,
        dailyCalorieBurn: user?.dailyCalorieBurn || 400,
      });
    }
  };

  useEffect(() => {
    (() => {
      fetchUserData();
    })();
  }, [user]);

  const handleSave = async () => {
    try {
      //Mock Api update
      // const updates: Partial<UserData> = {
      //   ...formData,
      //   goal: formData.goal as "lose" | "maintain" | "gain",
      // };
      // await mockApi.user.update(user?.id || "", updates);
      await api.put(`/api/users/${user?.id}`, formData);
      await fetchUser(user?.token || "");
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.messasge || "Failed to update profile");
    }
    setIsEditing(false);
  };

  const getStats = () => {
    const totalFoodEntries = allFoodLogs?.length || 0;
    const totalActivities = allActivityLogs?.length || 0;
    return { totalFoodEntries, totalActivities };
  };

  const stats = getStats();

  if (!user || !formData) return null;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Profile</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your settings</p>
      </div>
      <div className="profile-content">
        {/* left col */}
        <Card>
          <CardHeader className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-linear-to-br from-slate-400 to-slate-600 flex items-center justify-center">
              <User className="size-6 text-white" />
            </div>
            <CardTitle>
              <h2 className="text-lg font-semibold">Your Profile</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs">Member since {new Date(user?.createdAt || "").toLocaleDateString()}</p>
            </CardTitle>
          </CardHeader>

          {isEditing ? (
            <CardContent className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="age">Age</FieldLabel>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    min={13}
                    max={120}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="weight">Weight</FieldLabel>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                    min={20}
                    max={300}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="height">Height</FieldLabel>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                    min={100}
                    max={250}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="goal">Fitness Goal</FieldLabel>
                  <Select
                    id="goal"
                    value={formData.goal}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        goal: value as "lose" | "maintain" | "gain",
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a goal" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="lose">Lose weight</SelectItem>
                      <SelectItem value="maintain">Maintain</SelectItem>
                      <SelectItem value="gain">Gain weight</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        age: Number(user.age),
                        weight: Number(user.weight),
                        height: Number(user.height),
                        goal: user.goal || "",
                        dailyCalorieIntake: user.dailyCalorieIntake || 2000,
                        dailyCalorieBurn: user.dailyCalorieBurn || 400,
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              </FieldGroup>
            </CardContent>
          ) : (
            <>
              <CardContent className="space-y-4">
                {/* age */}
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
                  <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Calendar className="size-4.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Age</p>
                    <p className="font-semibold text-slate-800 dark:text-white">{user.age} years</p>
                  </div>
                </div>

                {/* weight */}
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
                  <div className="size-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Scale className="size-4.5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Weight</p>
                    <p className="font-semibold text-slate-800 dark:text-white">{user.weight} kg</p>
                  </div>
                </div>

                {/* height */}
                {user.height !== 0 && (
                  <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
                    <div className="size-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <Scale className="size-4.5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Height</p>
                      <p className="font-semibold text-slate-800 dark:text-white">{user.height} cm</p>
                    </div>
                  </div>
                )}

                {/* goal */}

                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-200">
                  <div className="size-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                    <Target className="size-4.5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Goal</p>
                    <p className="font-semibold text-slate-800 dark:text-white">{goalLabels[user?.goal || "gain"]}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setIsEditing(true)} className="w-full ">
                  Edit Profile
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
        {/* right col */}
        <div className="space-y-4">
          {/* stats card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Stats</CardTitle>
            </CardHeader>

            <CardContent>
              <EightFigure />
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-slate-700 rounded-xl">
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.totalFoodEntries}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Food entries</p>
                </div>

                <div className="text-center p-4 bg-blue-50 dark:bg-slate-700 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalActivities}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Activities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* toggle theme button for phone */}
          <div className="lg:hidden">
            <Button onClick={toggleTheme} variant="ghost" className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg cursor-pointer">
              {theme === "light" ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
              <span className="text-base">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
            </Button>
          </div>

          {/* Logout button */}
          <Button variant="destructive" onClick={logout} className="w-full">
            <LogOutIcon className="size-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
