import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CreditCard as Edit, MapPin, Briefcase, Star, Phone, Mail, Camera, Shield, ChevronRight } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { getThemeColors, SPACING, FONT_SIZES, SHADOWS } from '@/constants/theme';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const { user, theme, setTheme } = useApp();
  const colors = getThemeColors(user?.role || 'job_seeker', theme);
  const router = useRouter();

  const ProfileStats = () => (
    <View style={styles.statsContainer}>
      <View style={[styles.statItem, { backgroundColor: colors.surface }]}>
        <Text style={[styles.statNumber, { color: colors.primary }]}>
          {user?.role === 'employer' ? '12' : '8'}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
          {user?.role === 'employer' ? 'Jobs Posted' : 'Applications'}
        </Text>
      </View>
      <View style={[styles.statItem, { backgroundColor: colors.surface }]}>
        <Text style={[styles.statNumber, { color: colors.primary }]}>
          {user?.role === 'employer' ? '4.8' : '4.6'}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Rating</Text>
      </View>
      <View style={[styles.statItem, { backgroundColor: colors.surface }]}>
        <Text style={[styles.statNumber, { color: colors.primary }]}>
          {user?.role === 'employer' ? '85' : '25'}
        </Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
          {user?.role === 'employer' ? 'Hired' : 'Completed'}
        </Text>
      </View>
    </View>
  );

  const ProfileOption = ({ icon, title, subtitle, onPress, rightElement }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity style={[styles.optionItem, SHADOWS.sm, { backgroundColor: colors.surface }]} onPress={onPress}>
      <View style={styles.optionLeft}>
        <View style={[styles.optionIcon, { backgroundColor: colors.background }]}>
          {icon}
        </View>
        <View style={styles.optionText}>
          <Text style={[styles.optionTitle, { color: colors.text }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.optionSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
          )}
        </View>
      </View>
      {rightElement || <ChevronRight size={20} color={colors.textSecondary} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <View style={[styles.profileImage, { backgroundColor: colors.primary }]}>
              <Text style={styles.profileImageText}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
            <TouchableOpacity style={[styles.cameraButton, { backgroundColor: colors.surface }]}>
              <Camera size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>{user?.name}</Text>
            <View style={styles.profileDetails}>
              <MapPin size={16} color={colors.textSecondary} />
              <Text style={[styles.profileLocation, { color: colors.textSecondary }]}>
                {user?.city}
              </Text>
            </View>
            <View style={styles.profileDetails}>
              <Briefcase size={16} color={colors.textSecondary} />
              <Text style={[styles.profileRole, { color: colors.textSecondary }]}>
                {user?.role === 'employer' ? 'Employer' : 'Job Seeker'}
              </Text>
            </View>
            {user?.verified && (
              <View style={styles.verifiedBadge}>
                <Shield size={16} color={colors.primary} />
                <Text style={[styles.verifiedText, { color: colors.primary }]}>Verified</Text>
              </View>
            )}
          </View>
        </View>

        {/* Stats */}
        <ProfileStats />

        {/* Profile Options */}
        <View style={styles.optionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Profile</Text>
          
          <ProfileOption
            icon={<Edit size={20} color={colors.primary} />}
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={() => router.push('/profile/edit')}
          />

          <ProfileOption
            icon={<Briefcase size={20} color={colors.primary} />}
            title={user?.role === 'employer' ? 'My Job Posts' : 'My Applications'}
            subtitle={user?.role === 'employer' ? 'Manage your job listings' : 'Track your job applications'}
            onPress={() => router.push(user?.role === 'employer' ? '/profile/job-posts' : '/profile/applications')}
          />

          <ProfileOption
            icon={<Star size={20} color={colors.primary} />}
            title="Reviews & Ratings"
            subtitle="See what others are saying"
          />
        </View>

        {/* Settings */}
        <View style={styles.optionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
          
          <ProfileOption
            icon={<Phone size={20} color={colors.primary} />}
            title="Notifications"
            subtitle="Manage your notification preferences"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={notificationsEnabled ? '#fff' : colors.textSecondary}
              />
            }
          />

          <ProfileOption
            icon={<MapPin size={20} color={colors.primary} />}
            title="Location Services"
            subtitle="Allow location access for better job matching"
            rightElement={
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={locationEnabled ? '#fff' : colors.textSecondary}
              />
            }
          />

          <ProfileOption
            icon={<Mail size={20} color={colors.primary} />}
            title="Dark Mode"
            subtitle="Switch to dark theme"
            rightElement={
              <Switch
                value={theme === 'dark'}
                onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={theme === 'dark' ? '#fff' : colors.textSecondary}
              />
            }
          />
        </View>

        {/* Support */}
        <View style={styles.optionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
          
          <ProfileOption
            icon={<Phone size={20} color={colors.primary} />}
            title="Help & Support"
            subtitle="Get help with your account"
          />

          <ProfileOption
            icon={<Mail size={20} color={colors.primary} />}
            title="Contact Us"
            subtitle="Reach out to our support team"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: SPACING.md,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: '#fff',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
    gap: SPACING.xs,
  },
  profileLocation: {
    fontSize: FONT_SIZES.sm,
  },
  profileRole: {
    fontSize: FONT_SIZES.sm,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  verifiedText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
    gap: SPACING.sm,
  },
  statItem: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  optionsSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  optionItem: {
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  optionSubtitle: {
    fontSize: FONT_SIZES.sm,
  },
});