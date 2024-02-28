import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { getAppointments } from "../app/utils/firebaseUtils";
import { AppointmentType } from "../lib/appointments";

const UpcomingAppointments = () => {
    const [appointments, setAppointments] = useState<AppointmentType[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const result = await getAppointments();
            setAppointments(Object.values(result));
            setLoading(false);
            console.log(Object.values(result));
        };

        getData();
    }, []);

    if (loading) {
        return <ActivityIndicator size='large' />;
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Upcoming Appointments</Text>
                <Ionicons
                    name='ellipsis-vertical'
                    size={24}
                    color='black'
                    style={{ position: "absolute", right: 0 }}
                />
            </View>
            <View style={styles.dateStripContainer}>
                {appointments &&
                    appointments.slice(0, 3).map((app, idx) => {
                        return (
                            <DateStrip
                                key={idx}
                                active={idx == 0}
                                date={app.formattedDate}
                                title={app.title}
                            />
                        );
                    })}
                <View
                    style={{
                        height: 60,
                        top: 10,
                        zIndex: -1,
                        width: 1,
                        backgroundColor: "#F5F7F7",
                        position: "absolute",
                        left: 26,
                    }}
                />
            </View>
        </View>
    );
};

interface DateStripProps {
    active: boolean;
    date: string;
    title: string;
}

const DateStrip = ({ active, date, title }: DateStripProps) => {
    const bgColor = active ? "#f4f4f4" : "";
    const ballSize = 16;
    const ballColor = active ? "#0FA6B0" : "#eeeeee";
    return (
        <View style={[styles.strip, { backgroundColor: bgColor }]}>
            <View style={styles.date}>
                <FontAwesome
                    name='circle'
                    size={ballSize}
                    color={ballColor}
                    style={{ zIndex: 50 }}
                />
                <Text style={styles.stripText}>{title}</Text>
            </View>
            <Text style={styles.stripText}>{date}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "white",
        marginTop: 16,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Inter500",
    },
    strip: {
        borderRadius: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    stripText: {
        fontFamily: "Inter400",
        fontSize: 14,
        color: "#1A1D1D",
    },
    date: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    dateStripContainer: {
        marginTop: 16,
    },
});

export default UpcomingAppointments;
