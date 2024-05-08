import { useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Stack, Tabs } from "expo-router";
import ComponentDivider from "../../../../../components/ComponentDivider";
import TextInputIcon from "../../../../../components/TextInputIcon";
import { addProviders } from "../../../../utils/firebaseUtils";

export type ProviderType = {
    type: string;
    officeName: string;
    providersName: string;
    address: string;
    phoneNumber: string;
    email: string;
};

const providerTypes = [
    "Dentist",
    "Dermatologist",
    "Eye Doctor",
    "Gastroentrtologist",
    "OB_GYN",
    "Orthodontist",
    "Pediatrician",
    "Pharmacy",
    "Physical Thereapist",
    "Primary Care Physician",
    "Psychiaeist",
    "Radiologist",
    "Specialist",
    "Therapist",
    "Urologist",
    "Other",
];

const NewProvider = () => {
    const [dropdown, setDropdown] = useState(true);
    const [providerName, setProviderName] = useState("");
    const [providerOfficeName, setProviderOfficeName] = useState("");
    const [providerType, setProviderType] = useState("");
    const [providerEmail, setProviderEmail] = useState("");
    const [providerPhone, setProviderPhone] = useState("");
    const [providerAddress, setProviderAddress] = useState("");

    const providerInfo = {
        type: providerType,
        officeName: providerOfficeName,
        providersName: providerName,
        address: providerAddress,
        phoneNumber: providerPhone,
        email: providerEmail,
    };
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Add A Provider",
                    headerTitleAlign: "center",
                    headerLeft: () => (
                        <Text style={{ paddingLeft: 16, color: "#4B86ED" }}>
                            Cancel
                        </Text>
                    ),
                    headerRight: () => (
                        <Text
                            style={{ paddingRight: 16, color: "#4B86ED" }}
                            onPress={() => {
                                console.log(providerInfo);
                                addProviders(providerInfo);
                            }}>
                            Save
                        </Text>
                    ),
                }}
            />

            <ComponentDivider>
                <TextInputIcon
                    name='edit'
                    placeholder='Choose A Provider Type'
                    onFocus={() => setDropdown(!dropdown)}
                    value={providerType}
                />
                <View>
                    {dropdown && (
                        <View style={styles.providerWrapper}>
                            {providerTypes.map((item, index) => {
                                return (
                                    <Pressable
                                        style={styles.providerBubbles}
                                        onPress={() => {
                                            setProviderType(item);
                                            setDropdown(false);
                                        }}>
                                        <Text>{item}</Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    )}
                </View>
                <TextInputIcon
                    name='tag'
                    placeholder='Add Office Name'
                    value={providerOfficeName}
                    onChangeText={(text) => setProviderOfficeName(text)}
                />
                <TextInputIcon
                    name='user'
                    placeholder='Add Providers Name'
                    value={providerName}
                    onChangeText={(text) => setProviderName(text)}
                />
                <TextInputIcon
                    name='map-pin'
                    placeholder='Add  Address'
                    value={providerAddress}
                    onChangeText={(text) => setProviderAddress(text)}
                />
                <TextInputIcon
                    name='phone'
                    placeholder='Add Phone Number'
                    value={providerPhone}
                    inputMode='tel'
                    onChangeText={(text) => setProviderPhone(text)}
                />
                <TextInputIcon
                    name='mail'
                    placeholder='Add Email'
                    inputMode='email'
                    value={providerEmail}
                    onChangeText={(text) => setProviderEmail(text)}
                />
            </ComponentDivider>
        </View>
    );
};

export default NewProvider;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        paddingHorizontal: 16,
    },
    providerBubbles: {
        backgroundColor: "#EEF1F1",
        padding: 10,
        borderRadius: 100,
        color: "#6B6F6F",
    },
    providerWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        padding: 8,
    },
});
