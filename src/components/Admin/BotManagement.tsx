import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Bot } from '../../types';
import { useApp } from '../../context/AppContext';

const BotManagement: React.FC = () => {
  const { state, dispatch } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBot, setEditingBot] = useState<Bot | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'utility' as Bot['category'],
    downloadLink: '',
    githubLink: '',
    imageUrl: '',
    tags: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'utility',
      downloadLink: '',
      githubLink: '',
      imageUrl: '',
      tags: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const botData: Bot = {
      id: editingBot?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      downloadLink: formData.downloadLink,
      githubLink: formData.githubLink || undefined,
      imageUrl: formData.imageUrl || 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      likes: editingBot?.likes || 0,
      downloads: editingBot?.downloads || 0,
      rating: editingBot?.rating || 5,
      reviews: editingBot?.reviews || [],
      createdAt: editingBot?.createdAt || new Date(),
      updatedAt: new Date(),
      featured: editingBot?.featured || false
    };

    if (editingBot) {
      dispatch({ type: 'UPDATE_BOT', payload: botData });
    } else {
      dispatch({ type: 'ADD_BOT', payload: botData });
    }

    resetForm();
    setShowAddForm(false);
    setEditingBot(null);
  };

  const handleEdit = (bot: Bot) => {
    setEditingBot(bot);
    setFormData({
      name: bot.name,
      description: bot.description,
      category: bot.category,
      downloadLink: bot.downloadLink,
      githubLink: bot.githubLink || '',
      imageUrl: bot.imageUrl,
      tags: bot.tags.join(', ')
    });
    setShowAddForm(true);
  };

  const handleDelete = (botId: string) => {
    if (confirm('Are you sure you want to delete this bot?')) {
      dispatch({ type: 'DELETE_BOT', payload: botId });
    }
  };

  const handleCancel = () => {
    resetForm();
    setShowAddForm(false);
    setEditingBot(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Bot Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Bot</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingBot ? 'Edit Bot' : 'Add New Bot'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Bot Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Bot['category'] })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="moderation">Moderation</option>
                <option value="music">Music</option>
                <option value="games">Games</option>
                <option value="economy">Economy</option>
                <option value="utility">Utility</option>
                <option value="fun">Fun</option>
              </select>
            </div>

            <textarea
              placeholder="Bot Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="url"
                placeholder="Download Link"
                value={formData.downloadLink}
                onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              
              <input
                type="url"
                placeholder="GitHub Link (optional)"
                value={formData.githubLink}
                onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              type="url"
              placeholder="Image URL (optional)"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingBot ? 'Update' : 'Add'} Bot</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bots List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {state.bots.map((bot) => (
                <tr key={bot.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={bot.imageUrl}
                        alt={bot.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{bot.name}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {bot.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                      {bot.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{bot.downloads.toLocaleString()} downloads</div>
                    <div>{bot.likes.toLocaleString()} likes</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bot.rating}/5 ({bot.reviews.length} reviews)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(bot)}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(bot.id)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BotManagement;