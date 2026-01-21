import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { workoutPlan } from '../data/workoutPlan';

export default function HomeScreen({ navigation }) {
  const days = Object.keys(workoutPlan);

  const renderDayCard = (day) => {
    const plan = workoutPlan[day];
    const isRestDay = plan.exercises.length === 0;

    return (
      <TouchableOpacity
        key={day}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Workout', { day })}
        style={styles.cardContainer}
      >
        <LinearGradient
          colors={isRestDay ? [COLORS.card, COLORS.card] : [COLORS.primary, COLORS.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardContent}>
            <Text style={[styles.dayText, isRestDay && styles.restDayText]}>{day}</Text>
            <Text style={[styles.titleText, isRestDay && styles.restTitleText]}>{plan.title}</Text>
          </View>
          {!isRestDay && (
             <View style={styles.iconContainer}>
               <Text style={styles.icon}>→</Text>
             </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Your Schedule</Text>
        {days.map(day => renderDayCard(day))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
    marginTop: 10,
  },
  cardContainer: {
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 100,
  },
  cardContent: {
    flex: 1,
  },
  dayText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
    marginBottom: 4,
    fontWeight: '600',
  },
  restDayText: {
    color: COLORS.textSecondary,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  restTitleText: {
    color: COLORS.textSecondary,
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
  }
});
