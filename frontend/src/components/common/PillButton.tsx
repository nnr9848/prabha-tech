import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Loader2 } from 'lucide-react';

export interface PillButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'solid' | 'secondary' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  showDefaultIcon?: boolean;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  target?: string;
  rel?: string;
}

export const PillButton: React.FC<PillButtonProps> = ({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon,
  showDefaultIcon = true,
  iconPosition = 'right',
  isLoading = false,
  disabled = false,
  className = '',
  target,
  rel,
}) => {
  // Size Classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-2',
    md: 'px-6 py-3 text-sm gap-2.5',
    lg: 'px-7 sm:px-9 py-3.5 sm:py-4.5 text-base sm:text-lg gap-3 sm:gap-4',
  }[size];

  // Variant Classes
  const variantClasses = {
    primary: 'brand-pill-btn',
    solid: 'btn-brand font-semibold text-black rounded-full transition-all',
    secondary: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-medium transition-all',
    glass: 'bg-black/40 hover:bg-black/60 text-white border border-white/15 backdrop-blur-md rounded-full font-medium transition-all',
  }[variant];

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        iconPosition === 'left' && (icon || null)
      )}
      <span className="leading-none">{children}</span>
      {!isLoading &&
        iconPosition === 'right' &&
        (icon ? (
          icon
        ) : showDefaultIcon ? (
          href ? (
            <ArrowUpRight className="w-4 h-4 text-[#9873ff] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          ) : (
            <ArrowRight className="w-4 h-4 text-[#9873ff] transition-transform duration-300 group-hover:translate-x-1" />
          )
        ) : null)}
    </>
  );

  const baseClasses = `group inline-flex items-center justify-center cursor-pointer select-none no-underline ${sizeClasses} ${variantClasses} ${
    disabled || isLoading ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''
  } ${className}`;

  if (to && !disabled) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a
        href={href}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        className={baseClasses}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={baseClasses}
    >
      {content}
    </button>
  );
};
