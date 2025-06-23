import React from 'react';
import { Book } from 'lucide-react';

interface ImplementationGuideProps {
  guide: string;
}

const ImplementationGuide: React.FC<ImplementationGuideProps> = ({ guide }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Book className="w-6 h-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Implementation Guide</h2>
      </div>
      
      <div className="prose max-w-none">
        <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
          {guide}
        </pre>
      </div>
    </div>
  );
};

export default ImplementationGuide;