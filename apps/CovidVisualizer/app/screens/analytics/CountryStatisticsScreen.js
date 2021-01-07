import React from 'react';
import {ScrollView, StyleSheet} from "react-native";
import PieGraphComponent from "../graphs/PieGraphComponent";
import StackedAreaGraphComponent from "../graphs/StackedAreaGraphComponent";
import StackedLineGraphComponent from "../graphs/StackedLineGraphComponent";
import BarGraphComponent from "../graphs/BarGraphComponent";
import colors from "../../config/colors";

class CountryStatisticsScreen extends React.Component{
    constructor(props) {
        console.log("[CountryStatisticsScreen] - Constructor");
        super(props);
    }

    render() {
        console.log("[CountryStatisticsScreen] - Render method executed.");
        return (
            <ScrollView
                contentContainerStyle={styles.container}
            >
                <PieGraphComponent
                    data={this.props.route.params.data}
                />
                <StackedAreaGraphComponent
                    data={this.props.route.params.data}
                />
                <StackedLineGraphComponent
                    data={this.props.route.params.data}
                />
                <BarGraphComponent
                    data={this.props.route.params.data}
                />
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
    }
});

export default CountryStatisticsScreen;
