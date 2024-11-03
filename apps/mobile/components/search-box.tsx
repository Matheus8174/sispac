import type { TextInputProps } from 'react-native';
import React from 'react';
import { TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBox = React.forwardRef<TextInput, TextInputProps>((props, ref) => {
  return (
    <View className="flex-1 flex-row items-center gap-3 rounded-lg border border-[#ebebf599]">
      <View className="pl-3">
        <Feather name="search" color="#ebebf599" size={20} />
      </View>

      <TextInput
        ref={ref}
        className="placeholder:text-md flex-1 py-2 text-white placeholder:text-[#ebebf599]"
        {...props}
      />
    </View>
  );
});

export default SearchBox;
