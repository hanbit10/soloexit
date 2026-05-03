import {
  ArrowLeft,
  ArrowRight,
  PersonStanding,
  ScaleIcon,
  Target,
  User,
} from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import type { ProfileFormData } from "../types";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const { user, setOnboardingCompleted, fetchUser } = useAppContext();

  const [formData, setFormData] = useState<ProfileFormData>({
    age: 0,
    weight: 0,
    height: 0,
    goal: "maintain",
    dailyCalorieIntake: 200,
    dailyCalorieBurn: 400,
  });

  const totalSteps = 3;

  const updateField = (
    field: keyof ProfileFormData,
    value: string | number,
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = async () => {
    
  }

  return (
    <>
      <Toaster />
      <div className="onboarding-container">
        {/* Header */}
        <div className="p-6 pt12 onboarding-wrapper">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gray-400 flex items-center justify-center">
              <PersonStanding className="w-6 h-6 text-slate-200" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              SoloExit
            </h1>
          </div>
          <p className=" text-slate-800 dark:text-white">
            Let's personalize your experience
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 mb-8 onboarding-wrapper">
          <div className="flex gap-2 max-w-2xl">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${s <= step ? "bg-white" : "bg-slate-400 dark:bg-slate800"}`}
              />
            ))}
          </div>
          <p className="text-sm text-slate-400 mt-3 ">
            Step {step} of {totalSteps}
          </p>
        </div>

        {/* Form Content */}
        <div className="flex-1 px-6 onboarding-wrapper">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-xl bg-slate-400 dark:bg-slate-800 border border-slate-400 dark:border-slate-200 flex items-center justify-center">
                  <User className="size-6 text-slate-600 dark:text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                    How old are you?
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    This helps us calculate your needs
                  </p>
                </div>
              </div>
              <Input
                label="Age"
                type="number"
                className="max-w-2xl"
                value={formData.age}
                onChange={(v) => updateField("age", v)}
                placeholder="Enter your age"
                min={13}
                max={120}
                required
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 onboarding-wrapper">
              <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-xl bg-slate-400 dark:bg-slate-800 border border-slate-400 dark:border-slate-200 flex items-center justify-center">
                  <ScaleIcon className="size-6 text-slate-600 dark:text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Your measurements
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Help us track your progress
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 max-w-2xl">
                <Input
                  label="Weight (kg)"
                  type="number"
                  value={formData.weight}
                  onChange={(v) => updateField("weight", v)}
                  placeholder="Enter your weight"
                  min={20}
                  max={300}
                  required
                />

                <Input
                  label="Height (cm)"
                  type="number"
                  value={formData.height}
                  onChange={(v) => updateField("height", v)}
                  placeholder="Enter your height"
                  min={100}
                  max={250}
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 onboarding-wrapper">
              <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-xl bg-slate-400 dark:bg-slate-800 border border-slate-400 dark:border-slate-200 flex items-center justify-center">
                  <Target className="size-6 text-slate-600 dark:text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                    What's your goal?
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    We'll tailor your experience
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Navigation buttons */}
        <div>
          <div>
            {step > 1 && (
              <Button
                variant="secondary"
                onClick={() => setStep(step > 1 ? step - 1 : 1)}
                className="max-lg:flex-1 lg:px-10"
              >
                <span className="flex items-center justify-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </span>
              </Button>
            )}
            <Button
   
              onClick={ => setStep(step > 1 ? step - 1 : 1)}
              className="max-lg:flex-1 lg:px-10"
            >
              <span className="flex items-center justify-center gap-2">
                {step === totalSteps ? 'Get Started' : 'Continue'}

                <ArrowRight className="w-5 h-5" />
               
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
