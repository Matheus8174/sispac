'use client';

import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions
} from 'react-hook-form';
import React, { forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { useController } from 'react-hook-form';
import { tv, VariantProps } from 'tailwind-variants';

import { colors } from '@sispac/tokens';

import EyeOff from '../icons/eye-off.svg';
import Eye from '../icons/eye.svg';
import { Text } from './Text';

const textInput = tv({
  slots: {
    errorText:
      'absolute bottom-0 translate-y-full text-red-100 dark:text-red-100',
    root: 'placeholder:text-grey rounded-md p-4 text-white',
    toggleVisibleIcon:
      'absolute size-9 -translate-x-4 items-center justify-center self-end text-white'
  },
  variants: {
    password: {
      true: {
        toggleVisibleIcon: 'hidden'
      }
    },
    variant: {
      contained: {
        root: 'bg-black-50'
      },
      outlined: {
        root: 'border-[1px] border-white bg-transparent'
      }
    }
  },
  defaultVariants: {
    password: false,
    error: false,
    variant: 'contained'
  }
});

const { root, toggleVisibleIcon, errorText } = textInput();

type TextInputVariants = VariantProps<typeof textInput>;

interface TextInputProps
  extends Omit<TextInputVariants, 'error'>,
    RNTextInputProps {
  error?: string;
  placeholderAnimation?: boolean;
}

const toValue = -45;

const AnimatedText = Animated.createAnimatedComponent(Text);

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (props, fowardedRef) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const {
      className,
      variant,
      password,
      error,
      placeholder,
      onChangeText,
      placeholderAnimation = false,
      ...rest
    } = props;

    const translateY = useSharedValue(0);

    const animation = useAnimatedStyle(
      () => ({
        transform: [{ translateY: translateY.value }]
      }),
      [translateY]
    );

    function handleTextChange(text: string) {
      if (text.length === 0) translateY.value = withSpring(0);

      if (text.length >= 1) translateY.value = withSpring(toValue);

      if (onChangeText) onChangeText(text);
    }

    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    const styles = root({ className, variant });

    const visibiliteIcon = toggleVisibleIcon({ className, variant });

    return (
      <View className="relative justify-center">
        <RNTextInput
          className={styles}
          onChangeText={handleTextChange}
          secureTextEntry={showPassword}
          {...{ placeholder: !placeholderAnimation ? placeholder : undefined }}
          ref={fowardedRef}
          {...rest}
        />

        {error && (
          <AnimatedText
            className={errorText()}
            entering={FadeIn}
            exiting={FadeOut}
          >
            {error}
          </AnimatedText>
        )}

        {placeholder && placeholderAnimation && (
          <AnimatedText
            className="absolute px-4 text-white dark:text-white"
            style={animation}
          >
            {placeholder}
          </AnimatedText>
        )}

        {password && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={toggleShowPassword}
            className={visibiliteIcon}
          >
            {showPassword ? (
              <EyeOff fill={colors.gray} />
            ) : (
              <Eye fill={colors.gray} />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

type TRule<T extends FieldValues> =
  | Omit<
      RegisterOptions<T>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
  | undefined;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };

export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
};

interface ControlledInputProps<T extends FieldValues>
  extends TextInputProps,
    InputControllerType<T> {}

export function ControllerInputText<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { name, control, rules, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });

  return (
    <TextInput
      ref={field.ref}
      onChangeText={field.onChange}
      value={(field.value as string) || ''}
      error={fieldState.error?.message}
      {...inputProps}
    />
  );
}

export default TextInput;
