import { useState } from "react";
import { Upload, FileText, Clipboard, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const [mode, setMode] = useState<"upload" | "paste">("upload");
  const [text, setText] = useState("");
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();

  const handleProcess = () => navigate("/viewer");

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Upload Subtitles</h1>
        <p className="text-muted-foreground">Add subtitle content from your favorite shows</p>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2 p-1 bg-muted rounded-lg w-fit">
        <button onClick={() => setMode("upload")} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === "upload" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
          <Upload className="w-4 h-4" /> Upload File
        </button>
        <button onClick={() => setMode("paste")} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === "paste" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
          <Clipboard className="w-4 h-4" /> Paste Text
        </button>
      </div>

      {mode === "upload" ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleProcess(); }}
          className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all ${dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Drop your .srt file here</h3>
          <p className="text-muted-foreground text-sm mb-6">or click to browse files</p>
          <Button variant="outline" onClick={handleProcess}>
            Browse Files
          </Button>
          <p className="text-xs text-muted-foreground mt-4">Supports .srt, .vtt, .txt formats</p>
        </div>
      ) : (
        <div className="space-y-4">
          <Textarea
            placeholder="Paste your subtitle text here...&#10;&#10;1&#10;00:01:15,000 --> 00:01:18,000&#10;We need to file a motion to dismiss."
            className="min-h-[250px] font-mono text-sm bg-card"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      )}

      <Button onClick={handleProcess} size="lg" className="gradient-bg text-primary-foreground border-0 w-full sm:w-auto">
        <Sparkles className="mr-2 w-4 h-4" /> Analyze Subtitles <ArrowRight className="ml-2 w-4 h-4" />
      </Button>

      {/* Recent uploads */}
      <div>
        <h3 className="font-semibold mb-3">Recent Uploads</h3>
        <div className="space-y-2">
          {["Suits_S01E01.srt", "Suits_S01E02.srt", "The_Good_Wife_S02E05.srt"].map((f, i) => (
            <div key={i} className="glass glass-hover rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer" onClick={handleProcess}>
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium flex-1">{f}</span>
              <span className="text-xs text-muted-foreground">{[24, 31, 18][i]} words detected</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
