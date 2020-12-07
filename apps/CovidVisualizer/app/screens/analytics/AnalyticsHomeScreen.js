import React from 'react';
import { View, StyleSheet } from 'react-native'
import colors from '../../config/colors'
import GradientButton from 'react-native-gradient-buttons';


const AnalyticsHomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <GradientButton
                style={{ marginVertical: 8 }}
                text="Go To World Statistics"
                textStyle={{ fontSize: 20 }}
                gradientBegin="#e50606"
                gradientEnd="#ef6c15"
                gradientDirection="diagonal"
                width='90%'
                radius={15}
                impact
                impactStyle='Medium'
                onPressAction={() => navigation.navigate('World Statistics')}
            />
            <GradientButton
                style={{ marginVertical: 8 }}
                text="Go To World Map"
                textStyle={{ fontSize: 20, color: "#fff" }}
                width='90%'
                radius={15}
                gradientBegin="#ea34d8"
                gradientEnd="#420542"
                gradientDirection="diagonal"
                impact
                impactStyle='Medium'
                onPressAction={() => navigation.navigate('World Map')}
            />
            <GradientButton
                style={{ marginVertical: 8 }}
                text="Go To Romania Statistics"
                textStyle={{ fontSize: 20 }}
                gradientBegin="#0cede6"
                gradientEnd="#40b918"
                gradientDirection="diagonal"
                width='90%'
                radius={15}
                impact
                impactStyle='Medium'
                onPressAction={() => alert("Not implemented")}
            />
            <GradientButton
                style={{ marginVertical: 8 }}
                text="Go To Romania Map"
                textStyle={{ fontSize: 20 }}
                gradientBegin="#24aeae"
                gradientEnd="#0920ce"
                gradientDirection="diagonal"
                width='90%'
                radius={15}
                impact
                impactStyle='Medium'
                onPressAction={() => alert("Not implemented")}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondaryBackground,
        alignItems: 'center',
        justifyContent: 'center',
    }
});


export default AnalyticsHomeScreen;
