import React from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import PieGraphComponent from "../graphs/PieGraphComponent";
import WorldGraphComponent from "../graphs/WorldGraphComponent";
import colors from "../../config/colors";
import ConnectorService from "../../services/ConnectorService";

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
            this.setState({romaniaLatestData: data, loading: false});
        }
        catch (err){
            console.log("[RomaniaStatisticsScreen] - Error fetching data:" + err);
        }
        this.romaniaLatestData = await ConnectorService.getRomaniaLatestData();
    }

    render() {
        console.log("[RomaniaStatisticsScreen] - Render method executed.");
        console.log(this.romaniaLatestData);
        return (

            this.state.loading ? <View/> : this.renderComponent()

        );
    }

    renderComponent(){
        return(
            <ScrollView
                contentContainerStyle={styles.container}
            >
                <PieGraphComponent/>
                <WorldGraphComponent/>
                <WorldGraphComponent/>
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

export default RomaniaStatisticsScreen;
