import React from 'react';

// Spinner component
export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <svg
        className="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

// Loading Overlay component
export function LoadingOverlay({ message = 'Loading...', blur = false }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className={`absolute inset-0 ${blur ? 'backdrop-blur-sm' : ''} bg-white/50`} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto text-indigo-600" />
          {message && (
            <p className="mt-4 text-sm font-semibold text-gray-900">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Loading Container component
export function LoadingContainer({
  loading,
  children,
  message,
  className = '',
  spinnerSize = 'md',
}) {
  if (!loading) return children;

  return (
    <div className={`relative min-h-[100px] ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center bg-white/50">
        <div className="text-center">
          <Spinner size={spinnerSize} className="mx-auto text-indigo-600" />
          {message && (
            <p className="mt-2 text-sm font-semibold text-gray-900">{message}</p>
          )}
        </div>
      </div>
      <div className="invisible">{children}</div>
    </div>
  );
}

// Skeleton Loading component
export function Skeleton({ className = '', variant = 'text' }) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const variants = {
    text: 'h-4 w-3/4',
    title: 'h-6 w-1/2',
    avatar: 'h-10 w-10 rounded-full',
    button: 'h-10 w-24',
    card: 'h-40 w-full',
    thumbnail: 'h-20 w-20',
  };

  return <div className={`${baseClasses} ${variants[variant]} ${className}`} />;
}

// Skeleton List component
export function SkeletonList({
  count = 3,
  variant = 'text',
  gap = 4,
  className = '',
}) {
  return (
    <div className={`space-y-${gap} ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} variant={variant} />
      ))}
    </div>
  );
}

// Loading Button component
export function LoadingButton({
  loading,
  children,
  disabled,
  spinnerSize = 'sm',
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center rounded-md border border-transparent
        px-4 py-2 font-medium shadow-sm focus:outline-none focus:ring-2
        focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
        ${props.className || ''}
      `}
      {...props}
    >
      {loading && <Spinner size={spinnerSize} className="mr-2" />}
      {children}
    </button>
  );
}

// Progress Bar component
export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  showValue = false,
  className = '',
}) {
  const percentage = (value / max) * 100;

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
  };

  const variants = {
    primary: 'bg-indigo-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
  };

  return (
    <div className={className}>
      <div className={`w-full bg-gray-200 rounded-full ${sizes[size]}`}>
        <div
          className={`${variants[variant]} rounded-full ${sizes[size]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <div className="mt-1 text-xs text-gray-500 text-right">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}

export default {
  Spinner,
  LoadingOverlay,
  LoadingContainer,
  Skeleton,
  SkeletonList,
  LoadingButton,
  ProgressBar,
};
