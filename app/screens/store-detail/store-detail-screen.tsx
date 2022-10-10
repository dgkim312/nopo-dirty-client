import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, TouchableOpacity, ViewStyle, Text, Dimensions, ImageStyle } from "react-native"
import { NavigatorParamList } from "../../navigators"
import { Header, Screen, AutoImage as Image } from "../../components"
import { spacing } from "../../theme"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"
export const koreanFood = require("./koreanFood.jpg")

const { width, height } = Dimensions.get("window")

const HEART: ImageStyle = {
  // marginHorizontal: spacing[2],
  width,
  height: height * 0.3,
}

const ROOT: ViewStyle = {
  flex: 1,
}

const BOLD: TextStyle = { fontWeight: "bold" }

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
  color: "#2b2c28",
}

export const StoreDetailScreen: FC<BottomTabScreenProps<NavigatorParamList, "storeDetail">> =
  observer(function StoreDetailScreen({ route, navigation }) {
    const insets = useSafeAreaInsets()
    const statusBarHeight = insets.top * -1

    console.log("CONSOLE :::", route.params.store)

    return (
      <Screen style={ROOT} preset="fixed" statusBar="dark-content" backgroundColor="#fcedee">
        <Image source={koreanFood} style={{ ...HEART, marginTop: statusBarHeight }} />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Go Back</Text>
          <Text>{statusBarHeight}</Text>
        </TouchableOpacity>
      </Screen>
    )
  })
