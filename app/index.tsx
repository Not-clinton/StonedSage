// index.tsx
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Keyboard,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import Personalities from './components/Personalities';
import { useChatStore } from './store/chatStore';
import ChatMessage from './components/ChatMessage';

const BACKEND_URL = 'https://financial-advisor-bot.deno.dev';

const personalityEmojis: Record<string, string> = {
  littlefinger: '🗡️',
  mac: '🌿',
  lawyer: '⚖️',
  businessman: '🚀',
};

export default function ChatScreen() {
  const {
    messages,
    currentMessage,
    isSidebarVisible,
    selectedPersonality,
    extractedContext,
    setCurrentMessage,
    setSidebarVisible,
    addMessage,
    setExtractedContext,
    setSelectedPersonality
  } = useChatStore();

  const [loading, setLoading] = useState(false);
  const [initialMessageSent, setInitialMessageSent] = useState(false);
  const maxChars = 500;

  // Send initial AI message once persona is selected
  useEffect(() => {
    if (selectedPersonality && !initialMessageSent) {
      const intro = `Hello! I'm your ${selectedPersonality} ${personalityEmojis[selectedPersonality]}. I'm here to help you with your financial journey. What would you like to discuss?`;
      addMessage(intro, 'sage');
      setInitialMessageSent(true);
    }
  }, [selectedPersonality]);

  const handleIconPress = () => {
    Keyboard.dismiss();
    setSidebarVisible(true);
  };

  const handleCloseSidebar = () => {
    setSidebarVisible(false);
  };

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true
      });

      if (!result.canceled) {
        const file = result.assets[0];
        const formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          name: file.name,
          type: 'application/pdf'
        } as any);

        const res = await fetch(
          `${BACKEND_URL}/api/upload?personality=${selectedPersonality}`,
          {
            method: 'POST',
            body: formData
          }
        );
        const data = await res.json();
        if (res.ok && data.response) {
          setExtractedContext(data.response);
          addMessage(
            '✅ Financial context uploaded. Let\'s continue.',
            'sage'
          );
        } else {
          throw new Error(data.error || 'Upload failed');
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      addMessage('❌ Failed to upload document. Please try again.', 'sage');
    }
  };

  const handleSend = async () => {
    if (!currentMessage.trim()) return;
    addMessage(currentMessage.trim(), 'user');
    setCurrentMessage('');
    setLoading(true);

    try {
      const body = {
        messages: messages.map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        })).concat({
          role: 'user',
          content: currentMessage.trim()
        }),
        context: extractedContext || undefined
      };

      const res = await fetch(
        `${BACKEND_URL}/api/chat?personality=${selectedPersonality}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      );
      const data = await res.json();
      if (res.ok && data.response) {
        addMessage(data.response, 'sage');
      } else {
        throw new Error(data.error || 'Chat failed');
      }
    } catch (error) {
      console.error('Chat error:', error);
      addMessage('❌ An error occurred. Please try again.', 'sage');
    } finally {
      setLoading(false);
    }
  };

  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Personalities
        isVisible={isSidebarVisible}
        onClose={handleCloseSidebar}
      />

      <TouchableOpacity
        activeOpacity={1}
        style={styles.dismissContainer}
        onPress={dismissKeyboard}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleIconPress}>
            <View style={styles.iconButton}>
              <FontAwesome5 name="dungeon" size={24} color="#8B4513" />
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {selectedPersonality
              ? 'Stoned Sage'
              : 'Select Your Sage'}
          </Text>
          <View style={styles.spacer} />
        </View>

        {/* Chat History */}
        <View style={styles.chatContainer}>
          <ScrollView 
            style={styles.chatHistory}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map(msg => (
              <ChatMessage
                key={msg.id}
                text={msg.text}
                sender={msg.sender}
                personalityEmoji={msg.sender === 'sage' ? personalityEmojis[selectedPersonality] : undefined}
              />
            ))}
            {loading && (
              <ActivityIndicator
                style={{ margin: 10 }}
                size="small"
                color="#8B4513"
              />
            )}
          </ScrollView>
        </View>
      </TouchableOpacity>

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inputContainer}
      >
        <View style={styles.messageInputContainer}>
          <TouchableOpacity
            style={styles.attachButton}
            onPress={handleFilePicker}
          >
            <FontAwesome5 name="paperclip" size={20} color="#666" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="MESSAGE YOUR SAGE..."
            placeholderTextColor="#666"
            value={currentMessage}
            onChangeText={setCurrentMessage}
            multiline
            maxLength={maxChars}
            blurOnSubmit={false}
          />

          <TouchableOpacity
            style={[
              styles.sendButton,
              (!currentMessage.trim() || loading) &&
                styles.sendButtonDisabled
            ]}
            onPress={handleSend}
            disabled={!currentMessage.trim() || loading}
          >
            <FontAwesome5
              name="paper-plane"
              size={20}
              color={currentMessage.trim() ? '#9A5D21' : '#ccc'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8EEB9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
  },
  iconButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003300',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  spacer: {
    width: 24,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 20,
  },
  chatHistory: {
    flex: 1,
  },
  chatContent: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  inputContainer: {
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    borderRadius: 25,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  attachButton: {
    padding: 8,
    marginRight: 5,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    marginHorizontal: 8,
    color: '#333',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  sendButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#EFF8E4',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  sendButtonDisabled: {
    backgroundColor: '#f5f5f5',
  },
  dismissContainer: {
    flex: 1,
  },
});
