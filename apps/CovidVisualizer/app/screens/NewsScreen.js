import React from 'react';

import {
    ActivityIndicator,
    StyleSheet,
    FlatList,
    Switch,
    View,
    Text,
    Dimensions,
    StatusBar
} from 'react-native'
import { Title } from 'react-native-paper';
import colors from '../config/colors'
import AsyncStorage from '@react-native-community/async-storage';
import ConnectorService from "../services/ConnectorService";
import NewsCardContainer from './containers/NewsCardContainer';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import { SafeAreaView } from 'react-navigation';


class NewsScreen extends React.Component {
    constructor(props) {
        console.log("\n[NewsScreen] - Constructor");
        super(props);
        this.state = {
            loadingData: true,
            refreshing: true,
            isEnglishEnabled: true
        };
        this.data = { 'articles': [] };
    }

    async componentDidMount() {
        console.log("[NewsScreen] - componentDidMount");
        this.fetchNews();
    }

    async fetchNews() {
        let data;
        try {
            if (!this.state.isEnglishEnabled) {
                console.log("Fetch Romania news");

                data = await ConnectorService.getRomaniaCovidNews();
                AsyncStorage.setItem("RomaniaNews", JSON.stringify({ "data": data }));
                this.data = data;
            } else {
                console.log("Fetch World news");
                data = await ConnectorService.getWorldCovidNews();
                AsyncStorage.setItem("WorldNews", JSON.stringify({ "data": data }));
                this.data = data;
            }

        } catch (err) {
            console.log("Error");
            let localData = null;
            if (!this.state.isEnglishEnabled) {
                localData = JSON.parse(await AsyncStorage.getItem("RomaniaNews"));
            } else {
                localData = JSON.parse(await AsyncStorage.getItem("WorldNews"));
            }
            if (localData != null) {
                console("News from localStorage");
                data = localData["data"];
            }
        }
        this.setState({ loadingData: false, refreshing: false });
    }

    handleRefresh() {
        this.setState(
            {
                refreshing: true,
                loadingData: true
            },
            () => this.fetchNews()
        );
    }

    toggleSwitch = () => {
        this.setState({ isEnglishEnabled: !this.state.isEnglishEnabled, loadingData: true }, () => this.fetchNews())
    }

    render() {
        return (
            <SafeAreaView
                contentContainerStyle={styles.container}
            >
                <Title style={styles.title}>COVID News Page</Title>
                <View style={styles.languageSwitch}>
                    <Text style={styles.languageText}>Romanian</Text>
                    <Switch
                        trackColor={{ false: "#c3cfe4", true: "#c3cfe4" }}
                        thumbColor={this.state.isEnglishEnabled ? "orange" : "#f5dd4b"}
                        value={this.state.isEnglishEnabled}
                        onValueChange={this.toggleSwitch}
                    />
                    <Text style={styles.languageText}>English</Text>
                </View >
                {
                    this.state.loadingData ?
                        <ActivityIndicator
                            size="large"
                            color="#bc2b78"
                            size='large'
                            style={styles.activityIndicator}
                        />
                        :
                        <FlatList
                            data={this.data.articles}
                            renderItem={({ item }) => <NewsCardContainer article={item} />}
                            keyExtractor={item => item.url}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh.bind(this)}

                        />
                }
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primaryBackground,
        justifyContent: "center",
        alignContent: "center"
    },
    title: {
        marginTop: 30,
        marginBottom: 10,
        textAlign: 'center',
    },
    languageSwitch: {
        flexDirection: 'row',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    },
    languageText: {
        fontWeight: 'bold'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: Dimensions.get(`window`).width,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default NewsScreen;
