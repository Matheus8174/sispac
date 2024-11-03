import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { getOccurrencesByCityAndState } from 'api/fogo-cruzado';
import { FogoCruzadoOccurrences } from 'api/types';
import StatesPicker, {
  StatesPickerData,
  StatesPickerRef
} from 'components/picker';
import SearchBox from 'components/search-box';

import { colors } from '@sispac/tokens';
import { Text } from '@sispac/ui';

const states = [
  {
    id: 'b112ffbe-17b3-4ad0-8f2a-2038745d1d14',
    name: 'Rio de Janeiro'
  },
  {
    id: '813ca36b-91e3-4a18-b408-60b27a1942ef',
    name: 'Pernambuco'
  },
  {
    id: 'd3a9b545-7056-4dc6-9b68-ce320c9edffc',
    name: 'Bahia'
  },
  {
    id: '2a98a020-3815-45d7-a6f6-6de2119eba8b',
    name: 'Pará'
  }
];

type OccurrenceItemProps = {
  title: string;
  location: string;
  date: string;
};

function OccurrenceItem({ title, date, location }: OccurrenceItemProps) {
  return (
    <View className="w-full flex-row gap-4 rounded-lg bg-black-50 p-4">
      <View className="aspect-square size-16 self-center rounded-full bg-blue-100" />

      <View className="flex-1 gap-4">
        <View className="flex-row justify-between">
          <Text variant="h3" numberOfLines={1} lineBreakMode="tail">
            {title}
          </Text>
          <Text
            variant="paragraph"
            className="!text-[#ebebf599]"
            numberOfLines={1}
            lineBreakMode="tail"
          >
            {Intl.DateTimeFormat('pt-br', { dateStyle: 'short' }).format(
              new Date(date)
            )}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text
            variant="paragraph"
            className="max-w-56 !text-[#ebebf599]"
            numberOfLines={1}
            lineBreakMode="tail"
          >
            {location}
          </Text>

          <Text className="rounded-full bg-red-100 px-3 py-1 font-bold">
            perigoso
          </Text>
        </View>
      </View>
    </View>
  );
}

function Map() {
  const [state, setState] = React.useState<StatesPickerData>();

  const pickerRef = React.useRef<StatesPickerRef>(null);

  const [occurencies, setOccurencies] = React.useState<
    FogoCruzadoOccurrences['data']
  >([]);

  const params = useLocalSearchParams<{ cityId?: string }>();

  React.useEffect(() => {
    if (params.cityId && state?.id) {
      getOccurrencesByCityAndState({
        stateId: state.id,
        cityId: params.cityId
      }).then(({ data: response }) => {
        setOccurencies(response.data);
      });
    }
  }, [params.cityId]);

  React.useEffect(() => {
    if (!state || occurencies.length > 0) return;

    getOccurrencesByCityAndState({ stateId: state.id }).then(
      ({ data: response }) => {
        setOccurencies(response.data);
      }
    );
  }, [state]);

  const offsetY = useSharedValue(0);

  const snapPoints = React.useMemo(() => ['10%', '25%', '50%', '70%'], []);

  const animateButton = React.useCallback(
    (y: number) => (offsetY.value = withSpring(y, { mass: 0.6 })),
    []
  );

  const animatedButtonStyle = useAnimatedStyle(() => {
    const bottom = interpolate(
      offsetY.value,
      snapPoints.map((_, i) => i),
      [12, 27, 52, 72]
    );

    return {
      bottom: `${bottom}%`
    };
  });

  function goToSearchView() {
    if (state?.id)
      router.push({
        pathname: '/search-city',
        params: {
          stateName: state.name,
          stateId: state.id
        }
      });

    pickerRef.current?.setShowPicker(true);
  }

  return (
    <View className="flex-1">
      <MapView style={styles.map} showsCompass={false}>
        {occurencies &&
          occurencies.map(({ longitude, latitude, id }) => (
            <Marker
              key={id}
              coordinate={{
                latitude: Number(latitude),
                longitude: Number(longitude)
              }}
            />
          ))}
      </MapView>

      <Animated.View
        style={[{ position: 'absolute', right: 16 }, animatedButtonStyle]}
      >
        <StatesPicker
          data={states}
          onChange={(e) => setState(e)}
          ref={pickerRef}
        />
      </Animated.View>

      <BottomSheet
        index={2}
        onChange={animateButton}
        overDragResistanceFactor={0}
        style={{ flex: 1 }}
        backgroundStyle={{ backgroundColor: colors.black['50'] }}
        snapPoints={snapPoints}
      >
        <View className="flex-1 overflow-visible bg-black-200">
          <View className="flex-row items-center gap-6 bg-black-50 px-4 pb-4">
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-1"
              onPress={goToSearchView}
            >
              <SearchBox
                editable={false}
                focusable={false}
                placeholder="Digite uma cidade:"
              />
            </TouchableOpacity>

            <View className="aspect-square items-center justify-center overflow-hidden rounded-full bg-[#ebebf599] p-2">
              <Feather name="user" color="#FFF" size={30} />
            </View>
          </View>
          <View className="flex-1 gap-4 px-4 pt-4">
            <Text variant="h3">Ocorrências Recentes</Text>

            {occurencies.length <= 0 ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => pickerRef.current?.setShowPicker(true)}
              >
                <Text className="underline">
                  Selecione algum Estado para ver as suas ultímas ocorrencias
                </Text>
              </TouchableOpacity>
            ) : (
              <BottomSheetScrollView contentContainerStyle={{ gap: 10 }}>
                {occurencies.map(({ id, address, contextInfo, date }, i) => (
                  <OccurrenceItem
                    key={id + date + i}
                    location={address}
                    title={contextInfo.mainReason.name}
                    date={date}
                  />
                ))}
              </BottomSheetScrollView>
            )}
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});

export default Map;
