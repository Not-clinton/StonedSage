import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useChatStore } from '../store/chatStore';

interface PersonalitiesProps {
  isVisible: boolean;
  onClose: () => void;
}

const Personalities: React.FC<PersonalitiesProps> = ({ isVisible, onClose }) => {
  const { setSelectedPersonality, setSidebarVisible } = useChatStore();

  const screenWidth = Dimensions.get('window').width;
  const sidebarWidth = screenWidth * 0.7;

  const personalities = [
    { title: 'Doctor', icon: '👨‍⚕️' },
    { title: 'Lawyer', icon: '⚖️' },
    { title: 'Musician', icon: '🎵' },
    { title: 'Artist', icon: '🎨' },
    { title: 'Chef', icon: '👨‍🍳' },
    { title: 'Teacher', icon: '👩‍🏫' },
    { title: 'Scientist', icon: '🔬' },
    { title: 'Psychologist', icon: '🧠' },
    { title: 'Philosopher', icon: '🧘‍♂️' },
    { title: 'Comedian', icon: '😂' },  ];

  const handlePersonalitySelect = (personality: string) => {
    setSelectedPersonality(personality);
  };

  return (
    <>
      {isVisible && (
        <>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={onClose}
          />
          <View 
            style={[styles.sidebar, { width: sidebarWidth }]}
            onTouchStart={e => e.stopPropagation()}
          >
            <View style={styles.searchContainer}>
              <FontAwesome name="search" size={20} color="#9A5D21" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#9A5D21"
              />
            </View>

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>🎭 Choose your personality</Text>
              {personalities.map((item, index) => (
                <TouchableOpacity key={index} style={styles.personalityItem} onPress={() => handlePersonalitySelect(item.title)}>
                  <Text style={styles.personalityIcon}>{item.icon}</Text>
                  <Text style={styles.personalityText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#9A5D21',
    padding: 20,
    paddingTop: 60,
    zIndex: 1001,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF8E4',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#9A5D21',
    padding: 0, 
  },
  categoryContainer: {
    backgroundColor: '#EFF8E4',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9A5D21',
    marginBottom: 15,
  },
  personalityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAC48F',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  personalityIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  personalityText: {
    fontSize: 16,
    color: '#9A5D21',
    fontWeight: '500',
  }
});

export default Personalities;