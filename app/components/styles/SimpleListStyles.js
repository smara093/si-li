import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#10485E', // e.g. buttons
  secondary: '#76B59B', // e.g. headers
  tertiary: '#C5CBD3', // e.g. inactive items, text on primary background
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  title: {
    fontSize: 20,
    backgroundColor: colors.secondary,
    padding: 15,
    marginBottom: 5,
    alignItems: 'center',
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: colors.secondary,
  },
  inactiveRow: {
    backgroundColor: colors.tertiary,
  },
  menuButton: {
    backgroundColor: 'transparent',
    borderRadius: 2,
    padding: 10,
  },
  menuText: {
    textAlign: 'center',
    fontWeight: '500',
    padding: 8,
    color: colors.primary,
  },
  text: {
    padding: 10,
    lineHeight: 25,
  },
});

export default styles;
