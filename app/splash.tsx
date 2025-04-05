import { Text, View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome-animation');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stoned Sage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83B63C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#003300',
    fontSize: 32,
    fontWeight: 'bold',
  },
}); 