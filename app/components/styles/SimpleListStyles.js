import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  title: {
    fontSize: 20,
    backgroundColor: '#ef7de7',
    padding: 15,
    marginBottom: 5,
    alignItems: 'center',
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#76B59B',
  },
  inactiveRow: {
    backgroundColor: 'gray',
  },
  menuButton: {
    backgroundColor: 'purple',
    borderRadius: 2,
    margin: 10,
  },
  menuText: {
    textAlign: 'center',
    fontWeight: '500',
    padding: 8,
    color: 'white',
  },
});

export default styles;
