
import React from 'react';
import { SparklesIcon } from './icons';

interface JobInputFormProps {
  jobRole: string;
  setJobRole: (role: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const JobInputForm: React.FC<JobInputFormProps> = ({ jobRole, setJobRole, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          placeholder="e.g., Senior Frontend Engineer"
          className="w-full px-5 py-3 text-lg bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow placeholder-slate-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg shadow-cyan-600/30 hover:shadow-cyan-500/40"
          disabled={isLoading || !jobRole.trim()}
        >
          <SparklesIcon className="w-5 h-5"/>
          <span>Generate Plan</span>
        </button>
      </div>
    </form>
  );
};

export default JobInputForm;
