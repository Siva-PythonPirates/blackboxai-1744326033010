import { useState } from 'react';
import { UserGroupIcon, LinkIcon, DocumentIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export default function StudentDashboard() {
  const [teamFormData, setTeamFormData] = useState({
    githubLink: '',
    paperLink: '',
    reportLink: '',
  });

  const quickActions = [
    {
      name: 'Form Team',
      icon: UserGroupIcon,
      description: 'Create or join a team',
      action: () => {/* TODO: Implement team formation */},
    },
    {
      name: 'Share Links',
      icon: LinkIcon,
      description: 'Share project links',
      action: () => {/* TODO: Implement link sharing */},
    },
    {
      name: 'Upload Documents',
      icon: DocumentIcon,
      description: 'Upload project documents',
      action: () => {/* TODO: Implement document upload */},
    },
    {
      name: 'Update Status',
      icon: ArrowUpTrayIcon,
      description: 'Request paper status update',
      action: () => {/* TODO: Implement status update request */},
    },
  ];

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement link submission
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Student Dashboard</h2>
        
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

      {/* Project Links Form */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Project Links</h3>
          <form onSubmit={handleLinkSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700">
                GitHub Repository Link
              </label>
              <input
                type="url"
                name="githubLink"
                id="githubLink"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={teamFormData.githubLink}
                onChange={(e) => setTeamFormData({ ...teamFormData, githubLink: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="paperLink" className="block text-sm font-medium text-gray-700">
                Research Paper Link
              </label>
              <input
                type="url"
                name="paperLink"
                id="paperLink"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={teamFormData.paperLink}
                onChange={(e) => setTeamFormData({ ...teamFormData, paperLink: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="reportLink" className="block text-sm font-medium text-gray-700">
                Project Report Link
              </label>
              <input
                type="url"
                name="reportLink"
                id="reportLink"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={teamFormData.reportLink}
                onChange={(e) => setTeamFormData({ ...teamFormData, reportLink: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Links
            </button>
          </form>
        </div>
      </div>

      {/* Team Information */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Team Information</h3>
          <div className="mt-4">
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Team Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Not assigned</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Teammate</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Not assigned</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Mentor</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Not assigned</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Coordinator</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Not assigned</dd>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Reviews */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Reviews</h3>
          <div className="mt-4">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {/* TODO: Add upcoming reviews */}
                <li className="py-4">
                  <div className="text-sm text-gray-500">No upcoming reviews scheduled</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Conference Links */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Available Conference Links</h3>
          <div className="mt-4">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {/* TODO: Add conference links */}
                <li className="py-4">
                  <div className="text-sm text-gray-500">No conference links available</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
