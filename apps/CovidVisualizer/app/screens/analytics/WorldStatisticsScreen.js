import React from 'react';
import { StyleSheet, ScrollView } from 'react-native'

import colors from '../../config/colors'
import WorldGraphComponent from "../graphs/WorldGraphComponent";
import GraphPicker from "../graphs/GraphPicker";
import PieGraphComponent from "../graphs/PieGraphComponent";


class WorldStatisticsScreen extends React.Component {
    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
            >
                <PieGraphComponent/>
                <WorldGraphComponent/>
                <WorldGraphComponent/>
                <GraphPicker/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondaryBackground,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default WorldStatisticsScreen;
