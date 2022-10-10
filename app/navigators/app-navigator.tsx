/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { useEffect, useRef } from "react"
import { TouchableOpacity, useColorScheme, ViewStyle } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import {
  HomeScreen,
  MapScreen,
  NotificationScreen,
  ProfileScreen,
  StoreDetailScreen,
  StoreScreen,
} from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon5 from "react-native-vector-icons/Ionicons"
import * as Animatable from "react-native-animatable"
import { color } from "../theme"
import { createStackNavigator } from "@react-navigation/stack"

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  welcome: undefined
  demo: undefined
  demoList: undefined
  profile: undefined
  home: undefined
  store: undefined
  location: undefined
  notification: undefined
  storeDetail: { store: string }
  // 🔥 Your screens go here
}

const Stack = createStackNavigator()

const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="landing" component={HomeScreen} />
      <Stack.Screen name="storeDetail" component={StoreDetailScreen} />
    </Stack.Navigator>
  )
}

const TabAttribute = [
  {
    route: "home",
    label: "Home",
    active: "home",
    inactive: "home-outline",
    component: HomeScreenNavigator,
  },
  {
    route: "store",
    label: "Store",
    active: "cafe",
    inactive: "cafe-outline",
    component: StoreScreen,
  },
  {
    route: "location",
    label: "Location",
    active: "ios-location-sharp",
    inactive: "ios-location-outline",
    component: MapScreen,
  },
  {
    route: "notification",
    label: "Notification",
    active: "mail-sharp",
    inactive: "mail-outline",
    component: NotificationScreen,
  },
  {
    route: "profile",
    label: "profile",
    active: "person",
    inactive: "person-outline",
    component: ProfileScreen,
  },
]

// Documentation: https://reactnavigation.org/docs/stack-navigator/
// const Stack = createNativeStackNavigator<NavigatorParamList>()

const Tab = createBottomTabNavigator<NavigatorParamList>()

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props
  const focused = accessibilityState.selected
  const viewRef = useRef(null)

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0.5, rotate: "0deg" },
        1: { scale: 1.5, rotate: "360deg" },
      })
    } else {
      viewRef.current.animate({
        0: { scale: 1.5, rotate: "360deg" },
        1: { scale: 1, rotate: "0deg" },
      })
    }
  }, [focused])

  return (
    <TouchableOpacity onPress={onPress} style={CONTAINER} activeOpacity={1}>
      <Animatable.View ref={viewRef} duration={1000} style={CONTAINER}>
        <Icon5
          name={focused ? item.active : item.inactive}
          size={25}
          color={focused ? color.ferrari : color.disable}
          regular
        />
      </Animatable.View>
    </TouchableOpacity>
  )
}

// export { FirstScreenNavigator } // Stack-Navigator for Screen 1 Tab

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: "absolute",
          bottom: 15,
          right: 16,
          left: 16,
          borderRadius: 16,
          paddingTop: 8,
          paddingBottom: 8,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fcedee",
        },
      }}
      initialRouteName="home"
    >
      {TabAttribute.map((item, index) => {
        return (
          <Tab.Screen
            key={item.route}
            // name={NativeStackScreenProps<NavigatorParamList, 'Profile'>}
            name={item.route as keyof NavigatorParamList}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
