import React from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import members, { MemberType } from "../lib/members";
import { AppointmentType } from "../lib/appointments";
import { Feather } from "@expo/vector-icons";

import { useRouter } from "expo-router";
type Props = {
    data: AppointmentType;
};

const AppointmentCard = ({ data }: Props) => {
    const image = members[data.memberId].image;
    const router = useRouter();
    return (
        <Pressable
            onPress={() => {
                console.log(data._id);
                router.navigate("/screens/appointment/" + data._id);
            }}
            style={styles.container}>
            <View>
                <Image
                    source={image}
                    style={{ width: 30 }}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.details}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Feather name='chevron-right' size={24} color='#979B9B' />
                </View>

                <View>
                    <Text style={styles.detailsText}>
                        {data.date} • {data.time}
                    </Text>
                    <Text style={styles.detailsText}>{data.location}</Text>
                    <Text style={styles.detailsText}>{data.phone}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default AppointmentCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 10,
        flexDirection: "row",
        gap: 16,
    },
    titleWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 5,
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontFamily: "Inter600",
        color: "#1A1D1D",
    },
    details: {
        flex: 1,
    },
    detailsText: {
        fontSize: 16,
        color: "#1A1D1D",
        fontFamily: "Inter400",
    },
});
