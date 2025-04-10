import { Fragment, useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const icons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationCircleIcon,
  info: InformationCircleIcon,
};

const styles = {
  success: {
    background: 'bg-green-50',
    icon: 'text-green-400',
    text: 'text-green-800',
    button: 'bg-green-50 text-green-500 hover:bg-green-100',
  },
  error: {
    background: 'bg-red-50',
    icon: 'text-red-400',
    text: 'text-red-800',
    button: 'bg-red-50 text-red-500 hover:bg-red-100',
  },
  warning: {
    background: 'bg-yellow-50',
    icon: 'text-yellow-400',
    text: 'text-yellow-800',
    button: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100',
  },
  info: {
    background: 'bg-blue-50',
    icon: 'text-blue-400',
    text: 'text-blue-800',
    button: 'bg-blue-50 text-blue-500 hover:bg-blue-100',
  },
};

export default function Toast({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  position = 'bottom-right',
}) {
  const [show, setShow] = useState(true);
  const Icon = icons[type];
  const style = styles[type];

  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  useEffect(() => {
    if (duration !== null) {
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom={`translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2`}
      enterTo={`translate-y-0 opacity-100 sm:translate-x-0`}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`pointer-events-auto fixed z-50 ${positions[position]} w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5`}>
        <div className={`${style.background} p-4`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon className={`h-6 w-6 ${style.icon}`} aria-hidden="true" />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              {title && (
                <p className={`text-sm font-medium ${style.text}`}>{title}</p>
              )}
              {message && (
                <p className={`mt-1 text-sm ${style.text}`}>{message}</p>
              )}
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${style.button}`}
                onClick={handleClose}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

// Toast Container component
export function ToastContainer({ children }) {
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {children}
      </div>
    </div>
  );
}

// Toast Context and Provider
import { createContext, useContext, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    ({ type, title, message, duration }) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [...prev, { id, type, title, message, duration }]);
      
      if (duration !== null) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    []
  );

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={null}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}

// Hook for using toast
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
