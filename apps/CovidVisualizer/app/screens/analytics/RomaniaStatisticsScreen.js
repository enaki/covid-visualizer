import React from 'react';
import {ScrollView, StyleSheet, ActivityIndicator, Text} from "react-native";
import colors from "../../config/colors";
import ConnectorService from "../../services/ConnectorService";
import BoxContainer from "../containers/BoxContainer";

class RomaniaStatisticsScreen extends React.Component{
    constructor(props) {
        console.log("\n[RomaniaStatisticsScreen] - Constructor");
        super(props);
        this.state = {
            romaniaCountiesLatest: null,
            loading: true
        }
    }
    async componentDidMount() {
        try{
            const data = await ConnectorService.getRomaniaCountyLatest();
            this.setState({romaniaCountiesLatest: data, loading: false});
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
                <BoxContainer>
                    {
                        this.state.romaniaCountiesLatest["counties"].map( (item, idx) => {
                            return(<Text
                                key={idx}
                            >
                                {item["cases"] + "\t" + item["name"]}
                            </Text>)
                        })
                    }
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
    }
});

export default RomaniaStatisticsScreen;
