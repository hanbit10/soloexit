/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import type { FoodEntry, FoodFormData } from "../types";
import { mealColors, mealIcons, mealTypeOptions, quickActivitiesFoodLog } from "../assets/assets";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Loader2Icon, PlusIcon, SparkleIcon, Trash2Icon, UtensilsCrossedIcon } from "lucide-react";
// import mockApi from "../assets/mockApi";
import toast from "react-hot-toast";
import api from "../configs/api";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FoodLog = () => {
  const { allFoodLogs, setAllFoodLogs } = useAppContext();

  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FoodFormData>({
    name: "",
    calories: 0,
    mealType: "",
  });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().split("T")[0];

  const loadEntries = () => {
    const todaysEntries = allFoodLogs.filter((e: FoodEntry) => e.createdAt?.split("T")[0] === today);
    setEntries(todaysEntries);
  };

  const totalCalories = entries.reduce((sum, e) => sum + e.calories, 0);

  //group entries by meal type
  const groupedEntries: Record<"breakfast" | "lunch" | "dinner" | "snack", FoodEntry[]> = entries.reduce(
    (acc, entry) => {
      if (!acc[entry.mealType]) acc[entry.mealType] = [];
      acc[entry.mealType].push(entry);
      return acc;
    },
    {} as Record<"breakfast" | "lunch" | "dinner" | "snack", FoodEntry[]>,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.calories || formData.calories <= 0 || !formData.mealType) {
      return toast("Please enter valid data");
    }

    try {
      const { data } = await api.post("/api/food-logs", { data: formData });
      setAllFoodLogs((prev) => [...prev, data]);
      setFormData({ name: "", calories: 0, mealType: "" });
      setShowForm(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Failed to add food");
    }
  };

  const handleDelete = async (documentId: string) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this entry?");
      if (!confirm) return;
      await api.delete(`/api/food-logs/${documentId}`);
      setAllFoodLogs((prev) => prev.filter((e) => e.documentId !== documentId));
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Failed to delete food");
    }
  };

  const handleQuickAdd = (activityName: string) => {
    setFormData({ ...formData, mealType: activityName });
    setShowForm(true);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const { data } = await api.post("/api/image-analysis", formData);
      const result = data.result;
      let mealType = "";

      const hour = new Date().getHours();

      if (hour >= 0 && hour < 12) {
        mealType = "breakfast";
      } else if (hour >= 12 && hour < 18) {
        mealType = "lunch";
      } else {
        mealType = "dinner";
      }

      if (!mealType || !result.calories || !result.name) {
        return toast.error("Failed to add food");
      }

      // Save the result to the database
      const { data: newEntry } = await api.post("/api/food-logs", { data: { name: result.name, calories: result.calories, mealType } });
      // setEntries([...entries, newEntry]);
      setAllFoodLogs((prev) => [...prev, newEntry]);

      //reset input
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Failed to add food");
    } finally {
      setLoading(false);
    }
    //Implement image analysis
  };

  useEffect(() => {
    (() => {
      loadEntries();
    })();
  }, [allFoodLogs]);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-200 dark:text-white">Food Log</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track your daily intake</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">Today's Total</p>
            <p className="text-xl font-bold text-slate-600 dark:text-slate-200">{totalCalories} kcal</p>
          </div>
        </div>
      </div>
      <div className="page-content-grid">
        {/* Quick Add Section */}
        {!showForm && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Quick Add</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {quickActivitiesFoodLog.map((activity) => (
                    <Button
                      onClick={() => handleQuickAdd(activity.name)}
                      variant="outline"
                      className="px-4 py-2rounded-xl text-sm font-medium"
                      key={activity.name}
                    >
                      {activity.emoji} {activity.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" onClick={() => setShowForm(true)}>
              <PlusIcon className="size-5" />
              Add Food Entry
            </Button>

            <Button
              className="w-full"
              onClick={() => {
                inputRef.current?.click();
              }}
            >
              <SparkleIcon className="size-5" />
              AI Food Snap
            </Button>

            <input onChange={handleImageChange} type="file" accept="image/*" hidden ref={inputRef} />
            {loading && (
              <div className="fixed inset-0 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur flex items-center justify-center z-100">
                <Loader2Icon className="size-8 text-slate-600 dark:text-slate-200 animate-spin" />
              </div>
            )}
          </div>
        )}

        {/* Add Form */}
        {showForm && (
          <Card className="mb-0">
            <CardHeader>
              <h3 className="font-semibold text-slate-800 dark:text-white mb-4">New Food Entry</h3>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" action="" onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="food-name">Food Name</FieldLabel>
                    <Input
                      id="food-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Grilled Chicken Salad"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="calories">Calories</FieldLabel>
                    <Input
                      id="calories"
                      type="number"
                      value={formData.calories}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          calories: Number(e.target.value),
                        })
                      }
                      placeholder="e.g., 350"
                      required
                      min={1}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="meal-type">Meal Type</FieldLabel>
                    <Select
                      value={formData.mealType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          mealType: value ?? "",
                        }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                      <SelectContent>
                        {mealTypeOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <div className="flex gap-3 pt-2">
                    <Button
                      className="flex-1"
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        setShowForm(false);
                        setFormData({ name: "", calories: 0, mealType: "" });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      Add Entry
                    </Button>
                  </div>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Entries List */}
        {entries.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossedIcon className="size-8 text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">No food logged today</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Start tracking your meals to stay on target</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {["breakfast", "lunch", "dinner", "snack"].map((mealType) => {
              const mealTypeKey = mealType as keyof typeof groupedEntries;

              if (!groupedEntries[mealTypeKey]) return null;

              const MealIcon = mealIcons[mealTypeKey];
              const mealCalories = groupedEntries[mealTypeKey].reduce((sum, e) => sum + e.calories, 0);

              return (
                <Card key={mealType}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mealColors[mealTypeKey]}`}>
                          <MealIcon className="size-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-white capitalize">{mealType}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{groupedEntries[mealTypeKey].length} items</p>
                        </div>
                      </div>
                      <p className="font-semibold text-slate-700 dark:text-slate-200">{mealCalories} kcal</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {groupedEntries[mealTypeKey].map((entry) => (
                        <div key={entry.id} className="food-entry-item">
                          <div className="flex-1">
                            <p className="font-medium text-slate-700 dark:text-slate-200">{entry.name}</p>
                            <p className="text-sm text-slate-400">{}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{entry.calories} kcal</span>
                            <Button variant="destructive" onClick={() => handleDelete(entry?.documentId || "")} className="p-2 rounded-lg">
                              <Trash2Icon className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodLog;
