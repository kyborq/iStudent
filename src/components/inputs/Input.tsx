import React, { useEffect, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { Icon, TIcon } from '../Icon';
import { IconButton } from './IconButton';

type Props = {
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  value?: string;
  icon?: TIcon;
  clearInput?: boolean;
  style?: StyleProp<ViewStyle>;
  onChange?: (value: string) => void;
};

export const Input = ({
  label,
  placeholder,
  multiline,
  value,
  icon,
  style,
  clearInput,
  onChange,
}: Props) => {
  const [text, setText] = useState(value || '');

  const handleSubmit = () => {
    onChange && onChange(text);
  };

  useEffect(() => {
    setText(value || '');
  }, [value]);

  return (
    <View style={[styles.container, style]}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
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
          onChangeText={setText}
          onEndEditing={handleSubmit}
        />
        {clearInput && value !== '' && (
          <IconButton
            icon="clear"
            containerStyle={{ alignSelf: 'center', marginRight: 4 }}
            onPress={() => onChange && onChange('')}
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
    backgroundColor: '#fafafa',
    borderColor: '#fafafa',
    borderRadius: 10,
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 14,
    flex: 1,
  },
});
