import { useState } from "react";
import { Globe, Moon, Sun, Eye, BarChart3, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [hideKnown, setHideKnown] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm">Customize your learning experience</p>
      </div>

      {/* Profile */}
      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2"><User className="w-4 h-4" /> Profile</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Display Name</label>
            <Input defaultValue="Ahmed" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Email</label>
            <Input defaultValue="ahmed@example.com" />
          </div>
        </div>
      </div>

      {/* Language */}
      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2"><Globe className="w-4 h-4" /> Language</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">I speak</label>
            <Select defaultValue="arabic">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="arabic">العربية (Arabic)</SelectItem>
                <SelectItem value="french">Français (French)</SelectItem>
                <SelectItem value="spanish">Español (Spanish)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">I'm learning</label>
            <Select defaultValue="english">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="french">Français</SelectItem>
                <SelectItem value="german">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="glass rounded-2xl p-6 space-y-5">
        <h2 className="font-semibold flex items-center gap-2"><Eye className="w-4 h-4" /> Preferences</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Dark Mode</p>
            <p className="text-xs text-muted-foreground">Switch between light and dark theme</p>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-muted-foreground" />
            <Switch checked={darkMode} onCheckedChange={toggleTheme} />
            <Moon className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Hide Known Words</p>
            <p className="text-xs text-muted-foreground">Don't highlight words you've mastered</p>
          </div>
          <Switch checked={hideKnown} onCheckedChange={setHideKnown} />
        </div>
      </div>

      {/* Learning Stats */}
      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Learning Stats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { label: "Total Words", value: "142" },
            { label: "Mastered", value: "38" },
            { label: "Quizzes Taken", value: "24" },
            { label: "Day Streak", value: "7" },
          ].map((s, i) => (
            <div key={i} className="bg-muted/50 rounded-xl p-3">
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Overall Mastery</span>
            <span className="font-medium">68%</span>
          </div>
          <Progress value={68} className="h-3" />
        </div>
      </div>

      <Button className="gradient-bg text-primary-foreground border-0">Save Changes</Button>
    </div>
  );
}
