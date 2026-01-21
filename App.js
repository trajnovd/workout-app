import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from './constants/colors';
import ExerciseScreen from './screens/ExerciseScreen';
import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
            elevation: 0, // Android shadow
            shadowOpacity: 0, // iOS shadow
            borderBottomWidth: 0,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Weekly Plan' }}
        />
        <Stack.Screen 
          name="Workout" 
          component={WorkoutScreen}
          options={({ route }) => ({ title: route.params.day })}
        />
        <Stack.Screen 
          name="Exercise" 
          component={ExerciseScreen}
          options={{ title: 'Exercise' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
