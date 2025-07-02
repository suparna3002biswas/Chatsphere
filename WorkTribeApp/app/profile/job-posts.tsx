import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Clock, Users, Eye, Plus } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { getThemeColors, SPACING, FONT_SIZES, SHADOWS } from '@/constants/theme';
import { SAMPLE_JOB_POSTS, JOB_CATEGORIES } from '@/constants/data';

interface JobPostWithApplicants {
  id: string;
  title: string;
  category: string;
  location: string;
  postedDate: Date;
  applicantsCount: number;
  salary: number;
  salaryType: string;
  isActive: boolean;
}

const SAMPLE_JOB_POSTS_WITH_APPLICANTS: JobPostWithApplicants[] = [
  {
    id: '1',
    title: 'House Maid Required',
    category: 'maid',
    location: 'Sector 15, Gurgaon',
    postedDate: new Date('2024-01-15'),
    applicantsCount: 12,
    salary: 8000,
    salaryType: 'monthly',
    isActive: true
  },
  {
    id: '2',
    title: 'Personal Driver Needed',
    category: 'driver',
    location: 'Koramangala, Bangalore',
    postedDate: new Date('2024-01-14'),
    applicantsCount: 8,
    salary: 15000,
    salaryType: 'monthly',
    isActive: true
  },
  {
    id: '3',
    title: 'Cook for Restaurant',
    category: 'cook',
    location: 'Connaught Place, Delhi',
    postedDate: new Date('2024-01-13'),
    applicantsCount: 5,
    salary: 800,
    salaryType: 'daily',
    isActive: false
  }
];

export default function JobPostsScreen() {
  const [jobPosts] = useState<JobPostWithApplicants[]>(SAMPLE_JOB_POSTS_WITH_APPLICANTS);
  const { user, theme } = useApp();
  const colors = getThemeColors(user?.role || 'job_seeker', theme);
  const router = useRouter();

  const handleViewApplicants = (jobId: string) => {
    router.push(`/applicants/${jobId}`);
  };

  const renderJobPost = ({ item }: { item: JobPostWithApplicants }) => {
    const categoryInfo = JOB_CATEGORIES.find(cat => cat.key === item.category);
    const daysAgo = Math.floor((new Date().getTime() - item.postedDate.getTime()) / (1000 * 3600 * 24));

    return (
      <TouchableOpacity style={[styles.jobCard, SHADOWS.sm, { backgroundColor: colors.surface }]}>
        <View style={styles.jobHeader}>
          <View style={styles.jobInfo}>
            <Text style={[styles.jobTitle, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.jobCategory, { color: colors.textSecondary }]}>
              {categoryInfo?.icon} {categoryInfo?.label}
            </Text>
          </View>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: item.isActive ? colors.primary + '20' : colors.textSecondary + '20' }
          ]}>
            <Text style={[
              styles.statusText, 
              { color: item.isActive ? colors.primary : colors.textSecondary }
            ]}>
              {item.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>

        <View style={styles.jobDetails}>
          <View style={styles.detailItem}>
            <MapPin size={16} color={colors.textSecondary} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              {item.location}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color={colors.textSecondary} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              Posted {daysAgo === 0 ? 'today' : `${daysAgo} days ago`}
            </Text>
          </View>
        </View>

        <View style={styles.jobStats}>
          <View style={styles.statItem}>
            <Users size={16} color={colors.primary} />
            <Text style={[styles.statText, { color: colors.primary }]}>
              {item.applicantsCount} applicants
            </Text>
          </View>
          <Text style={[styles.salaryText, { color: colors.text }]}>
            ₹{item.salary}/{item.salaryType === 'monthly' ? 'month' : item.salaryType === 'daily' ? 'day' : 'hour'}
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.viewButton, { backgroundColor: colors.primary }]}
          onPress={() => handleViewApplicants(item.id)}
        >
          <Eye size={16} color="#fff" />
          <Text style={styles.viewButtonText}>View Applicants</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const activeJobs = jobPosts.filter(job => job.isActive).length;
  const totalApplicants = jobPosts.reduce((sum, job) => sum + job.applicantsCount, 0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Job Posts</Text>
        <TouchableOpacity onPress={() => router.push('/post-job')} style={styles.addButton}>
          <Plus size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, SHADOWS.sm, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>{jobPosts.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Posts</Text>
        </View>
        <View style={[styles.statCard, SHADOWS.sm, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>{activeJobs}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Active</Text>
        </View>
        <View style={[styles.statCard, SHADOWS.sm, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>{totalApplicants}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Applicants</Text>
        </View>
      </View>

      {/* Job Posts List */}
      <View style={styles.content}>
        {jobPosts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No job posts yet</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              Start posting jobs to find the right candidates
            </Text>
            <TouchableOpacity 
              style={[styles.postJobButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/post-job')}
            >
              <Plus size={20} color="#fff" />
              <Text style={styles.postJobButtonText}>Post Your First Job</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={jobPosts}
            renderItem={renderJobPost}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.jobsList}
          />
        )}
      </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  addButton: {
    padding: SPACING.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  statCard: {
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
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  jobsList: {
    paddingBottom: SPACING.xl,
  },
  jobCard: {
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  jobHeader: {
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
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
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
  jobStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  salaryText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    gap: SPACING.xs,
  },
  viewButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: '#fff',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.sm,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.xl,
  },
  postJobButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    gap: SPACING.sm,
  },
  postJobButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: '#fff',
  },
});