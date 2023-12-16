import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {CalendarList, DateData} from 'react-native-calendars';
import {AppBar, HeightSpacer} from '../../../components';
import {COLORS} from '../../../constants/theme';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';

const RANGE = 24;
const initialDate = '2023-11-11';

const CalenderDetails = ({navigation}) => {
  const route = useRoute();
  const {id, title} = route.params;

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(initialDate);
  const [orders, setOrders] = useState([]);

  const getOrderByPropertyId = async property_id => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://10.0.2.2:5003/api/orders/byProperty/${property_id}`,
        {
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
        },
      );
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDate = date => {
    return date.split('T')[0];
  };

  const handlemarked = data => {
    const result = {};
    const marker = [];
    data.map(doc => {
      {
        const {startDate, endDate} = doc;
        const start = handleDate(startDate);
        const end = handleDate(endDate);
        marker.push([start, end]);
      }
    });

    marker.map(marker => {
      result[marker[0]] = {
        selected: true,
        startingDay: true,
        color: COLORS.lightGreen,
        textColor: COLORS.lightWhite,
      };
      const [yearStart, monthStart, dayStart] = marker[0].split('-');
      const [yearEnd, monthEnd, dayEnd] = marker[1].split('-');

      if (parseInt(parseInt(dayEnd) - parseInt(dayStart) - 1) > 0) {
        console.log(1);
        for (
          let i = 0;
          i < parseInt(parseInt(dayEnd) - parseInt(dayStart) - 1);
          i++
        ) {
          result[`${yearStart}-${monthStart}-${parseInt(dayStart) + i + 1}`] = {
            color: COLORS.lightGreen,
            textColor: COLORS.lightWhite,
          };
        }
      }

      result[marker[1]] = {
        selected: true,
        endingDay: true,
        color: COLORS.lightGreen,
        textColor: COLORS.lightWhite,
      };
    });
    return result;
  };

  useEffect(() => {
    getOrderByPropertyId(id);
  }, []);

  const onDayPress = useCallback(
    day => {
      console.warn('dayPress: ', day);
      setSelected(day.dateString);
    },
    [setSelected],
  );

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  return (
    <View>
      <View style={{height: 40}}>
        <AppBar
          title={title}
          color={COLORS.white}
          color1={COLORS.white}
          icon={'search1'}
          onPress={() => navigation.goBack()}
          onPress1={() => {}}
          top={20}
          left={20}
          right={20}
        />
      </View>

      <HeightSpacer height={30} />

      <CalendarList
        markingType={'period'}
        markedDates={handlemarked(orders)}
        pastScrollRange={RANGE}
        futureScrollRange={RANGE}
        onDayPress={onDayPress}
        renderHeader={renderCustomHeader}
        calendarHeight={390}
      />
    </View>
  );
};

function renderCustomHeader(date) {
  const header = date.toString('MMMM yyyy');
  const [month, year] = header.split(' ');
  const textStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    color: COLORS.red,
    paddingRight: 5,
  };

  return (
    <View style={styles.header}>
      <Text style={[styles.month, textStyle]}>{`${month}`}</Text>
      <Text style={[styles.year, textStyle]}>{year}</Text>
    </View>
  );
}

export default CalenderDetails;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  month: {
    marginLeft: 5,
  },
  year: {
    marginRight: 5,
  },
});
