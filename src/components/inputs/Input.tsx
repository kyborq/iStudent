import React, { useEffect, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { useAppSelector } from '../../redux/store';
import { Icon, TIcon } from '../Icon';
import { IconButton } from './IconButton';

type Props = {
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  value?: string;
  icon?: TIcon;
  clearInput?: boolean;
  disableInput?: boolean;
  style?: StyleProp<ViewStyle>;
  onChange?: (value: string) => void;
  onType?: (value: string) => void;
  onFocus?: () => void;
  ghost?: boolean;
};

export const Input = ({
  label,
  placeholder,
  multiline,
  value,
  icon,
  style,
  clearInput,
  disableInput,
  onChange,
  onType,
  ghost,
  onFocus,
}: Props) => {
  const [text, setText] = useState(value || '');

  const handleSubmit = () => {
    onChange && onChange(text);
  };

  useEffect(() => {
    setText(value || '');
  }, [value]);

  useEffect(() => {
    !disableInput && onType && onType(text);
  }, [text]);

  const handleClearInput = () => {
    !disableInput && onChange && onChange('');
    !disableInput && onType && onType('');
  };

  return (
    <View style={[styles.container, style]}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer]}>
        {icon && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16,
            }}>
            <Icon icon={icon} color="#c7c7c7" />
          </View>
        )}
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          multiline={multiline}
          value={text}
          onChangeText={(text) => !disableInput && setText(text)}
          onEndEditing={handleSubmit}
          placeholderTextColor="#c7c7c7"
          onFocus={() => ghost && setText('')}
          onBlur={() => ghost && text === '' && setText(value || '00')}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {!disableInput && clearInput && value !== '' && (
            <IconButton icon="clear" onPress={handleClearInput} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#c7c7c7',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    // marginLeft: 16,
  },
});
