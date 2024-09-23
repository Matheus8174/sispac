'use client';

import {
  Text as RNText,
  TextProps as RNTextProps,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
  slots: {
    root: 'items-center rounded-md px-8 py-3',
    text: 'text-base font-bold'
  },
  variants: {
    disable: {
      true: {
        root: '!bg-gray-500'
      }
    },
    variant: {
      outlined: {
        root: 'border-[1px] border-white bg-transparent',
        text: 'text-black-200 dark:text-white'
      },
      contained: {
        root: 'bg-blue-100'
      }
    }
  },
  defaultVariants: {
    disable: false,
    variant: 'contained'
  }
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends TouchableOpacityProps, ButtonVariants {
  children: React.ReactNode;
}

const { root, text } = button();

function Root(props: ButtonProps) {
  const { children, className, variant, disable, ...rest } = props;

  return (
    <TouchableOpacity
      disabled={disable}
      className={root({ className, disable, variant })}
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

interface TextProps extends RNTextProps, ButtonVariants {
  children: React.ReactNode;
}

function Text({ className, children, variant, ...rest }: TextProps) {
  return (
    <RNText className={text({ className, variant })} {...rest}>
      {children}
    </RNText>
  );
}

const Button = {
  Text,
  Root
};

export default Button;
