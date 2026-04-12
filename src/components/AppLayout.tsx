import { Link, useLocation, Outlet } from "react-router-dom";
import { BookOpen, Upload, Brain, Trophy, BarChart3, Settings, Sparkles, Home, RotateCcw, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Upload, label: "Upload", path: "/upload" },
  { icon: BookOpen, label: "Viewer", path: "/viewer" },
  { icon: Brain, label: "Vocabulary", path: "/vocabulary" },
  { icon: Trophy, label: "Quiz", path: "/quiz" },
  { icon: RotateCcw, label: "Review", path: "/review" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function AppLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 border-r bg-card flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center gap-2 px-5 h-16 border-b shrink-0">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-accent-foreground" />
          </div>
          <span className="text-lg font-bold">SubCoach</span>
          <button className="ml-auto md:hidden" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                <item.icon className="w-4.5 h-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-xs text-muted-foreground mb-2">Upgrade to Pro</p>
            <Link to="/">
              <Button size="sm" className="w-full gradient-bg text-primary-foreground border-0 text-xs">Upgrade</Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-14 border-b bg-card/80 backdrop-blur-xl flex items-center px-4 gap-4">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-primary-foreground">A</div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
