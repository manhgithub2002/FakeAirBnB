import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants/theme';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';

const SearchBar = ({placeholder}) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.input}
          //   value={searchKey}
          // onChangeText={setSearchKey}
          placeholder={placeholder}
        />
      </View>

      <TouchableOpacity style={styles.searchBtn}>
        <MagnifyingGlassIcon color={COLORS.black} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: SIZES.small,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },
  input: {
    fontFamily: 'regular',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    color: COLORS.black,
  },
  searchWrapper: {
    flex: 1,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchBtn: {
    width: 50,
    height: '100%',
    borderRadius: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.red,
  },
});
