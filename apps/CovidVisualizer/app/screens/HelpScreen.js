import React from 'react';
import {
    Text,
    ScrollView,
    Linking,
    Image,
    View,
    Switch
} from 'react-native';
import { Title } from 'react-native-paper';
import textStyles from '../config/styles/textstyles';
import staticText from '../config/staticText/helpStaticText';
import imageStyles from '../config/styles/imagestyle';
import BoxContainer from "./containers/BoxContainer";
import ContainerTitle from "./containers/titles/ContainerTitle";
import ContainerText from "./containers/text/ContainerText";
import LoggerService from "../services/LoggerService";
import containerStyles from "../config/styles/containerstyles";
class HelpScreen extends React.Component {
    constructor(props) {
        LoggerService.formatLog("HelpScreen", "Constructor.");
        super(props);
        this.state = {
            isEnglishEnabled: true
        };
    }

    toggleSwitch = () => {
        this.setState({ isEnglishEnabled: !this.state.isEnglishEnabled, loadingData: true })
    }

    render() {
        LoggerService.formatLog(this.constructor.name, "Render method.");
        return (
            <View
                style={containerStyles.container}
            >
                <Title style={textStyles.title}>COVID Help Page</Title>
                <View style={containerStyles.languageSwitch}>
                    <Text style={textStyles.languageText}>Romanian</Text>
                    <Switch
                        trackColor={{ false: "#c3cfe4", true: "#c3cfe4" }}
                        thumbColor={this.state.isEnglishEnabled ? "orange" : "#f5dd4b"}
                        value={this.state.isEnglishEnabled}
                        onValueChange={this.toggleSwitch}
                    />
                    <Text style={textStyles.languageText}>English</Text>
                </View>
                <ScrollView>
                    {
                        this.state.isEnglishEnabled ? this.renderEn() : this.renderRo()
                    }
                    <View
                        style={containerStyles.containerImageLine}
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
            </View>
        );
    }

    renderRo() {
        LoggerService.formatLog(this.constructor.name, "RenderRo method.");
        return (
            <View>
                <BoxContainer>
                    <ContainerTitle
                        text={"Cum ai fost infectat?"}
                        containerStyle={containerStyles.containerTitleStyle}
                        titleStyle={textStyles.containerTitleStyle}
                    />
                    <ContainerText >
                        <Text style={textStyles.containerTextStyle}>
                            {
                                staticText["ro"].infectedText.map((text, index) => {
                                    return (
                                        index === staticText["ro"].infectedText.length - 1 ?
                                            <Text key={index + 1}>
                                                {index + 1}. {text}
                                            </Text>
                                            :
                                            <Text key={index + 1}>
                                                {index + 1}. {text}{"\n\n"}
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
                        containerStyle={containerStyles.containerTitleStyle}
                        titleStyle={textStyles.containerTitleStyle}
                    />
                    <ContainerText>
                        <Text style={textStyles.containerTextStyle}>
                            {
                                staticText["ro"].protectionText.map((text, index) => {
                                    return (
                                        index === staticText["ro"].protectionText.length - 1 ?
                                            <Text key={index + 1}>
                                                {index + 1}. {text}
                                            </Text>
                                            :
                                            <Text key={index + 1}>
                                                {index + 1}. {text}{"\n\n"}
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
                        containerStyle={containerStyles.containerTitleStyle}
                        titleStyle={textStyles.containerTitleStyle}
                    />
                    <ContainerText>
                        <Text style={textStyles.containerTextStyle}>
                            {
                                staticText["ro"].tipsText.map((text, index) => {
                                    return (
                                        index === staticText["ro"].tipsText.length - 1 ?
                                            <Text
                                                key={index + 1}
                                            >
                                                {index + 1}. {text}
                                            </Text>
                                            :
                                            <Text
                                                key={index + 1}
                                            >
                                                {index + 1}. {text}{"\n\n"}
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
                        containerStyle={containerStyles.containerTitleStyle}
                        titleStyle={textStyles.containerTitleStyle}
                    />
                    <ContainerText>
                        <Text style={textStyles.containerTextStyle}>
                            <Text>
                                <Text style={{ fontWeight: "bold" }}>Etapa I:</Text>{"\n"}
                                <Text style={{ fontWeight: "bold" }}>Cât durează?</Text> Timpul de execuție va fi stabilit în
                                funcție de schema de vaccinare aleasă, care poate cuprinde una sau două doze;{"\n"}
                                <Text style={{ fontWeight: "bold" }}>Cine?</Text> Persoanele incluse în categoria lucrătorilor
                                din domeniile sănătății și social – sistem public și privat;{"\n"}
                                <Text style={{ fontWeight: "bold" }}>Cum?</Text> Vaccinarea se va realiza prin intermediul unităților
                                sanitare sau a centrelor de vaccinare ori a echipelor mobile de vaccinare – în funcție de situație.
                            </Text>
                            {"\n\n\n"}
                            <Text>
                                <Text style={{ fontWeight: "bold" }}>Etapa a II-a:{"\n"}</Text>
                                <Text style={{ fontWeight: "bold" }}>Cât durează?</Text> Timpul de execuție va fi stabilit în
                                funcție de schema de vaccinare aleasă, care poate cuprinde una sau două doze;{"\n"}
                                <Text style={{ fontWeight: "bold" }}>Cine?</Text> Include populația cu grad de risc și lucrători
                                care desfășoară activități în domenii-cheie, esențiale;{"\n"}
                                <Text style={{ fontWeight: "bold" }}>Cum?</Text> Se derulează prin rețeaua de centre de
                                vaccinare/echipe mobile de vaccinare/medicină de familie, după caz.
                            </Text>
                            {"\n\n\n"}
                            <Text>
                                <Text style={{ fontWeight: "bold" }}>Etapa a III-a:{"\n"}</Text>
                                <Text style={{ fontWeight: "bold" }}>Cât durează?</Text> Timpul de execuție va fi stabilit în
                                funcție de schema de vaccinare aleasă, care poate cuprinde una sau două doze;{"\n"}
                                <Text style={{ fontWeight: "bold" }}>Cine?</Text> Include populația generală;{"\n"}
                                <Text style={{ fontWeight: "bold" }}>Cum?</Text> Se derulează prin rețeaua de centre de vaccinare/echipe
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
                        onPress={() => { Linking.openURL('https://stirioficiale.ro/informatii'); }}
                    >www.stirioficiale.ro/informatii
                    </Text>
                </Text>
            </View>
        )
    }

    renderEn() {
        LoggerService.formatLog(this.constructor.name, "RenderEn method.");
        return (
            <View>
                <BoxContainer>
                    <ContainerTitle
                        text={"How you got infected?"}
                        containerStyle={containerStyles.containerTitleStyle}
                        titleStyle={textStyles.containerTitleStyle}
                    />
                    <ContainerText >
                        <Text style={textStyles.containerTextStyle}>
                            {
                                staticText["en"].infectedText.map((text, index) => {
                                    return (
                                        index === staticText["en"].infectedText.length - 1 ?
                                            <Text key={index + 1}>
                                                {index + 1}. {text}
                                            </Text>
                                            :
                                            <Text key={index + 1}>
                                                {index + 1}. {text}{"\n\n"}
                                            </Text>
                                    )
                                })
                            }
                        </Text>
                    </ContainerText>
                </BoxContainer>
                <BoxContainer>
                    <ContainerTitle
                        text={"How can I protect myself?"}
                        containerStyle={containerStyles.containerTitleStyle}
                        titleStyle={textStyles.containerTitleStyle}
                    />
                    <ContainerText>
                        <Text style={textStyles.containerTextStyle}>
                            {
                                staticText["en"].protectionText.map((text, index) => {
                                    return (
                                        index === staticText["en"].protectionText.length - 1 ?
                                            <Text key={index + 1}>
                                                {index + 1}. {text}
                                            </Text>
                                            :
                                            <Text key={index + 1}>
                                                {index + 1}. {text}{"\n\n"}
                                            </Text>
                                    )
                                })
                            }
                        </Text>
                    </ContainerText>
                </BoxContainer>
                <BoxContainer>
                    <ContainerTitle
                        text={"Disinfection tips"}
                        containerStyle={containerStyles.containerTitleStyle}
                        titleStyle={textStyles.containerTitleStyle}
                    />
                    <ContainerText>
                        <Text style={textStyles.containerTextStyle}>
                            {
                                staticText["en"].tipsText.map((text, index) => {
                                    return (
                                        index === staticText["en"].tipsText.length - 1 ?
                                            <Text
                                                key={index + 1}
                                            >
                                                {index + 1}. {text}
                                            </Text>
                                            :
                                            <Text
                                                key={index + 1}
                                            >
                                                {index + 1}. {text}{"\n\n"}
                                            </Text>
                                    )
                                })
                            }
                        </Text>
                    </ContainerText>
                </BoxContainer>
                <BoxContainer>
                    <ContainerTitle
                        text={"The vaccination process in Romania"}
                        containerStyle={containerStyles.containerTitleStyle}
                        titleStyle={textStyles.containerTitleStyle}
                    />
                    <ContainerText>
                        <Text style={textStyles.containerTextStyle}>
                            <Text>
                                <Text style={{ fontWeight: "bold" }}>Stage I:</Text>{"\n"}
                                <Text style={{ fontWeight: "bold" }}>How long?</Text> Execution time will be set in
                                depending on the vaccination schedule chosen, which may include one or two doses;{"\n"}
                                <Text style={{ fontWeight: "bold" }}>Who?</Text> Persons included in the category of workers
                                in the fields of health and social - public and private system;{"\n"}
                                <Text style={{ fontWeight: "bold" }}>How?</Text> Vaccination will be carried out through the units
                                or vaccination centers or mobile vaccination teams - depending on the situation.
                            </Text>
                            {"\n\n\n"}
                            <Text>
                                <Text style={{ fontWeight: "bold" }}>Stage II:{"\n"}</Text>
                                <Text style={{ fontWeight: "bold" }}>How long?</Text> Execution time will be set in
                                depending on the vaccination schedule chosen, which may include one or two doses;{"\n"}
                                <Text style={{ fontWeight: "bold" }}>Who?</Text> Includes at-risk population and workers
                                carrying out activities in key, key areas;{"\n"}
                                <Text style={{ fontWeight: "bold" }}>How?</Text> It runs through the network of centers
                                vaccination / mobile vaccination teams / family medicine, as appropriate.
                            </Text>
                            {"\n\n\n"}
                            <Text>
                                <Text style={{ fontWeight: "bold" }}>Stage III:{"\n"}</Text>
                                <Text style={{ fontWeight: "bold" }}>How long?</Text> Execution time will be set in
                                depending on the vaccination schedule chosen, which may include one or two doses;{"\n"}
                                <Text style={{ fontWeight: "bold" }}>Who?</Text> Includes the general population;{"\n"}
                                <Text style={{ fontWeight: "bold" }}>How?</Text> It runs through the network of vaccination centers / teams
                                mobile vaccination / family medicine / drive-through vaccination centers, as appropriate.
                            </Text>
                        </Text>
                    </ContainerText>
                </BoxContainer>
                <Text
                    style={textStyles.generalTextStyle}
                >
                    This information is presented on the official news website.{"\n"}
                    <Text
                        style={textStyles.hyperlinkStyle}
                        onPress={() => { Linking.openURL('https://stirioficiale.ro/informatii'); }}
                    >www.stirioficiale.ro/informatii
                    </Text>
                </Text>
            </View>
        )
    }
}

export default HelpScreen;
