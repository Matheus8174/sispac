# sispac

monorepo project contain the source code of sispac.

## 💎 Libraries used

the main tecnologies that help this project to work is:

- [Expo](https://docs.expo.io/)
- [Nativewind](https://www.nativewind.dev/v4/overview)
- [React Hook Form](https://react-hook-form.com/)
- [zustand](https://github.com/pmndrs/zustand)
- [React Native MMKV](https://github.com/mrousavy/react-native-mmkv)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/)
- [React Native Svg](https://github.com/software-mansion/react-native-svg)- [Tailwind Variants](https://www.tailwind-variants.org/)
- [Zod](https://zod.dev/)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)
- [NextJS](https://nextjs.org)

## ⭐ How does this repositorie works?

this is a [monorepo](https://monorepo.tools), basically, it is a way to put more than one project in the same repository, sharing some packages that make sense in both apps.

It uses [Turborepo](https://turborepo.org) and contains:

```text
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ expo
  |   ├─ Expo SDK 51
  |   ├─ React Native using React 18
  |   ├─ Navigation using Expo Router
  |   └─ Tailwind using NativeWind
  └─ next.js
      ├─ Next.js 14
      ├─ React 18
      └─ Tailwind CSS
packages
  ├─ eslint
  |   └─ shared, fine-grained, eslint presets
  ├─ prettier
  |   └─ shared prettier configuration
  ├─ tokens
  |   └─ main application tokens that will be used in both apps
  ├─ ui
  |   └─ Start of a UI package for both web and mobile apps
  └─ typescript
      └─ shared tsconfig you can extend from
```

## 🧑‍💻 Stay up to date

To get started with this project, ensure you have the following technologies installed on your computer:

- **Node.js**: This project was developed using Node.js version **20.16**.
- **pnpm**: Install it via npm by running the command:
  ```bash
  npm install -g pnpm
  ```

Make sure to install the extensions listed in the .vscode/extensions.json file. You can easily find and install them by searching for their names in the VSCode Extensions tab.

### Cloning the Repository

First, clone the repository:

```bash
git clone https://github.com/Matheus8174/sispac.git sispac
```

### Installing Dependencies

Navigate to the project directory and install the dependencies using pnpm:

```bash
cd sispac
pnpm install
```

### Running the Applications

You can start both applications by running the following command in the workspace:

```
pnpm dev
```

Alternatively, you can navigate to any specific app folder and run:

```
pnpm dev
```

This will start the development server for the selected application. Enjoy coding! 🚀
