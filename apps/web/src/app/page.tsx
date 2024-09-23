/** @jsxImportSource react */

'use client';

import Link from 'next/link';

import { Button, Text, TextInput } from '@sispac/ui';

function Login() {
  return (
    <main className="m-auto flex max-w-96 flex-col gap-12">
      <Text variant="h3" className="font-normal">
        Faça Login para aproveitar a melhor plataforma de aprendizado:
      </Text>

      <div className="flex flex-1 flex-col gap-14">
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
          variant="outlined"
          password
        />

        <div className="flex w-full flex-col gap-12">
          <Button.Root>
            <Button.Text>Log in</Button.Text>
          </Button.Root>

          <Link href="/" className="self-center text-white">
            <Text variant="paragraph">Esqueceu sua senha?</Text>
          </Link>
        </div>
      </div>

      <Button.Root variant="outlined">
        <Button.Text className="text-white">Criar uma nova conta</Button.Text>
      </Button.Root>
    </main>
  );
}

export default Login;
