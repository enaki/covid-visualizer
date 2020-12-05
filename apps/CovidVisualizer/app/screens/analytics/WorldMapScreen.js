import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import MapView, { Geojson } from 'react-native-maps'
import { SafeAreaView } from 'react-navigation'
import colors from '../../config/colors'

const height = Dimensions.get('window').height;
const geoMaps = require('../../assets/data/parsed.low.geo.json');

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class WorldMapScreen extends React.Component {

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
                                geojson={geoMaps[key]} // geojson of the countries you want to highlight
                                fillColor={getRandomColor()}
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

const alcatraz = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "scalerank": 1,
                "featurecla": "Admin-0 country",
                "labelrank": 3,
                "sovereignt": "Romania",
                "sov_a3": "ROU",
                "adm0_dif": 0,
                "level": 2,
                "type": "Sovereign country",
                "admin": "Romania",
                "adm0_a3": "ROU",
                "geou_dif": 0,
                "geounit": "Romania",
                "gu_a3": "ROU",
                "su_dif": 0,
                "subunit": "Romania",
                "su_a3": "ROU",
                "brk_diff": 0,
                "name": "Romania",
                "name_long": "Romania",
                "brk_a3": "ROU",
                "brk_name": "Romania",
                "brk_group": null,
                "abbrev": "Rom.",
                "postal": "RO",
                "formal_en": "Romania",
                "formal_fr": null,
                "note_adm0": null,
                "note_brk": null,
                "name_sort": "Romania",
                "name_alt": null,
                "mapcolor7": 1,
                "mapcolor8": 4,
                "mapcolor9": 3,
                "mapcolor13": 13,
                "pop_est": 22215421,
                "gdp_md_est": 271400,
                "pop_year": -99,
                "lastcensus": 2011,
                "gdp_year": -99,
                "economy": "2. Developed region: nonG7",
                "income_grp": "3. Upper middle income",
                "wikipedia": -99,
                "fips_10": null,
                "iso_a2": "RO",
                "iso_a3": "ROU",
                "iso_n3": "642",
                "un_a3": "642",
                "wb_a2": "RO",
                "wb_a3": "ROM",
                "woe_id": -99,
                "adm0_a3_is": "ROU",
                "adm0_a3_us": "ROU",
                "adm0_a3_un": -99,
                "adm0_a3_wb": -99,
                "continent": "Europe",
                "region_un": "Europe",
                "subregion": "Eastern Europe",
                "region_wb": "Europe & Central Asia",
                "name_len": 7,
                "long_len": 7,
                "abbrev_len": 4,
                "tiny": -99,
                "homepart": 1,
                "filename": "ROU.geojson"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            22.710531447040496,
                            47.88219391538941
                        ],
                        [
                            23.142236362406803,
                            48.09634105080695
                        ],
                        [
                            23.76095828623741,
                            47.985598456405458
                        ],
                        [
                            24.40205610525038,
                            47.98187775328042
                        ],
                        [
                            24.866317172960579,
                            47.73752574318831
                        ],
                        [
                            25.20774336111299,
                            47.89105642352747
                        ],
                        [
                            25.9459411964024,
                            47.987148749374217
                        ],
                        [
                            26.19745039236693,
                            48.22088125263035
                        ],
                        [
                            26.619336785597797,
                            48.22072622333347
                        ],
                        [
                            26.924176059687569,
                            48.123264472030999
                        ],
                        [
                            27.233872918412744,
                            47.82677094175638
                        ],
                        [
                            27.551166212684849,
                            47.40511709247083
                        ],
                        [
                            28.128030226359046,
                            46.810476386088257
                        ],
                        [
                            28.160017937947715,
                            46.37156260841722
                        ],
                        [
                            28.0544429867754,
                            45.944586086605628
                        ],
                        [
                            28.233553501099043,
                            45.48828318946837
                        ],
                        [
                            28.679779493939379,
                            45.304030870131708
                        ],
                        [
                            29.149724969201654,
                            45.46492544207245
                        ],
                        [
                            29.603289015427433,
                            45.293308010431129
                        ],
                        [
                            29.626543409958769,
                            45.03539093686239
                        ],
                        [
                            29.141611769331836,
                            44.82021027279904
                        ],
                        [
                            28.837857700320205,
                            44.913873806328059
                        ],
                        [
                            28.558081495891999,
                            43.70746165625813
                        ],
                        [
                            27.970107049275076,
                            43.81246816667521
                        ],
                        [
                            27.242399529740909,
                            44.175986029632408
                        ],
                        [
                            26.065158725699747,
                            43.94349376075126
                        ],
                        [
                            25.569271681426927,
                            43.68844472917472
                        ],
                        [
                            24.100679152124174,
                            43.74105133724785
                        ],
                        [
                            23.33230228037632,
                            43.89701080990471
                        ],
                        [
                            22.944832391051848,
                            43.82378530534713
                        ],
                        [
                            22.65714969248299,
                            44.23492300066128
                        ],
                        [
                            22.4740084164406,
                            44.40922760678177
                        ],
                        [
                            22.705725538837357,
                            44.57800283464702
                        ],
                        [
                            22.459022251075937,
                            44.7025171982543
                        ],
                        [
                            22.14508792490281,
                            44.47842234962059
                        ],
                        [
                            21.562022739353606,
                            44.7689472519655
                        ],
                        [
                            21.483526238702234,
                            45.18117015235778
                        ],
                        [
                            20.874312778413356,
                            45.416375433934238
                        ],
                        [
                            20.762174920339989,
                            45.734573065771439
                        ],
                        [
                            20.220192498462838,
                            46.127468980486558
                        ],
                        [
                            21.02195234547125,
                            46.3160879583519
                        ],
                        [
                            21.62651492685387,
                            46.99423777931816
                        ],
                        [
                            22.099767693782835,
                            47.6724392767167
                        ],
                        [
                            22.710531447040496,
                            47.88219391538941
                        ]
                    ]
                ]
            }
        }
    ]
}


export default WorldMapScreen;