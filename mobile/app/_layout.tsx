import { styled } from 'nativewind'
import { ImageBackground } from 'react-native'

import bgBlur from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'

// estilizando components criados no native
const StripesStyled = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    null | boolean
  >(null)

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      console.log(!!token)
      setIsUserAuthenticated(!!token)
    })
  })

  // se as fonts nao carregaram nao mostra nada na tela
  if (!hasLoadedFonts) {
    return <SplashScreen />
  }
  return (
    // BLUR
    <ImageBackground
      source={bgBlur}
      className="relative flex-1  bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-110%' }}
    >
      <StripesStyled className="absolute left-2" />
      <StatusBar style="light" translucent />
      {/* //para mostrar a tela inicial */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    </ImageBackground>
  )
}
