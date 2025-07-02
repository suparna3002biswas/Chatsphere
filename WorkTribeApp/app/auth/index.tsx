import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/contexts/AppContext';
import { COLORS, SPACING, FONT_SIZES, getThemeColors } from '@/constants/theme';

export default function AuthScreen() {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    city: '',
    gender: '' as 'male' | 'female' | 'other' | '',
  });

  const { role } = useLocalSearchParams<{ role: 'job_seeker' | 'employer' }>();
  const router = useRouter();
  const { login } = useApp();

  const colors = getThemeColors(role || 'job_seeker', 'light');

  const handleSendOTP = () => {
    if (phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    // Simulate OTP sending
    Alert.alert('OTP Sent', `Verification code sent to ${phone}`);
    setStep('otp');
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter the 6-digit OTP');
      return;
    }
    // Simulate OTP verification
    if (otp === '123456') {
      setStep('profile');
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  const handleCompleteProfile = () => {
    if (!profile.name || !profile.age || !profile.city || !profile.gender) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Create user and login
    const user = {
      id: Date.now().toString(),
      name: profile.name,
      phone: phone,
      role: role || 'job_seeker',
      city: profile.city,
      age: parseInt(profile.age),
      gender: profile.gender,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    login(user);
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>
            {role === 'employer' ? 'Employer' : 'Job Seeker'} Registration
          </Text>
          <Text style={styles.headerSubtitle}>
            {step === 'phone' && 'Enter your phone number'}
            {step === 'otp' && 'Verify your phone number'}
            {step === 'profile' && 'Complete your profile'}
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {step === 'phone' && (
          <View style={styles.form}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleSendOTP}
            >
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'otp' && (
          <View style={styles.form}>
            <Text style={styles.label}>Enter OTP</Text>
            <Text style={styles.helper}>
              6-digit code sent to +91 {phone}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleVerifyOTP}
            >
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={handleSendOTP}
            >
              <Text style={[styles.linkText, { color: colors.primary }]}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'profile' && (
          <View style={styles.form}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={profile.name}
              onChangeText={(text) => setProfile({ ...profile, name: text })}
            />

            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              value={profile.age}
              onChangeText={(text) => setProfile({ ...profile, age: text })}
              keyboardType="number-pad"
            />

            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your city"
              value={profile.city}
              onChangeText={(text) => setProfile({ ...profile, city: text })}
            />

            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
              {['male', 'female', 'other'].map((gender) => (
                <TouchableOpacity
                  key={gender}
                  style={[
                    styles.genderButton,
                    profile.gender === gender && { backgroundColor: colors.primary }
                  ]}
                  onPress={() => setProfile({ ...profile, gender: gender as any })}
                >
                  <Text style={[
                    styles.genderButtonText,
                    profile.gender === gender && { color: COLORS.common.white }
                  ]}>
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleCompleteProfile}
            >
              <Text style={styles.buttonText}>Complete Registration</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.common.white,
  },
  header: {
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.common.white,
    marginBottom: SPACING.sm,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.common.white,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.jobSeeker.text,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.jobSeeker.border,
    borderRadius: 8,
    marginBottom: SPACING.lg,
  },
  countryCode: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.jobSeeker.text,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRightWidth: 1,
    borderRightColor: COLORS.jobSeeker.border,
  },
  phoneInput: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.jobSeeker.border,
    borderRadius: 8,
    fontSize: FONT_SIZES.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.lg,
  },
  helper: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.jobSeeker.textSecondary,
    marginBottom: SPACING.md,
  },
  button: {
    borderRadius: 8,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  buttonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.common.white,
  },
  linkButton: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  linkText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  genderButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.jobSeeker.border,
    alignItems: 'center',
  },
  genderButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.jobSeeker.text,
  },
});