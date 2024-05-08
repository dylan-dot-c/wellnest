import React, { Component, useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Link, Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { getProviders } from "../../../../utils/firebaseUtils";
import { ProviderType } from "./new";
import { ListItem } from "@rneui/themed";
import ProviderDetails from "../../../../../components/ProviderDeatils";

type ExpandedProvider = ProviderType & {
    isExpanded: boolean;
};

const Providers = () => {
    const [providers, setProviders] = useState<ExpandedProvider[]>([]);
    const [expanded, setExpanded] = useState(false);

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
                            <Link href='./providers/new'>
                                <Feather name='plus' size={24} />
                            </Link>
                        </View>
                    ),
                }}
            />
            <View>
                {providers.map((provider, index) => {
                    return <Text>{provider.officeName}</Text>;
                })}
            </View>

            <View>
                {providers.map((provider, index) => {
                    return (
                        <ListItem.Accordion
                            content={
                                <>
                                    <ListItem.Content>
                                        <ListItem.Title>
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
});
