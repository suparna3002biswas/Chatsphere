import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Clock, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { getThemeColors, SPACING, FONT_SIZES, SHADOWS } from '@/constants/theme';
import { JOB_CATEGORIES } from '@/constants/data';

interface Application {
  id: string;
  jobTitle: string;
  category: string;
  location: string;
  appliedDate: Date;
  status: 'pending' | 'shortlisted' | 'rejected';
  salary: number;
  salaryType: string;
}

const SAMPLE_APPLICATIONS: Application[] = [
  {
    id: '1',
    jobTitle: 'House Maid Required',
    category: 'maid',
    location: 'Sector 15, Gurgaon',
    appliedDate: new Date('2024-01-15'),
    status: 'shortlisted',
    salary: 8000,
    salaryType: 'monthly'
  },
  {
    id: '2',
    jobTitle: 'Personal Driver Needed',
    category: 'driver',
    location: 'Koramangala, Bangalore',
    appliedDate: new Date('2024-01-14'),
    status: 'pending',
    salary: 15000,
    salaryType: 'monthly'
  },
  {
    id: '3',
    jobTitle: 'Cook for Restaurant',
    category: 'cook',
    location: 'Connaught Place, Delhi',
    appliedDate: new Date('2024-01-13'),
    status: 'rejected',
    salary: 800,
    salaryType: 'daily'
  }
];

export default function ApplicationsScreen() {
  const [applications] = useState<Application[]>(SAMPLE_APPLICATIONS);
  const { user, theme } = useApp();
  const colors = getThemeColors(user?.role || 'job_seeker', theme);
  const router = useRouter();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return <CheckCircle size={20} color="#10B981" />;
      case 'rejected':
        return <XCircle size={20} color="#EF4444" />;
      default:
        return <AlertCircle size={20} color="#F59E0B" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return '#10B981';
      case 'rejected':
        return '#EF4444';
      default:
        return '#F59E0B';
    }
  };

  const renderApplication = ({ item }: { item: Application }) => {
    const categoryInfo = JOB_CATEGORIES.find(cat => cat.key === item.category);
    const daysAgo = Math.floor((new Date().getTime() - item.appliedDate.getTime()) / (1000 * 3600 * 24));

    return (
      <TouchableOpacity style={[styles.applicationCard, SHADOWS.sm, { backgroundColor: colors.surface }]}>
        <View style={styles.applicationHeader}>
          <View style={styles.applicationInfo}>
            <Text style={[styles.jobTitle, { color: colors.text }]}>{item.jobTitle}</Text>
            <Text style={[styles.jobCategory, { color: colors.textSecondary }]}>
              {categoryInfo?.icon} {categoryInfo?.label}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            {getStatusIcon(item.status)}
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.applicationDetails}>
          <View style={styles.detailItem}>
            <MapPin size={16} color={colors.textSecondary} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              {item.location}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color={colors.textSecondary} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              Applied {daysAgo === 0 ? 'today' : `${daysAgo} days ago`}
            </Text>
          </View>
        </View>

        <View style={styles.salaryInfo}>
          <Text style={[styles.salaryText, { color: colors.primary }]}>
            ₹{item.salary}/{item.salaryType === 'monthly' ? 'month' : item.salaryType === 'daily' ? 'day' : 'hour'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const pendingCount = applications.filter(app => app.status === 'pending').length;
  const shortlistedCount = applications.filter(app => app.status === 'shortlisted').length;
  const rejectedCount = applications.filter(app => app.status === 'rejected').length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Applications</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, SHADOWS.sm, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statNumber, { color: '#F59E0B' }]}>{pendingCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Pending</Text>
        </View>
        <View style={[styles.statCard, SHADOWS.sm, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statNumber, { color: '#10B981' }]}>{shortlistedCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Shortlisted</Text>
        </View>
        <View style={[styles.statCard, SHADOWS.sm, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statNumber, { color: '#EF4444' }]}>{rejectedCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Rejected</Text>
        </View>
      </View>

      {/* Applications List */}
      <View style={styles.content}>
        {applications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No applications yet</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              Start applying to jobs to see your applications here
            </Text>
          </View>
        ) : (
          <FlatList
            data={applications}
            renderItem={renderApplication}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.applicationsList}
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
  applicationsList: {
    paddingBottom: SPACING.xl,
  },
  applicationCard: {
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  applicationInfo: {
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
    gap: SPACING.xs,
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  applicationDetails: {
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
  salaryInfo: {
    alignItems: 'flex-end',
  },
  salaryText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
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
  },
});