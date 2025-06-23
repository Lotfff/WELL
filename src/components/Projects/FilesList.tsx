import React from 'react';
import { Download, File, Calendar, HardDrive } from 'lucide-react';
import { ProjectFile } from '../../types';

interface FilesListProps {
  files: ProjectFile[];
  onDownload: () => void;
}

const FilesList: React.FC<FilesListProps> = ({ files, onDownload }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeColor = (type: string) => {
    if (type.includes('zip') || type.includes('tar') || type.includes('gz')) {
      return 'bg-purple-100 text-purple-800';
    }
    if (type.includes('pdf')) {
      return 'bg-red-100 text-red-800';
    }
    if (type.includes('image')) {
      return 'bg-green-100 text-green-800';
    }
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Files</h2>
      
      {files.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No files available</p>
      ) : (
        <div className="space-y-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="flex-shrink-0 mr-4">
                <File className="w-8 h-8 text-gray-600" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">{file.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <HardDrive className="w-4 h-4 mr-1" />
                    {formatFileSize(file.size)}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {file.uploadedAt.toLocaleDateString()}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFileTypeColor(file.type)}`}>
                    v{file.version}
                  </span>
                </div>
              </div>
              
              <button
                onClick={onDownload}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilesList;