import React from 'react';

const variants = {
  default: 'bg-white',
  primary: 'bg-indigo-50',
  success: 'bg-green-50',
  warning: 'bg-yellow-50',
  danger: 'bg-red-50',
};

export default function Card({
  children,
  title,
  subtitle,
  variant = 'default',
  className = '',
  actions,
  noPadding = false,
}) {
  const baseClasses = 'rounded-lg shadow-sm border border-gray-200';
  const variantClasses = variants[variant];
  const paddingClasses = noPadding ? '' : 'p-6';
  
  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      {(title || subtitle || actions) && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-500">
                  {subtitle}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex items-center space-x-2">
                {actions}
              </div>
            )}
          </div>
        </div>
      )}
      <div className={paddingClasses}>{children}</div>
    </div>
  );
}

// Card.Section component for consistent section styling within cards
Card.Section = function CardSection({
  children,
  title,
  subtitle,
  className = '',
  noPadding = false,
}) {
  const paddingClasses = noPadding ? '' : 'px-6 py-4';
  
  return (
    <div className={`border-b border-gray-200 last:border-b-0 ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 pt-4">
          {title && (
            <h4 className="text-base font-medium text-gray-900">{title}</h4>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      )}
      <div className={paddingClasses}>{children}</div>
    </div>
  );
};

// Card.List component for rendering lists within cards
Card.List = function CardList({ items, renderItem, className = '' }) {
  return (
    <div className={`divide-y divide-gray-200 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="py-4">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

// Card.Grid component for grid layouts within cards
Card.Grid = function CardGrid({
  children,
  columns = {
    default: 1,
    sm: 2,
    md: 3,
    lg: 4,
  },
  gap = 4,
  className = '',
}) {
  const gridCols = `grid-cols-${columns.default} sm:grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg}`;
  const gapSize = `gap-${gap}`;
  
  return (
    <div className={`grid ${gridCols} ${gapSize} ${className}`}>
      {children}
    </div>
  );
};

// Card.Stats component for displaying statistics
Card.Stats = function CardStats({
  stats,
  columns = {
    default: 1,
    sm: 2,
    md: 3,
    lg: 4,
  },
}) {
  return (
    <Card.Grid columns={columns}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden"
        >
          <dt className="text-sm font-medium text-gray-500 truncate">
            {stat.label}
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {stat.value}
          </dd>
        </div>
      ))}
    </Card.Grid>
  );
};

// Card.Empty component for empty states
Card.Empty = function CardEmpty({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}) {
  return (
    <div className={`text-center py-12 ${className}`}>
      {Icon && (
        <Icon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
      )}
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
