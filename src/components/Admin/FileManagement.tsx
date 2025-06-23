import React, { useState, useCallback } from 'react';
import { Upload, File, Trash2, Download, Github, AlertCircle, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FileUpload } from '../../types';

interface FileUploadForm {
  projectId: string;
  version: string;
  githubUrl?: string;
}

const FileManagement: React.FC = () => {
  const [uploadMode, setUploadMode] = useState<'file' | 'github'>('file');
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FileUploadForm>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newUploads: FileUpload[] = acceptedFiles.map(file => ({
      file,
      progress: 0,
      status: 'pending'
    }));
    
    setUploads(prev => [...prev, ...newUploads]);
    
    // Simulate upload process
    newUploads.forEach((upload, index) => {
      simulateUpload(uploads.length + index);
    });
  }, [uploads.length]);

  const simulateUpload = (index: number) => {
    setUploads(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status: 'uploading' };
      return updated;
    });

    const interval = setInterval(() => {
      setUploads(prev => {
        const updated = [...prev];
        if (updated[index]) {
          updated[index] = {
            ...updated[index],
            progress: Math.min(updated[index].progress + 10, 100)
          };
          
          if (updated[index].progress >= 100) {
            updated[index] = {
              ...updated[index],
              status: 'completed'
            };
            clearInterval(interval);
          }
        }
        return updated;
      });
    }, 200);
  };

  const removeUpload = (index: number) => {
    setUploads(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: FileUploadForm) => {
    if (uploadMode === 'github') {
      // Handle GitHub URL submission
      console.log('GitHub URL:', data.githubUrl);
      alert('GitHub repository linked successfully!');
    } else {
      // Handle file upload submission
      console.log('Files uploaded for project:', data.projectId);
      alert('Files uploaded successfully!');
    }
    reset();
    setUploads([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isValidFileType = (file: File) => {
    const allowedTypes = [
      'application/zip',
      'application/x-tar',
      'application/gzip',
      'application/x-compressed',
      'application/x-zip-compressed',
      'application/octet-stream'
    ];
    return allowedTypes.includes(file.type) || file.name.endsWith('.tar.gz');
  };

  const maxFileSize = 100 * 1024 * 1024; // 100MB

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">File Management</h1>
        <p className="text-gray-600">Upload project files or link GitHub repositories</p>
      </div>

      {/* Upload Mode Toggle */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setUploadMode('file')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              uploadMode === 'file'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            File Upload
          </button>
          <button
            onClick={() => setUploadMode('github')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              uploadMode === 'github'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Github className="w-4 h-4 inline mr-2" />
            GitHub Link
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project *
            </label>
            <select
              {...register('projectId', { required: 'Project is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Project</option>
              <option value="1">Advanced Network Scanner</option>
              <option value="2">Server Monitoring Dashboard</option>
              <option value="3">ML Model Deployment Pipeline</option>
              <option value="4">React E-commerce Platform</option>
            </select>
            {errors.projectId && (
              <p className="mt-1 text-sm text-red-600">{errors.projectId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Version *
            </label>
            <input
              {...register('version', { required: 'Version is required' })}
              type="text"
              placeholder="e.g., 1.0.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.version && (
              <p className="mt-1 text-sm text-red-600">{errors.version.message}</p>
            )}
          </div>

          {uploadMode === 'file' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Files
              </label>
              
              {/* File Upload Area */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Supported formats: ZIP, TAR, TAR.GZ (Max 100MB)
                </p>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept=".zip,.tar,.tar.gz,.gz"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    onDrop(files);
                  }}
                />
              </div>

              {/* File Upload Progress */}
              {uploads.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-gray-900">Upload Progress</h4>
                  {uploads.map((upload, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <File className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {upload.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(upload.file.size)}
                        </p>
                        {upload.status === 'uploading' && (
                          <div className="mt-1">
                            <div className="bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${upload.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {upload.status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {upload.status === 'error' && (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                        <button
                          type="button"
                          onClick={() => removeUpload(index)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* File Requirements */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">File Requirements:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Maximum file size: 100MB</li>
                  <li>• Supported formats: ZIP, TAR, TAR.GZ</li>
                  <li>• Files will be scanned for security</li>
                  <li>• Include README and documentation</li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GitHub Repository URL *
              </label>
              <input
                {...register('githubUrl', { 
                  required: uploadMode === 'github' ? 'GitHub URL is required' : false,
                  pattern: {
                    value: /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+$/,
                    message: 'Please enter a valid GitHub repository URL'
                  }
                })}
                type="url"
                placeholder="https://github.com/username/repository"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.githubUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.githubUrl.message}</p>
              )}
              
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">GitHub Integration Benefits:</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Automatic version tracking</li>
                  <li>• Real-time updates</li>
                  <li>• Issue tracking integration</li>
                  <li>• Community contributions</li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              {uploadMode === 'file' ? (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload Files</span>
                </>
              ) : (
                <>
                  <Github className="w-4 h-4" />
                  <span>Link Repository</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Recent Uploads */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Uploads</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {/* Mock recent uploads */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <File className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">network-scanner-v2.1.zip</h3>
                  <p className="text-sm text-gray-600">Advanced Network Scanner • v2.1 • 2.1 MB</p>
                  <p className="text-xs text-gray-500">Uploaded 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 p-2">
                  <Download className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-800 p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Github className="w-8 h-8 text-gray-800" />
                <div>
                  <h3 className="font-medium text-gray-900">monitoring-dashboard</h3>
                  <p className="text-sm text-gray-600">Server Monitoring Dashboard • GitHub Link</p>
                  <p className="text-xs text-gray-500">Linked 1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 p-2">
                  <Github className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-800 p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManagement;