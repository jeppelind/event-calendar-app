import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  eventList: {
    // width: '100%',
    // backgroundColor: '#095b91',
  },
  eventItem: {
    // flex: 1,
    // flexDirection: 'row',
  },
  event: {
    // flex: 1,
    marginVertical: 2,
    padding: 15,
  },
  label: {
    fontSize: 16,
  },
  dateParent: {
    flexDirection: 'row',
  },
  date: {
    fontFamily: 'Poppins_700Bold',
    opacity: 0.7,
  },
  year: {
    fontFamily: 'Poppins_700Bold',
    opacity: 0.5,
  },
  active: {
    marginLeft: 14,
    marginTop: 2,
    fontSize: 9,
    backgroundColor: 'green',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    color: 'white',
    maxHeight: 18,
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlignVertical: 'center',
  },
  description: {
    opacity: 0.65,
  },
  footer: {
    minHeight: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInteraction: {
    paddingHorizontal: 25,
    height: '100%',
    justifyContent: 'center',
  },
});
