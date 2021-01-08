import {Text} from "react-native";
import textStyle from "../config/styles/textstyles";
import NumberFormatter from "./NumberFormatterService";
import React from "react";

class TextFormatterService{
    formatLast3DaysText(data){
        return(
            data.map( (item, idx) => {
                return (
                    <Text
                        key={idx}
                    >
                        <Text
                            key={idx * 10}
                            style={ {color: "#42cab3"}}
                        >{item["type"] + "\n"}
                        </Text>
                        {
                            item["data"].map((token, idx) => {
                                return (
                                    <Text
                                        key={idx}
                                    >
                                        {token["type"] + ": "}
                                        <Text
                                            style={textStyle.textStyleTypes[Object.values(token)[0]]}
                                            key={idx * 10}
                                        >{NumberFormatter.formatNumber(token["value"])}</Text>
                                        { idx === item["data"].length - 1? null : "\n"}
                                    </Text>
                                )
                            })
                        }
                        { idx === data.length -1 ? null : "\n\n"}
                    </Text>
                );
            })
        );
    }
}

const textFormatter = new TextFormatterService();
export default textFormatter;
