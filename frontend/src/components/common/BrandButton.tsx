import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export interface BrandButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'gold' | 'dark' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  showArrow?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  target?: string;
  rel?: string;
}

export const BrandButton: React.FC<BrandButtonProps> = ({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'gold',
  size = 'md',
  icon,
  showArrow = true,
  isLoading = false,
  disabled = false,
  className = '',
  target,
  rel,
}) => {
  // Enterprise subtle rounded corners (rounded-md ~ 4-6px), NOT pill
  const baseClasses =
    'inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-md transition-all duration-200 select-none group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A93C] focus-visible:ring-offset-2';

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-2',
    md: 'px-6 py-3 text-xs sm:text-[13px] gap-2.5',
    lg: 'px-8 py-3.5 text-[13px] sm:text-sm gap-3',
  }[size];

  const variantClasses = {
    gold: 'bg-[#E5A93C] hover:bg-[#D4972B] active:bg-[#C58920] text-[#000B1E] shadow-sm hover:shadow hover:scale-[1.01]',
    dark: 'bg-[#020E26] hover:bg-[#0A1C3E] active:bg-[#000B1E] text-white shadow-sm border border-transparent hover:border-[#E5A93C]/40',
    outline:
      'bg-[#000B1E]/60 hover:bg-[#000B1E] text-white border border-white/20 hover:border-white/40 backdrop-blur-sm shadow-sm',
    ghost: 'bg-transparent hover:bg-slate-100 text-[#020E26]',
  }[variant];

  const disabledClasses = disabled || isLoading ? 'opacity-60 cursor-not-allowed pointer-events-none' : '';

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-current" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {showArrow && !isLoading && (
        <span className="text-xs transition-transform duration-200 group-hover:translate-x-1 shrink-0 font-normal">
          →
        </span>
      )}
    </>
  );

  const fullClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={fullClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={fullClasses}
        target={target}
        rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled || isLoading} className={fullClasses}>
      {content}
    </button>
  );
};

// Also export as PillButton for backward compatibility
export const PillButton = BrandButton;
