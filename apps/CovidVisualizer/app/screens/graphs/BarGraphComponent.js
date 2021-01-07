import React from 'react';
import GraphTitle from "../containers/titles/GraphTitle";
import NumberFormatter from "../../services/NumberFormatterService";
import {
    Text
} from "react-native";
import {
    VictoryChart,
    VictoryBar,
    VictoryTheme,
    VictoryAxis
} from "victory-native";
import BoxContainer from "../containers/BoxContainer";
import textStyle from "../../config/styles/textstyles";
import tableStyles from "../../config/tables/tablestyles";
import LoggerService from "../../services/LoggerService";

class BarGraphComponent extends React.Component{
    constructor(props) {
        LoggerService.formatLog("BarGraphComponent", "Constructor.");
        super(props);
        this.testsData = [
            {
                "Two days ago": this.props.data["twoDaysAgo"]["tests"]
            },
            {
                "Yesterday": this.props.data["yesterday"]["tests"]
            },
            {
                "Today": this.props.data["today"]["tests"],
            }
        ];
        this.testsValues = this.testsData.map( (item) => {
            return Object.values(item)[0];
        });
    }
    render(){
        LoggerService.formatLog(this.constructor.name, "Render method.");
        return(
            <BoxContainer>
                <GraphTitle
                    text={"Last 3 days number of tests"}
                />
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={30}
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
                        tickFormat={(x) => {
                            return NumberFormatter.numberAbbreviation(x);
                        }}
                        style={{
                            tickLabels: tableStyles.tableTicksYStyle
                        }}
                    />
                    <VictoryBar
                        style={{
                            data: { fill: "#c43a31" }
                        }}
                        domain={{y: [Math.min.apply(null, this.testsValues) - 1000,
                                Math.max.apply(null, this.testsValues) + 1000]}}
                        barWidth={40}
                        data={this.testsData.map( (item) =>{
                            return { x:Object.keys(item)[0], y: Object.values(item)[0]}
                        })}
                    />
                </VictoryChart>
                <Text
                    style={textStyle.infoTextStyle}
                >
                    {
                        this.testsData.map( (item, index) => {
                            return(
                                <Text
                                    key={index}
                                >
                                    {Object.keys(item)[0]}: {NumberFormatter.formatNumber(Object.values(item)[0])} tests
                                    { index === this.testsData.length - 1 ? null : "\n"}
                                </Text>
                            )
                        })
                    }
                </Text>
            </BoxContainer>
        );
    }
}

export default BarGraphComponent;
