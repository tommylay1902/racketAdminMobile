import { register, login, logout } from "../api/post";
import { createAction } from "../config/createAction";
import React, { useEffect, useMemo, useReducer } from "react";
import * as SecureStore from "expo-secure-store";

export const useAuth = () => {
    const [state, dispatch] = React.useReducer(
        (state, action) => {
            switch (action.type) {
                case "SET_USER":
                    return {
                        ...state,
                        user: { ...action.payload },
                    };
                case "REMOVE_USER":
                    return {
                        ...state,
                        user: undefined,
                    };
                default:
                    return state;
            }
        },
        {
            user: undefined,
        }
    );
    const auth = React.useMemo(
        () => ({
            login: async (email, password) => {
                const data = await login(email, password);
                await SecureStore.setItemAsync("user", JSON.stringify(data));
                dispatch(createAction("SET_USER", data));
            },
            logout: async () => {
                await SecureStore.deleteItemAsync("user");

                // await logout();
                dispatch(createAction("REMOVE_USER"));
            },
            register,
        }),
        []
    );

    //this will keep user logged in even if they kill the app
    //will check to see if user object is saved in the phones app on mount of the application
    React.useEffect(() => {
        async function getUserInfo() {
            const user = await SecureStore.getItemAsync("user");
            if (user) {
                dispatch(createAction("SET_USER", JSON.parse(user)));
            }
        }
        getUserInfo();
    }, []);

    return { auth, state };
};
