import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Clock, DollarSign, Plus, Filter } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { getThemeColors, SPACING, FONT_SIZES, SHADOWS } from '@/constants/theme';
import { SAMPLE_JOB_POSTS, JOB_CATEGORIES } from '@/constants/data';
import { JobPost } from '@/types';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [jobPosts, setJobPosts] = useState(SAMPLE_JOB_POSTS);
  const { user, theme } = useApp();
  const colors = getThemeColors(user?.role || 'job_seeker', theme);
  const router = useRouter();

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleJobPress = (job: JobPost) => {
    router.push(`/job-details/${job.id}`);
  };

  const handlePostJob = () => {
    router.push('/post-job');
  };

  const renderJobCard = ({ item }: { item: JobPost }) => {
    const categoryInfo = JOB_CATEGORIES.find(cat => cat.key === item.category);
    const daysAgo = Math.floor((new Date().getTime() - item.createdAt.getTime()) / (1000 * 3600 * 24));

    return (
      <TouchableOpacity 
        style={[styles.jobCard, SHADOWS.md, { backgroundColor: colors.surface }]}
        onPress={() => handleJobPress(item)}
      >
        <View style={styles.jobCardHeader}>
          <View style={styles.jobInfo}>
            <Text style={[styles.jobTitle, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.jobCategory, { color: colors.textSecondary }]}>
              {categoryInfo?.label}
            </Text>
          </View>
          <View style={[styles.salaryBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.salaryText}>
              ₹{item.salary.amount}/{item.salary.type === 'monthly' ? 'mo' : item.salary.type === 'daily' ? 'day' : 'hr'}
            </Text>
          </View>
        </View>

        <View style={styles.jobDetails}>
          <View style={styles.detailItem}>
            <MapPin size={16} color={colors.textSecondary} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              {item.location.address}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color={colors.textSecondary} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              {daysAgo === 0 ? 'Today' : `${daysAgo} days ago`}
            </Text>
          </View>
        </View>

        <Text style={[styles.jobDescription, { color: colors.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>

        <TouchableOpacity style={[styles.applyButton, { backgroundColor: colors.primary }]}>
          <Text style={styles.applyButtonText}>
            {user?.role === 'employer' ? 'View Details' : 'Apply Now'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>{user?.name || 'User'}</Text>
            </View>
            <TouchableOpacity 
              style={styles.headerAction}
              onPress={user?.role === 'employer' ? handlePostJob : undefined}
            >
              {user?.role === 'employer' ? (
                <Plus color="#fff" size={24} />
              ) : (
                <Filter color="#fff" size={24} />
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={[styles.statCard, SHADOWS.sm, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>
            {user?.role === 'employer' ? '12' : '25'}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            {user?.role === 'employer' ? 'Active Posts' : 'Jobs Available'}
          </Text>
        </View>
        <View style={[styles.statCard, SHADOWS.sm, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>
            {user?.role === 'employer' ? '8' : '3'}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            {user?.role === 'employer' ? 'Applications' : 'Applications'}
          </Text>
        </View>
        <View style={[styles.statCard, SHADOWS.sm, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>
            {user?.role === 'employer' ? '5' : '15'}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            {user?.role === 'employer' ? 'Hired' : 'Nearby Jobs'}
          </Text>
        </View>
      </View>

      {/* Job Feed */}
      <View style={styles.jobFeedSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {user?.role === 'employer' ? 'Recent Applications' : 'Jobs for You'}
          </Text>
          <TouchableOpacity>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={jobPosts}
          renderItem={renderJobCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
          contentContainerStyle={styles.jobList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: SPACING.md,
  },
  headerGradient: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: FONT_SIZES.md,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  jobFeedSection: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  jobList: {
    paddingBottom: SPACING.xl,
  },
  jobCard: {
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  jobCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  jobCategory: {
    fontSize: FONT_SIZES.sm,
  },
  salaryBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
  },
  salaryText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: '#fff',
  },
  jobDetails: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
    gap: SPACING.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  detailText: {
    fontSize: FONT_SIZES.xs,
  },
  jobDescription: {
    fontSize: FONT_SIZES.sm,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  applyButton: {
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: '#fff',
  },
});