import { Tabs } from 'expo-router';

import { Text } from '@sispac/ui';

import MapFilledIcon from '../../assets/map-filled.svg';
import MapIcon from '../../assets/map.svg';

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#EBEBF5',
        tabBarLabelStyle: { fontSize: 12, color: '#EBEBF5' },
        tabBarStyle: { height: 60 },
        tabBarLabel: ({ color, children }) => (
          <Text style={{ color }} variant="subtitle">
            {children}
          </Text>
        )
      }}
    >
      <Tabs.Screen
        name="map"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ focused, color }) => {
            const Icon = focused ? MapFilledIcon : MapIcon;

            return <Icon fill={color} width={20} height={20} />;
          }
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
