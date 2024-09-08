  import React from 'react';
  import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
  import { useRouter } from 'expo-router';
  import MaterialIcons from '@expo/vector-icons/MaterialIcons';
  import Entypo from '@expo/vector-icons/Entypo';
  interface RadioButtonProps {
    selected: boolean;
  }

  const RadioButton: React.FC<RadioButtonProps> = ({ selected }) => (
    <View style={[
      styles.radioButton,
      selected && styles.radioButtonSelected
    ]}>
      {selected && <View style={styles.radioButtonInner} />}
    </View>
  );

  export default function PlantAppPremiumScreen() {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = React.useState('1 Year');

    const handleClose = () => {
      router.back();
    };

    const handleSelect = (option: string) => {
      setSelectedOption(option);
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topHalf}>
          <Image
            source={require('./photos/backgroundpaywall.png')}
            style={styles.backgroundImage}
          />
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          
          <Text style={styles.title}>PlantApp Premium</Text>
          <Text style={styles.subtitle}>Access All Features</Text>
          
          <View style={styles.featuresContainer}>
            <View style={styles.featureBox}>
            <Entypo name="time-slot" size={26} color="white"  />
              <Text style={styles.featureTitle}>Unlimited</Text>
              <Text style={styles.featureSubtitle}>Plant Identify</Text>
            </View>
            <View style={styles.featureBox}>
            <MaterialIcons name="speed" size={30} color="white" />
              <Text style={styles.featureTitle}>Faster</Text>
              <Text style={styles.featureSubtitle}>Process</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.bottomHalf}>
          <View style={styles.pricingContainer}>
            <TouchableOpacity
              style={[
                styles.pricingOption,
                selectedOption === '1 Month' && styles.selectedOption
              ]}
              onPress={() => handleSelect('1 Month')}
            >
              <View style={styles.optionContent}>
                <RadioButton selected={selectedOption === '1 Month'} />
                <View style={styles.textContainer}>
                  <Text style={styles.pricingText}>1 Month</Text>
                  <Text style={styles.pricingSubtext}>$2.99/month, auto renewable</Text>
                </View>
                
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.pricingOption,
                selectedOption === '1 Year' && styles.selectedOption
              ]}
              onPress={() => handleSelect('1 Year')}
            >
              <View style={styles.optionContent}>
                <RadioButton selected={selectedOption === '1 Year'} />
                <View style={styles.textContainer}>
                  <Text style={styles.pricingText}>1 Year</Text>
                  <Text style={styles.pricingSubtext}>First 3 days free, then $29.99/year</Text>
                </View>
                <View style={styles.saveBadge}>
                  <Text style={styles.saveBadgeText}>Save 50%</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.trialButton}>
            <Text style={styles.trialButtonText}>Try free for 3 days</Text>
          </TouchableOpacity>
          
          <Text style={styles.disclaimer}>After the 3-day free trial period you'll be charged $29.99 per year unless you cancel before the trial expires. Yearly subscription is Auto-renewable</Text>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Terms • Privacy • Restore</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#101E17',
    },
    topHalf: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 20,  
    },
    bottomHalf: {
      flex: 1,
      backgroundColor: '#101E17',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
      justifyContent: 'space-between',
    },
    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      zIndex: 1,
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#fff',
      marginTop: 150,
    },
    subtitle: {
      fontSize: 16,
      color: '#8E8E8E',
      marginTop: 5,
    },
    featuresContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 'auto',
      marginBottom: 20,
    },
    featureBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderRadius: 14,
      padding: 16,
      width: '48%',
      height: '150%',
    },
    featureTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    featureSubtitle: {
      fontSize: 16,
      color: '#8E8E8E',
    },
    pricingContainer: {
      marginTop: 20,
    },
    pricingOption: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 14,
      padding: 16,
      marginBottom: 10,
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    selectedOption: {
      borderColor: '#4caf50',
    },
    optionContent: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
    radioButton: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#ddd',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    radioButtonSelected: {
      borderColor: '#4caf50',
    },
    radioButtonInner: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#4caf50',
    },
    textContainer: {
      flex: 1,
    },
    saveBadge: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: '#4caf50',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      zIndex: 1, // Ensure the badge is above other content
    },
    saveBadgeText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 12,
    },
    pricingText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
    pricingSubtext: {
      fontSize: 13,
      color: 'rgba(255, 255, 255, 0.7)',
    },
    trialButton: {
      backgroundColor: '#4caf50',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginTop: 10,
    },
    trialButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    disclaimer: {
      fontSize: 11,
      color: 'rgba(255, 255, 255, 0.7)',
      textAlign: 'center',
      marginTop: 15,
      paddingHorizontal: 20,
    },
    footer: {
      marginTop: 'auto',
      alignItems: 'center',
    },
    footerText: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 12,
    },
  });
