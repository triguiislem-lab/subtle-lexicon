import { Link } from "react-router-dom";
import { BookOpen, Upload, Brain, Trophy, TrendingUp, Clock, Target, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const stats = [
  { icon: BookOpen, label: "Words Learned", value: "142", change: "+12 this week", color: "text-primary" },
  { icon: Flame, label: "Day Streak", value: "7", change: "Keep it up!", color: "text-accent" },
  { icon: Target, label: "Mastery Rate", value: "68%", change: "+5% from last week", color: "text-success" },
  { icon: Clock, label: "Study Time", value: "4.2h", change: "This week", color: "text-primary" },
];

const recentWords = [
  { word: "deposition", mastery: 75 },
  { word: "plaintiff", mastery: 90 },
  { word: "injunction", mastery: 40 },
  { word: "settlement", mastery: 85 },
];

const quickActions = [
  { icon: Upload, label: "Upload Subtitles", path: "/upload", desc: "Add new content" },
  { icon: Brain, label: "Review Words", path: "/review", desc: "Spaced repetition" },
  { icon: Trophy, label: "Take a Quiz", path: "/quiz", desc: "Test your knowledge" },
];

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back, Ahmed 👋</h1>
        <p className="text-muted-foreground">Ready to learn some new words today?</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="glass glass-hover rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <s.icon className={`w-5 h-5 ${s.color}`} />
              <TrendingUp className="w-3.5 h-3.5 text-success" />
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            <p className="text-xs text-success mt-0.5">{s.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="font-semibold text-lg">Quick Actions</h2>
          {quickActions.map((a, i) => (
            <Link key={i} to={a.path} className="block glass glass-hover rounded-xl p-4 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <a.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{a.label}</p>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent words */}
        <div className="lg:col-span-2 glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-lg">Recent Words</h2>
            <Link to="/vocabulary"><Button variant="ghost" size="sm" className="text-xs">View all</Button></Link>
          </div>
          <div className="space-y-4">
            {recentWords.map((w, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="font-mono text-sm font-medium w-28">{w.word}</span>
                <div className="flex-1">
                  <Progress value={w.mastery} className="h-2" />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">{w.mastery}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly progress placeholder */}
      <div className="glass rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-4">Weekly Activity</h2>
        <div className="flex items-end gap-2 h-32">
          {[40, 65, 30, 80, 55, 90, 45].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md gradient-bg transition-all duration-500" style={{ height: `${v}%` }} />
              <span className="text-xs text-muted-foreground">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
