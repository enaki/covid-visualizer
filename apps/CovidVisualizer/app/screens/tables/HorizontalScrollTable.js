import React from 'react';
import BoxContainer from "../containers/BoxContainer";
import {ScrollView, StyleSheet} from "react-native";
import {Row, Rows, Table} from "react-native-table-component";

export default class HorizontalScrollTable extends React.Component{
    constructor(props) {
        super(props);
        this.tableHead = this.props.tableHead;
        this.tableData = this.props.tableData;
    }

    render() {
        return(
            <BoxContainer>
                {
                    this.props.children
                }
                <ScrollView
                    style={styles.dataWrapper}
                    horizontal={true}
                >
                    <Table borderStyle={{borderWidth: 1}}>
                        <Row data={this.tableHead} style={styles.head} textStyle={styles.text}/>
                        <Rows data={this.tableData} style={styles.row} textStyle={styles.text}/>
                    </Table>
                </ScrollView>
            </BoxContainer>
        );
    }
}

const styles = StyleSheet.create({
    dataWrapper: {
        marginTop: 10,
        marginBottom:10,
        marginLeft:5,
        marginRight:5
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff',
        width: 650
    },
    row: {
        height: 28,
        backgroundColor: '#F7F6E7',
        width: 650
    },
    text: {
        margin: 5,
        fontWeight: '300',
        textAlign: 'center',
        fontSize: 15
    }
});
