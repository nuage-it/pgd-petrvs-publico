import React from 'react'

// Componente de botão seguindo padrões gov.br
export const GovBrButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  [key: string]: any
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-govbr-blue-600 text-white hover:bg-govbr-blue-700 focus:ring-govbr-blue-500',
    secondary: 'bg-transparent text-govbr-blue-600 border border-govbr-blue-600 hover:bg-govbr-blue-50 focus:ring-govbr-blue-500',
    success: 'bg-govbr-green-600 text-white hover:bg-govbr-green-700 focus:ring-govbr-green-500',
    warning: 'bg-govbr-yellow-600 text-govbr-gray-900 hover:bg-govbr-yellow-700 focus:ring-govbr-yellow-500'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Componente de card seguindo padrões gov.br
export const GovBrCard = ({ 
  children, 
  className = '',
  title,
  ...props 
}: {
  children: React.ReactNode
  className?: string
  title?: string
  [key: string]: any
}) => {
  return (
    <div 
      className={`bg-white rounded-lg border border-govbr-gray-200 shadow-govbr p-6 ${className}`}
      {...props}
    >
      {title && (
        <h3 className="text-lg font-semibold text-govbr-gray-900 mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

// Componente de input seguindo padrões gov.br
export const GovBrInput = ({ 
  label,
  error,
  className = '',
  ...props 
}: {
  label?: string
  error?: string
  className?: string
  [key: string]: any
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-govbr-gray-700">
          {label}
        </label>
      )}
      <input 
        className={`w-full px-3 py-2 border rounded-md transition-colors ${
          error 
            ? 'border-error focus:ring-error' 
            : 'border-govbr-gray-300 focus:ring-govbr-blue-500'
        } focus:outline-none focus:ring-2 focus:border-transparent ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
}

// Componente de badge/tag seguindo padrões gov.br
export const GovBrBadge = ({ 
  children, 
  variant = 'default',
  className = ''
}: {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  className?: string
}) => {
  const variants = {
    default: 'bg-govbr-gray-100 text-govbr-gray-800',
    success: 'bg-govbr-green-100 text-govbr-green-800',
    warning: 'bg-govbr-yellow-100 text-govbr-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-govbr-blue-100 text-govbr-blue-800'
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

// Componente de alerta seguindo padrões gov.br
export const GovBrAlert = ({ 
  children, 
  variant = 'info',
  className = '',
  title
}: {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'error' | 'info'
  className?: string
  title?: string
}) => {
  const variants = {
    success: 'bg-govbr-green-50 border-govbr-green-200 text-govbr-green-800',
    warning: 'bg-govbr-yellow-50 border-govbr-yellow-200 text-govbr-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-govbr-blue-50 border-govbr-blue-200 text-govbr-blue-800'
  }
  
  return (
    <div className={`border-l-4 p-4 ${variants[variant]} ${className}`}>
      {title && (
        <h4 className="font-medium mb-1">{title}</h4>
      )}
      <div>{children}</div>
    </div>
  )
}