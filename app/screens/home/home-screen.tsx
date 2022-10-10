import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "../../navigators"
import { Screen, AutoImage as Image, SearchBox } from "../../components"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import Icon5 from "react-native-vector-icons/FontAwesome5"
import {
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
  ImageStyle,
  Dimensions,
} from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import I18n from "i18n-js"
import { translate } from "../../i18n"
import { useStores } from "../../models"
export const porkBelly = require("./pork-belly-2.jpg")
export const pizza = require("./pizza.jpg")
export const fastFood = require("./fast-food.jpg")
export const japaneseFood = require("./japaneseFood.jpg")
export const chineseFood = require("./chineseFood.jpg")
export const koreaFood = require("./koreanFood.jpg")
export const recommendedFirst = require("./JungAStore.jpeg")
export const recommendedSecond = require("./gaya.jpeg")
export const recommendedThird = require("./tt.jpeg")
export const promition = require("./starbucks.jpg")

const ROOT: ViewStyle = {
  flex: 1,
}

const CONTEXT: ViewStyle = {
  maxHeight: Dimensions.get("window").height - 125,
}

const PORKBELLY: ImageStyle = {
  flex: 1,
  width: null,
  height: null,
  // resizeMode: "contain",
  resizeMode: "cover",
  // flex: 1,
  // aspectRatio: 1.5, // Your aspect ratio
}

const STARICON: TextStyle = {
  color: "white",
}

const HOMEIMAGE: ViewStyle = {
  // width,
  // height: "20%",
  height: 150,
  borderRadius: 15,
  marginHorizontal: 15,
  overflow: "hidden",
  marginTop: 15,
}

const IMAGETEXT: TextStyle = {
  color: "#EEEEEE",
  fontSize: 20,
  fontWeight: "700",
  fontFamily: "NotoSansKR-Bold",
}

const STAREDTEXTBOX: ViewStyle = {
  position: "absolute",
  marginTop: 20,
  marginLeft: 10,
}

const STAREDTEXT: TextStyle = {
  width: 30,
  borderRadius: 5,
  textAlign: "center",
  fontFamily: "NotoSansKR-Regular",
  color: "white",
}

const STAREDCONTAINER: ViewStyle = {
  borderRadius: 5,
  backgroundColor: "#9e1a20",
  height: 20,
  width: 50,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
}

const CATEGORY: ViewStyle = {
  marginTop: 15,
  marginHorizontal: 15,
}

const CATEGORYTEXT: TextStyle = {
  fontSize: 21,
  fontWeight: "600",
  fontFamily: "NotoSansKR-Bold",
}

const CATEGORYFOODCARD: ViewStyle = {
  backgroundColor: "#F5F5F5",
  width: 90,
  height: 120,
  borderRadius: 15,
  marginTop: 15,
  marginRight: 15,
  flexDirection: "column",
}

const CATEGORYIMAGE: ImageStyle = {
  // position: "absolute",
  width: 70,
  height: 80,
  borderRadius: 10,
  marginTop: 10,
  marginLeft: 10,
}

const CATEGORYFOODTEXT: TextStyle = {
  marginTop: 4,
  fontSize: 14,
  fontWeight: "400",
  alignSelf: "center",
  fontFamily: "NotoSansKR-Thin",
}

const CATEGORYGROUP: ViewStyle = {
  flexDirection: "row",
  marginTop: -10,
}

const RECOMMENDTEXT: TextStyle = {
  fontSize: 21,
  fontWeight: "600",
  fontFamily: "NotoSansKR-Bold",
}

const RECOMMENDSUBTEXT: TextStyle = {
  fontSize: 13,
  fontWeight: "400",
  fontFamily: "NotoSansKR-Regular",
}

const RECOMMENDGROUP: ViewStyle = {
  flexDirection: "row",
  marginTop: -10,
}

const RECOMMENDSTORECARD: ViewStyle = {
  backgroundColor: "#F5F5F5",
  width: 150,
  height: 145,
  borderRadius: 15,
  marginTop: 15,
  marginBottom: 5,
  marginRight: 15,
  flexDirection: "column",
}

const RECOMMENDSTORECARDIMAGE: ImageStyle = {
  // position: "absolute",
  width: 130,
  height: 100,
  borderRadius: 10,
  marginTop: 10,
  marginLeft: 10,
  marginBottom: 5,
}

const RCOMMENDSTORETEXTGROUP: ViewStyle = {
  flexDirection: "row",
}

const RECOMMENDDISTANCE: TextStyle = {
  position: "absolute",
  fontSize: 10,
  marginTop: 20,
  marginLeft: 20,
  color: "#CD212A",
  backgroundColor: "white",
  fontFamily: "NotoSansKR-Regular",
  fontWeight: "700",
}

const PROMITIONIMAGE: ViewStyle = {
  // width,
  // height: "20%",
  height: 150,
  borderRadius: 15,
  marginHorizontal: 15,
  overflow: "hidden",
  marginTop: 15,
}

const PROMITIONCONTENT: ImageStyle = {
  flex: 1,
  width: null,
  height: null,
  // resizeMode: "contain",
  resizeMode: "cover",
  // flex: 1,
  // aspectRatio: 1.5, // Your aspect ratio
}

const CategoryFood = (props) => {
  return (
    <View style={CATEGORYFOODCARD}>
      <Image source={props.source} style={CATEGORYIMAGE} />
      <Text style={CATEGORYFOODTEXT}>{props.title}</Text>
    </View>
  )
}

const RecommendedStore = (props) => {
  return (
    <View style={RECOMMENDSTORECARD}>
      <View>
        <Image source={props.source} style={RECOMMENDSTORECARDIMAGE} />
        <Text style={RECOMMENDDISTANCE}>1.5Km</Text>
      </View>
      <Text style={CATEGORYFOODTEXT}>{props.title}</Text>
    </View>
  )
}

// const BOLD: TextStyle = { fontWeight: "bold" }

export const HomeScreen: FC<BottomTabScreenProps<NavigatorParamList, "home">> = observer(
  function HomeScreen({ navigation }) {
    const { userStore, landingStore } = useStores()
    // const { characters } = characterStore
    const { isLoading, user } = userStore

    useEffect(() => {
      async function fetchData() {
        // Promise.all([userStore.getUser(), landingStore.getLanding()])
        await userStore.getUser("1")
      }
      fetchData()
      console.log("User :::", user, isLoading)
    }, [userStore, landingStore])

    return (
      // <View>
      <Screen style={ROOT} preset="fixed" statusBar="dark-content" backgroundColor="white">
        <ScrollView style={CONTEXT}>
          {/* <SearchBox navigation={navigation} /> */}
          <SearchBox navigator={navigation} />

          {!landingStore.isLoading && (
            <TouchableOpacity
              onPress={() => navigation.navigate("storeDetail", { store: "id001" })}
            >
              <View style={HOMEIMAGE}>
                <Image
                  source={{ uri: "https://cdn.nopo.shop/pork-belly-2.jpg" }}
                  style={PORKBELLY}
                />
                <View style={STAREDTEXTBOX}>
                  <Text style={IMAGETEXT}>농장사람들</Text>
                  <View style={STAREDCONTAINER}>
                    <Icon5 name="star" size={10} style={STARICON} />
                    <Text style={STAREDTEXT}>4.5</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}

          <View style={CATEGORY}>
            {/* <Text>{userStore.isLoading.toString()}</Text>
            <Text>{userStore.user.name}</Text>
            <Text>{landingStore.isLoading.toString()}</Text>
            <Text>{landingStore.landing.image}</Text> */}
            <Text style={CATEGORYTEXT}> 음식 종류별 식당 </Text>
            <ScrollView
              style={CATEGORYGROUP}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("storeDetail", { store: "id001" })}
              >
                <CategoryFood title="한식" source={koreaFood} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("storeDetail", { store: "id001" })}
              >
                <CategoryFood title="중식" source={chineseFood} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("storeDetail", { store: "id001" })}
              >
                <CategoryFood title="이탈리안" source={pizza} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("storeDetail", { store: "id001" })}
              >
                <CategoryFood title="패스트푸드" source={fastFood} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("storeDetail", { store: "id001" })}
              >
                <CategoryFood title="일식" source={japaneseFood} />
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View style={CATEGORY}>
            <Text style={RECOMMENDTEXT}>근처의 추천식당</Text>
            <Text style={RECOMMENDSUBTEXT}>강력하게 추천하는 오래된 맛집</Text>
            <ScrollView
              style={RECOMMENDGROUP}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {/* <View style={RECOMMENDSTORECARD}>
              <Image source={recommendedFirst} style={RECOMMENDSTORECARDIMAGE} />
              <Text style={CATEGORYFOODTEXT}>정정아식당</Text>
            </View> */}
              <RecommendedStore title="정정아식당" source={recommendedFirst} />
              <RecommendedStore title="가야보쌈" source={recommendedSecond} />
              <RecommendedStore title="뜸들이다" source={recommendedThird} />
            </ScrollView>
          </View>

          <View style={CATEGORY}>
            <Text style={RECOMMENDTEXT}>프로모션&이벤트</Text>

            <View style={PROMITIONIMAGE}>
              <Image source={promition} style={PROMITIONCONTENT} />
            </View>
          </View>
        </ScrollView>
      </Screen>
      // </View>
    )
  },
)
