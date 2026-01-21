import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { exercises } from '../data/exercises';
import { workoutPlan } from '../data/workoutPlan';

export default function WorkoutScreen({ route, navigation }) {
  const { day } = route.params;
  const plan = workoutPlan[day];
  
  const dailyExercises = plan.exercises.map(id => exercises[id]);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity 
        style={styles.cardContainer}
        onPress={() => navigation.navigate('Exercise', { exerciseId: item.id })}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[COLORS.card, '#2a2a2a']}
          style={styles.card}
        >
          <View style={styles.numberContainer}>
             <Text style={styles.number}>{index + 1}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseMeta}>
              {item.sets ? `${item.sets} Sets • ` : ''} 
              {item.type === 'reps' ? `${item.reps} Reps` : `${item.duration} Seconds`}
            </Text>
          </View>
          <View style={styles.iconContainer}>
             <Text style={styles.arrow}>→</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{plan.title}</Text>
        <Text style={styles.headerSubtitle}>{dailyExercises.length} Exercises</Text>
      </View>

      {dailyExercises.length > 0 ? (
        <FlatList
          data={dailyExercises}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
           <Text style={styles.emptyText}>Rest Day - Enjoy your recovery!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  listContent: {
    padding: 16,
  },
  cardContainer: {
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  numberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 75, 75, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  contentContainer: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  exerciseMeta: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    color: COLORS.textSecondary,
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 18,
  }
});
