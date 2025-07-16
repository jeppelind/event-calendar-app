import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { DrawerActions, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { Image, useColorScheme, View, StyleSheet } from 'react-native';
import i18next from 'i18next';
import HomeScreen from './features/homescreen/HomeScreen';
import Login from './features/user/Login';
import { MyAppIconButton, MyAppText } from './utils/Components';
import { useAppDispatch } from './app/store';
import { deleteUserData, selectUser } from './features/user/userSlice';
import AddEventModal from './features/events/AddEventModal';
import DeleteEventModal from './features/events/DeleteEventModal';
import EditEventModal from './features/events/EditEventModal';
import { darkTheme, lightTheme } from './utils/color';
import appConf from '../app.json';
import Settings from './features/settings/Settings';

const styles = StyleSheet.create({
  headerIcon: {
    minWidth: 32,
    minHeight: 32,
    // flex: 1,
    // borderColor: 'hotpink',
    // borderWidth: 1,
    // zIndex: 2000,
    // overflow: 'visible',
    // lineHeight: 1,
    // flexWrap: 'nowrap',
    // elevation: 4,
  },
});

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainNavigationStack = () => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const colorScheme = useColorScheme();
  const theme = (colorScheme === 'light') ? lightTheme : darkTheme;

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: theme.primary },
        headerTitleStyle: {
          fontFamily: 'Poppins_400Regular',
        },
        headerShadowVisible: false,
        headerTintColor: 'white',
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Evenemangskalendern',
            headerTitleStyle: {
              fontFamily: 'Poppins_700Bold',
              fontSize: 14,
            },
            headerTitleAlign: 'center',
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => <MyAppIconButton icon="menu" style={styles.headerIcon} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />,
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => {
              if (user.name) {
                return <MyAppIconButton icon="add-box" style={styles.headerIcon} onPress={() => navigation.navigate('AddEventModal')} />;
              }
              return null;
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: i18next.t('navigation.settings'),
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="DeleteEventModal"
          component={DeleteEventModal}
          options={{ title: i18next.t('events.deleteLabel') }}
        />
        <Stack.Screen
          name="AddEventModal"
          component={AddEventModal}
          options={{ title: i18next.t('events.createLabel') }}
        />
        <Stack.Screen
          name="EditEventModal"
          component={EditEventModal}
          options={{ title: i18next.t('events.editLabel') }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const CustomDrawerContent = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const colorScheme = useColorScheme();
  const theme = (colorScheme === 'light') ? lightTheme : darkTheme;

  const labelStyle = { fontSize: 20, fontFamily: 'Poppins_400Regular', color: theme.text, paddingTop: 10 };

  return (
    <DrawerContentScrollView
      contentContainerStyle={{ flex: 1, justifyContent: 'space-between', backgroundColor: theme.background }}
    >
      <View>
        <View style={{ alignItems: 'center', padding: 10, backgroundColor: 'white' }}>
          <Image
            style={{ width: 80, height: 80 }}
            // eslint-disable-next-line global-require
            source={require('../assets/icon.png')}
          />
        </View>
        <DrawerItem
          label={i18next.t('navigation.home')}
          labelStyle={labelStyle}
          onPress={() => navigation.navigate('Home')}
        />
        {
          user.name ? (
            <DrawerItem
              label={i18next.t('navigation.logOut')}
              labelStyle={labelStyle}
              onPress={() => {
                dispatch(deleteUserData());
                navigation.dispatch(DrawerActions.closeDrawer());
              }}
            />
          ) : (
            <DrawerItem
              label={i18next.t('navigation.logIn')}
              labelStyle={labelStyle}
              onPress={() => navigation.navigate('Login')}
            />
          )
        }
        <DrawerItem
          label={i18next.t('navigation.settings')}
          labelStyle={labelStyle}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
      <MyAppText style={{ alignSelf: 'center', padding: 10, opacity: 0.3, fontSize: 12 }}>
        {appConf.expo.version}
      </MyAppText>
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = () => (
  <Drawer.Navigator
    initialRouteName="Start"
    screenOptions={{
      headerShown: false,
    }}
    // eslint-disable-next-line react/no-unstable-nested-components
    drawerContent={() => <CustomDrawerContent />}
  >
    <Drawer.Screen
      name="Start"
      component={MainNavigationStack}
    />
  </Drawer.Navigator>
);

const RootNavigation = () => (
  <NavigationContainer>
    <DrawerNavigation />
  </NavigationContainer>
);

export default RootNavigation;
