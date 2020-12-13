import React from 'react';
import { StyleSheet, Dimensions } from 'react-native'
import MapView, { Geojson } from 'react-native-maps'
import colors from '../../config/colors'
import { View } from 'react-native';
const ColorService = require('../../services/color/GenericColorService')
const RoCountyColorService = require('../../services/color/MapRoCountyColorService')

const height = Dimensions.get('window').height;
const roCountiesGeoMaps = require('../../assets/data/parsed.ro_counties.geo.json');


class RomaniaMapScreen extends React.Component {

    constructor(props) {
        super(props);
        console.log("I am here");
    }

    render() {
        return (
            <View>
                <MapView
                    provider={null}
                    style={styles.map}
                    loadingEnabled={true}
                    region={{
                        latitude: 44.21921941263342,
                        longitude: 24.883000218245233,
                        latitudeDelta: 10,
                        longitudeDelta: 10
                    }}
                    showsBuildings={false}
                    showsTraffic={false}
                    showsIndoors={false}
                    rotateEnabled={false}
                >
                    {
                        Object.keys(roCountiesGeoMaps).map(key => (
                            <Geojson
                                key={key}
                                geojson={roCountiesGeoMaps[key]} // geojson of the countries you want to highlight
                                fillColor={RoCountyColorService.colorSpectrumByROCountyKey(key)}
                            />
                        ))
                    }
                </MapView >
            </View>
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


export default RomaniaMapScreen;
