import React from "react";
import BoxContainer from "../containers/BoxContainer";
import NumberFormatter from "../../services/NumberFormatterService";
import {
    VictoryPie
} from "victory-native";
import tableStyles from "../../config/tables/tablestyles";
import GraphTitle from "../containers/titles/GraphTitle";
import {Image, StyleSheet, Text} from "react-native";

const styles = tableStyles;

export default class WorldGraphComponent extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.data != null )
        {
            this.deathsPercentage = Math.round(this.props.data["today"]["deaths"] / this.props.data["today"]["cases"] * 1000) / 10;
            this.recoveredPercentage = Math.round(this.props.data["today"]["recovered"] / this.props.data["today"]["cases"] * 1000) / 10;
            this.activePercentage = Math.round(this.props.data["today"]["active"] / this.props.data["today"]["cases"] * 1000) / 10;
        }
    }
    render() {
        return (
            <BoxContainer>
                <GraphTitle
                    text={this.props.data["name"] != null ? `${this.props.data["name"]} Covid-19 stats` : "Worldwide Covid-19 stats"}
                />
                {
                    this.props.data["flag"] != null ?
                    <Image
                        style={logoStyles.flag}
                        source={{uri: this.props.data["flag"]}}
                    />
                    : null
                }
                <VictoryPie
                    data={[
                        { x: "Deaths", y: this.deathsPercentage },
                        { x: "Recovered", y: this.recoveredPercentage },
                        { x: "Active", y: this.activePercentage }
                    ]}
                    style={{
                        labels:{
                            padding: -120,
                            fill: "white",
                            fontSize: 15,
                        }
                    }}
                    labels={({ datum }) => `${datum.x}: ${datum.y}%`}
                    labelPlacement={"parallel"}
                    colorScale={styles.chartStyle.WARM}
                    padding={{ top: 30, bottom: 50, left: -20, right: 0 }}
                />
                <Text
                    style={infoTextStyle}
                >
                    Total cases: {NumberFormatter.formatNumber(this.props.data["today"]["cases"]) + "\n"}
                    Active cases: {NumberFormatter.formatNumber(this.props.data["today"]["active"])+ "\n"}
                    Death cases: {NumberFormatter.formatNumber(this.props.data["today"]["deaths"]) + "\n"}
                    Recovered cases: {NumberFormatter.formatNumber(this.props.data["today"]["recovered"]) + "\n"}
                </Text>
            </BoxContainer>
        );
    }
}

const logoStyles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50
    },
    flag: {
        width: 100,
        height: 50,
        alignSelf: "center",
        marginTop:10
    }
});

const infoTextStyle = {
    textAlign:"center",
    fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
    fontSize: 20,
    fontWeight: "bold",
    color:"#5283ff",
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
}
