import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen: React.FC = () => {
  const mockClubs = [
    {
      id: '1',
      name: 'Tech Society',
      category: 'Technology',
      memberCount: 245,
      image: 'https://via.placeholder.com/300x200',
      description: 'Building the future through technology',
    },
    {
      id: '2',
      name: 'Photography Club',
      category: 'Arts',
      memberCount: 189,
      image: 'https://via.placeholder.com/300x200',
      description: 'Capturing moments, creating memories',
    },
    {
      id: '3',
      name: 'Basketball Team',
      category: 'Sports',
      memberCount: 67,
      image: 'https://via.placeholder.com/300x200',
      description: 'Shoot for the stars, aim for the hoop',
    },
  ];

  const mockEvents = [
    {
      id: '1',
      title: 'Tech Talk: AI & Future',
      club: 'Tech Society',
      date: 'Today, 7:00 PM',
      location: 'Engineering Building',
    },
    {
      id: '2',
      title: 'Photography Workshop',
      club: 'Photography Club',
      date: 'Tomorrow, 2:00 PM',
      location: 'Art Studio',
    },
  ];

  const renderClubCard = (club: any) => (
    <TouchableOpacity key={club.id} style={styles.clubCard}>
      <Image source={{ uri: club.image }} style={styles.clubImage} />
      <View style={styles.clubInfo}>
        <Text style={styles.clubName}>{club.name}</Text>
        <Text style={styles.clubCategory}>{club.category}</Text>
        <Text style={styles.clubDescription}>{club.description}</Text>
        <View style={styles.clubStats}>
          <Icon name="people" size={16} color="#6B7280" />
          <Text style={styles.memberCount}>{club.memberCount} members</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEventCard = (event: any) => (
    <TouchableOpacity key={event.id} style={styles.eventCard}>
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventClub}>{event.club}</Text>
        <View style={styles.eventDetails}>
          <View style={styles.eventDetail}>
            <Icon name="time" size={14} color="#6B7280" />
            <Text style={styles.eventDetailText}>{event.date}</Text>
          </View>
          <View style={styles.eventDetail}>
            <Icon name="location" size={14} color="#6B7280" />
            <Text style={styles.eventDetailText}>{event.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={['#6B46C1', '#9333EA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Chatsphere</Text>
            <TouchableOpacity style={styles.notificationButton}>
              <Icon name="notifications-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.welcomeSubtext}>
              Discover new clubs and events at your university
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending Clubs</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.horizontalList}>
                {mockClubs.map(renderClubCard)}
              </View>
            </ScrollView>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            {mockEvents.map(renderEventCard)}
          </View>
        </View>
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
    marginBottom: 16,
  },
  headerGradient: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  notificationButton: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 20,
  },
  welcomeSection: {
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 14,
    color: '#6B46C1',
    fontWeight: '500',
  },
  horizontalList: {
    flexDirection: 'row',
  },
  clubCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
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
  clubName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  clubCategory: {
    fontSize: 12,
    color: '#6B46C1',
    fontWeight: '500',
    marginBottom: 8,
  },
  clubDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  clubStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCount: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  eventClub: {
    fontSize: 14,
    color: '#6B46C1',
    fontWeight: '500',
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  eventDetailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
});

export default HomeScreen;