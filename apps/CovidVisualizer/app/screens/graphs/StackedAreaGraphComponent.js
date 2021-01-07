import React from 'react';
import {
    VictoryArea,
    VictoryChart,
    VictoryAxis,VictoryScatter,
    VictoryGroup,
    VictoryStack
} from 'victory-native';
import BoxContainer from "../containers/BoxContainer";
import GraphTitle from "../containers/titles/GraphTitle";
import colorStyle from "../../config/colors";
import tableStyles from "../../config/tables/tablestyles";
import {Dimensions, Text} from "react-native";
import textStyle from "../../config/styles/textstyles";
import NumberFormatter from "../../services/NumberFormatterService";
import TextFormatterService from "../../services/TextFormatterService";
import LoggerService from "../../services/LoggerService";

class StackedAreaGraphComponent extends React.Component{
    constructor(props) {
        LoggerService.formatLog("StackedAreaGraphComponent", "Constructor.");
        super(props);
        this.dataLast3Days= [
            {
                data: [
                    {x: "Two days ago", y: this.props.data["twoDaysAgo"]["today_recovered"]},
                    {x: "Yesterday", y: this.props.data["yesterday"]["today_recovered"]},
                    {x: "Today", y: this.props.data["today"]["today_recovered"]}
                ],
                style: colorStyle.graphColors.recoveredColor
            },
            {
                data: [
                    {x: "Two days ago", y: this.props.data["twoDaysAgo"]["today_cases"]},
                    {x: "Yesterday", y: this.props.data["yesterday"]["today_cases"]},
                    {x: "Today", y: this.props.data["today"]["today_cases"]}
                ],
                style: colorStyle.graphColors.activeColor
            },
            {
                data: [
                    {x: "Two days ago", y: this.props.data["twoDaysAgo"]["today_deaths"]},
                    {x: "Yesterday", y: this.props.data["yesterday"]["today_deaths"]},
                    {x: "Today", y: this.props.data["today"]["today_deaths"]}
                ],
                style: colorStyle.graphColors.deathsColor
            }
        ];
        this.dataLast3DaysText = [
            {
                data: [
                    {
                        type: "Recovered",
                        value: this.props.data["today"]["today_recovered"]
                    },
                    {
                        type: "Active",
                        value: this.props.data["today"]["today_cases"]
                    },
                    {
                        type: "Deaths",
                        value: this.props.data["today"]["today_deaths"]
                    }
                ],
                type: "Today"
            },
            {
                data: [
                    {
                        type: "Recovered",
                        value: this.props.data["yesterday"]["today_recovered"]
                    },
                    {
                        type: "Active",
                        value: this.props.data["yesterday"]["today_cases"]
                    },
                    {
                        type: "Deaths",
                        value: this.props.data["yesterday"]["today_deaths"]
                    }
                ],
                type: "Yesterday"
            },
            {
                data: [
                    {
                        type: "Recovered",
                        value: this.props.data["twoDaysAgo"]["today_recovered"]
                    },
                    {
                        type: "Active",
                        value: this.props.data["twoDaysAgo"]["today_cases"]
                    },
                    {
                        type: "Deaths",
                        value: this.props.data["twoDaysAgo"]["today_deaths"]
                    }
                ],
                type: "Two days ago"
            }
        ];
    }
    render(){
        LoggerService.formatLog(this.constructor.name, "Render method.");
        return(
            <BoxContainer>
                <GraphTitle text={"Last 3 days evolution"}/>
                <VictoryChart
                    domainPadding={1}
                    padding = {tableStyles.chartPadding}
                    height={Dimensions.get('window').height/2}
                    width={Dimensions.get('window').width}
                >
                    <VictoryAxis
                        fixLabelOverlap={true}
                        standalone={false}
                        style={{
                            tickLabels: tableStyles.tableTicksXStyle
                        }}
                    />
                    <VictoryAxis
                        dependentAxis={true}
                        tickFormat={(x) => {return NumberFormatter.numberAbbreviation(x);}}
                    />
                    <VictoryStack>
                        {
                            this.dataLast3Days.map( (item, idx) => {
                                return(
                                    <VictoryGroup key={idx}>
                                        <VictoryArea
                                            data={item.data}
                                            key={idx}
                                            style={{
                                                data:
                                                    {
                                                        fill: item.style
                                                    }
                                            }}
                                        />
                                        <VictoryScatter
                                            style={{ data: { fill: "black" } }}
                                            size={4}
                                            data={item.data}
                                            key={idx}
                                        />
                                    </VictoryGroup>
                                )
                            })
                        }
                    </VictoryStack>
                </VictoryChart>
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



export default StackedAreaGraphComponent;
