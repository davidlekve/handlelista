import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const Item = ({text}) => {
    return (
        <View style={styles.itemBox}>
            <Text style={styles.itemText}>{text}</Text>
            <View style={styles.circular}></View>
        </View>
    )
}

const styles=StyleSheet.create({
    itemBox: {
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 5,
        flexDirection:'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    itemText:{
        fontSize: 16,
    },

    circular:{
        width: 12,
        height: 12,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
    }
});

export default Item
