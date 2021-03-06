const styles={
    infoTextStyle : {
        textAlign:"center",
        fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
        fontSize: 20,
        fontWeight: "bold",
        color:"#e2ab44",
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
        margin: 10
    },
    textStyleTypes : {
        "Deaths": {
            textAlign:"center",
            fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
            fontSize: 20,
            fontWeight: "bold",
            color:"#ba2f2f",
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: {width: 1, height: 1},
            textShadowRadius: 1,
        },
        "Active": {
            textAlign:"center",
            fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
            fontSize: 20,
            fontWeight: "bold",
            color:"#2f54ba",
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: {width: 1, height: 1},
            textShadowRadius: 1,
        },
        "Recovered": {
            textAlign:"center",
            fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
            fontSize: 20,
            fontWeight: "bold",
            color:"#2fba54",
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: {width: 1, height: 1},
            textShadowRadius: 1,
        },
        "Total": {
            textAlign:"center",
            fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
            fontSize: 20,
            fontWeight: "bold",
            color:"#6313e3",
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: {width: 1, height: 1},
            textShadowRadius: 1,
        },
    },
    containerTextStyle : {
        textAlign:"left",
        fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
        fontSize: 20,
        margin: 30,
    },
    containerTitleStyle : {
        textAlign:"center",
        fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
        fontSize: 20,
        fontWeight: "bold",
        color:"white",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    generalTextStyle: {
        textAlign:"center",
        fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
        fontSize: 20,
        margin: 20,
    },
    hyperlinkStyle: {
        color: 'blue',
    },
    languageText: {
        fontWeight: 'bold'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
    }
};

export default styles;
