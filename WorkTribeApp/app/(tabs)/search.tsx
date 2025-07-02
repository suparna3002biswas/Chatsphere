import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon, Filter, MapPin, FileSliders as Sliders } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { getThemeColors, SPACING, FONT_SIZES, SHADOWS } from '@/constants/theme';
import { JOB_CATEGORIES, SAMPLE_JOB_POSTS } from '@/constants/data';
import { JobCategory, JobPost } from '@/types';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<JobCategory | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(SAMPLE_JOB_POSTS);

  const { user, theme } = useApp();
  const colors = getThemeColors(user?.role || 'job_seeker', theme);

  const handleCategorySelect = (category: JobCategory) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    filterJobs(searchQuery, selectedCategory === category ? null : category);
  };

  const filterJobs = (query: string, category: JobCategory | null) => {
    let filtered = SAMPLE_JOB_POSTS;

    if (query) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(job => job.category === category);
    }

    setFilteredJobs(filtered);
  };

  const renderCategoryItem = ({ item }: { item: typeof JOB_CATEGORIES[0] }) => {
    const isSelected = selectedCategory === item.key;
    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          SHADOWS.sm,
          isSelected && { backgroundColor: colors.primary }
        ]}
        onPress={() => handleCategorySelect(item.key)}
      >
        <Text style={styles.categoryIcon}>{item.icon}</Text>
        <Text style={[
          styles.categoryLabel,
          { color: isSelected ? '#fff' : colors.text }
        ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderJobItem = ({ item }: { item: JobPost }) => {
    const categoryInfo = JOB_CATEGORIES.find(cat => cat.key === item.category);
    return (
      <TouchableOpacity style={[styles.jobItem, SHADOWS.sm]}>
        <View style={styles.jobHeader}>
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

        <View style={styles.jobLocation}>
          <MapPin size={14} color={colors.textSecondary} />
          <Text style={[styles.locationText, { color: colors.textSecondary }]}>
            {item.location.address}
          </Text>
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {user?.role === 'employer' ? 'Find Workers' : 'Find Jobs'}
        </Text>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
          <Sliders color={colors.primary} size={24} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={[styles.searchBar, { borderColor: colors.border }]}>
          <SearchIcon color={colors.textSecondary} size={20} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={user?.role === 'employer' ? 'Search for workers...' : 'Search for jobs...'}
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              filterJobs(text, selectedCategory);
            }}
          />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Categories</Text>
        <FlatList
          data={JOB_CATEGORIES}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Filters */}
      {showFilters && (
        <View style={[styles.filtersSection, { backgroundColor: colors.surface }]}>
          <View style={styles.filterRow}>
            <Text style={[styles.filterLabel, { color: colors.text }]}>Location</Text>
            <TouchableOpacity style={[styles.filterButton, { borderColor: colors.border }]}>
              <Text style={[styles.filterButtonText, { color: colors.textSecondary }]}>
                All Locations
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterRow}>
            <Text style={[styles.filterLabel, { color: colors.text }]}>Salary Range</Text>
            <TouchableOpacity style={[styles.filterButton, { borderColor: colors.border }]}>
              <Text style={[styles.filterButtonText, { color: colors.textSecondary }]}>
                All Ranges
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterRow}>
            <Text style={[styles.filterLabel, { color: colors.text }]}>Work Type</Text>
            <TouchableOpacity style={[styles.filterButton, { borderColor: colors.border }]}>
              <Text style={[styles.filterButtonText, { color: colors.textSecondary }]}>
                All Types
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Results */}
      <View style={styles.resultsSection}>
        <Text style={[styles.resultsTitle, { color: colors.text }]}>
          {filteredJobs.length} {user?.role === 'employer' ? 'Workers' : 'Jobs'} Found
        </Text>
        <FlatList
          data={filteredJobs}
          renderItem={renderJobItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.jobsList}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
  },
  searchSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZES.md,
  },
  categoriesSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  categoriesList: {
    paddingVertical: SPACING.xs,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: SPACING.md,
    marginRight: SPACING.sm,
    alignItems: 'center',
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
  filtersSection: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: 12,
    marginHorizontal: SPACING.lg,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  filterLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  filterButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  filterButtonText: {
    fontSize: FONT_SIZES.sm,
  },
  resultsSection: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  resultsTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  jobsList: {
    paddingBottom: SPACING.xl,
  },
  jobItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: SPACING.md,
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
  jobLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  locationText: {
    fontSize: FONT_SIZES.sm,
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