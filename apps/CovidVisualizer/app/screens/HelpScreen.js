import React from 'react';
import {
    Text,
    ScrollView,
    NativeModules,
    StyleSheet,
    Linking,
    Image,
    View
} from 'react-native'
import colors from '../config/colors'
import textStyles from '../config/styles/textstyles';
import staticText from '../config/staticText/helpStaticText';
import imageStyles from '../config/styles/imagestyle';
import BoxContainer from "./containers/BoxContainer";
import ContainerTitle from "./containers/titles/ContainerTitle";
import ContainerText from "./containers/text/ContainerText";
const {StatusBarManager} = NativeModules;
class HelpScreen extends React.Component{
    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
            >
                <BoxContainer>
                    <ContainerTitle
                        text={"Cum ai fost infectat?"}
                        containerStyle={containerTitleStyle}
                        titleStyle={textStyles.containerTitleStyle}
                    />
                    <ContainerText >
                        <Text style={textStyles.containerTextStyle}>
                            {
                                staticText.infectedText.map( (text, index) => {
                                    return(
                                        index === staticText.infectedText.length - 1 ?
                                            <Text key={index+1}>
                                                {index+1}. {text}
                                            </Text>
                                            :
                                            <Text key={index+1}>
                                                {index+1}. {text}{"\n\n"}
                                            </Text>
                                    )
                                })
                            }
                        </Text>
                    </ContainerText>
                </BoxContainer>
                <BoxContainer>
                    <ContainerTitle
                        text={"Cum pot sa ma protejez?"}
                        containerStyle={containerTitleStyle}
                        titleStyle={textStyles.containerTitleStyle}
                    />
                    <ContainerText>
                        <Text style={textStyles.containerTextStyle}>
                            {
                                staticText.protectionText.map( (text, index) => {
                                    return(
                                        index === staticText.protectionText.length - 1 ?
                                            <Text key={index+1}>
                                                {index+1}. {text}
                                            </Text>
                                            :
                                            <Text key={index+1}>
                                                {index+1}. {text}{"\n\n"}
                                            </Text>
                                    )
                                })
                            }
                        </Text>
                    </ContainerText>
                </BoxContainer>
                <BoxContainer>
                    <ContainerTitle
                        text={"Sfaturi pentru dezinfectare"}
                        containerStyle={containerTitleStyle}
                        titleStyle={textStyles.containerTitleStyle}
                    />
                    <ContainerText>
                        <Text style={textStyles.containerTextStyle}>
                            {
                                staticText.tipsText.map( (text, index) => {
                                    return(
                                        index === staticText.tipsText.length - 1 ?
                                            <Text
                                                key={index+1}
                                            >
                                                {index+1}. {text}
                                            </Text>
                                            :
                                            <Text
                                                key={index+1}
                                            >
                                                {index+1}. {text}{"\n\n"}
                                            </Text>
                                    )
                                })
                            }
                        </Text>
                    </ContainerText>
                </BoxContainer>
                <BoxContainer>
                    <ContainerTitle
                        text={"Procesul de vaccinare în România"}
                        containerStyle={containerTitleStyle}
                        titleStyle={textStyles.containerTitleStyle}
                    />
                    <ContainerText>
                        <Text style={textStyles.containerTextStyle}>
                            <Text>
                                <Text style={{fontWeight: "bold"}}>Etapa I:</Text>{"\n"}
                                <Text style={{fontWeight: "bold"}}>Cât durează?</Text> Timpul de execuție va fi stabilit în
                                funcție de schema de vaccinare aleasă, care poate cuprinde una sau două doze;{"\n"}
                                <Text style={{fontWeight: "bold"}}>Cine?</Text> Persoanele incluse în categoria lucrătorilor
                                din domeniile sănătății și social – sistem public și privat;{"\n"}
                                <Text style={{fontWeight: "bold"}}>Cum?</Text> Vaccinarea se va realiza prin intermediul unităților
                                sanitare sau a centrelor de vaccinare ori a echipelor mobile de vaccinare – în funcție de situație.
                            </Text>
                            {"\n\n\n"}
                            <Text>
                                <Text style={{fontWeight: "bold"}}>Etapa a II-a:{"\n"}</Text>
                                <Text style={{fontWeight: "bold"}}>Cât durează?</Text> Timpul de execuție va fi stabilit în
                                funcție de schema de vaccinare aleasă, care poate cuprinde una sau două doze;{"\n"}
                                <Text style={{fontWeight: "bold"}}>Cine?</Text> Include populația cu grad de risc și lucrători
                                care desfășoară activități în domenii-cheie, esențiale;{"\n"}
                                <Text style={{fontWeight: "bold"}}>Cum?</Text> Se derulează prin rețeaua de centre de
                                vaccinare/echipe mobile de vaccinare/medicină de familie, după caz.
                            </Text>
                            {"\n\n\n"}
                            <Text>
                                <Text style={{fontWeight: "bold"}}>Etapa a III-a:{"\n"}</Text>
                                <Text style={{fontWeight: "bold"}}>Cât durează?</Text> Timpul de execuție va fi stabilit în
                                funcție de schema de vaccinare aleasă, care poate cuprinde una sau două doze;{"\n"}
                                <Text style={{fontWeight: "bold"}}>Cine?</Text> Include populația generală;{"\n"}
                                <Text style={{fontWeight: "bold"}}>Cum?</Text> Se derulează prin rețeaua de centre de vaccinare/echipe
                                mobile de vaccinare/medicină de familie/centre de vaccinare drive-through, după caz.
                            </Text>
                        </Text>
                    </ContainerText>
                </BoxContainer>
                <Text
                    style={textStyles.generalTextStyle}
                >
                    Aceste informatii sunt prezentate de pe site-ul de stiri oficiale.{"\n"}
                    <Text
                        style={textStyles.hyperlinkStyle}
                        onPress={ () => {Linking.openURL('https://stirioficiale.ro/informatii');}}
                    >www.stirioficiale.ro/informatii
                    </Text>
                </Text>
                <View
                    style={containerImageLine}
                >
                    <Image
                        style={imageStyles.photos.tiny}
                        source={require('../config/images/dsu-logo.png')}
                    />
                    <Image
                        style={imageStyles.photos.tiny}
                        source={require('../config/images/guv-logo.png')}
                    />
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primaryBackground,
        paddingTop: StatusBarManager.HEIGHT
    },
});

const containerImageLine = {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    margin: 10
};

const containerTitleStyle = {
    backgroundColor: "grey",
    padding: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
};

export default HelpScreen;
