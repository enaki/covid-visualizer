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
    },
    chartStyle:{
        //"grayscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue"
        "GRAYSCALE": "grayscale",
        "QUALITATIVE": "qualitative",
        "HEATMAP": "heatmap",
        "WARM": "warm",
        "COOL": "cool",
        "RED": "red",
        "GREEN": "green",
        "BLUE": "blue"
    }
};

export default styles;
