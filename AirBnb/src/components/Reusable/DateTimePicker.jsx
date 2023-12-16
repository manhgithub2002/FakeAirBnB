import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';

const DateTimePicker = () => {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {/* Date picker */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'red',
            alignItems: 'center',
            paddingLeft: 20,
          }}>
          <Text style={{fontSize: 30}}>Date: </Text>
          <TouchableOpacity
            onPress={() => {
              setOpenDate(true);
            }}>
            <Text>{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            mode={'date'}
            open={openDate}
            date={new Date()}
            onConfirm={newDate => {
              setDate(newDate);
              setOpenDate(false);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
          />
        </View>
        {/* Time picker */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'green',
            alignItems: 'center',
            paddingLeft: 20,
          }}>
          <Text style={{fontSize: 30}}>Date: </Text>
          <Text>08:30</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({});
