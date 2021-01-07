import React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native'
import MapView, { Geojson } from 'react-native-maps'
import { ActivityIndicator, View } from 'react-native';
import ConnectorService from "../../services/ConnectorService";
import worldColorService from '../../services/color/MapWorldColorService';
import LoadDataService from '../../services/LoadDataService';

const height = Dimensions.get('window').height;
const geoMaps = require('../../assets/data/parsed.low.geo.json');


class WorldMapScreen extends React.Component {
    constructor(props) {
        console.log("[WorldMapScreen] - Constructor");
        super(props);
        this.state = {
            loadingData: true,
            loadingMap: true
        };
    }

    async componentDidMount() {
        console.log("[WorldMapScreen] - componentDidMount");
        let data = await LoadDataService.getData("WorldMap", ConnectorService.getCountriesActivePerMillion);
        worldColorService.setData(data);
        this.setState({ loadingData: false });
        console.log("[WorldMapScreen] - Data Loaded");
    }

    render() {
        console.log("[WorldMapScreen] - IN render callback");
        return (
            <View style={{}}>
                {
                    this.state.loadingData ?
                        <ActivityIndicator
                            size="large"
                            color="#bc2b78"
                            style={styles.activityIndicator}
                        /> :
                        this.renderMap()
                }
                {
                    this.state.loadingMap ?
                        <ActivityIndicator
                            size="large"
                            color="#bc2b78"
                            style={styles.activityIndicator}
                        /> : null
                }
            </View>
        );
    }

    renderMap() {
        return (
            <MapView
                provider={null}
                style={styles.map}
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
                onMapReady={() => { this.setState({ loadingMap: false }); }}
                onPress={async (event) => {
                    const coordinates = {
                        lat: event.nativeEvent.coordinate.latitude,
                        long: event.nativeEvent.coordinate.longitude
                    };
                    try {
                        const res = await ConnectorService.getCountryLatestDataByLatAndLong(coordinates.lat, coordinates.long);
                        if(res.length === 0)
                        {
                            throw 'Invalid country';
                        }
                        this.props.navigation.navigate('Country Statistics',
                            {data: res[0]});
                    }
                    catch (err) {
                        console.log("[WorldMapScreen] - Error: " + err);
                        Alert.alert(
                            "Error",
                            err
                        );
                    }
                }}
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
        );
    }
}

const styles = StyleSheet.create({
    map: {
        height
    },
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default WorldMapScreen;
