import React from 'react';
import { StyleSheet, Dimensions } from 'react-native'
import MapView, { Geojson } from 'react-native-maps'
import { SafeAreaView } from 'react-navigation'
import colors from '../../config/colors'
import { View, Text } from 'react-native';
const ColorService = require('../../services/color/GenericColorService')

const ConnectorService = require('../../services/ConnectorService');
import worldColorService from '../../services/color/MapWorldColorService';

const height = Dimensions.get('window').height;
const geoMaps = require('../../assets/data/parsed.low.geo.json');


class WorldMapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataIsReturned: false
        };
        console.log("->IN WorldMapScreen Constructor");
    }

    async componentDidMount() {
        console.log("\n->IN WorldMapScreen componentDidMount");
        try {
            data = await ConnectorService.getCountriesActivePerMillion();
            console.log(data);
            worldColorService.setData(data);
            this.setState({ dataIsReturned: true });
        } catch (err) { throw err }
        console.log("Data Loaded\n");
    }

    render() {
        console.log("In render WorldMapScreen");
        console.log(worldColorService.getData());
        return (
            <View>
                {
                    !this.state.dataIsReturned ? <Text>Loading</Text> : this.renderMap()
                }
            </View>
        );
    }

    renderMap() {
        return <MapView
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
                        fillColor={worldColorService.colorSpectrumByCountryKey(key)}
                    />
                ))
            }
        </MapView >
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
