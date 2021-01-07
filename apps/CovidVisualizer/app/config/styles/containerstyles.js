import colors from "../colors";
import {StatusBar} from "react-native";

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
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        paddingBottom: 10
    },
    container: {
        backgroundColor: colors.primaryBackground,
        marginTop: StatusBar.currentHeight,
        height: '93%'
    },
    containerScroll: {
        backgroundColor: colors.secondaryBackground,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
};

export default styles;
