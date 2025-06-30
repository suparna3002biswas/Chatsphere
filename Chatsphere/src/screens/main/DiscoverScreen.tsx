import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DiscoverScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technology', 'Sports', 'Arts', 'Academic', 'Social'];

  const mockClubs = [
    {
      id: '1',
      name: 'Tech Society',
      category: 'Technology',
      memberCount: 245,
      image: 'https://via.placeholder.com/150',
      description: 'Building the future through technology',
      tags: ['AI', 'Programming', 'Innovation'],
    },
    {
      id: '2',
      name: 'Photography Club',
      category: 'Arts',
      memberCount: 189,
      image: 'https://via.placeholder.com/150',
      description: 'Capturing moments, creating memories',
      tags: ['Photography', 'Creative', 'Digital Art'],
    },
    {
      id: '3',
      name: 'Basketball Team',
      category: 'Sports',
      memberCount: 67,
      image: 'https://via.placeholder.com/150',
      description: 'Shoot for the stars, aim for the hoop',
      tags: ['Basketball', 'Sports', 'Fitness'],
    },
  ];

  const filteredClubs = mockClubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderCategoryChip = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryChip,
        selectedCategory === category && styles.categoryChipSelected,
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryChipText,
          selectedCategory === category && styles.categoryChipTextSelected,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderClubCard = (club: any) => (
    <TouchableOpacity key={club.id} style={styles.clubCard}>
      <Image source={{ uri: club.image }} style={styles.clubImage} />
      <View style={styles.clubInfo}>
        <View style={styles.clubHeader}>
          <Text style={styles.clubName}>{club.name}</Text>
          <Text style={styles.clubCategory}>{club.category}</Text>
        </View>
        <Text style={styles.clubDescription}>{club.description}</Text>
        <View style={styles.clubTags}>
          {club.tags.map((tag: string, index: number) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.clubFooter}>
          <View style={styles.clubStats}>
            <Icon name="people" size={16} color="#6B7280" />
            <Text style={styles.memberCount}>{club.memberCount} members</Text>
          </View>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Clubs</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" size={24} color="#6B46C1" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search clubs..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        <View style={styles.categories}>
          {categories.map(renderCategoryChip)}
        </View>
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.clubsList}>
        <Text style={styles.resultsText}>
          {filteredClubs.length} club{filteredClubs.length !== 1 ? 's' : ''} found
        </Text>
        {filteredClubs.map(renderClubCard)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryChipSelected: {
    backgroundColor: '#6B46C1',
    borderColor: '#6B46C1',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
  },
  clubsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  clubCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  clubImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  clubInfo: {
    padding: 16,
  },
  clubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  clubName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  clubCategory: {
    fontSize: 12,
    color: '#6B46C1',
    fontWeight: '500',
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  clubDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  clubTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#374151',
  },
  clubFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clubStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCount: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: '#6B46C1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default DiscoverScreen;