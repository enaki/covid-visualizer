import React from 'react';
import {ScrollView, StyleSheet, ActivityIndicator, Text} from "react-native";
import PieGraphComponent from "../graphs/PieGraphComponent";
import GroupedLineGraphComponent from "../graphs/GroupedLineGraphComponent";
import colors from "../../config/colors";
import ConnectorService from "../../services/ConnectorService";
import GroupedAreaGraphComponent from "../graphs/GroupedAreaGraphComponent";

class RomaniaStatisticsScreen extends React.Component{
    constructor(props) {
        console.log("\n[RomaniaStatisticsScreen] - Constructor");
        super(props);
        this.state = {
            romaniaLatestData: null,
            loading: true
        }
    }
    async componentDidMount() {
        try{
            const data = await ConnectorService.getRomaniaLatestData();
            this.setState({romaniaLatestData: data[0], loading: false});
            console.log("\n[RomaniaStatisticsScreen] - componentDidMount executed.");
        }
        catch (err){
            console.log("[RomaniaStatisticsScreen] - Error fetching data:" + err);
        }
    }

    render() {
        console.log("[RomaniaStatisticsScreen] - Render method executed.");
        return (
            this.state.loading ? <ActivityIndicator
                size="large"
                color="#bc2b78"
                style={styles.activityIndicator}
            /> : this.renderComponent()
        );
    }

    renderComponent(){
        console.log("[RomaniaStatisticsScreen] - renderComponent method executed. Render the primary component after data was fetched.");
        return(
            <ScrollView
                contentContainerStyle={styles.container}
            >
                {
                    console.log(this.state.romaniaLatestData)
                }
                <PieGraphComponent
                    data={this.state.romaniaLatestData}
                />
                <GroupedAreaGraphComponent
                    data={this.state.romaniaLatestData}
                />
                <GroupedLineGraphComponent
                    data={this.state.romaniaLatestData}
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

export default RomaniaStatisticsScreen;
