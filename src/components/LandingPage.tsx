import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Upload, Brain, Trophy, Sparkles, Play, ChevronRight, Star, Zap, Globe, Check, Film, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import suitsImg from "@/assets/show-suits.jpg";
import breakingBadImg from "@/assets/show-breaking-bad.jpg";
import strangerThingsImg from "@/assets/show-stranger-things.jpg";
import friendsImg from "@/assets/show-friends.jpg";
import gotImg from "@/assets/show-game-of-thrones.jpg";
import officeImg from "@/assets/show-office.jpg";

const features = [
  { icon: Upload, title: "Upload Subtitles", desc: "Drop an .srt file or paste text from your favorite show" },
  { icon: Brain, title: "AI-Powered Analysis", desc: "Automatically detects difficult words with Arabic translations" },
  { icon: BookOpen, title: "Interactive Learning", desc: "Click any word for instant explanations and context" },
  { icon: Trophy, title: "Track Progress", desc: "Spaced repetition, quizzes, and mastery tracking" },
];

const steps = [
  { num: "01", title: "Upload", desc: "Upload subtitles from any show or movie" },
  { num: "02", title: "Learn", desc: "Tap highlighted words to see translations" },
  { num: "03", title: "Practice", desc: "Take quizzes and review with spaced repetition" },
  { num: "04", title: "Master", desc: "Track your progress and grow your vocabulary" },
];

const shows = [
  { name: "Suits", genre: "Legal Drama", words: "2,400+", image: suitsImg, color: "from-blue-600/80 to-amber-500/80" },
  { name: "Breaking Bad", genre: "Crime Drama", words: "3,100+", image: breakingBadImg, color: "from-green-600/80 to-yellow-500/80" },
  { name: "Stranger Things", genre: "Sci-Fi", words: "1,900+", image: strangerThingsImg, color: "from-purple-600/80 to-red-500/80" },
  { name: "Friends", genre: "Comedy", words: "2,800+", image: friendsImg, color: "from-amber-500/80 to-orange-500/80" },
  { name: "Game of Thrones", genre: "Fantasy", words: "3,500+", image: gotImg, color: "from-blue-800/80 to-cyan-500/80" },
  { name: "The Office", genre: "Workplace Comedy", words: "2,200+", image: officeImg, color: "from-gray-600/80 to-blue-400/80" },
];

const plans = [
  { name: "Free", price: "$0", period: "/forever", features: ["5 subtitle uploads/month", "Basic word detection", "50 saved words", "Daily quiz"], popular: false },
  { name: "Pro", price: "$9", period: "/month", features: ["Unlimited uploads", "Advanced AI analysis", "Unlimited saved words", "Spaced repetition", "Progress analytics", "Priority support"], popular: true },
  { name: "Team", price: "$29", period: "/month", features: ["Everything in Pro", "5 team members", "Shared vocabulary", "Custom word lists", "Admin dashboard", "API access"], popular: false },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">SubCoach</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm" className="gradient-bg text-primary-foreground border-0">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="container relative text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Zap className="w-3.5 h-3.5" />
            Learn English from the shows you love
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Master English with{" "}
            <span className="gradient-text">Subtitle Coach</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Upload subtitles from your favorite TV shows, get instant Arabic translations, and build vocabulary with AI-powered spaced repetition.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/dashboard">
              <Button size="lg" className="gradient-bg text-primary-foreground border-0 text-base px-8 h-12 glow">
                Start Learning Free <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-base px-8 h-12">
              <Play className="mr-2 w-4 h-4" /> Watch Demo
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-accent fill-accent" /> 4.9/5 rating</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> 10k+ learners</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to learn</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">From subtitle analysis to mastery tracking, we've built the complete language learning toolkit.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass glass-hover rounded-xl p-6 group" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 bg-muted/30">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground text-lg">Four simple steps to fluency</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-4xl font-extrabold gradient-text">{s.num}</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Shows */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Film className="w-3.5 h-3.5" />
              Learn from What You Love
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Shows & Movies</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Thousands of learners are already mastering English with subtitles from these hit series and films
            </p>
          </div>

          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {shows.map((show, i) => (
                <CarouselItem key={i} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={show.image} 
                        alt={show.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        width={400}
                        height={200}
                      />
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${show.color} opacity-60 mix-blend-multiply`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      
                      {/* Word Count Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border/50">
                        <span className="text-xs font-semibold">{show.words} words</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{show.name}</h3>
                          <p className="text-sm text-muted-foreground">{show.genre}</p>
                        </div>
                        <div className="flex items-center gap-1 text-accent">
                          <Tv className="w-4 h-4" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-4">
                        <div className="flex -space-x-2">
                          {[1,2,3].map((n) => (
                            <div key={n} className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background" />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{100 + i * 50}+ active learners</span>
                      </div>
                    </div>

                    {/* Hover CTA */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/60 backdrop-blur-sm">
                      <Link to="/dashboard">
                        <Button size="sm" className="gradient-bg text-primary-foreground border-0">
                          Start Learning
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          <div className="text-center mt-10">
            <p className="text-sm text-muted-foreground">
              Works with any .srt file — from Netflix, YouTube, or your personal collection
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple pricing</h2>
            <p className="text-muted-foreground text-lg">Start free, upgrade when you're ready</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div key={i} className={`rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${plan.popular ? "border-primary bg-primary/5 glow relative" : "border-border bg-card"}`}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold gradient-bg text-primary-foreground rounded-full">Most Popular</span>}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-success shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/dashboard">
                  <Button className={`w-full ${plan.popular ? "gradient-bg text-primary-foreground border-0" : ""}`} variant={plan.popular ? "default" : "outline"}>
                    {plan.name === "Free" ? "Get Started" : "Start Free Trial"}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-accent flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-accent-foreground" />
            </div>
            <span className="font-semibold text-foreground">SubCoach</span>
          </div>
          <p>© 2024 Subtitle Language Coach. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
