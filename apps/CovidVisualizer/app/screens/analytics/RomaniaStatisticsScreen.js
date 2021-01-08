import React from 'react';
import {ScrollView, StyleSheet, ActivityIndicator, Text} from "react-native";
import colors from "../../config/colors";
import ConnectorService from "../../services/ConnectorService";
import LoadDataService from "../../services/LoadDataService";
import PieGraphComponent from "../graphs/PieGraphComponent";
import LoggerService from "../../services/LoggerService";
import HorizontalScrollTable from "../tables/HorizontalScrollTable";
import textStyles from "../../config/styles/textstyles";
import containerStyles from "../../config/styles/containerstyles";

class RomaniaStatisticsScreen extends React.Component{
    constructor(props) {
        LoggerService.formatLog("RomaniaStatisticsScreen", `Constructor.`);
        super(props);
        this.state = {
            romaniaCountiesLatest: null,
            romaniaLatestData: null,
            loading: true
        }
        this.tableHead = ["City", "Population", "Cases", "Today's cases", "Deaths", "Recovered"];
        this.tableData = [];
    }
    async componentDidMount() {
        try{
            const data = await LoadDataService.getData("RoCountyLatest", ConnectorService.getRomaniaCountyLatest);
            const dataLatest = await LoadDataService.getData("RoLatestData", ConnectorService.getRomaniaLatestData);
            this.setState({romaniaCountiesLatest: data, romaniaLatestData: dataLatest, loading: false});
            LoggerService.formatLog(this.constructor.name, `componentDidMount executed.`);
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
        this.tableData.push.apply(this.tableData, this.state.romaniaCountiesLatest["counties"].map( (item) => {
            return [item["name"], item["population"],item["cases"], item["today_cases"], item["deaths"], item["recovered"] ]
        }));
        return(
            <ScrollView
                contentContainerStyle={styles.container}
            >
                <PieGraphComponent
                    data={this.state.romaniaLatestData[0]}
                />
                <HorizontalScrollTable
                    tableHead={this.tableHead}
                    tableData={this.tableData}
                >
                    <Text style={textStyles.infoTextStyle}>Romania current information</Text>
                </HorizontalScrollTable>
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
    },
});

export default RomaniaStatisticsScreen;
