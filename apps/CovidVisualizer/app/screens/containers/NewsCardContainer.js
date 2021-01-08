import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Avatar, Card, Title, Paragraph} from 'react-native-paper';
import { Linking, TouchableNativeFeedback } from 'react-native';
import moment from 'moment';
import genericColorService from '../../services/color/GenericColorService';

class NewsCardContainer extends React.Component {

    constructor(props) {
        super(props);
        this.article = props.article;
        this.selectedColor = genericColorService.randomRainbowColor();
    }

    render() {
        let article = this.article;
        const defaultImg = 'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';
        const time = moment(article.publishedAt || moment.now()).fromNow();
        const selectedColor = this.selectedColor;
        return (
            <TouchableNativeFeedback
                useForeground
                onPress={() => Linking.openURL(article.url)}
            >
                <Card style={styles.boxContainer}>
                    <Card.Title
                        title={article.source.name}
                        subtitle={time}
                        right={() => <Avatar.Image style={styles.avatar} source={require('../../assets/images/news_icon.png')} />}
                    />
                    <Card.Content>
                        <Title style={{
                            fontSize: 14,
                            color: selectedColor
                        }}>{article.title}</Title>
                        <Paragraph style={styles.noteStyle}>{article.description}</Paragraph>
                    </Card.Content>
                    <Card.Cover style={styles.avatar} source={{ uri: article.urlToImage || defaultImg }} />
                </Card>
            </TouchableNativeFeedback >
        );
    }

};

const styles = StyleSheet.create({
    boxContainer: {
        backgroundColor: "#fff5f5", //
        width: Dimensions.get(`window`).width * 95 / 100,
        margin: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "blue",
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        color: 'red'
    },
    content: {
        justifyContent: "center",
        alignContent: "center"
    },
    avatar: {
        alignContent: "center",
        margin: 10,
    },
    noteStyle: {
        margin: 3,
        color: '#1e0000fa',
        fontSize: 10
    },
    featuredTitleStyle: {
        fontSize: 14,
    }
});

export default NewsCardContainer;

