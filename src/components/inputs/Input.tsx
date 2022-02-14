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
  onFocus,
}: Props) => {
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState(value || '');

  const color = useAppSelector((state) => state.settings.theme);

  const handleSubmit = () => {
    onChange && onChange(text);
  };

  const handleFocus = () => {
    setFocused(!focused);
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
      <View
        style={[
          styles.inputContainer,
          focused && { borderColor: color + 'AA' },
        ]}>
        {icon && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 16,
            }}>
            <Icon icon={icon} />
          </View>
        )}
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          multiline={multiline}
          value={text}
          onChangeText={(text) => !disableInput && setText(text)}
          onEndEditing={handleSubmit}
          onFocus={handleFocus}
          onBlur={handleFocus}
          placeholderTextColor="#c7c7c7"
        />
        {!disableInput && clearInput && value !== '' && (
          <IconButton
            icon="clear"
            background
            containerStyle={{ alignSelf: 'center', marginRight: 4 }}
            onPress={handleClearInput}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#c7c7c7',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    // backgroundColor: '#fafafa',
    borderColor: '#f2f2f2',
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 14,
    flex: 1,
  },
});
