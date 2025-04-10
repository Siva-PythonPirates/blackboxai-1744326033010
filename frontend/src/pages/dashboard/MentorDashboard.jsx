import { useState } from 'react';
import { LinkIcon, DocumentMagnifyingGlassIcon, ClipboardDocumentCheckIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export default function MentorDashboard() {
  const [newConferenceLink, setNewConferenceLink] = useState({ title: '', url: '', description: '' });

  const quickActions = [
    {
      name: 'Share Conference Link',
      icon: LinkIcon,
      description: 'Share new conference links with students',
      action: () => {/* TODO: Implement conference link sharing */},
    },
    {
      name: 'View GitHub Repos',
      icon: DocumentMagnifyingGlassIcon,
      description: 'View team repositories',
      action: () => {/* TODO: Implement repo viewing */},
    },
    {
      name: 'Review Feedback',
      icon: ClipboardDocumentCheckIcon,
      description: 'Provide review feedback',
      action: () => {/* TODO: Implement feedback submission */},
    },
    {
      name: 'Student Requests',
      icon: ChatBubbleLeftIcon,
      description: 'View student requests',
      action: () => {/* TODO: Implement request viewing */},
    },
  ];

  const handleConferenceLinkSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement conference link submission
    setNewConferenceLink({ title: '', url: '', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Mentor Dashboard</h2>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <div
              key={action.name}
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex flex-col items-center hover:border-gray-400 cursor-pointer"
              onClick={action.action}
            >
              <div className="flex-shrink-0">
                <action.icon className="h-8 w-8 text-gray-600" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">{action.name}</h3>
                <p className="mt-1 text-xs text-gray-500">{action.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Conference Link Form */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Share Conference Link</h3>
          <form onSubmit={handleConferenceLinkSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Conference Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newConferenceLink.title}
                onChange={(e) => setNewConferenceLink({ ...newConferenceLink, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                Conference URL
              </label>
              <input
                type="url"
                name="url"
                id="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newConferenceLink.url}
                onChange={(e) => setNewConferenceLink({ ...newConferenceLink, url: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={newConferenceLink.description}
                onChange={(e) => setNewConferenceLink({ ...newConferenceLink, description: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Share Link
            </button>
          </form>
        </div>
      </div>

      {/* Mentored Teams Section */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Mentored Teams</h3>
          <div className="mt-4">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {/* TODO: Add mentored teams */}
                <li className="py-4">
                  <div className="text-sm text-gray-500">No teams assigned yet</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Mentored Teams</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Shared Links</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Reviews Completed</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
