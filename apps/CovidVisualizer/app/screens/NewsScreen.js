import React from 'react';
import {
    Text,
    ScrollView,
    NativeModules,
    ActivityIndicator,
    View,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native'

import colors from '../config/colors'
import AsyncStorage from '@react-native-community/async-storage';

import ConnectorService from "../services/ConnectorService";
import moment from 'moment';
import { SafeAreaView } from 'react-native';
import NewsCardContainer from './containers/NewsCardContainer';
const { StatusBarManager } = NativeModules;

class NewsScreen extends React.Component {
    constructor(props) {
        console.log("\n[NewsScreen] - Constructor");
        super(props);
        this.state = {
            loadingData: true,
            articles: []
        };
    }

    async componentDidMount() {
        console.log("[NewsScreen] - componentDidMount");
        let data;
        let needUpdate = true;
        try {
            if (needUpdate) {
                data = await ConnectorService.getRomaniaCovidNews();
                console.log(data);
            } else {
                data = localData["data"];
            }
            this.setState({ loadingData: false, articles: data });
        } catch (err) {
            throw err;
        }

        console.log("[NewsScreen] - Data Loaded");
    }

    render() {
        /*
        if (!this.state.loadingData) {
            console.log(this.articles);
            publishedAt = moment.now();
            const time = moment(publishedAt || moment.now()).fromNow();
            const defaultImg = 'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';
        }
*/
        return (
            <ScrollView
                contentContainerStyle={styles.container}
            >
                {
                    this.state.loadingData ?
                        <ActivityIndicator
                            size="large"
                            color="#bc2b78"
                            style={styles.activityIndicator}
                        /> :
                        <NewsCardContainer data={{}} />


                }

            </ScrollView>
            /*<View style={styles.container}>
                <Text style={{ fontSize: 30 }}>News Screen</Text>
                <Text style={{ fontSize: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>Today News: </Text>
                    News
                </Text>
            </View>*/
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primaryBackground,
        paddingTop: StatusBarManager.HEIGHT
    },
    noteStyle: {
        margin: 5,
        fontStyle: 'italic',
        color: '#b2bec3',
        fontSize: 10
    },
    featuredTitleStyle: {
        marginHorizontal: 5,
        textShadowColor: '#00000f',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 3
    }
});


export default NewsScreen;