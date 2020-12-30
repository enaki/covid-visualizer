import React from "react";
import {Dimensions} from "react-native";
import {
    VictoryAxis,
    VictoryChart,
    VictoryLine,
    VictoryGroup,
    VictoryTheme
} from "victory-native";
import BoxContainer from "../containers/BoxContainer";
import tableStyles from "../../config/tables/tablestyles";
import GraphTitle from "../containers/titles/GraphTitle";

const styles = tableStyles;

export default class GroupedLineGraphComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.data);
        this.deaths = [
            {x: "two days ago", y: this.props.data["twoDaysAgo"]["deaths"]},
            {x: "yesterday", y: this.props.data["yesterday"]["deaths"]},
            {x: "today", y: this.props.data["today"]["deaths"]}
        ];
        this.recovered = [
            {x: "two days ago", y: this.props.data["twoDaysAgo"]["recovered"]},
            {x: "yesterday", y: this.props.data["yesterday"]["recovered"]},
            {x: "today", y: this.props.data["today"]["recovered"]}
        ];
        this.active = [
            {x: "two days ago", y: this.props.data["twoDaysAgo"]["active"]},
            {x: "yesterday", y: this.props.data["yesterday"]["active"]},
            {x: "today", y: this.props.data["today"]["active"]}
        ];
    }
    render() {
        return (
            <BoxContainer>
                <GraphTitle text={"Last 3 days overall statistics"}/>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={1}
                    standalone={true}
                    style={styles.tableStyle}
                    padding={styles.chartPadding}
                    height={Dimensions.get('window').height/2}
                    width={Dimensions.get('window').width}
                >
                    <VictoryAxis
                        fixLabelOverlap={true}
                        standalone={false}
                    />
                    <VictoryAxis
                        dependentAxis={true}
                        tickFormat={(x) => {return `${x / 1000}k`;}}
                        style={{
                            tickLabels: styles.tableTicksYStyle,
                        }}
                    />
                    <VictoryGroup>
                        <VictoryLine
                            data={this.active}
                            style={{
                                data: { stroke: "#c43a31" }
                            }}
                        />
                        <VictoryLine
                            data={this.deaths}
                            style={{
                                data: { stroke: "#c43a31" }
                            }}
                        />
                        <VictoryLine
                            data={this.recovered}
                            style={{
                                data: { stroke: "#c43a31" }
                            }}
                        />
                    </VictoryGroup>
                </VictoryChart>
            </BoxContainer>
        );
    }
}


