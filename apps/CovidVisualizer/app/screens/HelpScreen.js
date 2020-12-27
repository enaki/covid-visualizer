import React from 'react';
import {StyleSheet, ScrollView, NativeModules} from 'react-native'
import colors from '../config/colors'
import BoxContainer from "./containers/BoxContainer";
import ContainerTitle from "./containers/titles/ContainerTitle";
import ContainerText from "./containers/text/ContainerText";
const {StatusBarManager} = NativeModules;
const HelpScreen = () => {
    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <BoxContainer>
                <ContainerTitle
                    text={"Cum ai fost infectat?"}
                    containerStyle={containerTitleStyle}
                    titleStyle={titleStyle}
                />
                <ContainerText
                    text={"1. Principala cale de transmisie a virusului este calea respiratorie" +
                    "sau prin contactul cu persoane infectate."}
                />
                <ContainerText
                    text={"2. Cand stranuti sau tusesti, produci particule de fluid " +
                    "care provin din nas sau din gura."}
                />
                <ContainerText
                    text={"3. Aceste particule pot contine infectia care poate fi imprastiata apoi " +
                    "altor persoane prin contactul cu ochii, nasul sau gura. " +
                    "Aceasta este calea prin care raceala si multi alti virusi sunt raspanditi."}
                />
                <ContainerText
                    text={"4. De obicei, trebuie sa te aflii in proximitatea unei persoane de aproximativ 1.5 metrii pentru " +
                    "a da sansa virusului sa se raspandeasca."}
                />
                <ContainerText
                    text={"5. Exista posibilitatea de transmisie prin aerosoli, prin perioade indelungate de timp in " +
                    "medii inchise."}
                />
                <ContainerText
                    text={"6. Organizatia WHO(World Health Organization) sustine faptul ca riscul de raspandire a " +
                    "viruslui de la o persoana " +
                    "fara simptome este \"foarte mica\", iar sansele de transmisie prin fecale sunt \"mici\"."}
                />
            </BoxContainer>
            <BoxContainer>
                <ContainerTitle
                    text={"Cum pot sa ma protejez?"}
                    containerStyle={containerTitleStyle}
                    titleStyle={titleStyle}
                />
                <ContainerText
                    text={"1. Nu calatori in zone afectate."}
                />
                <ContainerText
                    text={"2. Cand stranuti sau tusesti, acopera-ti gura cu un servetel sau cu cotul." +
                    " Evita sa stranuti sau sa tusesti in palme."}
                />
                <ContainerText
                    text={"3. Spala-te pe maini frecvent, minim 20 de secunde, cu apa si sapun."}
                />
                <ContainerText
                    text={"4. Evita oamenii in mod evident bolnavi si locurile aglomerate."}
                />
            </BoxContainer>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primaryBackground,
        paddingTop: StatusBarManager.HEIGHT
    },
});

export default HelpScreen;

const titleStyle = {
    textAlign:"center",
    fontFamily: Platform.OS === 'android' ? "sans-serif": "Arial",
    fontSize: 20,
    fontWeight: "bold",
    color:"white",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
}

const containerTitleStyle = {
    backgroundColor: "grey",
    padding: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
};
