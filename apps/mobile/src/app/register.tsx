import React from 'react';
import { View } from 'react-native';

import { Button, Text, TextInput } from '@sispac/ui';

function Register() {
  return (
    <View className="flex-1 justify-center px-7 py-10">
      <Text variant="h3" className="max-w-96 font-normal">
        Criar sua conta:
      </Text>

      <View className="mt-14 flex-1 justify-center gap-14">
        <TextInput placeholder="Nome de usuário:" placeholderAnimation />

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

        <TextInput
          placeholder="Confirme sua senha:"
          autoCapitalize="none"
          placeholderAnimation
          password
          variant="outlined"
        />

        <View className="mt-14">
          <Button.Root variant="contained">
            <Button.Text>Criar uma nova conta</Button.Text>
          </Button.Root>
        </View>
      </View>
    </View>
  );
}

// const style = StyleSheet.create({
//   dd: {color: (e) => e.}
// })

export default Register;
