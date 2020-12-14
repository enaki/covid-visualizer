import React from "react";
import BoxContainer from "../../containers/BoxContainer";
import {
    VictoryChart,
    VictoryLabel,
    VictoryTheme,
    VictoryPie, VictoryContainer
} from "victory-native";
import {Dimensions, Text} from "react-native";
import tableStyles from "./../../../config/tables/tablestyles";

const styles = tableStyles;

export default class WorldGraphComponent extends React.Component {
    render() {
        return (
            <BoxContainer>
                <Text
                    style={tableTitle}
                >
                    Worldwide COVID-19
                </Text>
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

const tableTitle = {
    textAlign:"center",
    fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
    fontSize: 20,
    fontWeight: "bold",
    color:"green",
};
