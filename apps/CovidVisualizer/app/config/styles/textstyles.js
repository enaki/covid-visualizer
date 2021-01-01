const styles={
    infoTextStyle : {
        textAlign:"center",
        fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
        fontSize: 20,
        fontWeight: "bold",
        color:"#5283ff",
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
    },
    containerTextStyle : {
        textAlign:"left",
        fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
        fontSize: 20,
        margin: 20,
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
};

export default styles;
