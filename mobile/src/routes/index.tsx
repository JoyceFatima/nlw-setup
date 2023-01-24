import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.route";

export function Routes() {
  return (
    <View className='flex-1 bg-background'>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}
