import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings as SettingsIcon, CircleHelp as HelpCircle, FileText, Phone, Star, Share2, LogOut, Globe, Moon, Bell, Shield, ChevronRight } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { getThemeColors, SPACING, FONT_SIZES, SHADOWS } from '@/constants/theme';
import { LANGUAGES } from '@/constants/data';

export default function SettingsScreen() {
  const { user, theme, language, logout, setLanguage, setTheme } = useApp();
  const colors = getThemeColors(user?.role || 'job_seeker', theme);
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/');
          }
        }
      ]
    );
  };

  const handleLanguageChange = () => {
    Alert.alert(
      'Select Language',
      'Choose your preferred language',
      LANGUAGES.map(lang => ({
        text: `${lang.nativeName} (${lang.name})`,
        onPress: () => setLanguage(lang.code as any)
      }))
    );
  };

  const handleShare = () => {
    Alert.alert(
      'Share WorkTribe',
      'Help others discover WorkTribe - the best platform for connecting workers with employers!'
    );
  };

  const handleRate = () => {
    Alert.alert(
      'Rate WorkTribe',
      'If you love using WorkTribe, please rate us on the app store!'
    );
  };

  const SettingsOption = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showChevron = true,
    danger = false,
    rightElement
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showChevron?: boolean;
    danger?: boolean;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity 
      style={[styles.optionItem, SHADOWS.sm, { backgroundColor: colors.surface }]} 
      onPress={onPress}
    >
      <View style={styles.optionLeft}>
        <View style={[
          styles.optionIcon, 
          { backgroundColor: danger ? '#FEE2E2' : colors.background }
        ]}>
          {icon}
        </View>
        <View style={styles.optionText}>
          <Text style={[
            styles.optionTitle, 
            { color: danger ? '#EF4444' : colors.text }
          ]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.optionSubtitle, { color: colors.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightElement || (showChevron && <ChevronRight size={20} color={colors.textSecondary} />)}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            Manage your preferences and account
          </Text>
        </View>

        {/* User Info */}
        <View style={[styles.userCard, SHADOWS.md, { backgroundColor: colors.surface }]}>
          <View style={styles.userInfo}>
            <View style={[styles.userAvatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.userAvatarText}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={[styles.userName, { color: colors.text }]}>{user?.name}</Text>
              <Text style={[styles.userRole, { color: colors.textSecondary }]}>
                {user?.role === 'employer' ? 'Employer' : 'Job Seeker'}
              </Text>
            </View>
          </View>
          {user?.verified && (
            <View style={[styles.verifiedBadge, { backgroundColor: colors.primary }]}>
              <Shield size={16} color="#fff" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>App Settings</Text>
          
          <SettingsOption
            icon={<Globe size={20} color={colors.primary} />}
            title="Language"
            subtitle={LANGUAGES.find(lang => lang.code === language)?.nativeName || 'English'}
            onPress={handleLanguageChange}
          />

          <SettingsOption
            icon={<Moon size={20} color={colors.primary} />}
            title="Dark Mode"
            subtitle={theme === 'dark' ? 'Enabled' : 'Disabled'}
            rightElement={
              <Switch
                value={theme === 'dark'}
                onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={theme === 'dark' ? '#fff' : colors.textSecondary}
              />
            }
            showChevron={false}
          />

          <SettingsOption
            icon={<Bell size={20} color={colors.primary} />}
            title="Notifications"
            subtitle="Manage your notification settings"
            onPress={() => router.push('/notifications')}
          />

          <SettingsOption
            icon={<SettingsIcon size={20} color={colors.primary} />}
            title="General Settings"
            subtitle="Privacy, security, and more"
          />
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
          
          <SettingsOption
            icon={<HelpCircle size={20} color={colors.primary} />}
            title="Help & FAQ"
            subtitle="Get answers to common questions"
          />

          <SettingsOption
            icon={<Phone size={20} color={colors.primary} />}
            title="Contact Support"
            subtitle="Reach out to our support team"
          />

          <SettingsOption
            icon={<FileText size={20} color={colors.primary} />}
            title="Terms & Conditions"
            subtitle="Read our terms of service"
          />

          <SettingsOption
            icon={<Shield size={20} color={colors.primary} />}
            title="Privacy Policy"
            subtitle="How we protect your data"
          />
        </View>

        {/* Feedback */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Feedback</Text>
          
          <SettingsOption
            icon={<Star size={20} color={colors.primary} />}
            title="Rate WorkTribe"
            subtitle="Help us improve with your feedback"
            onPress={handleRate}
          />

          <SettingsOption
            icon={<Share2 size={20} color={colors.primary} />}
            title="Share WorkTribe"
            subtitle="Tell your friends about WorkTribe"
            onPress={handleShare}
          />
        </View>

        {/* Account */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          
          <SettingsOption
            icon={<LogOut size={20} color="#EF4444" />}
            title="Logout"
            subtitle="Sign out of your account"
            onPress={handleLogout}
            danger
          />
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appName, { color: colors.text }]}>WorkTribe</Text>
          <Text style={[styles.appVersion, { color: colors.textSecondary }]}>Version 1.0.0</Text>
          <Text style={[styles.appTagline, { color: colors.textSecondary }]}>
            Connecting Workers to Work
          </Text>
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.sm,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
    padding: SPACING.md,
    borderRadius: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  userAvatarText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: '#fff',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  userRole: {
    fontSize: FONT_SIZES.sm,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
    gap: SPACING.xs,
  },
  verifiedText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: '#fff',
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
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
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  appName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  appVersion: {
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.xs,
  },
  appTagline: {
    fontSize: FONT_SIZES.sm,
    fontStyle: 'italic',
  },
});