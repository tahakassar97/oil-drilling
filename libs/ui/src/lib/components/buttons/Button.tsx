'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border cursor-pointer disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'border-primary-500 bg-primary-500 text-white shadow transition-300 hover:bg-primary-600',
        secondary:
          'bg-secondary border-secondary text-secondary-foreground shadow-sm transition-300 hover:bg-secondary-600',
        outline:
          'border-gray-500 shadow-sm hover:bg-gray-100 hover:text-gray-700 hover:border-gray-600',
        link: 'border-transparent text-primary hover:text-primary-600',
      },
      size: {
        default: 'h-11 px-4 py-3 rounded-md',
        sm: 'rounded-md p-2 text-xs',
        xs: 'rounded-md text-[10px] !p-0',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
