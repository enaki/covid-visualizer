import React from 'react';
import {Text, View, ActivityIndicator, ScrollView} from 'react-native'
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import LoggerService from "../services/LoggerService";
import LoadDataService from "../services/LoadDataService";
import ConnectorService from "../services/ConnectorService";
import HorizontalScrollTable from "./tables/HorizontalScrollTable";
import NumberFormatterService from "../services/NumberFormatterService";
import textStyles from "../config/styles/textstyles";
import PieGraphComponent from "./graphs/PieGraphComponent";
import containerStyles from "../config/styles/containerstyles";
import { Title } from 'react-native-paper';

class HomeScreen extends React.Component {
    constructor(props) {
        LoggerService.formatLog("HomeScreen", "Constructor.");
        super(props);
        this.state = {
            data: null,
            currentLocationData:null,
            loading: true
        }
    }
    async componentDidMount() {
        LoggerService.formatLog(this.constructor.name, "componentDidMount method.");
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        let data = await LoadDataService.getData("WorldTop15Country", ConnectorService.getWorldTopCountryList);
        data = data.map( (item, idx) =>{
            return [idx + 1 ,item["name"], NumberFormatterService.formatNumber(item["active"]), NumberFormatterService.formatNumber(item["cases"]),
                NumberFormatterService.formatNumber(item["tests"])]
        });
        let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
        const res = await ConnectorService.getCountryLatestDataByLatAndLong(location.coords.latitude, location.coords.longitude);
        this.setState({data: data, currentLocationData: res[0], loading: false});
    }

    renderComponent(){
        return(
            <View
                style={containerStyles.container}
            >
                <Title
                    style={textStyles.title}
                >
                    Your location
                </Title>
                <ScrollView
                >
                    <PieGraphComponent
                        data={this.state.currentLocationData}
                    />
                    <HorizontalScrollTable
                        tableHead={["", "Country", "Active", "Total cases", "Tests"]}
                        tableData={this.state.data}
                    >
                        <Text style={textStyles.infoTextStyle}>World top 15 countries</Text>
                    </HorizontalScrollTable>
                </ScrollView>
            </View>
        );
    }

    render() {
        LoggerService.formatLog(this.constructor.name, "render method.");
        return (
            this.state.loading ? <ActivityIndicator
                size="large"
                color="#bc2b78"
                style={containerStyles.activityIndicator}
            /> : this.renderComponent()
        );
    }
}

export default HomeScreen;
