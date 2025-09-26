
import React, { useState, useCallback } from 'react';
import { PrepPlan } from './types';
import { generatePrepPlan } from './services/geminiService';
import JobInputForm from './components/JobInputForm';
import LoadingSpinner from './components/LoadingSpinner';
import PrepPlanDisplay from './components/PrepPlanDisplay';
import { BriefcaseIcon } from './components/icons';

const App: React.FC = () => {
  const [jobRole, setJobRole] = useState('');
  const [prepPlan, setPrepPlan] = useState<PrepPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobRole.trim()) return;

    setIsLoading(true);
    setError(null);
    setPrepPlan(null);

    try {
      const plan = await generatePrepPlan(jobRole);
      setPrepPlan(plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [jobRole]);

  const WelcomeMessage: React.FC = () => (
    <div className="text-center mt-16 animate-fade-in">
        <BriefcaseIcon className="mx-auto w-16 h-16 text-slate-600 mb-4"/>
        <h2 className="text-2xl font-bold text-slate-300">Ready to Ace Your Next Interview?</h2>
        <p className="text-slate-500 mt-2">Enter a job role above to get started.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-8">
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
      <div className="container mx-auto max-w-5xl">
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-2">
            <BriefcaseIcon className="w-10 h-10 text-cyan-400" />
            <h1 className="text-5xl font-extrabold text-white">Job Prep AI</h1>
          </div>
          <p className="text-lg text-slate-400">Your personal AI career coach.</p>
        </header>

        <main>
          <JobInputForm
            jobRole={jobRole}
            setJobRole={setJobRole}
            onSubmit={handleGeneratePlan}
            isLoading={isLoading}
          />

          <div className="mt-12">
            {isLoading && <LoadingSpinner />}
            {error && (
              <div className="text-center p-6 bg-red-900/50 border border-red-700 rounded-lg max-w-2xl mx-auto">
                <p className="font-bold text-red-300">Oops! Something went wrong.</p>
                <p className="text-red-400 mt-1">{error}</p>
              </div>
            )}
            {prepPlan && <PrepPlanDisplay plan={prepPlan} />}
            {!isLoading && !prepPlan && !error && <WelcomeMessage />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
