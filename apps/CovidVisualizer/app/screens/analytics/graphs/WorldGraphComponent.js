import React from "react";
import {Dimensions} from "react-native";
import {
    VictoryAxis,
    VictoryChart,
    VictoryLabel,
    VictoryLine,
    VictoryStack,
    VictoryTheme,
    VictoryZoomContainer
} from "victory-native";
import BoxContainer from "../../containers/BoxContainer";
import {VictoryScatter} from "victory-scatter";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
function initMonths(array) {
    let today = new Date();
    const startYear = 2020;
    for(let yearToken = startYear; yearToken <= today.getFullYear(); ++yearToken)
    {
        for(let monthToken = 0; monthToken < today.getMonth(); ++monthToken)
        {
            array.push(new Date(yearToken, monthToken, 1,3));
        }
    }
}

const dateCovid = [
    { month: new Date(2020,0, 1, 3), cases: 13000 },
    { month: new Date(2020,1, 1, 3), cases: 16500 },
    { month: new Date(2020,2, 1, 3), cases: 17250 },
    { month: new Date(2020,3, 1, 3), cases: 19000 },
    { month: new Date(2020,4, 1, 3), cases: 20000 },
    { month: new Date(2020,5, 1, 3), cases: 21000 },
    { month: new Date(2020,6, 1, 3), cases: 25000 },
    { month: new Date(2020,7,1, 3), cases: 26000 },
    { month: new Date(2020,8, 1, 3), cases: 30000 },
    { month: new Date(2020,9, 1, 3), cases: 33000 },
    { month: new Date(2020,10, 1, 3), cases: 35000 },
    { month: new Date(2020,11, 1, 3), cases: 39000 },
];

const mortiCovid = [
    { month: new Date(2020,0, 1, 3), cases: 2000 },
    { month: new Date(2020,1, 1, 3), cases: 6000 },
    { month: new Date(2020,2, 1, 3), cases: 4200 },
    { month: new Date(2020,3, 1, 3), cases: 9000 },
    { month: new Date(2020,4, 1, 3), cases: 1000 },
    { month: new Date(2020,5, 1, 3), cases: 1000 },
    { month: new Date(2020,6, 1, 3), cases: 2000 },
    { month: new Date(2020,7,1, 3), cases: 1500 },
    { month: new Date(2020,8, 1, 3), cases: 9000 },
    { month: new Date(2020,9, 1, 3), cases: 5000 },
    { month: new Date(2020,10, 1, 3), cases: 2000 },
    { month: new Date(2020,11, 1, 3), cases: 1000 },
];

export default class WorldGraphComponent extends React.Component {
    render() {
        let dates = [];
        initMonths(dates);
        return (
            <BoxContainer>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={1}
                    standalone={true}
                    scale={{x: "time", y: "linear"}}
                    containerComponent={
                        <VictoryZoomContainer
                            allowPan={true}
                            allowZoom={true}
                        />
                    }
                    style={styles.tableStyle}
                    padding={styles.chartPadding}
                    height={Dimensions.get('window').height/2}
                    width={Dimensions.get('window').width}
                >
                    <VictoryLabel
                        x={200}
                        y={18}
                        text={"COVID19 cases"}
                        textAnchor="middle"
                        style={styles.tableTitle}
                    />
                    <VictoryAxis
                        label="Months"
                        tickValues={dates}
                        fixLabelOverlap={true}
                        standalone={false}
                        tickFormat={(x) => {return monthNames[x.getMonth()];}}
                        style={{
                            axisLabel: styles.tableLabelStyle,
                            tickLabels: styles.tableTicksXStyle,
                        }}
                    />
                    <VictoryAxis
                        dependentAxis={true}
                        label="Number of cases"
                        tickFormat={(x) => {return `${x / 1000}k`;}}
                        style={{
                            axisLabel: styles.tableLabelStyle,
                            tickLabels: styles.tableTicksYStyle,
                        }}
                    />
                    <VictoryStack>
                        <VictoryLine
                            data={dateCovid}
                            x="month"
                            y="cases"
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                            }}
                            style={{
                                data: { stroke: "#c43a31" }
                            }}
                        />


                    </VictoryStack>
                </VictoryChart>
            </BoxContainer>
        );
    }
}

const styles={
    tableLabelStyle:{
        fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
        letterSpacing: 10,
        fontSize: 15,
        padding: -20,
        fontStyle: "italic",
        fill:"green"
    },
    tableTitle:{
        fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
        fontSize: 20,
        fontWeight: "bold",
        fill:"green",
    },
    tableTicksXStyle:{
        fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
        letterSpacing: 1,
        fontSize: 14,
        angle: -45,
        padding: Platform.OS === 'android' ? 10 : 20
    },
    tableTicksYStyle:{
        fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
        letterSpacing: 1,
        fontSize: 14,
    },
    chartPadding:{
        left:50,
        right: 40,
        bottom: 60,
        top: 40,
    },
    tableStyle:{
        background:{
            fill:"white"
        }
    }
};
