import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useNavigation } from 'expo-router';

import { Button, Text, TextInput } from '@sispac/ui';

function Home() {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 justify-around bg-black-100 px-7 py-10">
        <Text variant="h3" className="max-w-96 font-normal">
          Faça Login para aproveitar a melhor plataforma de aprendizado:
        </Text>

        <View className="gap-14">
          <TextInput
            placeholder="Seu e-mail:"
            autoCapitalize="none"
            placeholderAnimation
            keyboardType="email-address"
          />

          <TextInput
            placeholder="Sua senha:"
            autoCapitalize="none"
            placeholderAnimation
            password
            variant="outlined"
          />

          <View className="flex w-full gap-12">
            <Button.Root>
              <Button.Text>Log in</Button.Text>
            </Button.Root>

            <Link href="/" className="self-center">
              <Text variant="paragraph">Esqueceu sua senha?</Text>
            </Link>
          </View>
        </View>

        <Button.Root variant="outlined" onPress={() => navigate('register')}>
          <Button.Text className="text-white">Criar uma nova conta</Button.Text>
        </Button.Root>
      </View>
    </SafeAreaView>
  );
}

export default Home;
