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

class GroupedAreaGraphComponent extends React.Component{
    constructor(props) {
        console.log("[GroupedAreaGraphComponent] - Constructor");
        super(props);
        this.dataLast3Days= [
            {
                data: [
                    {x: "two days ago", y: this.props.data["twoDaysAgo"]["today_recovered"]},
                    {x: "yesterday", y: this.props.data["yesterday"]["today_recovered"]},
                    {x: "today", y: this.props.data["today"]["today_recovered"]}
                ],
                style: colorStyle.graphColors.recoveredColor
            },
            {
                data: [
                    {x: "two days ago", y: this.props.data["twoDaysAgo"]["today_cases"]},
                    {x: "yesterday", y: this.props.data["yesterday"]["today_cases"]},
                    {x: "today", y: this.props.data["today"]["today_cases"]}
                ],
                style: colorStyle.graphColors.activeColor
            },
            {
                data: [
                    {x: "two days ago", y: this.props.data["twoDaysAgo"]["today_deaths"]},
                    {x: "yesterday", y: this.props.data["yesterday"]["today_deaths"]},
                    {x: "today", y: this.props.data["today"]["today_deaths"]}
                ],
                style: colorStyle.graphColors.deathsColor
            }
        ];
    }
    render(){
        console.log("[GroupedAreaGraphComponent] - Render method");
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
                    />
                    <VictoryAxis
                        dependentAxis={true}
                        tickFormat={(x) => {return NumberFormatter.numberAbbreviation(x);}}
                        style={{
                            tickLabels: tableStyles.tableTicksYStyle,
                        }}
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
                    Today{"\n"}
                    New active cases: {NumberFormatter.formatNumber(this.props.data["today"]["today_cases"])+ "\n"}
                    New death cases: {NumberFormatter.formatNumber(this.props.data["today"]["today_deaths"]) + "\n"}
                    New recovered cases: {NumberFormatter.formatNumber(this.props.data["today"]["today_recovered"]) + "\n"}
                    {"\n\n"}Yesterday{"\n"}
                    New active cases: {NumberFormatter.formatNumber(this.props.data["yesterday"]["today_cases"])+ "\n"}
                    New death cases: {NumberFormatter.formatNumber(this.props.data["yesterday"]["today_deaths"]) + "\n"}
                    New recovered cases: {NumberFormatter.formatNumber(this.props.data["yesterday"]["today_recovered"]) + "\n"}
                    {"\n\n"}Two days ago{"\n"}
                    New active cases: {NumberFormatter.formatNumber(this.props.data["twoDaysAgo"]["today_cases"])+ "\n"}
                    New death cases: {NumberFormatter.formatNumber(this.props.data["twoDaysAgo"]["today_deaths"]) + "\n"}
                    New recovered cases: {NumberFormatter.formatNumber(this.props.data["twoDaysAgo"]["today_recovered"]) + "\n"}
                </Text>
            </BoxContainer>
        );
    }
}



export default GroupedAreaGraphComponent;
