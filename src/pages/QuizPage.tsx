import { useState } from "react";
import { sampleQuizQuestions } from "@/data/sampleData";
import { Trophy, ChevronRight, RotateCcw, Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [fillAnswer, setFillAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const q = sampleQuizQuestions[currentQ];
  const progress = ((currentQ + (answered ? 1 : 0)) / sampleQuizQuestions.length) * 100;

  const checkAnswer = () => {
    const answer = q.type === "fill-in-the-blank" ? fillAnswer.trim().toLowerCase() : selected;
    const correct = answer === q.correctAnswer.toLowerCase() || answer === q.correctAnswer;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, correct]);
    setAnswered(true);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= sampleQuizQuestions.length) {
      setFinished(true);
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setFillAnswer("");
      setAnswered(false);
    }
  };

  const restart = () => {
    setCurrentQ(0); setSelected(null); setFillAnswer(""); setAnswered(false); setScore(0); setFinished(false); setAnswers([]);
  };

  if (finished) {
    const pct = Math.round((score / sampleQuizQuestions.length) * 100);
    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-12">
        <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto glow">
          <Trophy className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold">Quiz Complete!</h1>
        <p className="text-muted-foreground">You scored <span className="text-foreground font-bold">{score}/{sampleQuizQuestions.length}</span> ({pct}%)</p>
        <div className="flex justify-center gap-2">
          {answers.map((a, i) => (
            <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${a ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`}>
              {a ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-3">
          <Button onClick={restart} variant="outline"><RotateCcw className="w-4 h-4 mr-2" /> Try Again</Button>
          <Button className="gradient-bg text-primary-foreground border-0"><Sparkles className="w-4 h-4 mr-2" /> Review Words</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quiz</h1>
          <p className="text-muted-foreground text-sm">Question {currentQ + 1} of {sampleQuizQuestions.length}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">Score: {score}</p>
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      <div className="glass rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2 font-mono">"{q.context}"</p>
          <h2 className="text-xl font-bold">{q.question}</h2>
        </div>

        {q.type === "multiple-choice" && q.options ? (
          <div className="grid gap-3">
            {q.options.map((opt) => {
              let cls = "border bg-card hover:bg-muted";
              if (answered) {
                if (opt === q.correctAnswer) cls = "border-success bg-success/10";
                else if (opt === selected) cls = "border-destructive bg-destructive/10";
              } else if (opt === selected) cls = "border-primary bg-primary/10";
              return (
                <button key={opt} onClick={() => !answered && setSelected(opt)}
                  className={`p-4 rounded-xl text-sm font-medium text-left transition-all ${cls}`}>
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            <Input
              placeholder="Type your answer..."
              value={fillAnswer}
              onChange={(e) => !answered && setFillAnswer(e.target.value)}
              className={`text-center text-lg ${answered ? (answers[answers.length - 1] ? "border-success" : "border-destructive") : ""}`}
              onKeyDown={(e) => e.key === "Enter" && !answered && checkAnswer()}
            />
            {answered && !answers[answers.length - 1] && (
              <p className="text-sm text-center text-muted-foreground">Correct answer: <span className="text-foreground font-medium">{q.correctAnswer}</span></p>
            )}
          </div>
        )}

        <div className="flex justify-center">
          {!answered ? (
            <Button onClick={checkAnswer} disabled={q.type === "multiple-choice" ? !selected : !fillAnswer.trim()} className="gradient-bg text-primary-foreground border-0 px-8">
              Check Answer
            </Button>
          ) : (
            <Button onClick={nextQuestion} className="gradient-bg text-primary-foreground border-0 px-8">
              {currentQ + 1 >= sampleQuizQuestions.length ? "See Results" : "Next"} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
