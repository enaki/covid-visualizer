import React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native'
import MapView, { Geojson } from 'react-native-maps'
import { ActivityIndicator, View } from 'react-native';
import ConnectorService from "../../services/ConnectorService";
import worldColorService from '../../services/color/MapWorldColorService';
import LoadDataService from '../../services/LoadDataService';
import LoggerService from "../../services/LoggerService";
import containerStyles from "../../config/styles/containerstyles";

const height = Dimensions.get('window').height;
const geoMaps = require('../../assets/data/parsed.low.geo.json');


class WorldMapScreen extends React.Component {
    constructor(props) {
        LoggerService.formatLog("WorldMapScreen", "Constructor.");
        super(props);
        this.state = {
            loadingData: true,
            loadingMap: true
        };
    }

    async componentDidMount() {
        LoggerService.formatLog(this.constructor.name, "componentDidMount method called.");
        let data = await LoadDataService.getData("WorldMap", ConnectorService.getCountriesActivePerMillion);
        worldColorService.setData(data);
        this.setState({ loadingData: false });
        LoggerService.formatLog(this.constructor.name, "Data Loaded.");
    }

    render() {
        LoggerService.formatLog(this.constructor.name, "In render callback.");
        return (
            <View style={{}}>
                {
                    this.state.loadingData ?
                        <ActivityIndicator
                            size="large"
                            color="#bc2b78"
                            style={containerStyles.activityIndicator}
                        /> :
                        this.renderMap()
                }
                {
                    this.state.loadingMap ?
                        <ActivityIndicator
                            size="large"
                            color="#bc2b78"
                            style={containerStyles.activityIndicator}
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
                    LoggerService.formatLog(this.constructor.name, `onPress method.`);
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
                        LoggerService.formatLog(this.constructor.name `Error: \n ${err}`);
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
