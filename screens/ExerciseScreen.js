import { ResizeMode, Video } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { exercises } from '../data/exercises';

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = width * 0.5625; // 16:9 aspect ratio

export default function ExerciseScreen({ route }) {
  const { exerciseId } = route.params;
  const exercise = exercises[exerciseId];
  const videoRef = useRef(null);
  
  // Timer State
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.videoContainer}>
        {exercise.videoSource ? (
          <Video
            ref={videoRef}
            style={styles.video}
            source={exercise.videoSource}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
          />
        ) : (
          <View style={styles.videoPlaceholder}>
            <Text style={styles.placeholderText}>Video Placeholder</Text>
            <Text style={styles.placeholderSubText}>(User needs to add video file)</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{exercise.name}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.chip}>
             <Text style={styles.chipText}>{exercise.type === 'reps' ? 'Reps Based' : 'Time Based'}</Text>
          </View>
          <View style={[styles.chip, styles.chipAccent]}>
            <Text style={styles.chipTextAccent}>
              {exercise.sets} Sets
            </Text>
          </View>
          <View style={[styles.chip, styles.chipAccent]}>
             <Text style={styles.chipTextAccent}>
               {exercise.type === 'reps' ? `${exercise.reps} Reps` : `${exercise.duration}s Target`}
             </Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>Instructions</Text>
        <Text style={styles.description}>{exercise.description}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>Timer</Text>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
          
          <View style={styles.timerControls}>
            <TouchableOpacity 
              style={[styles.button, isActive ? styles.buttonPause : styles.buttonStart]}
              onPress={toggleTimer}
            >
              <Text style={styles.buttonText}>{isActive ? 'PAUSE' : 'START'}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.buttonReset]}
              onPress={resetTimer}
            >
              <Text style={[styles.buttonText, styles.textSecondary]}>RESET</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  videoContainer: {
    width: width,
    height: VIDEO_HEIGHT,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#555',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholderSubText: {
    color: '#444',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  chip: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
  },
  chipAccent: {
    backgroundColor: 'rgba(255, 75, 75, 0.2)',
  },
  chipText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  chipTextAccent: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.card,
    marginVertical: 25,
  },
  timerContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 24,
    borderRadius: 16,
  },
  timerText: {
    fontSize: 56,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
    color: COLORS.text,
    marginBottom: 20,
  },
  timerControls: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120,
  },
  buttonStart: {
    backgroundColor: COLORS.primary,
  },
  buttonPause: {
    backgroundColor: COLORS.accent,
  },
  buttonReset: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  buttonText: {
    color: '#000', // for start/pause which have bright bg
    fontWeight: 'bold',
    fontSize: 16,
  },
  textSecondary: {
    color: COLORS.text, // Reset button is dark bg
  }
});
