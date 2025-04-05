import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChatMessageProps {
  text: string;
  sender: 'user' | 'sage';
}

const ChatMessage = ({ text, sender }: ChatMessageProps) => {
  return (
    <View style={[
      styles.messageContainer,
      sender === 'user' ? styles.userMessage : styles.sageMessage
    ]}>
      <Text style={[
        styles.messageText,
        sender === 'user' ? styles.userMessageText : styles.sageMessageText
      ]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 12,
    borderRadius: 15,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#EAC48F',
  },
  sageMessage: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#9A5D21',
  },
  sageMessageText: {
    color: '#9A5D21',
  },
});

export default ChatMessage;