import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { Header } from "@/components/ui/Header";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "dark";

  <Switch checked={darkMode} onCheckedChange={toggleTheme} />;

  return (
    <div className="page-container">
      <Header title="Settings" description="Manage your settings" />

      {/* Content */}
      <div className="profile-content space-y-6">
        {/* Account */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="Your name" />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="you@example.com" />
            </div>

            <Button>Save changes</Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>

              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Dark mode</Label>
                <p className="text-sm text-muted-foreground">Toggle theme appearance</p>
              </div>

              <Switch checked={darkMode} onCheckedChange={toggleTheme} />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Change password</Label>
              <Input type="password" placeholder="New password" />
            </div>

            <Button variant="destructive">Delete account</Button>
          </CardContent>
        </Card>

        {/* Language*/}
        <Card>
          <CardHeader>
            <CardTitle>Language</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select language</Label>

              <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="zh">中文</option>
                <option value="ko">한국어</option>
              </select>
            </div>

            <p className="text-sm text-muted-foreground">Changes will apply to the interface language.</p>

            <Button>Save language</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
