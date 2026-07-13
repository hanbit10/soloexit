/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import type { ActivityEntry } from "../../types";

import { quickActivities } from "../../assets/assets";
import { ActivityIcon, DumbbellIcon, PlusIcon, TimerIcon, Trash2Icon } from "lucide-react";
// import Input from "../components/Input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import toast from "react-hot-toast";
// import mockApi from "../assets/mockApi";
import api from "../../configs/api";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/ui/Header";

const ActivityLog = () => {
  const { allActivityLogs, setAllActivityLogs } = useAppContext();

  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    duration: 0,
    calories: 0,
  });
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const loadActivities = () => {
    const todaysActivities = allActivityLogs.filter((a: ActivityEntry) => a.createdAt?.split("T")[0] === today);
    setActivities(todaysActivities);
  };

  useEffect(() => {
    (() => {
      loadActivities();
    })();
  }, [allActivityLogs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.duration <= 0) {
      return toast("Please enter valid data");
    }
    try {
      const { data } = await api.post("/api/activity-logs", { data: formData });
      setAllActivityLogs((prev) => [...prev, data]);
      setFormData({ name: "", duration: 0, calories: 0 });
      setShowForm(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Failed to add activity");
    }
  };

  const handleQuickAdd = (activity: { name: string; rate: number }) => {
    setFormData({
      name: activity.name,
      duration: 30,
      calories: 30 * activity.rate,
    });
    setShowForm(true);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const duration = Number(e.target.value);

    const activity = quickActivities.find((a) => a.name === formData.name);

    let calories = formData.calories;

    if (activity) {
      calories = duration * activity.rate;
    }

    setFormData((prev) => ({
      ...prev,
      duration,
      calories,
    }));
  };

  const handleDelete = async (documentId: string) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this activity?");
      if (!confirm) return;

      await api.delete(`/api/activity-logs/${documentId}`);

      setAllActivityLogs((prev) => prev.filter((e) => e.documentId !== documentId));
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Failed to delete activity");
    }
  };

  const totalMinutes: number = activities.reduce((sum, a) => sum + a.duration, 0);

  return (
    <div className="page-container">
      <Header title="Activity Log" description="Track your workouts" rightLabel="Active Today" rightValue={totalMinutes} />

      <div className="page-content-grid">
        {/* Quick Add Section */}
        {!showForm && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-slate-700 dark:text-slate-200">Quick Add</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {/* All Activities */}
                  {quickActivities.map((activity) => (
                    <Button
                      onClick={() => handleQuickAdd(activity)}
                      key={activity.name}
                      variant="outline"
                      className=" rounded-xl text-sm font-medium transition-colors"
                    >
                      {activity.emoji} {activity.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Button className="w-full" onClick={() => setShowForm(true)}>
              <PlusIcon className="size-5" />
              Add Custom Activity
            </Button>
          </div>
        )}

        {/* Add Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <h3 className="font-semibold">New Activity</h3>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit} action="">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="activity-name">Activity Name</FieldLabel>
                    <Input
                      id="activity-name"
                      placeholder="e.g., Morning Run"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </Field>

                  <div className="flex gap-4">
                    <Field>
                      <FieldLabel htmlFor="duration">Duration (min)</FieldLabel>
                      <Input
                        id="duration"
                        type="number"
                        className="flex-1"
                        placeholder="30"
                        min={1}
                        max={300}
                        value={formData.duration}
                        onChange={handleDurationChange}
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="calories">Calories Burned</FieldLabel>
                      <Input
                        id="calories"
                        type="number"
                        className="flex-1"
                        placeholder="200"
                        min={1}
                        max={2000}
                        value={formData.calories}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            calories: Number(e.target.value),
                          })
                        }
                        required
                      />
                    </Field>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => {
                        setShowForm(false);
                        setError("");
                        setFormData({ name: "", duration: 0, calories: 0 });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      Add Activity
                    </Button>
                  </div>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Activities List */}
        {activities.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <DumbbellIcon className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="font-semibold mb-2">No activities logged today</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Start moving and track your progress</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <ActivityIcon className="size-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">Today's Activities</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{activities.length} logged</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {activities.map((activity) => (
                  <div key={activity.id} className="activity-entry-item bg-secondary">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center ">
                        <TimerIcon className="size-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-200">{activity.name}</p>
                        <p className="text-sm text-slate-400">
                          {new Date(activity?.createdAt || "").toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold text-slate-700 dark:text-slate-200">{activity.duration} min</p>
                        <p className="text-xs text-slate-400">{activity.calories} kcal</p>
                      </div>
                      <Button onClick={() => handleDelete(activity.documentId)} variant="destructive" className="p-2 rounded-lg">
                        <Trash2Icon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">Total Active Time</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{totalMinutes} minutes</span>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
