import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Link, Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { getProviders } from "../../utils/firebaseUtils";
import { ProviderType } from "./NewProvider";
import { ListItem } from "@rneui/themed";
import ProviderDetails from "../../../components/ProviderDeatils";

type ExpandedProvider = ProviderType & {
    isExpanded: boolean;
};

const Providers = () => {
    const [providers, setProviders] = useState<ExpandedProvider[]>([]);

    useEffect(() => {
        const getData = async () => {
            const value = await getProviders();
            if (value) {
                const expanded = value.map((val, idx) => {
                    return { ...val, isExpanded: false };
                });
                setProviders(expanded);
            } else {
                console.log("Failed to get Data");
            }
        };
        getData();
    }, []);
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: "My Providers",
                    headerTitleAlign: "center",
                    headerLeft: () => (
                        <Text
                            onPress={() => router.back()}
                            style={{ paddingLeft: 16 }}>
                            <Feather
                                name='chevron-left'
                                size={32}
                                color='black'
                            />
                        </Text>
                    ),
                    headerRight: () => (
                        <View style={styles.iconFlex}>
                            <Feather name='share' size={24} />
                            <Link href='/screens/NewProvider'>
                                <Feather name='plus' size={24} />
                            </Link>
                        </View>
                    ),
                }}
            />

            <View style={styles.accordionWrapper}>
                {providers.map((provider, index) => {
                    return (
                        <ListItem.Accordion
                            key={index}
                            content={
                                <>
                                    <ListItem.Content>
                                        <ListItem.Title
                                            style={{ fontWeight: "bold" }}>
                                            {provider.type}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                </>
                            }
                            style={{ borderRadius: 20 }}
                            containerStyle={{ borderRadius: 10 }}
                            isExpanded={provider.isExpanded}
                            onPress={() => {
                                setProviders((prevData) => {
                                    const newData = prevData.map(
                                        (data, idx) => {
                                            if (idx == index) {
                                                return {
                                                    ...data,
                                                    isExpanded:
                                                        !data.isExpanded,
                                                };
                                            } else {
                                                return data;
                                            }
                                        }
                                    );

                                    return newData;
                                });
                            }}>
                            <ProviderDetails provider={provider} />
                        </ListItem.Accordion>
                    );
                })}
            </View>
        </View>
    );
};

export default Providers;
const styles = StyleSheet.create({
    iconFlex: {
        flexDirection: "row",
        gap: 16,
        paddingRight: 16,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    accordionWrapper: {
        gap: 10,
    },
});
