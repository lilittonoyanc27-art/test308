import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  Play, 
  HelpCircle, 
  CheckCircle2, 
  XCircle,
  Lightbulb,
  Info,
  ArrowRight,
  MessageCircle,
  BrainCircuit
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Types ---

interface Question {
  id: number;
  sentence: string;
  options: string[];
  correct: string;
  translation: string;
  explanation: string;
}

// --- Data: Por qué vs Porque ---

const POR_QUE_QUESTIONS: Question[] = [
  { 
    id: 1, 
    sentence: "¿___ no has venido a la fiesta?", 
    options: ["Por qué", "Porque"], 
    correct: "Por qué", 
    translation: "Ինչու՞ չես եկել երեկույթին:", 
    explanation: "Հարցական նախադասություններում (Ինչու՞) օգտագործվում է 'Por qué'՝ առանձին և շեշտով:" 
  },
  { 
    id: 2, 
    sentence: "No he ido ___ estaba cansado.", 
    options: ["por qué", "porque"], 
    correct: "porque", 
    translation: "Չեմ գնացել, որովհետև հոգնած էի:", 
    explanation: "Պատասխաններում կամ պատճառ նշելիս (որովհետև)` օգտագործվում է 'porque'՝ միասին և առանց շեշտի:" 
  },
  { 
    id: 3, 
    sentence: "¿___ estudias español?", 
    options: ["Por qué", "Porque"], 
    correct: "Por qué", 
    translation: "Ինչու՞ ես սովորում իսպաներեն:", 
    explanation: "Ուղղակի հարց՝ շեշտով և առանձին:" 
  },
  { 
    id: 4, 
    sentence: "Estudio español ___ me gusta mucho.", 
    options: ["por qué", "porque"], 
    correct: "porque", 
    translation: "Սովորում եմ իսպաներեն, որովհետև այն ինձ շատ է դուր գալիս:", 
    explanation: "Պատճառը նշելու համար օգտագործում ենք 'porque':" 
  },
  { 
    id: 5, 
    sentence: "Dime ___ estás triste.", 
    options: ["por qué", "porque"], 
    correct: "por qué", 
    translation: "Ասա ինձ, թե ինչու ես տխուր:", 
    explanation: "Սա անուղղակի հարց է, ուստի պահպանվում է 'por qué' ձևը:" 
  },
  { 
    id: 6, 
    sentence: "Llevo el paraguas ___ va a llover.", 
    options: ["por qué", "porque"], 
    correct: "porque", 
    translation: "Անձրևանոց եմ վերցնում, որովհետև անձրև է գալու:", 
    explanation: "Պատճառը նշելու համար օգտագործում ենք 'porque':" 
  },
  { 
    id: 7, 
    sentence: "¿___ gritas tanto?", 
    options: ["Por qué", "Porque"], 
    correct: "Por qué", 
    translation: "Ինչու՞ ես այդքան բղավում:", 
    explanation: "Հարցական դերանուն՝ 'Por qué':" 
  },
  { 
    id: 8, 
    sentence: "Grito ___ estoy muy enfadado.", 
    options: ["por qué", "porque"], 
    correct: "porque", 
    translation: "Բղավում եմ, որովհետև շատ բարկացած եմ:", 
    explanation: "Բացատրություն՝ 'porque':" 
  },
  { 
    id: 9, 
    sentence: "¿___ no quieres salir hoy?", 
    options: ["Por qué", "Porque"], 
    correct: "Por qué", 
    translation: "Ինչու՞ չես ուզում այսօր դուրս գալ:", 
    explanation: "Հարցական նախադասություններում (Ինչու՞) օգտագործվում է 'Por qué':" 
  },
  { 
    id: 10, 
    sentence: "¿___ no me llamaste ayer?", 
    options: ["Por qué", "Porque"], 
    correct: "Por qué", 
    translation: "Ինչու՞ ինձ չզանգեցիր երեկ:", 
    explanation: "Ուղղակի հարց՝ 'Por qué':" 
  },
  { 
    id: 11, 
    sentence: "No te llamé ___ no tenía batería.", 
    options: ["por qué", "porque"], 
    correct: "porque", 
    translation: "Չզանգեցի, որովհետև մարտկոց չունեի:", 
    explanation: "Պատճառ՝ 'porque':" 
  },
  { 
    id: 12, 
    sentence: "Estoy aquí ___ quiero ayudarte.", 
    options: ["por qué", "porque"], 
    correct: "porque", 
    translation: "Ես այստեղ եմ, որովհետև ուզում եմ քեզ օգնել:", 
    explanation: "Պատճառը նշելու համար օգտագործում ենք 'porque':" 
  },
  { 
    id: 13, 
    sentence: "Él está feliz ___ hoy es su cumpleaños.", 
    options: ["por qué", "porque"], 
    correct: "porque", 
    translation: "Նա երջանիկ է, որովհետև այսօր իր ծննդյան օրն է:", 
    explanation: "Պատճառ՝ 'porque':" 
  },
  { 
    id: 14, 
    sentence: "¿___ es tan difícil esto?", 
    options: ["Por qué", "Porque"], 
    correct: "Por qué", 
    translation: "Ինչու՞ է սա այդքան դժվար:", 
    explanation: "Հարցական ձև՝ 'Por qué':" 
  },
  { 
    id: 15, 
    sentence: "Todo sucede ___ tiene que suceder.", 
    options: ["por qué", "porque"], 
    correct: "porque", 
    translation: "Ամեն ինչ տեղի է ունենում, որովհետև պետք է տեղի ունենա:", 
    explanation: "Պատճառ՝ 'porque':" 
  }
];

export default function PorQueMaster() {
  const [view, setView] = useState<'intro' | 'play' | 'result'>('intro');
  const [score, setScore] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startLevel = () => {
    setScore(0);
    setCurrentIdx(0);
    setView('play');
    setSelected(null);
  };

  const handleAnswer = (option: string) => {
    if (selected) return;
    
    setSelected(option);
    const correct = POR_QUE_QUESTIONS[currentIdx].correct;
    const right = option.toLowerCase() === correct.toLowerCase();
    setIsCorrect(right);

    if (right) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setIsCorrect(null);
    if (currentIdx < POR_QUE_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setView('result');
      if (score > 10) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 text-indigo-50 font-sans selection:bg-indigo-500/30 overflow-hidden flex flex-col">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#4f46e5,transparent)]" />
      </div>

      {/* Naval/Tech HUD Header */}
      <nav className="p-6 flex justify-between items-center bg-white/5 backdrop-blur-xl border-b border-indigo-800/50 relative z-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20">
            <BrainCircuit size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase leading-none italic">Por Qué <span className="text-indigo-400">Master</span></h1>
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Logic & Grammar</p>
          </div>
        </div>

        {view === 'play' && (
          <div className="flex items-center gap-8">
             <div className="text-right">
                <span className="block text-[10px] font-bold uppercase text-indigo-400 tracking-widest">Question</span>
                <span className="text-2xl font-black italic">{currentIdx + 1}/{POR_QUE_QUESTIONS.length}</span>
             </div>
             <div className="w-[1px] h-10 bg-indigo-800" />
             <div className="text-right">
                <span className="block text-[10px] font-bold uppercase text-indigo-400 tracking-widest">Score</span>
                <span className="text-2xl font-black italic text-indigo-400">{score}</span>
             </div>
          </div>
        )}
      </nav>

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-6 pb-24">
        
        <AnimatePresence mode="wait">
          
          {view === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md w-full text-center space-y-10"
            >
              <div className="space-y-6">
                 <div className="w-32 h-32 bg-indigo-600 rounded-[40px] flex items-center justify-center mx-auto shadow-indigo-500/30 shadow-2xl">
                    <MessageCircle size={60} className="text-white" />
                 </div>
                 <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Why vs Because</h2>
                 <p className="text-indigo-300 font-medium">Իմացեք տարբերությունը **Por qué** և **Porque** միջև: Յուրացրեք պատճառահետևանքային կապերը իսպաներենում:</p>
              </div>

              <div className="bg-indigo-900/50 p-8 rounded-3xl border border-indigo-700/50 text-left space-y-4 backdrop-blur-md">
                 <h4 className="font-black text-indigo-400 flex items-center gap-2 uppercase tracking-widest text-xs">
                    <Info size={16} /> Տեսություն
                 </h4>
                 <div className="space-y-3 text-sm">
                    <div className="p-3 bg-white/5 rounded-xl">
                       <span className="text-white font-bold italic underline">¿Por qué?</span> (Առանձին + Շեշտ) - Հարցերի համար (Ինչու՞):
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl">
                       <span className="text-white font-bold italic underline">Porque</span> (Միասին + Առանց շեշտի) - Պատասխանների համար (Որովհետև):
                    </div>
                 </div>
              </div>

              <button 
                onClick={startLevel}
                className="w-full py-6 bg-white text-indigo-950 rounded-[35px] font-black uppercase text-2xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 italic tracking-tighter"
              >
                Սկսել Դասը <Play fill="currentColor" size={24} />
              </button>
            </motion.div>
          )}

          {view === 'play' && (
            <motion.div 
              key="play"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full max-w-2xl space-y-12"
            >
              {/* Question card */}
              <div className="bg-white/5 backdrop-blur-2xl p-10 md:p-14 rounded-[50px] border border-white/10 shadow-2xl relative group">
                 <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500 rounded-l-full" />
                 <div className="space-y-6">
                    <div className="inline-block px-3 py-1 bg-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
                       Logical Training
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-tight text-white">
                       {POR_QUE_QUESTIONS[currentIdx].sentence}
                    </h3>
                    <p className="text-xl md:text-2xl font-bold text-indigo-300 opacity-60 italic">
                       {POR_QUE_QUESTIONS[currentIdx].translation}
                    </p>
                 </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-6">
                 {POR_QUE_QUESTIONS[currentIdx].options.map((option) => (
                   <button
                     key={option}
                     onClick={() => handleAnswer(option)}
                     disabled={!!selected}
                     className={`
                        py-10 rounded-[40px] text-3xl md:text-5xl font-black italic uppercase tracking-tighter transition-all border-4 shadow-xl
                        ${selected === option 
                             ? (isCorrect ? 'bg-indigo-600 border-white text-white scale-105' : 'bg-rose-600 border-white text-white brightness-125')
                             : (selected && option.toLowerCase() === POR_QUE_QUESTIONS[currentIdx].correct.toLowerCase() ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' : 'bg-white/5 border-white/5 text-indigo-200/50 hover:bg-white/10')
                        }
                     `}
                   >
                     {option}
                   </button>
                 ))}
              </div>

              {/* Interactive Feedback */}
              <div className="h-40">
                <AnimatePresence>
                   {selected && (
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.9, y: 20 }}
                       animate={{ opacity: 1, scale: 1, y: 0 }}
                       className="bg-indigo-900/40 p-8 rounded-[40px] border border-white/10 flex flex-col gap-3 items-center text-center shadow-2xl"
                     >
                        <div className={`flex items-center gap-3 font-black uppercase tracking-[0.2em] text-sm ${isCorrect ? 'text-indigo-400' : 'text-rose-400'}`}>
                           {isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                           {isCorrect ? "Perfect Result!" : "Incorrect Path!"}
                        </div>
                        <p className="text-indigo-200/80 text-lg font-medium leading-relaxed italic">{POR_QUE_QUESTIONS[currentIdx].explanation}</p>
                        <button 
                          onClick={nextQuestion}
                          className="mt-4 bg-white text-indigo-950 px-8 py-3 rounded-full font-black uppercase text-sm flex items-center gap-2 hover:scale-110 active:scale-95 transition-all shadow-xl"
                        >
                          Next Step <ArrowRight size={18} />
                        </button>
                     </motion.div>
                   )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {view === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md w-full text-center space-y-12"
            >
              <div className="space-y-6">
                 <Trophy size={120} className="text-indigo-400 mx-auto drop-shadow-[0_0_30px_rgba(129,140,248,0.5)]" />
                 <div className="space-y-2">
                    <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Logic Master!</h2>
                    <p className="text-2xl font-bold text-indigo-300">Դուք արդեն գիտեք բոլոր պատճառները: <br/> {score} / {POR_QUE_QUESTIONS.length}</p>
                 </div>
              </div>

              <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[50px] border border-white/10 ring-1 ring-white/10">
                 <div className="text-8xl font-black italic text-indigo-400 tracking-tighter">
                   {Math.round((score/POR_QUE_QUESTIONS.length) * 100)}%
                 </div>
                 <p className="text-xs uppercase font-black text-indigo-500 tracking-[0.5em] mt-4 opacity-60">Completion Rating</p>
              </div>

              <button 
                onClick={() => setView('intro')}
                className="w-full py-7 bg-white text-indigo-950 rounded-[40px] font-black uppercase text-2xl shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 italic tracking-tighter"
              >
                Restart Course <RotateCcw size={28} />
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="p-10 flex justify-center opacity-20 pointer-events-none">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em]">
          <span>Spanish Logic</span>
          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
          <span>Grammar AI</span>
        </div>
      </footer>
    </div>
  );
}
