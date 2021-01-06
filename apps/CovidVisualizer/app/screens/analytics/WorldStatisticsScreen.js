import React from 'react';
import {StyleSheet, ScrollView, Text, ActivityIndicator} from 'react-native'

import colors from '../../config/colors'
import StackedLineGraphComponent from "../graphs/StackedLineGraphComponent";
import PieGraphComponent from "../graphs/PieGraphComponent";
import ConnectorService from "../../services/ConnectorService";
import StackedAreaGraphComponent from "../graphs/StackedAreaGraphComponent";
import BarGraphComponent from "../graphs/BarGraphComponent";


class WorldStatisticsScreen extends React.Component {
    constructor(props) {
        console.log("\n[WorldStatisticsScreen] - Constructor");
        super(props);
        this.state = {
            worldLatestData: null,
            loading: true
        }
    }
    async componentDidMount() {
        try{
            const data = await ConnectorService.getWorldLatestData();
            this.setState({worldLatestData: data, loading: false});
            console.log("\n[WorldStatisticsScreen] - componentDidMount executed.");
        }
        catch (err){
            console.log("[WorldStatisticsScreen] - Error fetching data:" + err);
        }
    }
    render() {
        console.log("[WorldStatisticsScreen] - Render method executed.");
        return (
            this.state.loading ? <ActivityIndicator
                size="large"
                color="#bc2b78"
                style={styles.activityIndicator}
            /> : this.renderComponent()
        );
    }
    renderComponent(){
        console.log("[WorldStatisticsScreen] - renderComponent method executed. Render the primary component after data was fetched.");
        return(
            <ScrollView
                contentContainerStyle={styles.container}
            >
                <PieGraphComponent
                    data={this.state.worldLatestData}
                />
                <StackedAreaGraphComponent
                    data={this.state.worldLatestData}
                />
                <StackedLineGraphComponent
                    data={this.state.worldLatestData}
                />
                <BarGraphComponent
                    data={this.state.worldLatestData}
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
    },
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default WorldStatisticsScreen;
