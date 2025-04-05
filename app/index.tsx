import { Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, Image, Keyboard, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import Personalities from './components/Personalities';
import { useChatStore } from './store/chatStore';
import ChatMessage from './components/ChatMessage';

export default function ChatScreen() {
  const {
    messages,
    currentMessage,
    isSidebarVisible,
    setCurrentMessage,
    setSidebarVisible,
    addMessage
  } = useChatStore();

  const router = useRouter();
  const [message, setMessage] = useState('');
  const maxChars = 500; 

  const handleIconPress = () => {
    setSidebarVisible(true);
  };
  
  const handleCloseSidebar = () => {
    setSidebarVisible(false);
  };
  
  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // All file types
        copyToCacheDirectory: true
      });
      
      if (!result.canceled) {
        const file = result.assets[0];
        console.log('File selected:', file.name);
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  const handleSend = () => {
    if (currentMessage.trim()) {
      addMessage(currentMessage.trim(), 'user');
      setCurrentMessage('');
      // Simulate sage response
      setTimeout(() => {
        addMessage('This is a sample response', 'sage');
      }, 1000);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  
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
          <Text style={styles.headerTitle}>Stoned Sage</Text>
          <View style={styles.spacer} />
        </View>
        
        {/* Chat Container */}
        <View style={styles.chatContainer}>
          <ScrollView style={styles.chatHistory}>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                text={message.text}
                sender={message.sender}
              />
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>

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
            placeholder="MESSAGE STONED SAGE..."
            placeholderTextColor="#666"
            value={currentMessage}
            onChangeText={setCurrentMessage}
            multiline
            maxLength={maxChars}
            blurOnSubmit={false}
          />
          
          <TouchableOpacity 
            style={[styles.sendButton, !currentMessage.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!currentMessage.trim()}
          >
            <FontAwesome5 name="paper-plane" size={20} color={currentMessage.trim() ? '#9A5D21' : '#ccc'} />
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
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
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
  },
  chatHistory: {
    flex: 1,
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