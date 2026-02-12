import React, { useState } from 'react';
import { Factory, BookOpen, ArrowRight, CheckCircle, Play } from 'lucide-react';

// --- COMPONENTS ---

const Header = () => (
  <header className="border-b border-gray-200 bg-white py-4 px-8 flex justify-between items-center sticky top-0 z-10">
    <div className="flex items-center gap-2">
      <Factory className="w-6 h-6 text-indigo-600" />
      <h1 className="text-xl font-bold tracking-tight text-gray-900">Consulting Training Factory</h1>
    </div>
    <div className="text-sm text-gray-500">v1.0.0 (Localhost)</div>
  </header>
);

const Dashboard = ({ onSelectMode, onSelectCase }: { onSelectMode: (mode: string) => void, onSelectCase: (caseId: string) => void }) => {
  const [cases, setCases] = useState<any[]>([]);

  React.useEffect(() => {
    fetch('http://localhost:8000/cases')
      .then(res => res.json())
      .then(data => setCases(data))
      .catch(err => console.error("Failed to load cases", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4 pb-20">
      <h2 className="text-3xl font-light text-center mb-12 text-gray-800">Chọn quy trình làm việc</h2>

      {/* MAIN ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div
          onClick={() => onSelectMode('production')}
          className="group cursor-pointer bg-white p-8 rounded-2xl border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-300"
        >
          <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
            <Play className="w-6 h-6 text-indigo-600 group-hover:text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Production Line</h3>
          <p className="text-gray-500">Nhập tình huống/chat log. AI sẽ phân tích Insight và tạo bài học tự động.</p>
        </div>

        <div className="group cursor-pointer bg-white p-8 rounded-2xl border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-300">
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
            <BookOpen className="w-6 h-6 text-emerald-600 group-hover:text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Knowledge Warehouse</h3>
          <p className="text-gray-500">Tra cứu kho tri thức gốc (JTBD, Empathy Map, Insight Rules).</p>
        </div>
      </div>

      {/* RECENT HISTORY */}
      <div className="border-t border-gray-100 pt-12 animate-fade-in">
        <h3 className="text-lg font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
          <Factory className="w-4 h-4" /> Case History & Knowledge Base
        </h3>

        {cases.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400">
            No cases analyzed yet. Start the Production Line to generate insights.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectCase(c.id)}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all flex flex-col h-full"
              >
                <div className="text-xs text-gray-400 mb-2 font-mono">
                  {new Date(c.created_at).toLocaleDateString()}
                </div>
                <h4 className="font-bold text-gray-900 mb-3 line-clamp-2">{c.title}</h4>
                <p className="text-sm text-gray-500 flex-1 line-clamp-3 mb-4">
                  "{c.insight_truth}"
                </p>
                <div className="text-indigo-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1 mt-auto">
                  View Analysis <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProductionLine = ({ onBack }: { onBack: () => void }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setIsProcessing(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: input }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data.case_study);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please ensure the Backend is running on port 8000.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (result) {
    return <ResultView result={result} onReset={() => setResult(null)} />;
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4 animate-fade-in">
      <button onClick={onBack} className="text-gray-400 hover:text-gray-900 mb-6 flex items-center gap-1 text-sm">
        ← Back to Dashboard
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-2xl font-light mb-2">Input Station</h2>
          <p className="text-gray-500 text-sm">Nhập tình huống thực tế hoặc đoạn chat Zalo/Mess của nhân viên.</p>
        </div>

        <div className="p-8 bg-gray-50/50">
          <textarea
            className="w-full h-48 p-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none resize-none font-mono text-sm bg-white"
            placeholder="Ví dụ: Khách khen sản phẩm đẹp nhưng chê đắt..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="p-8 flex justify-end bg-white">
          <button
            disabled={!input || isProcessing}
            onClick={handleAnalyze}
            className={`px-8 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${isProcessing
              ? 'bg-gray-100 text-gray-400 cursor-wait'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transform active:scale-95'
              }`}
          >
            {isProcessing ? 'Factory Running...' : 'Start One-Click Analysis'}
            {!isProcessing && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-400">
        Powered by Consulting Engineering Factory v1.0
      </div>
    </div>
  );
};

import EmpathyMap from './components/EmpathyMap';
import DataClassification from './components/DataClassification';
import ContextGame from './components/ContextGame';
import { QuizModal } from './components/QuizModal';

const ResultView = ({ result, onReset }: { result: any, onReset: () => void }) => {
  const [activeMode, setActiveMode] = useState<'action' | 'deep_dive'>('action');
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 pb-20 animate-fade-in">
      {/* HEADER & NAVIGATION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onReset} className="text-gray-400 hover:text-gray-900 text-sm flex items-center gap-1">
            ← Analyze Another Case
          </button>
          <div className="h-6 w-px bg-gray-200"></div>

          {/* MAIN TABS */}
          <div className="flex p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setActiveMode('action')}
              className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${activeMode === 'action'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              🚀 Action Plan
            </button>
            <button
              onClick={() => setActiveMode('deep_dive')}
              className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${activeMode === 'deep_dive'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              🧠 Deep Analysis
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Fact Check Passed
          </span>
        </div>
      </div>

      {/* --- MODE 1: ACTION PLAN (DEFAULT) --- */}
      {activeMode === 'action' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">

          {/* LEFT: INSIGHT & LESSON */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <BookOpen className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-2">The Core Insight</div>
                <h2 className="text-2xl font-bold mb-4 leading-tight">
                  "{result.analysis.decoder.insight.truth}"
                </h2>
                <div className="p-4 bg-indigo-700/50 rounded-xl border border-indigo-500/30 backdrop-blur-sm">
                  <div className="text-xs text-indigo-300 font-bold uppercase mb-1">Concept</div>
                  <div className="font-medium text-white">{result.analysis.builder.microLesson.concept}</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-6 bg-red-500 rounded-full"></div>
                Correction
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="text-red-600 text-xs font-bold uppercase mb-1">Stop Thinking (Misconception)</div>
                  <p className="text-gray-800 text-sm">{result.analysis.builder.microLesson.misconception}</p>
                </div>
                <div className="flex justify-center text-gray-300">↓</div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="text-green-600 text-xs font-bold uppercase mb-1">Start Thinking (Truth)</div>
                  <p className="text-gray-800 text-sm">{result.analysis.builder.microLesson.example}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowQuiz(true)}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Play className="w-5 h-5" /> Practice with Quiz
            </button>
          </div>

          {/* RIGHT: SCRIPT */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
              <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Roleplay Script</h3>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Use this now</span>
              </div>
              <div className="p-8 space-y-6 flex-1 overflow-y-auto">
                {result.analysis.builder.script.map((line: any, idx: number) => (
                  <div key={idx} className={`flex gap-4 ${line.role === 'Sales' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${line.role === 'Sales' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                      {line.role === 'Sales' ? 'S' : 'C'}
                    </div>
                    <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm ${line.role === 'Sales'
                      ? 'bg-indigo-50 text-indigo-900 rounded-tr-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                      }`}>
                      {line.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODE 2: DEEP ANALYSIS (HIDDEN BY DEFAULT) --- */}
      {activeMode === 'deep_dive' && (
        <div className="space-y-12 animate-fade-in">
          {/* 1. INPUT CLASSIFICATION */}
          {result.analysis.inputClassification && (
            <DataClassification data={result.analysis.inputClassification} />
          )}

          {/* 2. CONTEXT GAME */}
          {result.analysis.contextGame && (
            <ContextGame data={result.analysis.contextGame} />
          )}

          {/* 3. EMPATHY MAP */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">3. Empathy Map & JTBD</h3>
              <p className="text-gray-500 text-sm">Understanding the customer's inner world.</p>
            </div>
            <div className="p-8">
              {result.analysis.empathyMap ? (
                <EmpathyMap data={result.analysis.empathyMap} />
              ) : (
                <div className="text-center text-gray-400">No Empathy Map data.</div>
              )}

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-xs text-gray-500 uppercase mb-2">Functional Job</div>
                  <div className="font-medium text-gray-900">{result.analysis.decoder.jobs.functional}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-xs text-gray-500 uppercase mb-2">Social Job</div>
                  <div className="font-medium text-indigo-600">{result.analysis.decoder.jobs.social}</div>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <div className="text-xs text-red-500 uppercase mb-2">Hidden Tension</div>
                  <div className="font-medium text-red-700">{result.analysis.decoder.tension}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <QuizModal
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
        title={result.analysis.builder.microLesson.concept}
        questions={result.analysis.builder.quizzes}
      />
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'dashboard' | 'production' | 'history'>('dashboard');
  const [selectedCase, setSelectedCase] = useState<any>(null);

  const handleSelectCase = async (caseId: string) => {
    try {
      const res = await fetch(`http://localhost:8000/cases/${caseId}`);
      if (!res.ok) throw new Error("Failed to fetch case");
      const data = await res.json();
      setSelectedCase(data.case_study);
      setView('history');
    } catch (err) {
      console.error(err);
      alert("Could not load case details.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      {view === 'dashboard' && (
        <Dashboard
          onSelectMode={(mode) => setView(mode as any)}
          onSelectCase={handleSelectCase}
        />
      )}
      {view === 'production' && (
        <ProductionLine onBack={() => setView('dashboard')} />
      )}
      {view === 'history' && selectedCase && (
        <div className="animate-fade-in">
          <div className="max-w-7xl mx-auto mt-8 px-4">
            <button onClick={() => setView('dashboard')} className="text-gray-400 hover:text-gray-900 text-sm flex items-center gap-1 mb-4">
              ← Back to Dashboard
            </button>
            <div className="flex items-center gap-2 mb-8">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-mono">HISTORY MODE</span>
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {selectedCase.title}
              </h2>
            </div>
          </div>
          <ResultView result={selectedCase} onReset={() => setView('dashboard')} />
        </div>
      )}
    </div>
  );
}
