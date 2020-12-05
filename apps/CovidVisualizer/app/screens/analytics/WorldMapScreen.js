import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import MapView, { Geojson } from 'react-native-maps'
import colors from '../../config/colors'

class WorldMapScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={null}
                    style={styles.map}
                    loadingEnabled={true}
                    region={{
                        latitude: -122.42305755615234,
                        longitude: 37.82687023785448,
                        latitudeDelta: 1.15,
                        longitudeDelta: 1.121
                    }}
                    showsBuildings={false}
                    showsTraffic={false}
                    showsIndoors={false}
                    rotateEnabled={false}

                >
                    <Geojson
                        geojson={alcatraz} // geojson of the countries you want to highlight
                        fillColor="#fabfac"
                    />
                    <Geojson
                        geojson={alcatraz} // geojson of the countries you want to highlight
                        strokeColor="#FF6D6A"
                        strokeWidth={2}
                    />
                </MapView >
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondaryBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default WorldMapScreen;