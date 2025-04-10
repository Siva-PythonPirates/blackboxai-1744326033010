import { useState } from 'react';
import { PlusIcon, UserGroupIcon, CalendarIcon, DocumentIcon } from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // TODO: Implement file upload logic
  };

  const quickActions = [
    {
      name: 'Upload Project Titles',
      icon: PlusIcon,
      description: 'Upload Excel file containing project titles',
      action: () => document.getElementById('projectUpload').click(),
    },
    {
      name: 'Assign Teams',
      icon: UserGroupIcon,
      description: 'Randomly assign coordinators and mentors to teams',
      action: () => {/* TODO: Implement team assignment */},
    },
    {
      name: 'Schedule Reviews',
      icon: CalendarIcon,
      description: 'Schedule project reviews',
      action: () => {/* TODO: Implement review scheduling */},
    },
    {
      name: 'Upload Templates',
      icon: DocumentIcon,
      description: 'Upload review forms and templates',
      action: () => {/* TODO: Implement template upload */},
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Admin Dashboard</h2>
        
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

        {/* Hidden file input for project titles upload */}
        <input
          type="file"
          id="projectUpload"
          className="hidden"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
        />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="flow-root">
          <ul className="-mb-8">
            {/* TODO: Add recent activity items */}
            <li className="text-sm text-gray-500">No recent activity</li>
          </ul>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Teams</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Reviews</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Published Papers</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
