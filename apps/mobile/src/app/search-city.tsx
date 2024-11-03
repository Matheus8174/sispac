import type { FogoCruzadoCities } from 'api/types';
import React from 'react';
import { FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router, useLocalSearchParams } from 'expo-router';
import { useThemeConfig } from '@/hooks/use-theme-config';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { getCities } from 'api/fogo-cruzado';
import SearchBox from 'components/search-box';

import { Text } from '@sispac/ui';

type ApiData = FogoCruzadoCities['data'];

type Param = {
  stateId: string;
  stateName: string;
};

function SearchCity() {
  const { stateId, stateName } = useLocalSearchParams<Param>();

  const theme = useThemeConfig();

  const [filteredResult, setFilteredResult] = React.useState<
    FogoCruzadoCities['data']
  >([]);

  const [result, setResult] = React.useState<ApiData>();

  React.useEffect(() => {
    if (result) return;

    getCities({
      stateId
    })?.then(({ data: response }) => {
      setResult(response.data);
      setFilteredResult(response.data);
    });
  }, []);

  const handleChangeText = (text: string) => {
    const filteredList = result?.filter(({ name }) =>
      name.includes(text.toUpperCase())
    );

    if (filteredList) setFilteredResult(filteredList);
  };

  function onSubmit(city?: ApiData[0]) {
    const citySelected = city ?? filteredResult.at(0);

    router.navigate({ pathname: '/map', params: { cityId: citySelected?.id } });
  }

  return (
    <View className="flex-1 px-7 pt-10">
      <View className="mb-10 h-14">
        <SearchBox
          onSubmitEditing={() => onSubmit()}
          autoFocus
          placeholder={`Cidades de ${stateName}`}
          onChangeText={handleChangeText}
        />
      </View>

      <FlatList
        ListEmptyComponent={() => (
          <Text variant="h4">Essa cidade não exite ou não esta cadastrada</Text>
        )}
        contentContainerStyle={{ gap: 30 }}
        data={filteredResult}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.7} onPress={() => onSubmit(item)}>
            <View className="flex-row gap-4">
              <FontAwesome6
                name="location-dot"
                size={24}
                color={theme.colors.primary}
              />

              <Text variant="h4">{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default SearchCity;
