import React from 'react';
import {StyleSheet, ScrollView, ActivityIndicator} from 'react-native'

import colors from '../../config/colors'
import StackedLineGraphComponent from "../graphs/StackedLineGraphComponent";
import PieGraphComponent from "../graphs/PieGraphComponent";
import ConnectorService from "../../services/ConnectorService";
import StackedAreaGraphComponent from "../graphs/StackedAreaGraphComponent";
import BarGraphComponent from "../graphs/BarGraphComponent";
import LoadDataService from "../../services/LoadDataService";
import LoggerService from "../../services/LoggerService";
import containerStyles from "../../config/styles/containerstyles";


class WorldStatisticsScreen extends React.Component {
    constructor(props) {
        LoggerService.formatLog("WorldStatisticsScreen", "Constructor.");
        super(props);
        this.state = {
            worldLatestData: null,
            loading: true
        }
    }
    async componentDidMount() {
        try{
            const data = await LoadDataService.getData("WorldStatistics", ConnectorService.getWorldLatestData);
            this.setState({worldLatestData: data, loading: false});
            LoggerService.formatLog(this.constructor.name, "componentDidMount executed.");
        }
        catch (err){
            LoggerService.formatLog(this.constructor.name, `Error fetching data: \n ${err}`);
        }
    }
    render() {
        LoggerService.formatLog(this.constructor.name, `Render method executed.`);
        return (
            this.state.loading ? <ActivityIndicator
                size="large"
                color="#bc2b78"
                style={containerStyles.activityIndicator}
            /> : this.renderComponent()
        );
    }
    renderComponent(){
        LoggerService.formatLog(this.constructor.name,
            `renderComponent method executed. Render the primary component after data was fetched.`);
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
    }
});


export default WorldStatisticsScreen;
