import React from 'react';
import { StyleSheet, Dimensions } from 'react-native'
import MapView, { Geojson } from 'react-native-maps'
import { SafeAreaView } from 'react-navigation'
import colors from '../../config/colors'
const ColorService = require('../../services/ColorService')

const height = Dimensions.get('window').height;
const geoMaps = require('../../assets/data/parsed.low.geo.json');



class WorldMapScreen extends React.Component {

    constructor(props) {
        super(props);
        console.log("I am here");
    }

    render() {
        return (
            <SafeAreaView>
                <MapView
                    provider={null}
                    style={styles.map}
                    loadingEnabled={true}
                    region={{
                        latitude: 10.0,
                        longitude: 18,
                        latitudeDelta: 100,
                        longitudeDelta: 100
                    }}
                    showsBuildings={false}
                    showsTraffic={false}
                    showsIndoors={false}
                    rotateEnabled={false}
                >
                    {
                        Object.keys(geoMaps).map(key => (
                            <Geojson
                                key={key}
                                geojson={geoMaps[key]} // geojson of the countries you want to highlight
                                fillColor={ColorService.colorSpectrum(90)}
                            />
                        ))
                    }
                </MapView >
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        height
    },
    container: {
        flex: 1,
        backgroundColor: colors.secondaryBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default WorldMapScreen;
