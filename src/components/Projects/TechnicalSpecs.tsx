import React from 'react';
import { CheckCircle } from 'lucide-react';
import { TechnicalSpec } from '../../types';

interface TechnicalSpecsProps {
  specs: TechnicalSpec[];
}

const TechnicalSpecs: React.FC<TechnicalSpecsProps> = ({ specs }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
      
      <div className="space-y-6">
        {specs.map((spec) => (
          <div key={spec.id} className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{spec.category}</h3>
            <ul className="space-y-2">
              {spec.requirements.map((requirement, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalSpecs;