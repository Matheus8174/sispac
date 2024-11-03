import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeIn,
  RotateInDownLeft,
  RotateOutDownLeft
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

import { colors } from '@sispac/tokens';
import { Text } from '@sispac/ui';

export interface StatesPickerData {
  id: string;
  name: string;
}

interface StatesPickerProps {
  onChange: (d: StatesPickerData) => void;
  data: StatesPickerData[];
}

export interface StatesPickerRef {
  setShowPicker: (d: boolean) => void;
}

const IconAnimated = Animated.createAnimatedComponent(Feather);

const StatesPicker = React.forwardRef<StatesPickerRef, StatesPickerProps>(
  ({ onChange, data }, fowardedRef) => {
    const [showPicker, setShowPicker] = React.useState(false);

    const togglePicker = () => setShowPicker((prev) => !prev);

    React.useImperativeHandle(fowardedRef, () => ({
      setShowPicker: (d: boolean) => {
        setShowPicker(d);
      }
    }));

    function Item(props: React.PropsWithChildren<{ data: StatesPickerData }>) {
      const { children, data } = props;

      return (
        <TouchableOpacity
          onPress={() => {
            setShowPicker(false);
            onChange(data);
          }}
          activeOpacity={0.7}
          className="justify-center px-4 py-2"
        >
          {children}
        </TouchableOpacity>
      );
    }

    const Divider = () => <View className="h-[1px] w-full bg-black-50" />;

    return (
      <View className="relative gap-2">
        {showPicker && (
          <Animated.View
            entering={FadeIn}
            className="gap-1 rounded-lg bg-black-200 p-2"
          >
            {data.map((state, index, arr) => (
              <View key={state.id}>
                <Item data={state}>
                  <Text variant="h4">{state.name}</Text>
                </Item>
                {index !== arr.length - 1 ? <Divider /> : null}
              </View>
            ))}
          </Animated.View>
        )}

        <TouchableOpacity
          onPress={togglePicker}
          className="size-16 items-center justify-center self-end rounded-full bg-black-200"
          activeOpacity={0.7}
        >
          {showPicker ? (
            <IconAnimated
              name="chevron-down"
              size={25}
              color={colors.white}
              entering={RotateInDownLeft}
              exiting={RotateOutDownLeft}
            />
          ) : (
            <Animated.View
              entering={RotateInDownLeft}
              exiting={RotateOutDownLeft}
            >
              <Feather name="chevron-up" size={25} color={colors.white} />
            </Animated.View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
);

export default StatesPicker;
