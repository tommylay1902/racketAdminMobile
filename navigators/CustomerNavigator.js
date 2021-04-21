import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import CustomersScreen from "../Screens/CustomersScreen";
import { CustomerDetailsScreen } from "../Screens/CustomerDetailsScreen";
import { StackActions } from "@react-navigation/routers";

export const Stack = createStackNavigator();

export const CustomerNavigator = (props) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="CustomersScreen" component={CustomersScreen} />
            <Stack.Screen
                name="CustomerDetailsScreen"
                component={CustomerDetailsScreen}
            />
        </Stack.Navigator>
    );
};
