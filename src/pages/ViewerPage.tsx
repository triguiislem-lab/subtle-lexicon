import { useState } from "react";
import { sampleSubtitles, HighlightedWord } from "@/data/sampleData";
import { X, Bookmark, Volume2, ChevronRight, Star, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const diffColors: Record<string, string> = {
  beginner: "bg-success/10 text-success border-success/20",
  intermediate: "bg-accent/10 text-accent border-accent/20",
  advanced: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function ViewerPage() {
  const [selectedWord, setSelectedWord] = useState<HighlightedWord | null>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const toggleSave = (word: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(word) ? next.delete(word) : next.add(word);
      return next;
    });
  };

  return (
    <div className="max-w-6xl mx-auto flex gap-6 relative">
      {/* Subtitle list */}
      <div className={`flex-1 space-y-4 transition-all ${selectedWord ? "lg:mr-96" : ""}`}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold">Suits — S01E01</h1>
            <p className="text-muted-foreground text-sm">Pilot · 24 highlighted words</p>
          </div>
          <Badge variant="outline" className="text-xs">Legal/Business English</Badge>
        </div>

        {sampleSubtitles.map((line) => (
          <div key={line.id} className="glass glass-hover rounded-xl p-5 animate-fade-in" style={{ animationDelay: `${line.id * 0.05}s` }}>
            <span className="text-xs text-muted-foreground font-mono mb-2 block">{line.timestamp}</span>
            <p className="text-base leading-relaxed">
              {renderHighlightedText(line.text, line.highlightedWords, setSelectedWord)}
            </p>
          </div>
        ))}
      </div>

      {/* Side panel */}
      {selectedWord && (
        <div className="fixed lg:absolute right-0 top-0 lg:top-auto w-full sm:w-96 h-full lg:h-auto bg-card border-l lg:border lg:rounded-2xl p-6 z-50 lg:z-auto shadow-2xl lg:shadow-lg animate-slide-in-right overflow-y-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">{selectedWord.word}</h2>
              <p className="text-lg text-accent font-medium mt-1" dir="rtl">{selectedWord.arabic}</p>
            </div>
            <button onClick={() => setSelectedWord(null)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Explanation</label>
              <p className="mt-1 text-sm leading-relaxed">{selectedWord.explanation}</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Badge className={`${diffColors[selectedWord.difficulty]} border text-xs`}>{selectedWord.difficulty}</Badge>
              <Badge variant="outline" className="text-xs"><Tag className="w-3 h-3 mr-1" />{selectedWord.domain}</Badge>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Confidence</label>
              <div className="flex items-center gap-3 mt-2">
                <Progress value={selectedWord.confidence} className="h-2 flex-1" />
                <span className="text-sm font-medium">{selectedWord.confidence}%</span>
              </div>
            </div>

            <div className="glass rounded-lg p-3">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Context</label>
              <p className="mt-1 text-sm text-muted-foreground">{selectedWord.context}</p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => toggleSave(selectedWord.word)}
                className={`flex-1 ${saved.has(selectedWord.word) ? "gradient-bg text-primary-foreground border-0" : ""}`}
                variant={saved.has(selectedWord.word) ? "default" : "outline"}
              >
                <Bookmark className="w-4 h-4 mr-2" />
                {saved.has(selectedWord.word) ? "Saved" : "Save Word"}
              </Button>
              <Button variant="outline" size="icon"><Volume2 className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function renderHighlightedText(text: string, words: HighlightedWord[], onClick: (w: HighlightedWord) => void) {
  let result: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  const sortedWords = [...words].sort((a, b) => text.indexOf(a.word) - text.indexOf(b.word));

  for (const hw of sortedWords) {
    const idx = remaining.indexOf(hw.word);
    if (idx === -1) continue;
    if (idx > 0) result.push(<span key={keyIdx++}>{remaining.slice(0, idx)}</span>);
    result.push(
      <button
        key={keyIdx++}
        onClick={() => onClick(hw)}
        className="px-1 py-0.5 rounded-md bg-highlight/20 text-highlight-foreground border-b-2 border-highlight hover:bg-highlight/30 transition-colors font-medium cursor-pointer"
      >
        {hw.word}
      </button>
    );
    remaining = remaining.slice(idx + hw.word.length);
  }
  if (remaining) result.push(<span key={keyIdx++}>{remaining}</span>);
  return result;
}
