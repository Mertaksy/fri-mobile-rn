import 'react-native-gesture-handler';
import React, { useState } from 'react';
import RootScreenStack from './src/navigation/tabbarNavigation';
import { Provider as AppProvider } from './src/context/AppContext';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import SuccessFailureModal from './src/components/SuccessFailureModal';
const fetchAssets = async () => {
    const fonts = Font.loadAsync({
        'gilroy-black': require('./assets/fonts/Gilroy-Black.ttf'),
        'gilroy-black-italic': require('./assets/fonts/Gilroy-BlackItalic.ttf'),
        'gilroy-bold': require('./assets/fonts/Gilroy-Bold.ttf'),
        'gilroy-bold-italic': require('./assets/fonts/Gilroy-BoldItalic.ttf'),
        'gilroy-extra-bold': require('./assets/fonts/Gilroy-ExtraBold.ttf'),
        'gilroy-extra-bold-italic': require('./assets/fonts/Gilroy-ExtraBoldItalic.ttf'),
        'gilroy-heavy': require('./assets/fonts/Gilroy-Heavy.ttf'),
        'gilroy-heavy-italic': require('./assets/fonts/Gilroy-HeavyItalic.ttf'),
        'gilroy-light': require('./assets/fonts/Gilroy-Light.ttf'),
        'gilroy-light-italic': require('./assets/fonts/Gilroy-LightItalic.ttf'),
        'gilroy-medium': require('./assets/fonts/Gilroy-Medium.ttf'),
        'gilroy-medium-italic': require('./assets/fonts/Gilroy-MediumItalic.ttf'),
        'gilroy-regular': require('./assets/fonts/Gilroy-Regular.ttf'),
        'gilroy-regular-italic': require('./assets/fonts/Gilroy-RegularItalic.ttf'),
        'gilroy-semi-bold': require('./assets/fonts/Gilroy-SemiBold.ttf'),
        'gilroy-semi-bold-italic': require('./assets/fonts/Gilroy-SemiBoldItalic.ttf'),
        'gilroy-thin': require('./assets/fonts/Gilroy-Thin.ttf'),
        'gilroy-thin-italic': require('./assets/fonts/Gilroy-ThinItalic.ttf'),
        'gilroy-ultra-light': require('./assets/fonts/Gilroy-UltraLight.ttf'),
        'gilroy-ultra-light-italic': require('./assets/fonts/Gilroy-UltraLightItalic.ttf'),
        'recoleta-black': require('./assets/fonts/RecoletaAlt-Black.ttf'),
        'recoleta-bold': require('./assets/fonts/RecoletaAlt-Bold.ttf'),
        'recoleta-light': require('./assets/fonts/RecoletaAlt-Light.ttf'),
        'recoleta-medium': require('./assets/fonts/RecoletaAlt-Medium.ttf'),
        'recoleta-regular': require('./assets/fonts/RecoletaAlt-Regular.ttf'),
        'recoleta-semi-bold': require('./assets/fonts/RecoletaAlt-SemiBold.ttf'),
        'recoleta-thin': require('./assets/fonts/RecoletaAlt-Thin.ttf'),
    });
    // const icons = loadIcons();
    try {
        return await Promise.all([fonts]);
    } catch (e) {
        // Do nothing
    }
};
// console.disableYellowBox = true;
function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return <AppLoading startAsync={fetchAssets} onFinish={() => setFontLoaded(true)} />;
    }

    return (
        <AppProvider>
            <StatusBar style="dark" />
            <SuccessFailureModal />
            <RootScreenStack />
        </AppProvider>
    );
}

export default App;
