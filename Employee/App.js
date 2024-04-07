import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StacksBar from './StackNavigator';
import { UserContext } from './UserContext';
export default function App() {
  return (
    <UserContext>
      <StacksBar />
    </UserContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
