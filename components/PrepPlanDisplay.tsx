
import React from 'react';
import { PrepPlan, InterviewQuestion } from '../types';
import InfoCard from './InfoCard';
import { BrainCircuitIcon, CodeBracketIcon, UsersIcon, BookOpenIcon } from './icons';

interface PrepPlanDisplayProps {
  plan: PrepPlan;
}

const QuestionAccordion: React.FC<{ item: InterviewQuestion }> = ({ item }) => (
    <details className="group bg-slate-900/50 p-4 rounded-lg border border-slate-700 transition-colors duration-300 hover:border-cyan-600">
        <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-slate-200">
            {item.question}
            <span className="transform transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
        </summary>
        <p className="mt-3 text-slate-400 leading-relaxed">{item.answer}</p>
    </details>
);

const PrepPlanDisplay: React.FC<PrepPlanDisplayProps> = ({ plan }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 space-y-8 animate-fade-in">
      <h2 className="text-4xl font-extrabold text-center mb-4">
        Your Prep Plan for: <span className="text-cyan-400">{plan.jobRole}</span>
      </h2>

      <InfoCard title="Key Skills" icon={<BrainCircuitIcon />}>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {plan.keySkills.map((skill, index) => (
            <li key={index} className="bg-slate-700/50 text-slate-200 py-2 px-4 rounded-md text-center">{skill}</li>
          ))}
        </ul>
      </InfoCard>

      <InfoCard title="Technical Interview Questions" icon={<CodeBracketIcon />}>
        <div className="space-y-4">
          {plan.technicalQuestions.map((item, index) => (
            <QuestionAccordion key={index} item={item} />
          ))}
        </div>
      </InfoCard>

      <InfoCard title="Behavioral Interview Questions" icon={<UsersIcon />}>
        <div className="space-y-4">
          {plan.behavioralQuestions.map((item, index) => (
            <QuestionAccordion key={index} item={item} />
          ))}
        </div>
      </InfoCard>

      <InfoCard title="Learning Resources" icon={<BookOpenIcon />}>
        <div className="space-y-4">
          {plan.learningResources.map((resource, index) => (
            <a 
              key={index} 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block p-4 bg-slate-900/50 rounded-lg border border-slate-700 transition-all duration-300 hover:border-cyan-600 hover:bg-slate-800"
            >
              <h4 className="font-bold text-cyan-400">{resource.title}</h4>
              <p className="text-sm text-slate-400 mt-1">{resource.description}</p>
            </a>
          ))}
        </div>
      </InfoCard>
    </div>
  );
};

export default PrepPlanDisplay;
