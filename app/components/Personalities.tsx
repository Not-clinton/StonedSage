// Personalities.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { useChatStore } from '../store/chatStore';

interface PersonalitiesProps {
  isVisible: boolean;
  onClose: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.7;

const personalities = [
  {
    key: 'littlefinger',
    title: 'Littlefinger',
    icon: '🗡️',
    description: `\"Humble steward of coins and secrets.\" Sly, medieval tone with Westerosi analogies.`
  },
  {
    key: 'mac',
    title: 'Mac',
    icon: '🌿',
    description: `Yo, let's grow your green like premium bud. Stoned-but-wise financial guru.`
  },
  {
    key: 'lawyer',
    title: 'Lawyer',
    icon: '⚖️',
    description: `\"You want a retirement plan or a legacy? Let's draft terms.\" Cocky, strategic.`
  },
  {
    key: 'businessman',
    title: 'Businessman',
    icon: '🚀',
    description: `\"Let's engineer wealth—what's your Mars colony budget?\" Visionary intensity.`
  },
];

const Personalities: React.FC<PersonalitiesProps> = ({ isVisible, onClose }) => {
  const { setSelectedPersonality } = useChatStore();

  const handleSelect = (key: string) => {
    setSelectedPersonality(key as any);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />
      <View style={[styles.sidebar, { width: SIDEBAR_WIDTH }]} onTouchStart={e => e.stopPropagation()}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#9A5D21"
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.header}>Select Your Sage</Text>
          {personalities.map(p => (
            <TouchableOpacity
              key={p.key}
              style={styles.item}
              onPress={() => handleSelect(p.key)}
            >
              <Text style={styles.icon}>{p.icon}</Text>
              <View style={styles.info}>
                <Text style={styles.title}>{p.title}</Text>
                <Text style={styles.desc}>{p.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000
  },
  sidebar: {
    position: 'absolute', top: 0, left: 0, bottom: 0,
    backgroundColor: '#9A5D21', padding: 20, zIndex: 1001
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF8E4',
    borderRadius: 10,
    padding: 12,
    marginTop: 40,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
    color: '#9A5D21',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#9A5D21',
  },
  contentContainer: {
    marginTop: 10,
  },
  header: {
    color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 20
  },
  item: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: '#EFF8E4', borderRadius: 8,
    padding: 12, marginBottom: 10
  },
  icon: {
    fontSize: 24, marginRight: 12
  },
  info: {
    flex: 1
  },
  title: {
    color: '#9A5D21', fontSize: 18, fontWeight: '600'
  },
  desc: {
    color: '#EAC48F', fontSize: 14, fontWeight: '400', marginTop: 4
  }
});

export default Personalities;
