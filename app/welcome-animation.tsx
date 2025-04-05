import { Text, View, StyleSheet, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function WelcomeAnimation() {
  const router = useRouter();
  const [showWelcomeText, setShowWelcomeText] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.timing(contentOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setShowWelcomeText(true);
      setTimeout(() => router.replace('/'), 2000);
    });
  };

  const eclipseScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1.2, 3.5], 
  });

  const eclipsePosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT * 0.55, -SCREEN_HEIGHT * 0.4],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.screen, { opacity: contentOpacity }]}>
        <Text style={styles.topText}>SPENDING LIKE A</Text>
        <Text style={styles.millionaireText}>MILLIONAIRE?</Text>
      </Animated.View>

      <TouchableWithoutFeedback onPress={handlePress}>
        <Animated.View
          style={[
            styles.eclipse,
            {
              transform: [
                { translateY: eclipsePosition },
                { scale: eclipseScale }
              ],
            },
          ]}
        >
          <Text style={styles.bottomTextLine1}>DON'T WORRY, I</Text>
          <Text style={styles.bottomTextLine2}>GOT YOU.</Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      {showWelcomeText && (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Your AI-Powered Financial Therapist "Your Coin, Your Kingdom"</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83B63C',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  topText: {
    color: '#003300',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: SCREEN_HEIGHT * 0.2,
  },
  millionaireText: {
    color: '#003300',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: 10,
  },
  eclipse: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    borderRadius: SCREEN_WIDTH / 2,
    backgroundColor: '#D8EEB9',
    left: -SCREEN_WIDTH * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure eclipse stays on top
  },
  bottomTextLine1: {
    color: '#003300',
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  bottomTextLine2: {
    color: '#003300',
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginTop: 5,
  },
  welcomeContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#83B63C',
    zIndex: 2,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#D8EEB9',
  },
});