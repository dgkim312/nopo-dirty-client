import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../text/text"
import Icon5 from "react-native-vector-icons/FontAwesome5"
import { NavigatorParamList } from "../../navigators"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const SEARCHFORM: ViewStyle = {
  marginHorizontal: 10,
  padding: 10,
  borderRadius: 10,
  shadowOffset: { width: 1.5, height: 1.5 },
  shadowOpacity: 0.3,
  shadowRadius: 1,
  elevation: 1,
  marginTop: 10,
}

const SEARCHBOX: ViewStyle = {
  height: 46,
  borderRadius: 10,
  paddingHorizontal: 10,
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  backgroundColor: "#F5F5F5",
}

const SERARCHTEXT: TextStyle = {
  fontSize: 17,
  fontWeight: "400",
  color: "#9B9B9B",
  flex: 1,
  fontFamily: "NotoSansKR-Regular",
}

const SEARCHDIVIDE: ViewStyle = {
  paddingVertical: 8,
}

const SEARCHLINEFORM: ViewStyle = {
  width: 1,
  height: "100%",
  margin: 10,
  backgroundColor: "#c7c7cc",
}

const ICON: TextStyle = {
  color: "#9e1a20",
}

export interface SearchBoxProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  navigator?: BottomTabNavigationProp<NavigatorParamList>
}

/**
 * Describe your component here
 */
export const SearchBox = observer(function SearchBox(props: SearchBoxProps) {
  const { style, navigator } = props
  const styles = Object.assign({}, CONTAINER, style)

  return (
    <View style={SEARCHFORM}>
      <TouchableOpacity onPress={() => navigator.navigate("store")}>
        <View style={SEARCHBOX}>
          <Text style={SERARCHTEXT}>가장 가까운 식당은?</Text>
          <View style={SEARCHDIVIDE}>
            <View style={SEARCHLINEFORM} />
          </View>
          <Icon5 name="location-arrow" size={18} style={ICON} />
        </View>
      </TouchableOpacity>
    </View>
  )
})
