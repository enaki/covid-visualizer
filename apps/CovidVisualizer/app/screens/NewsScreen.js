import React from 'react';
import { ActivityIndicator, StyleSheet, Linking, TouchableNativeFeedback } from 'react-native'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import colors from '../config/colors'
import AsyncStorage from '@react-native-community/async-storage';

import ConnectorService from "../services/ConnectorService";
import moment from 'moment';
import { SafeAreaView } from 'react-native';


class NewsScreen extends React.Component {
    constructor(props){
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
        const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
        return (
            <SafeAreaView>
                {
                    this.state.loadingData ?
                        <ActivityIndicator
                            size="large"
                            color="#bc2b78"
                            style={styles.activityIndicator}
                        /> :

                        <TouchableNativeFeedback
                            useForeground
                            onPress={() => Linking.openURL(url)}
                        >

                            <Card>
                                <Card.Title title="Card Title" subtitle="Card Subtitle" />
                                <Card.Content>
                                    <Title>Card title</Title>
                                    <Paragraph>Card content</Paragraph>
                                </Card.Content>
                                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />

                            </Card>

                        </TouchableNativeFeedback>
                }

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBackground,
        alignItems: 'center',
        justifyContent: 'center',
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
