import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Phone, MessageCircle, CircleCheck as CheckCircle, Star } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { getThemeColors, SPACING, FONT_SIZES, SHADOWS } from '@/constants/theme';

interface Applicant {
  id: string;
  name: string;
  age: number;
  experience: string;
  skills: string[];
  location: string;
  rating: number;
  phone: string;
  appliedDate: Date;
  status: 'pending' | 'selected' | 'rejected';
}

const SAMPLE_APPLICANTS: Applicant[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    age: 35,
    experience: '5 years driving experience',
    skills: ['Manual transmission', 'Automatic transmission', 'City routes'],
    location: 'Gurgaon',
    rating: 4.8,
    phone: '+91 9876543210',
    appliedDate: new Date('2024-01-15'),
    status: 'pending'
  },
  {
    id: '2',
    name: 'Amit Singh',
    age: 28,
    experience: '3 years driving experience',
    skills: ['Manual transmission', 'Highway driving', 'GPS navigation'],
    location: 'Delhi',
    rating: 4.5,
    phone: '+91 9876543211',
    appliedDate: new Date('2024-01-14'),
    status: 'selected'
  },
  {
    id: '3',
    name: 'Suresh Yadav',
    age: 42,
    experience: '8 years driving experience',
    skills: ['All vehicle types', 'Outstation trips', 'Maintenance'],
    location: 'Noida',
    rating: 4.2,
    phone: '+91 9876543212',
    appliedDate: new Date('2024-01-13'),
    status: 'pending'
  }
];

export default function ApplicantsScreen() {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const [applicants, setApplicants] = useState<Applicant[]>(SAMPLE_APPLICANTS);
  const { user, theme } = useApp();
  const colors = getThemeColors(user?.role || 'job_seeker', theme);
  const router = useRouter();

  const handleSelectApplicant = (applicantId: string) => {
    Alert.alert(
      'Select Applicant',
      'Are you sure you want to select this applicant?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Select',
          onPress: () => {
            setApplicants(prev =>
              prev.map(applicant =>
                applicant.id === applicantId
                  ? { ...applicant, status: 'selected' }
                  : applicant
              )
            );
            Alert.alert('Success', 'Applicant selected successfully!');
          }
        }
      ]
    );
  };

  const handleCall = (phone: string) => {
    Alert.alert('Call', `Calling ${phone}...`);
  };

  const handleMessage = (applicantId: string) => {
    router.push(`/chat/${applicantId}`);
  };

  const renderApplicant = ({ item }: { item: Applicant }) => {
    const daysAgo = Math.floor((new Date().getTime() - item.appliedDate.getTime()) / (1000 * 3600 * 24));

    return (
      <View style={[styles.applicantCard, SHADOWS.sm, { backgroundColor: colors.surface }]}>
        <View style={styles.applicantHeader}>
          <View style={styles.applicantInfo}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
            <View style={styles.applicantDetails}>
              <Text style={[styles.applicantName, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.applicantAge, { color: colors.textSecondary }]}>
                {item.age} years • {item.location}
              </Text>
              <View style={styles.ratingContainer}>
                <Star size={14} color="#F59E0B" fill="#F59E0B" />
                <Text style={[styles.rating, { color: colors.textSecondary }]}>
                  {item.rating} rating
                </Text>
              </View>
            </View>
          </View>
          <View style={[
            styles.statusBadge,
            {
              backgroundColor: item.status === 'selected' ? '#10B981' + '20' :
                             item.status === 'rejected' ? '#EF4444' + '20' : '#F59E0B' + '20'
            }
          ]}>
            <Text style={[
              styles.statusText,
              {
                color: item.status === 'selected' ? '#10B981' :
                       item.status === 'rejected' ? '#EF4444' : '#F59E0B'
              }
            ]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <Text style={[styles.experience, { color: colors.textSecondary }]}>
          {item.experience}
        </Text>

        <View style={styles.skillsContainer}>
          {item.skills.map((skill, index) => (
            <View key={index} style={[styles.skillTag, { backgroundColor: colors.primary + '20' }]}>
              <Text style={[styles.skillText, { color: colors.primary }]}>{skill}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.appliedDate, { color: colors.textSecondary }]}>
          Applied {daysAgo === 0 ? 'today' : `${daysAgo} days ago`}
        </Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.background, borderColor: colors.border }]}
            onPress={() => handleCall(item.phone)}
          >
            <Phone size={16} color={colors.primary} />
            <Text style={[styles.actionButtonText, { color: colors.primary }]}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.background, borderColor: colors.border }]}
            onPress={() => handleMessage(item.id)}
          >
            <MessageCircle size={16} color={colors.primary} />
            <Text style={[styles.actionButtonText, { color: colors.primary }]}>Message</Text>
          </TouchableOpacity>

          {item.status === 'pending' && (
            <TouchableOpacity
              style={[styles.selectButton, { backgroundColor: colors.primary }]}
              onPress={() => handleSelectApplicant(item.id)}
            >
              <CheckCircle size={16} color="#fff" />
              <Text style={styles.selectButtonText}>Select</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const pendingCount = applicants.filter(app => app.status === 'pending').length;
  const selectedCount = applicants.filter(app => app.status === 'selected').length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Applicants</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, SHADOWS.sm, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>{applicants.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total</Text>
        </View>
        <View style={[styles.statCard, SHADOWS.sm, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statNumber, { color: '#F59E0B' }]}>{pendingCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Pending</Text>
        </View>
        <View style={[styles.statCard, SHADOWS.sm, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statNumber, { color: '#10B981' }]}>{selectedCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Selected</Text>
        </View>
      </View>

      {/* Applicants List */}
      <View style={styles.content}>
        {applicants.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No applicants yet</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              Applicants will appear here when they apply to your job
            </Text>
          </View>
        ) : (
          <FlatList
            data={applicants}
            renderItem={renderApplicant}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.applicantsList}
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
  applicantsList: {
    paddingBottom: SPACING.xl,
  },
  applicantCard: {
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  applicantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  applicantInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  avatarText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: '#fff',
  },
  applicantDetails: {
    flex: 1,
  },
  applicantName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  applicantAge: {
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  rating: {
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
  experience: {
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.sm,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  skillTag: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 4,
  },
  skillText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  appliedDate: {
    fontSize: FONT_SIZES.xs,
    marginBottom: SPACING.md,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    borderWidth: 1,
    gap: SPACING.xs,
  },
  actionButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    gap: SPACING.xs,
    flex: 1,
    justifyContent: 'center',
  },
  selectButtonText: {
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
  },
});