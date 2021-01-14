import colors from "../colors";
import { StatusBar } from "react-native";

const styles = {
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    languageSwitch: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
        height: '5%'
    },
    container: {
        backgroundColor: colors.primaryBackground,
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        height: '97%'
    },
    containerScroll: {
        backgroundColor: colors.secondaryBackground,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTitleStyle: {
        backgroundColor: "grey",
        padding: 10,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    containerImageLine: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        margin: 10
    }
};

export default styles;
