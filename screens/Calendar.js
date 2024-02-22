import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Calendar as CalendarComponent } from 'react-native-calendars';

const Calendar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select Your Date</Text>
      <View style={styles.calendarContainer}>
        <CalendarComponent
          
          
          markedDates={{
            '2022-02-24': { selected: true, marked: true, selectedColor: 'blue' },
            '2022-02-25': { marked: true },
            '2022-02-26': { marked: true, dotColor: 'red', activeOpacity: 0 },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 20,
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
  },
});

export default Calendar;
