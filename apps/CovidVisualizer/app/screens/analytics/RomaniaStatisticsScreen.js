import React from 'react';
import {ScrollView, StyleSheet, ActivityIndicator, Text } from "react-native";
import colors from "../../config/colors";
import textStyles from "../../config/styles/textstyles";
import ConnectorService from "../../services/ConnectorService";
import BoxContainer from "../containers/BoxContainer";
import { Table, Row, Rows } from 'react-native-table-component';
import LoadDataService from "../../services/LoadDataService";
import PieGraphComponent from "../graphs/PieGraphComponent";

class RomaniaStatisticsScreen extends React.Component{
    constructor(props) {
        console.log("[RomaniaStatisticsScreen] - Constructor");
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
            console.log("[RomaniaStatisticsScreen] - componentDidMount executed.");
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
                <BoxContainer>
                    <Text style={textStyles.infoTextStyle}>Romania counties information</Text>
                    <ScrollView
                        style={styles.dataWrapper}
                        horizontal={true}
                    >
                        <Table borderStyle={{borderWidth: 1}}>
                            <Row data={this.tableHead} style={styles.head} textStyle={styles.text}/>
                            <Rows data={this.tableData} style={styles.row} textStyle={styles.text}/>
                        </Table>
                    </ScrollView>
                </BoxContainer>
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
    head: {  height: 40,  backgroundColor: '#f1f8ff', width: 650  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28,backgroundColor: '#F7F6E7', width: 650  },
    text: {  margin: 5, fontWeight: '300', textAlign: 'center', fontSize: 15 },
    dataWrapper: {
        marginTop: 10,
        marginBottom:10,
        marginLeft:5,
        marginRight:5
    }
});

export default RomaniaStatisticsScreen;
