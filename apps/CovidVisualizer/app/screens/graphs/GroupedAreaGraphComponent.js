import React from 'react';
import {
    VictoryArea,
    VictoryChart,
    VictoryAxis,VictoryScatter,
    VictoryGroup
} from 'victory-native';
import BoxContainer from "../containers/BoxContainer";
import GraphTitle from "../containers/titles/GraphTitle";
import colorStyle from "../../config/colors";
import tableStyles from "../../config/tables/tablestyles";
import {Dimensions, Text} from "react-native";
import textStyle from "../../config/textstyles";
import NumberFormatter from "../../services/NumberFormatterService";

class GroupedAreaGraphComponent extends React.Component{
    constructor(props) {
        super(props);
        this.deaths = [
            {x: "two days ago", y: this.props.data["twoDaysAgo"]["today_deaths"]},
            {x: "yesterday", y: this.props.data["yesterday"]["today_deaths"]},
            {x: "today", y: this.props.data["today"]["today_deaths"]}
        ];
        this.recovered = [
            {x: "two days ago", y: this.props.data["twoDaysAgo"]["today_recovered"]},
            {x: "yesterday", y: this.props.data["yesterday"]["today_recovered"]},
            {x: "today", y: this.props.data["today"]["today_recovered"]}
        ];
        this.active = [
            {x: "two days ago", y: this.props.data["twoDaysAgo"]["today_cases"]},
            {x: "yesterday", y: this.props.data["yesterday"]["today_cases"]},
            {x: "today", y: this.props.data["today"]["today_cases"]}
        ];
    }
    render(){
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
                        style={{
                            tickLabels: tableStyles.tableTicksYStyle,
                        }}
                    />
                    <VictoryGroup>
                        <VictoryArea
                            data={this.recovered}
                            style={{
                                data:
                                    {
                                        fill: colorStyle.graphColors.recoveredColor
                                    }
                            }}
                        />
                        <VictoryScatter
                            style={{ data: { fill: "black" } }}
                            size={4}
                            data={this.recovered}
                        />
                        <VictoryArea
                            data={this.active}
                            style={{
                                data:
                                    {
                                        fill: colorStyle.graphColors.activeColor
                                    }
                            }}
                        />
                        <VictoryScatter
                            style={{ data: { fill: "black" } }}
                            size={4}
                            data={this.active}
                        />
                        <VictoryArea
                            style={{
                                data:
                                    {
                                        fill: colorStyle.graphColors.deathsColor
                                    }
                            }}
                            data={this.deaths}
                        />
                        <VictoryScatter
                            style={{ data: { fill: "black" } }}
                            size={4}
                            data={this.deaths}
                        />
                    </VictoryGroup>
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
