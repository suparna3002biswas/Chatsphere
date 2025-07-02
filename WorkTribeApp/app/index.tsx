import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/contexts/AppContext';
import { COLORS, SPACING, FONT_SIZES } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useApp();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
      return;
    }

    const timer = setTimeout(() => {
      setShowRoleSelection(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  const handleRoleSelect = (role: 'job_seeker' | 'employer') => {
    router.push(`/auth?role=${role}`);
  };

  if (!showRoleSelection) {
    return (
      <LinearGradient
        colors={[COLORS.jobSeeker.primary, COLORS.jobSeeker.primaryLight]}
        style={styles.splashContainer}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>WT</Text>
          </View>
          <Text style={styles.appName}>WorkTribe</Text>
          <Text style={styles.tagline}>Connecting Workers to Work</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.miniLogo}>
          <Text style={styles.miniLogoText}>WT</Text>
        </View>
        <Text style={styles.headerTitle}>WorkTribe</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>How do you want to use WorkTribe?</Text>
        <Text style={styles.subtitle}>Choose your role to get started</Text>

        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[styles.roleButton, styles.jobSeekerButton]}
            onPress={() => handleRoleSelect('job_seeker')}
          >
            <LinearGradient
              colors={[COLORS.jobSeeker.primary, COLORS.jobSeeker.primaryLight]}
              style={styles.roleButtonGradient}
            >
              <View style={styles.roleIcon}>
                <Text style={styles.roleIconText}>🔍</Text>
              </View>
              <Text style={styles.roleButtonTitle}>I want to work</Text>
              <Text style={styles.roleButtonSubtitle}>Find jobs that match your skills</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleButton, styles.employerButton]}
            onPress={() => handleRoleSelect('employer')}
          >
            <LinearGradient
              colors={[COLORS.employer.primary, COLORS.employer.primaryLight]}
              style={styles.roleButtonGradient}
            >
              <View style={styles.roleIcon}>
                <Text style={styles.roleIconText}>👥</Text>
              </View>
              <Text style={styles.roleButtonTitle}>I want to hire</Text>
              <Text style={styles.roleButtonSubtitle}>Post jobs and find workers</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.common.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.jobSeeker.primary,
  },
  appName: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.common.white,
    marginBottom: SPACING.sm,
  },
  tagline: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.common.white,
    opacity: 0.9,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.common.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.lg,
  },
  miniLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.jobSeeker.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  miniLogoText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.common.white,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.jobSeeker.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.jobSeeker.text,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.jobSeeker.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
  },
  roleContainer: {
    gap: SPACING.lg,
  },
  roleButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  jobSeekerButton: {
    shadowColor: COLORS.jobSeeker.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  employerButton: {
    shadowColor: COLORS.employer.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  roleButtonGradient: {
    padding: SPACING.xl,
    alignItems: 'center',
    minHeight: 160,
    justifyContent: 'center',
  },
  roleIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.common.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  roleIconText: {
    fontSize: 24,
  },
  roleButtonTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.common.white,
    marginBottom: SPACING.xs,
  },
  roleButtonSubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.common.white,
    opacity: 0.9,
    textAlign: 'center',
  },
});