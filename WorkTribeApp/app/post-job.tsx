import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, DollarSign, Clock, FileText } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { getThemeColors, SPACING, FONT_SIZES, SHADOWS } from '@/constants/theme';
import { JOB_CATEGORIES } from '@/constants/data';
import { JobCategory } from '@/types';

export default function PostJobScreen() {
  const [jobData, setJobData] = useState({
    title: '',
    category: '' as JobCategory | '',
    description: '',
    salary: '',
    salaryType: 'monthly' as 'hourly' | 'daily' | 'monthly',
    workingHours: '',
    location: '',
    requirements: '',
  });

  const { user, theme } = useApp();
  const colors = getThemeColors(user?.role || 'job_seeker', theme);
  const router = useRouter();

  const handlePostJob = () => {
    if (!jobData.title || !jobData.category || !jobData.description || !jobData.salary || !jobData.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Success',
      'Your job has been posted successfully!',
      [
        {
          text: 'OK',
          onPress: () => router.back()
        }
      ]
    );
  };

  const CategorySelector = () => (
    <View style={styles.categoryContainer}>
      <Text style={[styles.label, { color: colors.text }]}>Job Category *</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {JOB_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryItem,
              { backgroundColor: colors.surface },
              jobData.category === category.key && { backgroundColor: colors.primary }
            ]}
            onPress={() => setJobData({ ...jobData, category: category.key })}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={[
              styles.categoryLabel,
              { color: jobData.category === category.key ? '#fff' : colors.text }
            ]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const SalaryTypeSelector = () => (
    <View style={styles.salaryTypeContainer}>
      {['hourly', 'daily', 'monthly'].map((type) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.salaryTypeButton,
            { borderColor: colors.border },
            jobData.salaryType === type && { backgroundColor: colors.primary, borderColor: colors.primary }
          ]}
          onPress={() => setJobData({ ...jobData, salaryType: type as any })}
        >
          <Text style={[
            styles.salaryTypeText,
            { color: jobData.salaryType === type ? '#fff' : colors.text }
          ]}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Post a Job</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Job Title */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Job Title *</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            placeholder="e.g., House Maid, Driver, Cook"
            placeholderTextColor={colors.textSecondary}
            value={jobData.title}
            onChangeText={(text) => setJobData({ ...jobData, title: text })}
          />
        </View>

        {/* Category */}
        <CategorySelector />

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Job Description *</Text>
          <TextInput
            style={[styles.textArea, { borderColor: colors.border, color: colors.text }]}
            placeholder="Describe the job responsibilities and requirements..."
            placeholderTextColor={colors.textSecondary}
            value={jobData.description}
            onChangeText={(text) => setJobData({ ...jobData, description: text })}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Salary */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Salary *</Text>
          <View style={styles.salaryContainer}>
            <View style={styles.salaryInputContainer}>
              <DollarSign size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.salaryInput, { color: colors.text }]}
                placeholder="Amount"
                placeholderTextColor={colors.textSecondary}
                value={jobData.salary}
                onChangeText={(text) => setJobData({ ...jobData, salary: text })}
                keyboardType="numeric"
              />
            </View>
            <SalaryTypeSelector />
          </View>
        </View>

        {/* Working Hours */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Working Hours</Text>
          <View style={styles.inputWithIcon}>
            <Clock size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.inputWithIconText, { color: colors.text }]}
              placeholder="e.g., 9 AM - 5 PM"
              placeholderTextColor={colors.textSecondary}
              value={jobData.workingHours}
              onChangeText={(text) => setJobData({ ...jobData, workingHours: text })}
            />
          </View>
        </View>

        {/* Location */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Location *</Text>
          <View style={styles.inputWithIcon}>
            <MapPin size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.inputWithIconText, { color: colors.text }]}
              placeholder="Enter job location"
              placeholderTextColor={colors.textSecondary}
              value={jobData.location}
              onChangeText={(text) => setJobData({ ...jobData, location: text })}
            />
          </View>
        </View>

        {/* Requirements */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Requirements</Text>
          <TextInput
            style={[styles.textArea, { borderColor: colors.border, color: colors.text }]}
            placeholder="List any specific requirements or qualifications..."
            placeholderTextColor={colors.textSecondary}
            value={jobData.requirements}
            onChangeText={(text) => setJobData({ ...jobData, requirements: text })}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Post Button */}
        <TouchableOpacity
          style={[styles.postButton, { backgroundColor: colors.primary }]}
          onPress={handlePostJob}
        >
          <FileText size={20} color="#fff" />
          <Text style={styles.postButtonText}>Post Job</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.md,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.md,
    textAlignVertical: 'top',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  inputWithIconText: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    marginLeft: SPACING.sm,
  },
  categoryContainer: {
    marginBottom: SPACING.lg,
  },
  categoryScroll: {
    marginTop: SPACING.sm,
  },
  categoryItem: {
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    marginRight: SPACING.sm,
    minWidth: 80,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: SPACING.xs,
  },
  categoryLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    textAlign: 'center',
  },
  salaryContainer: {
    gap: SPACING.sm,
  },
  salaryInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  salaryInput: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    marginLeft: SPACING.sm,
  },
  salaryTypeContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  salaryTypeButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  salaryTypeText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: 12,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xxl,
    gap: SPACING.sm,
  },
  postButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: '#fff',
  },
});