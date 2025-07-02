import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, Clock, DollarSign, Phone, MessageCircle, Bookmark, Share2 } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { getThemeColors, SPACING, FONT_SIZES, SHADOWS } from '@/constants/theme';
import { SAMPLE_JOB_POSTS, JOB_CATEGORIES } from '@/constants/data';

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user, theme } = useApp();
  const colors = getThemeColors(user?.role || 'job_seeker', theme);
  const router = useRouter();

  const job = SAMPLE_JOB_POSTS.find(j => j.id === id);
  const categoryInfo = JOB_CATEGORIES.find(cat => cat.key === job?.category);

  if (!job) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Job not found</Text>
      </SafeAreaView>
    );
  }

  const handleApply = () => {
    if (user?.role === 'job_seeker') {
      setApplied(true);
      Alert.alert('Success', 'Your application has been submitted successfully!');
    }
  };

  const handleContact = () => {
    Alert.alert('Contact', 'Calling employer...');
  };

  const handleMessage = () => {
    router.push('/chat/employer-123');
  };

  const handleSave = () => {
    setSaved(!saved);
    Alert.alert(saved ? 'Removed' : 'Saved', saved ? 'Job removed from saved list' : 'Job saved for later');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Sharing job details...');
  };

  const daysAgo = Math.floor((new Date().getTime() - job.createdAt.getTime()) / (1000 * 3600 * 24));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Job Details</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleSave} style={styles.headerAction}>
            <Bookmark size={20} color={saved ? colors.primary : colors.textSecondary} fill={saved ? colors.primary : 'none'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.headerAction}>
            <Share2 size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Job Header */}
        <View style={[styles.jobHeader, SHADOWS.md, { backgroundColor: colors.surface }]}>
          <View style={styles.jobTitleSection}>
            <Text style={[styles.jobTitle, { color: colors.text }]}>{job.title}</Text>
            <Text style={[styles.jobCategory, { color: colors.textSecondary }]}>
              {categoryInfo?.icon} {categoryInfo?.label}
            </Text>
          </View>
          
          <View style={[styles.salaryBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.salaryText}>
              ₹{job.salary.amount}/{job.salary.type === 'monthly' ? 'month' : job.salary.type === 'daily' ? 'day' : 'hour'}
            </Text>
          </View>
        </View>

        {/* Job Info */}
        <View style={[styles.jobInfo, SHADOWS.sm, { backgroundColor: colors.surface }]}>
          <View style={styles.infoItem}>
            <MapPin size={20} color={colors.primary} />
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Location</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{job.location.address}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Clock size={20} color={colors.primary} />
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Working Hours</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{job.workingHours}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <DollarSign size={20} color={colors.primary} />
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Posted</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {daysAgo === 0 ? 'Today' : `${daysAgo} days ago`}
              </Text>
            </View>
          </View>
        </View>

        {/* Job Description */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Job Description</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {job.description}
          </Text>
        </View>

        {/* Requirements */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Requirements</Text>
          {job.requirements.map((requirement, index) => (
            <View key={index} style={styles.requirementItem}>
              <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
              <Text style={[styles.requirementText, { color: colors.textSecondary }]}>
                {requirement}
              </Text>
            </View>
          ))}
        </View>

        {/* Employer Info */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Employer</Text>
          <View style={styles.employerInfo}>
            <View style={[styles.employerAvatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.employerAvatarText}>E</Text>
            </View>
            <View style={styles.employerDetails}>
              <Text style={[styles.employerName, { color: colors.text }]}>Employer Name</Text>
              <Text style={[styles.employerLocation, { color: colors.textSecondary }]}>
                {job.location.city}, {job.location.state}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomActions, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        {user?.role === 'job_seeker' ? (
          <>
            <TouchableOpacity onPress={handleContact} style={[styles.actionButton, { backgroundColor: colors.background }]}>
              <Phone size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleMessage} style={[styles.actionButton, { backgroundColor: colors.background }]}>
              <MessageCircle size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleApply} 
              style={[styles.applyButton, { backgroundColor: applied ? colors.textSecondary : colors.primary }]}
              disabled={applied}
            >
              <Text style={styles.applyButtonText}>
                {applied ? 'Applied' : 'Apply Now'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={handleContact} style={[styles.actionButton, { backgroundColor: colors.background }]}>
              <Phone size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleMessage} style={[styles.actionButton, { backgroundColor: colors.background }]}>
              <MessageCircle size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => router.push('/applicants/job-123')}
              style={[styles.applyButton, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.applyButtonText}>View Applicants</Text>
            </TouchableOpacity>
          </>
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
    borderBottomColor: '#E5E7EB',
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
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  headerAction: {
    padding: SPACING.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  jobHeader: {
    padding: SPACING.lg,
    borderRadius: 12,
    marginVertical: SPACING.md,
  },
  jobTitleSection: {
    marginBottom: SPACING.md,
  },
  jobTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  jobCategory: {
    fontSize: FONT_SIZES.md,
  },
  salaryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  salaryText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: '#fff',
  },
  jobInfo: {
    padding: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  infoText: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  infoLabel: {
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.xs,
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  section: {
    padding: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZES.md,
    lineHeight: 24,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  bullet: {
    fontSize: FONT_SIZES.lg,
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  requirementText: {
    fontSize: FONT_SIZES.md,
    flex: 1,
    lineHeight: 20,
  },
  employerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  employerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  employerAvatarText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: '#fff',
  },
  employerDetails: {
    flex: 1,
  },
  employerName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  employerLocation: {
    fontSize: FONT_SIZES.sm,
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    gap: SPACING.sm,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  applyButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  applyButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: '#fff',
  },
  errorText: {
    fontSize: FONT_SIZES.lg,
    textAlign: 'center',
    marginTop: SPACING.xxl,
  },
});