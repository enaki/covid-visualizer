import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { Linking, TouchableNativeFeedback } from 'react-native';

const NewsCardContainer = props => {
    //const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    return (
        <TouchableNativeFeedback
            useForeground
            onPress={() => Linking.openURL(url)}
        >

            <Card style={styles.boxContainer}>
                <Card.Title style={styles.content}
                    title="Card Title"
                    subtitle="Card Subtitle"
                    right={() => <Avatar.Image size={36} source={require('../../assets/images/news_icon.png')} />}
                />
                <Card.Content>
                    <Title style={styles.noteStyle}>Card title</Title>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />

            </Card>

        </TouchableNativeFeedback>
    );
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
        alignContent: "center"
    },
    content: {
        justifyContent: "center",
        alignContent: "center"
    }
});

export default NewsCardContainer;

