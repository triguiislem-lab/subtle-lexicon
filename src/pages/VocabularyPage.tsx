import { useState } from "react";
import { sampleVocabulary } from "@/data/sampleData";
import { Search, Filter, BookOpen, Star, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const filters = ["All", "Beginner", "Intermediate", "Advanced"];
const masteryLabels = (m: number) => m >= 80 ? "Mastered" : m >= 50 ? "Learning" : "New";
const masteryColors = (m: number) => m >= 80 ? "text-success" : m >= 50 ? "text-accent" : "text-muted-foreground";

export default function VocabularyPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = sampleVocabulary.filter((w) => {
    const matchSearch = w.word.toLowerCase().includes(search.toLowerCase()) || w.arabic.includes(search);
    const matchFilter = filter === "All" || w.difficulty === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Vocabulary</h1>
          <p className="text-muted-foreground text-sm">{sampleVocabulary.length} words saved</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search words..." className="pl-9 w-48" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)}
            className={filter === f ? "gradient-bg text-primary-foreground border-0" : ""}>
            {f}
          </Button>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: BookOpen, label: "Total Words", value: sampleVocabulary.length },
          { icon: Star, label: "Mastered", value: sampleVocabulary.filter((w) => w.mastery >= 80).length },
          { icon: TrendingUp, label: "Avg Mastery", value: `${Math.round(sampleVocabulary.reduce((a, b) => a + b.mastery, 0) / sampleVocabulary.length)}%` },
        ].map((s, i) => (
          <div key={i} className="glass rounded-xl p-4 text-center">
            <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Word list */}
      <div className="space-y-3">
        {filtered.map((word) => (
          <div key={word.id} className="glass glass-hover rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{word.word}</span>
                <Badge variant="outline" className="text-xs">{word.domain}</Badge>
              </div>
              <p className="text-accent text-sm" dir="rtl">{word.arabic}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{word.explanation}</p>
            </div>
            <div className="flex items-center gap-4 sm:w-48 shrink-0">
              <div className="flex-1">
                <Progress value={word.mastery} className="h-2" />
              </div>
              <span className={`text-xs font-medium whitespace-nowrap ${masteryColors(word.mastery)}`}>
                {masteryLabels(word.mastery)}
              </span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No words found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
