import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Onboarding Screen</Text>
      <Button
        title="Go to Paywall"
        onPress={() => router.push('/paywall')}
      />
    </View>
  );
}