
import React from 'react';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg w-full transform transition-all duration-300 hover:bg-slate-800 hover:shadow-cyan-500/10">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-slate-700 p-2 rounded-lg text-cyan-400">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        </div>
        <div className="text-slate-300 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
