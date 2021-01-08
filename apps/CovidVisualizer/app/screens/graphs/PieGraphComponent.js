import React from "react";
import BoxContainer from "../containers/BoxContainer";
import {
    VictoryPie
} from "victory-native";
import imageStyle from "../../config/styles/imagestyle";
import textStyle from "../../config/styles/textstyles";
import colorStyle from "../../config/colors";
import GraphTitle from "../containers/titles/GraphTitle";
import {Image, Text} from "react-native";
import TextFormatterService from "../../services/TextFormatterService";
import LoggerService from "../../services/LoggerService";

export default class PieGraphComponent extends React.Component {
    constructor(props) {
        LoggerService.formatLog("PieGraphComponent", "Constructor.");
        super(props);
        if(this.props.data != null )
        {
            this.deathsPercentage = Math.round(this.props.data["today"]["deaths"] / this.props.data["today"]["cases"] * 1000) / 10;
            this.recoveredPercentage = Math.round(this.props.data["today"]["recovered"] / this.props.data["today"]["cases"] * 1000) / 10;
            this.activePercentage = Math.round(this.props.data["today"]["active"] / this.props.data["today"]["cases"] * 1000) / 10;
        }

        this.dataLast3DaysText = [
            {
                data: [
                    {
                        type: "Total",
                        value: this.props.data["today"]["cases"]
                    },
                    {
                        type: "Recovered",
                        value: this.props.data["today"]["recovered"]
                    },
                    {
                        type: "Active",
                        value: this.props.data["today"]["active"]
                    },
                    {
                        type: "Deaths",
                        value: this.props.data["today"]["deaths"]
                    }
                ],
                type: "Today"
            },
            {
                data: [
                    {
                        type: "Total",
                        value: this.props.data["yesterday"]["cases"]
                    },
                    {
                        type: "Recovered",
                        value: this.props.data["yesterday"]["recovered"]
                    },
                    {
                        type: "Active",
                        value: this.props.data["yesterday"]["active"]
                    },
                    {
                        type: "Deaths",
                        value: this.props.data["yesterday"]["deaths"]
                    }
                ],
                type: "Yesterday"
            },
            {
                data: [
                    {
                        type: "Total",
                        value: this.props.data["twoDaysAgo"]["cases"]
                    },
                    {
                        type: "Recovered",
                        value: this.props.data["twoDaysAgo"]["recovered"]
                    },
                    {
                        type: "Active",
                        value: this.props.data["twoDaysAgo"]["active"]
                    },
                    {
                        type: "Deaths",
                        value: this.props.data["twoDaysAgo"]["deaths"]
                    }
                ],
                type: "Two days ago"
            }
        ];
    }
    render() {
        LoggerService.formatLog(this.constructor.name, "Render method.");
        return (
            <BoxContainer>
                <GraphTitle
                    text={this.props.data["name"] != null ?
                        `${this.props.data["name"]} Covid-19 stats (${this.props.data["iso2"]}, ${this.props.data["iso3"]}) \n Updated: ${this.props.data["today"]["update"]}` :
                        `Worldwide Covid-19 stats \n Updated: ${this.props.data["today"]["update"]}`}
                />
                {
                    this.props.data["flag"] != null ?
                        <Image
                            style={imageStyle.flags.normal}
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
                    colorScale={[
                        colorStyle.graphColors.deathsColor,
                        colorStyle.graphColors.recoveredColor,
                        colorStyle.graphColors.activeColor
                    ]}
                    padding={{ top: 30, bottom: 50, left: -20, right: 0 }}
                />
                <Text
                    style={textStyle.infoTextStyle}
                >
                    {
                        TextFormatterService.formatLast3DaysText(this.dataLast3DaysText)
                    }
                </Text>
            </BoxContainer>
        );
    }
}
