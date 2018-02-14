import React from 'react';
import { Button, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';

class Lists extends React.PureComponent {
  onSelectList() {
    const { onSelectList, navigation } = this.props;
    onSelectList();
    navigation.navigate('ActiveList');
  }

  render() {
    return (
      <View>
        <Text>Lists!!!</Text>
        <Button
          title="Go to my only list"
          onPress={() => this.onSelectList()}
        />
      </View>
    );
  }
}

Lists.propTypes = {
  onSelectList: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default Lists;
