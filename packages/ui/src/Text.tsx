'use client';

import { forwardRef } from 'react';
import {
  Platform,
  Text as RNText,
  TextProps as RNTextProps,
  Role
} from 'react-native';
import { tv, VariantProps } from 'tailwind-variants';

const text = tv({
  // base: 'font-sans text-white dark:text-white',
  base: 'text-white dark:text-white',
  variants: {
    variant: {
      h1: 'text-3xl font-bold',
      h2: 'text-2xl font-bold',
      h3: 'text-xl font-bold',
      h4: 'text-base font-bold',
      paragraph: 'text-base',
      subtitle: 'text-sm'
    }
  },
  defaultVariants: {
    variant: 'paragraph'
  }
});

type TextVariants = VariantProps<typeof text>;

interface TextProps extends TextVariants, RNTextProps {
  children: React.ReactNode;
  className?: string;
}

const headerRegEx = /^h\d/;

export const Text = forwardRef<RNText, TextProps>(
  ({ children, variant = 'paragraph', className, ...rest }, ref) => {
    const role = headerRegEx.test(variant) ? 'heading' : ('paragraph' as Role);

    const headingNumber = role === 'heading' ? variant.slice(1) : undefined;

    return (
      <RNText
        role={Platform.OS === 'web' ? role : undefined}
        aria-level={headingNumber}
        className={text({ className, variant })}
        ref={ref}
        {...rest}
      >
        {children}
      </RNText>
    );
  }
);
