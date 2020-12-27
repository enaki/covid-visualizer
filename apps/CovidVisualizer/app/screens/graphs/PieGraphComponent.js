import React from "react";
import BoxContainer from "../containers/BoxContainer";
import {
    VictoryPie
} from "victory-native";
import tableStyles from "../../config/tables/tablestyles";
import GraphTitle from "../containers/titles/GraphTitle";

const styles = tableStyles;

export default class WorldGraphComponent extends React.Component {
    render() {
        return (
            <BoxContainer>
                <GraphTitle text={"Worldwide Covid-19 stats"}/>
                <VictoryPie
                    data={[
                        { x: "Deaths", y: 10 },
                        { x: "Recovered", y: 40 },
                        { x: "Active", y: 50 }
                    ]}
                    style={{
                        labels:{
                            padding: -120,
                            fill: "white",
                            fontSize: 15
                        }
                    }}
                    labels={({ datum }) => `${datum.x}: ${datum.y}%`}
                    labelPlacement={"parallel"}
                    colorScale={styles.chartStyle.WARM}
                    padAngle={10}
                    padding={{ top: 30, bottom: 50, left: -20, right: 0 }}
                />
            </BoxContainer>
        );
    }
}
