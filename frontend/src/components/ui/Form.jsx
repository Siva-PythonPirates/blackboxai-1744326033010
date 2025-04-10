import React from 'react';

// Input component
export function Input({
  label,
  error,
  className = '',
  id,
  helperText,
  required = false,
  ...props
}) {
  const inputId = id || props.name;
  
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="mt-1">
        <input
          id={inputId}
          className={`
            block w-full rounded-md shadow-sm sm:text-sm
            ${error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }
          `}
          {...props}
        />
      </div>
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

// Select component
export function Select({
  label,
  error,
  className = '',
  id,
  options = [],
  helperText,
  required = false,
  ...props
}) {
  const selectId = id || props.name;
  
  return (
    <div className={className}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="mt-1">
        <select
          id={selectId}
          className={`
            block w-full rounded-md shadow-sm sm:text-sm
            ${error
              ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

// Textarea component
export function Textarea({
  label,
  error,
  className = '',
  id,
  helperText,
  required = false,
  ...props
}) {
  const textareaId = id || props.name;
  
  return (
    <div className={className}>
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="mt-1">
        <textarea
          id={textareaId}
          className={`
            block w-full rounded-md shadow-sm sm:text-sm
            ${error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }
          `}
          {...props}
        />
      </div>
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

// Checkbox component
export function Checkbox({
  label,
  error,
  className = '',
  id,
  helperText,
  ...props
}) {
  const checkboxId = id || props.name;
  
  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex h-5 items-center">
        <input
          id={checkboxId}
          type="checkbox"
          className={`
            h-4 w-4 rounded
            ${error
              ? 'border-red-300 text-red-600 focus:ring-red-500'
              : 'border-gray-300 text-indigo-600 focus:ring-indigo-500'
            }
          `}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        {label && (
          <label htmlFor={checkboxId} className="font-medium text-gray-700">
            {label}
          </label>
        )}
        {(error || helperText) && (
          <p className={`mt-1 ${error ? 'text-red-600' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    </div>
  );
}

// Radio Group component
export function RadioGroup({
  label,
  error,
  className = '',
  options = [],
  helperText,
  required = false,
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="mt-1 space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${props.name}-${option.value}`}
              className={`
                h-4 w-4
                ${error
                  ? 'border-red-300 text-red-600 focus:ring-red-500'
                  : 'border-gray-300 text-indigo-600 focus:ring-indigo-500'
                }
              `}
              value={option.value}
              {...props}
            />
            <label
              htmlFor={`${props.name}-${option.value}`}
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

// File Upload component
export function FileUpload({
  label,
  error,
  className = '',
  id,
  helperText,
  accept,
  required = false,
  ...props
}) {
  const fileId = id || props.name;
  
  return (
    <div className={className}>
      {label && (
        <label htmlFor={fileId} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="mt-1">
        <input
          type="file"
          id={fileId}
          accept={accept}
          className={`
            block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0 file:text-sm file:font-semibold
            ${error
              ? 'file:bg-red-50 file:text-red-700 hover:file:bg-red-100'
              : 'file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100'
            }
          `}
          {...props}
        />
      </div>
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

// Form Group component for grouping form elements
export function FormGroup({ children, className = '' }) {
  return <div className={`space-y-6 ${className}`}>{children}</div>;
}

// Form Section component for creating form sections
export function FormSection({ title, description, children, className = '' }) {
  return (
    <div className={className}>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-6">{children}</div>
    </div>
  );
}
