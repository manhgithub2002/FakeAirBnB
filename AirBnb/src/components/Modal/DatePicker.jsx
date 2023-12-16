import React, {useState, useEffect} from 'react';
import {Calendar} from 'react-native-calendars';
import {COLORS} from '../../constants/theme';
import {View, ActivityIndicator} from 'react-native';
import axios from 'axios';

const DatePicker = ({onSelectDate, property_id}) => {
  const [loading, setLoading] = useState(true);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [orders, setOrders] = useState([]);

  // Date handling
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
        disableTouchEvent: true,
        startingDay: true,
        color: COLORS.lightGrey,
        textColor: COLORS.lightWhite,
      };
      const [yearStart, monthStart, dayStart] = marker[0].split('-');
      const [yearEnd, monthEnd, dayEnd] = marker[1].split('-');

      if (parseInt(parseInt(dayEnd) - parseInt(dayStart) - 1) > 0) {
        for (
          let i = 0;
          i < parseInt(parseInt(dayEnd) - parseInt(dayStart) - 1);
          i++
        ) {
          result[`${yearStart}-${monthStart}-${parseInt(dayStart) + i + 1}`] = {
            disableTouchEvent: true,
            color: COLORS.lightGrey,
            textColor: COLORS.lightWhite,
          };
        }
      }

      result[marker[1]] = {
        disableTouchEvent: true,
        endingDay: true,
        color: COLORS.lightGrey,
        textColor: COLORS.lightWhite,
      };
    });
    return result;
  };

  // Use Effect
  useEffect(() => {
    setLoading(true);
    getOrderByPropertyId(property_id);
    setLoading(false);
  }, []);

  //Handle selection
  const onDayPress = day => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate('');
    } else {
      setSelectedEndDate(day.dateString);
      onSelectDate(new Date(selectedStartDate), new Date(day.dateString)); // Gửi dữ liệu về component cha
    }
  };

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  return (
    <Calendar
      markingType={'period'}
      onDayPress={onDayPress}
      markedDates={{
        ...handlemarked(orders),
        [selectedStartDate]: {
          selected: true,
          startingDay: true,
          color: COLORS.lightGreen,
        },
        [selectedEndDate]: {
          selected: true,
          endingDay: true,
          color: COLORS.lightGreen,
        },
      }}
    />
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

export default DatePicker;
