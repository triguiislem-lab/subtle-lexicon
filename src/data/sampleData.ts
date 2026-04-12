export interface SubtitleLine {
  id: number;
  timestamp: string;
  text: string;
  highlightedWords: HighlightedWord[];
}

export interface HighlightedWord {
  word: string;
  arabic: string;
  explanation: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  domain: string;
  confidence: number;
  context: string;
}

export interface VocabWord extends HighlightedWord {
  id: string;
  mastery: number;
  reviewDate: string;
  timesReviewed: number;
  saved: boolean;
}

export interface QuizQuestion {
  id: number;
  type: "multiple-choice" | "fill-in-the-blank";
  word: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  context: string;
}

export const sampleSubtitles: SubtitleLine[] = [
  {
    id: 1,
    timestamp: "00:01:15",
    text: "We need to file a motion to dismiss before the deposition.",
    highlightedWords: [
      { word: "motion to dismiss", arabic: "طلب رفض الدعوى", explanation: "A formal request to a court to throw out a case", difficulty: "advanced", domain: "Legal", confidence: 95, context: "Used when a lawyer wants to end a case early" },
      { word: "deposition", arabic: "الإفادة", explanation: "Formal questioning of a witness under oath before trial", difficulty: "advanced", domain: "Legal", confidence: 92, context: "Pre-trial discovery process" },
    ],
  },
  {
    id: 2,
    timestamp: "00:01:42",
    text: "The plaintiff's counsel is requesting an injunction.",
    highlightedWords: [
      { word: "plaintiff", arabic: "المدّعي", explanation: "The person who brings a case against another in court", difficulty: "intermediate", domain: "Legal", confidence: 98, context: "Opposite of defendant" },
      { word: "counsel", arabic: "محامٍ / مستشار قانوني", explanation: "A lawyer or group of lawyers giving legal advice", difficulty: "intermediate", domain: "Legal", confidence: 90, context: "Formal term for lawyer" },
      { word: "injunction", arabic: "أمر قضائي", explanation: "A court order requiring someone to do or stop doing something", difficulty: "advanced", domain: "Legal", confidence: 88, context: "A powerful court order" },
    ],
  },
  {
    id: 3,
    timestamp: "00:02:10",
    text: "That's a breach of fiduciary duty and you know it.",
    highlightedWords: [
      { word: "breach", arabic: "خرق / انتهاك", explanation: "Breaking a law, rule, or agreement", difficulty: "intermediate", domain: "Legal/Business", confidence: 96, context: "Commonly used with contracts" },
      { word: "fiduciary duty", arabic: "واجب الأمانة", explanation: "Legal obligation to act in the best interest of another party", difficulty: "advanced", domain: "Legal/Finance", confidence: 85, context: "Important in corporate law" },
    ],
  },
  {
    id: 4,
    timestamp: "00:03:05",
    text: "We're looking at a hostile takeover. The board needs to convene immediately.",
    highlightedWords: [
      { word: "hostile takeover", arabic: "استحواذ عدائي", explanation: "Acquiring a company against the wishes of its management", difficulty: "advanced", domain: "Business", confidence: 94, context: "Corporate acquisition strategy" },
      { word: "convene", arabic: "ينعقد / يجتمع", explanation: "To come together for a meeting or assembly", difficulty: "intermediate", domain: "Business", confidence: 91, context: "Formal word for gathering" },
    ],
  },
  {
    id: 5,
    timestamp: "00:04:22",
    text: "The settlement offer is contingent on a non-disclosure agreement.",
    highlightedWords: [
      { word: "settlement", arabic: "تسوية", explanation: "An agreement to resolve a dispute without going to trial", difficulty: "intermediate", domain: "Legal", confidence: 97, context: "Common way to end lawsuits" },
      { word: "contingent", arabic: "مشروط", explanation: "Dependent on certain conditions being met", difficulty: "intermediate", domain: "General", confidence: 89, context: "Often used with 'on' or 'upon'" },
      { word: "non-disclosure agreement", arabic: "اتفاقية عدم إفشاء", explanation: "A legal contract preventing sharing of confidential information", difficulty: "advanced", domain: "Legal/Business", confidence: 93, context: "Also known as NDA" },
    ],
  },
  {
    id: 6,
    timestamp: "00:05:11",
    text: "I need you to draft a subpoena for the witness by end of day.",
    highlightedWords: [
      { word: "draft", arabic: "يصيغ / يعدّ مسودة", explanation: "To write a preliminary version of a document", difficulty: "beginner", domain: "Business", confidence: 99, context: "Common in professional settings" },
      { word: "subpoena", arabic: "أمر استدعاء", explanation: "A legal document ordering someone to attend court", difficulty: "advanced", domain: "Legal", confidence: 90, context: "Legally binding order to appear" },
    ],
  },
];

export const sampleVocabulary: VocabWord[] = [
  { id: "1", word: "deposition", arabic: "الإفادة", explanation: "Formal questioning under oath", difficulty: "advanced", domain: "Legal", confidence: 92, context: "Pre-trial process", mastery: 75, reviewDate: "2024-01-15", timesReviewed: 5, saved: true },
  { id: "2", word: "plaintiff", arabic: "المدّعي", explanation: "Person who brings a court case", difficulty: "intermediate", domain: "Legal", confidence: 98, context: "Opposite of defendant", mastery: 90, reviewDate: "2024-01-14", timesReviewed: 8, saved: true },
  { id: "3", word: "injunction", arabic: "أمر قضائي", explanation: "Court order to do/stop something", difficulty: "advanced", domain: "Legal", confidence: 88, context: "Powerful court order", mastery: 40, reviewDate: "2024-01-16", timesReviewed: 2, saved: true },
  { id: "4", word: "fiduciary duty", arabic: "واجب الأمانة", explanation: "Obligation to act in another's interest", difficulty: "advanced", domain: "Legal/Finance", confidence: 85, context: "Corporate law", mastery: 55, reviewDate: "2024-01-13", timesReviewed: 3, saved: true },
  { id: "5", word: "settlement", arabic: "تسوية", explanation: "Agreement to resolve a dispute", difficulty: "intermediate", domain: "Legal", confidence: 97, context: "Common resolution", mastery: 85, reviewDate: "2024-01-12", timesReviewed: 7, saved: true },
  { id: "6", word: "contingent", arabic: "مشروط", explanation: "Dependent on conditions", difficulty: "intermediate", domain: "General", confidence: 89, context: "Used with 'on'", mastery: 60, reviewDate: "2024-01-15", timesReviewed: 4, saved: true },
  { id: "7", word: "hostile takeover", arabic: "استحواذ عدائي", explanation: "Acquiring company against its will", difficulty: "advanced", domain: "Business", confidence: 94, context: "Corporate strategy", mastery: 30, reviewDate: "2024-01-17", timesReviewed: 1, saved: true },
  { id: "8", word: "subpoena", arabic: "أمر استدعاء", explanation: "Legal order to attend court", difficulty: "advanced", domain: "Legal", confidence: 90, context: "Binding legal order", mastery: 20, reviewDate: "2024-01-18", timesReviewed: 1, saved: true },
];

export const sampleQuizQuestions: QuizQuestion[] = [
  { id: 1, type: "multiple-choice", word: "deposition", question: "What does 'deposition' mean?", options: ["A bank deposit", "Formal questioning under oath", "A legal document", "A court ruling"], correctAnswer: "Formal questioning under oath", context: "We need to file a motion before the deposition." },
  { id: 2, type: "multiple-choice", word: "plaintiff", question: "Who is a 'plaintiff'?", options: ["The judge", "The person who brings a case", "The defense lawyer", "A witness"], correctAnswer: "The person who brings a case", context: "The plaintiff's counsel is requesting an injunction." },
  { id: 3, type: "fill-in-the-blank", word: "breach", question: "That's a ___ of fiduciary duty.", correctAnswer: "breach", context: "Breaking a law or agreement" },
  { id: 4, type: "multiple-choice", word: "injunction", question: "What is an 'injunction'?", options: ["A medical injection", "A court order", "A legal fee", "A contract clause"], correctAnswer: "A court order", context: "The plaintiff's counsel is requesting an injunction." },
  { id: 5, type: "fill-in-the-blank", word: "settlement", question: "The ___ offer is contingent on an NDA.", correctAnswer: "settlement", context: "Agreement to resolve a dispute" },
];
