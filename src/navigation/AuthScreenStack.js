import IntroPage from '../pages/auth/IntroPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import RegisterFormPage from '../pages/auth/RegisterFormPage';
import SmsVerifyPage from '../pages/auth/SmsVerifyPage';
import SelectRecipesPage from '../pages/auth/SelectRecipesPage';
import SelectSkillLevelPage from '../pages/auth/SelectSkillLevelPage';
import SelectSkillsPage from '../pages/auth/SelectSkillsPage';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

const AuthScreenStack = ({ navigation, route }) => {
    const { params = {} } = route;
    const { shouldRedirectToCart = false } = params;
    return (
        <AuthStack.Navigator
            initialRouteName="IntroPage"
            screenOptions={{
                headerShown: false, //Set Header Title
            }}
        >
            <AuthStack.Screen name="IntroPage" component={IntroPage} options={{}} />
            <AuthStack.Screen name="LoginPage" component={LoginPage} options={{}} />
            <AuthStack.Screen name="RegisterPage" component={RegisterPage} options={{}} />
            <AuthStack.Screen name="RegisterFormPage" component={RegisterFormPage} options={{}} />
            <AuthStack.Screen name="SmsVerifyPage" options={{}}>
                {(props) => <SmsVerifyPage {...props} shouldRedirectToCart={shouldRedirectToCart} />}
            </AuthStack.Screen>
            <AuthStack.Screen name="SelectRecipesPage" options={{}}>
                {(props) => <SelectRecipesPage {...props} shouldRedirectToCart={shouldRedirectToCart} />}
            </AuthStack.Screen>
            <AuthStack.Screen name="SelectSkillLevelPage" options={{}}>
                {(props) => <SelectSkillLevelPage {...props} shouldRedirectToCart={shouldRedirectToCart} />}
            </AuthStack.Screen>
            <AuthStack.Screen name="SelectSkillsPage" options={{}}>
                {(props) => <SelectSkillsPage {...props} shouldRedirectToCart={shouldRedirectToCart} />}
            </AuthStack.Screen>
        </AuthStack.Navigator>
    );
};

export default AuthScreenStack;
