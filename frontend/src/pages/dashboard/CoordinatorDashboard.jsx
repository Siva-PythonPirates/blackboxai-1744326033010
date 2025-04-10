import { useState } from 'react';
import { ClipboardIcon, DocumentCheckIcon, UserGroupIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export default function CoordinatorDashboard() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const teams = [
    // TODO: Fetch actual teams data
  ];

  const quickActions = [
    {
      name: 'Conduct Review',
      icon: ClipboardIcon,
      description: 'Start a new review session',
      action: () => {/* TODO: Implement review session */},
    },
    {
      name: 'Update Paper Status',
      icon: DocumentCheckIcon,
      description: 'Update research paper status',
      action: () => {/* TODO: Implement status update */},
    },
    {
      name: 'View Teams',
      icon: UserGroupIcon,
      description: 'View assigned teams',
      action: () => {/* TODO: Implement team view */},
    },
    {
      name: 'Student Requests',
      icon: ChatBubbleLeftIcon,
      description: 'View pending requests',
      action: () => {/* TODO: Implement request view */},
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Coordinator Dashboard</h2>
        
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

      {/* Upcoming Reviews Section */}
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

      {/* Student Requests Section */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Recent Student Requests</h3>
          <div className="mt-4">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {/* TODO: Add student requests */}
                <li className="py-4">
                  <div className="text-sm text-gray-500">No pending requests</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Teams Overview Section */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Teams Overview</h3>
          <div className="mt-4">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {teams.length > 0 ? (
                  teams.map((team) => (
                    <li key={team.id} className="py-4">
                      {/* TODO: Add team details */}
                    </li>
                  ))
                ) : (
                  <li className="py-4">
                    <div className="text-sm text-gray-500">No teams assigned yet</div>
                  </li>
                )}
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
            <dt className="text-sm font-medium text-gray-500 truncate">Assigned Teams</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Pending Reviews</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Pending Requests</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
