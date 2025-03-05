import React, { useEffect, useRef } from 'react'
import { TextInput as NativeTextInput, TextInputProps as NativeTextInputProps, StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Text from '../text/text.ui';
import Badge from '../badge/badge.ui';
export interface TextInputProps extends NativeTextInputProps {
    label?: string;
    error?: boolean;
    errorText?: string;
    required?: boolean;
    onMountFocus?: boolean,
    withVerification? : boolean,
    isVerified? : boolean,
    initialVerification? :boolean,
}

const TextInput: React.FC<TextInputProps> = ({
    label,
    required = false,
    errorText,
    error,
    keyboardAppearance,
    style,
    onMountFocus = false,
    withVerification = false,
    isVerified = false,
    initialVerification = true,
    ...rest
}) => {
    const theme = useTheme()
    const { colors } = theme
    const inputRef = useRef<NativeTextInput | null>(null)
    const styles = StyleSheet.create({
        text_input_container: {
            padding: 14,
            backgroundColor: colors.card,
            marginVertical: 5,
            color: colors.text,
            borderColor: error ? colors.danger : colors.light_gray_border,
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 16,
        }
    });
    useEffect(() => {
        if (onMountFocus) {
            inputRef.current?.focus()
        }
    }, [])
    return (
        <View style={{ marginTop: 10 }}>
            {
                label ?
                <View style={{flexDirection : 'row' , alignItems : 'center' , marginBottom: 5,gap : 5}} >
                    <Text style={{ color: error ? colors.danger : colors.text }} >{label}
                        {required && <Text style={{ color: colors.danger }} > *</Text>}
                    </Text> 
                    {
                        withVerification && !initialVerification &&
                        <Badge
                            color={ isVerified ? colors.success : colors.danger}
                            text={isVerified ? 'Verified' : "Invalid"}
                        />
                    }
                </View> : null
            }
            <NativeTextInput
                ref={inputRef}
                {...rest}
                keyboardAppearance={keyboardAppearance ?? theme.dark ? 'dark' : 'light'}
                placeholderTextColor={colors.gray}
                style={[styles.text_input_container, style]}
            />
            {
                errorText && error ?
                    <Text title small style={{ color: colors.danger }} >{errorText}</Text> : null
            }
        </View>
    )
}

export default TextInput