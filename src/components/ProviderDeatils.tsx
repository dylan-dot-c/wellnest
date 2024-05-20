// import React, { Component } from 'react'
import { Text, StyleSheet, View } from "react-native";
import { ProviderType } from "../app/screens/(providers)/NewProvider";
import ComponentDivider from "./ComponentDivider";
import { Feather } from "@expo/vector-icons";
type Props = {
    provider: ProviderType;
};
const ProviderDetails = ({ provider }: Props) => {
    return (
        <View>
            <ComponentDivider>
                <View style={styles.row}>
                    <Feather name='tag' size={24} />
                    <Text>{provider.officeName}</Text>
                </View>
                <View style={styles.row}>
                    <Feather name='user' size={24} />
                    <Text>{provider.providersName}</Text>
                </View>
                <View style={styles.row}>
                    <Feather name='map-pin' size={24} />
                    <Text>{provider.address}</Text>
                </View>
                <View style={styles.row}>
                    <Feather name='phone' size={24} />
                    <Text>{provider.phoneNumber}</Text>
                </View>
                <View style={styles.row}>
                    <Feather name='mail' size={24} />
                    <Text>{provider.email}</Text>
                </View>
            </ComponentDivider>
        </View>
    );
};

export default ProviderDetails;
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: "center",
    },
});
