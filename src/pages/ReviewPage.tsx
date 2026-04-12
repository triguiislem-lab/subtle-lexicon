import { useState } from "react";
import { sampleVocabulary } from "@/data/sampleData";
import { RotateCcw, Check, X, ChevronLeft, ChevronRight, Brain, Flame, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function ReviewPage() {
  const reviewWords = sampleVocabulary.filter((w) => w.mastery < 80);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [correct, setCorrect] = useState(0);

  const word = reviewWords[current];
  if (!word) return (
    <div className="max-w-lg mx-auto text-center py-20">
      <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
        <Check className="w-8 h-8 text-success" />
      </div>
      <h2 className="text-2xl font-bold mb-2">All caught up!</h2>
      <p className="text-muted-foreground">No words due for review. Come back tomorrow.</p>
    </div>
  );

  const handleResult = (knew: boolean) => {
    if (knew) setCorrect((c) => c + 1);
    setReviewed((r) => r + 1);
    setFlipped(false);
    setCurrent((c) => (c + 1) % reviewWords.length);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Daily Review</h1>
          <p className="text-muted-foreground text-sm">{reviewWords.length} words to review</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Brain, label: "To Review", value: reviewWords.length, color: "text-primary" },
          { icon: Target, label: "Reviewed", value: reviewed, color: "text-success" },
          { icon: Flame, label: "Accuracy", value: reviewed ? `${Math.round((correct / reviewed) * 100)}%` : "—", color: "text-accent" },
        ].map((s, i) => (
          <div key={i} className="glass rounded-xl p-4 text-center">
            <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.color}`} />
            <p className="text-xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <Progress value={(reviewed / reviewWords.length) * 100} className="h-2" />

      {/* Card */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="glass rounded-2xl p-10 min-h-[280px] flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all group relative"
      >
        <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">
          {flipped ? "Answer" : "Tap to reveal"}
        </p>
        {!flipped ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">{word.word}</h2>
            <p className="text-sm text-muted-foreground italic">{word.context}</p>
          </div>
        ) : (
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">{word.word}</h2>
            <p className="text-2xl text-accent font-medium mb-3" dir="rtl">{word.arabic}</p>
            <p className="text-muted-foreground">{word.explanation}</p>
          </div>
        )}
        <div className="absolute bottom-4 right-4">
          <RotateCcw className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
        </div>
      </div>

      {flipped && (
        <div className="flex justify-center gap-4 animate-fade-in">
          <Button variant="outline" size="lg" className="border-destructive/30 hover:bg-destructive/10" onClick={() => handleResult(false)}>
            <X className="w-4 h-4 mr-2 text-destructive" /> Didn't Know
          </Button>
          <Button size="lg" className="gradient-bg text-primary-foreground border-0" onClick={() => handleResult(true)}>
            <Check className="w-4 h-4 mr-2" /> Knew It
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <Button variant="ghost" size="sm" onClick={() => { setCurrent((c) => Math.max(0, c - 1)); setFlipped(false); }}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous
        </Button>
        <span>{current + 1} / {reviewWords.length}</span>
        <Button variant="ghost" size="sm" onClick={() => { setCurrent((c) => (c + 1) % reviewWords.length); setFlipped(false); }}>
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
