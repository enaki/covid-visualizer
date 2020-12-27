import React from 'react';
import { StyleSheet, Dimensions } from 'react-native'
import MapView, { Geojson } from 'react-native-maps'
import colors from '../../config/colors'
import { ActivityIndicator, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const ConnectorService = require('../../services/ConnectorService');
import roCountyColorService from '../../services/color/MapRoCountyColorService';

const height = Dimensions.get('window').height;
const roCountiesGeoMaps = require('../../assets/data/parsed.ro_counties.geo.json');


class RomaniaMapScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataIsReturned: false
        };
        console.log("\n[RomaniaMapScreen] - Constructor");
    }

    async componentDidMount() {
        console.log("[RomaniaMapScreen] - componentDidMount");
        try {
            let localData = JSON.parse(await AsyncStorage.getItem("RoMap"));
            let needUpdate = false;
            if (localData == undefined) {
                needUpdate = true;
            } else {
                let seconds = moment().diff(moment(localData["updated"]), 'seconds');
                console.log("[RomaniaMapScreen] - Seconds passed since the last update: " + seconds);
                if (seconds > 3600) { //o ora
                    needUpdate = true;
                }
            }
            console.log("[RomaniaMapScreen] - needUpdate " + needUpdate);
            if (needUpdate) {
                data = await ConnectorService.getRoCountiesActivePerOneHundred();
                AsyncStorage.setItem("RoMap", JSON.stringify({ "data": data, "updated": moment().valueOf() }));

                console.log("\n\t***AsyncStorage: Setting data RoMap on " + moment().format('MMMM Do YYYY, HH:mm:ss'));
            } else {
                data = localData["data"];
            }

            roCountyColorService.setData(data);
            //this.setState({ dataIsReturned: true })

            //just for experimenting
            setTimeout(() => {
                this.setState({ dataIsReturned: true });
            }, 1000);
        } catch (err) {
            throw err;
        }

        console.log("[RomaniaMapScreen] - Data Loaded");
    }


    render() {
        console.log("[RomaniaMapScreen] - Call render method ");
        return (
            <View style={!this.state.dataIsReturned ? styles.container : {}}>
                {
                    !this.state.dataIsReturned ?
                        <ActivityIndicator
                            color='#bc2b78'
                            size="large"
                            style={styles.activityIndicator} />
                        : this.renderMap()
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
                        fillColor={roCountyColorService.colorSpectrumByROCountyKey(key)}
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
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});


export default RomaniaMapScreen;
