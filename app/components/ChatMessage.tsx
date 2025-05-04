// components/ChatMessage.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChatMessageProps {
  text: string;
  sender: 'user' | 'sage';
  personalityEmoji?: string;
}

const ChatMessage = ({ text, sender, personalityEmoji }: ChatMessageProps) => {
  return (
    <View style={[
      styles.container,
      sender === 'user' ? styles.userContainer : styles.sageContainer
    ]}>
      {sender === 'sage' && personalityEmoji && (
        <Text style={styles.emoji}>{personalityEmoji}</Text>
      )}
      <View
        style={[
          styles.messageContainer,
          sender === 'user' ? styles.userMessage : styles.sageMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            sender === 'user' ? styles.userMessageText : styles.sageMessageText,
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  sageContainer: {
    justifyContent: 'flex-start',
  },
  emoji: {
    fontSize: 24,
    marginHorizontal: 5,
    marginTop: 5,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
  },
  userMessage: {
    backgroundColor: '#EAC48F',
    borderTopRightRadius: 0,
  },
  sageMessage: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#9A5D21',
  },
  sageMessageText: {
    color: '#003300',
  },
});

export default ChatMessage;
