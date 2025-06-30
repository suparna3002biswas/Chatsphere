import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'agenda'>('month');

  const mockEvents = [
    {
      id: '1',
      title: 'Tech Talk: AI & Future',
      club: 'Tech Society',
      time: '7:00 PM - 9:00 PM',
      location: 'Engineering Building',
      date: '2024-01-15',
      color: '#6B46C1',
    },
    {
      id: '2',
      title: 'Photography Workshop',
      club: 'Photography Club',
      time: '2:00 PM - 5:00 PM',
      location: 'Art Studio',
      date: '2024-01-16',
      color: '#059669',
    },
    {
      id: '3',
      title: 'Basketball Practice',
      club: 'Basketball Team',
      time: '6:00 PM - 8:00 PM',
      location: 'Sports Complex',
      date: '2024-01-17',
      color: '#DC2626',
    },
  ];

  const todayEvents = mockEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  });

  const upcomingEvents = mockEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate > today;
  });

  const renderEventCard = (event: any) => (
    <TouchableOpacity key={event.id} style={styles.eventCard}>
      <View style={[styles.eventColorBar, { backgroundColor: event.color }]} />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventClub}>{event.club}</Text>
        <View style={styles.eventDetails}>
          <View style={styles.eventDetail}>
            <Icon name="time" size={14} color="#6B7280" />
            <Text style={styles.eventDetailText}>{event.time}</Text>
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
        <Text style={styles.headerTitle}>Events Calendar</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'month' && styles.viewModeButtonActive]}
            onPress={() => setViewMode('month')}
          >
            <Text style={[styles.viewModeText, viewMode === 'month' && styles.viewModeTextActive]}>
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'agenda' && styles.viewModeButtonActive]}
            onPress={() => setViewMode('agenda')}
          >
            <Text style={[styles.viewModeText, viewMode === 'agenda' && styles.viewModeTextActive]}>
              Agenda
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {viewMode === 'month' && (
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity style={styles.calendarNavButton}>
                <Icon name="chevron-back" size={24} color="#6B46C1" />
              </TouchableOpacity>
              <Text style={styles.monthTitle}>January 2024</Text>
              <TouchableOpacity style={styles.calendarNavButton}>
                <Icon name="chevron-forward" size={24} color="#6B46C1" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.calendar}>
              <View style={styles.weekDays}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <Text key={day} style={styles.weekDay}>{day}</Text>
                ))}
              </View>
              
              <View style={styles.calendarDays}>
                {Array.from({ length: 35 }, (_, i) => {
                  const dayNum = i - 5; // Adjust for calendar layout
                  const isCurrentMonth = dayNum > 0 && dayNum <= 31;
                  const hasEvent = isCurrentMonth && [15, 16, 17].includes(dayNum);
                  
                  return (
                    <TouchableOpacity
                      key={i}
                      style={[
                        styles.calendarDay,
                        !isCurrentMonth && styles.calendarDayInactive,
                        hasEvent && styles.calendarDayWithEvent,
                      ]}
                    >
                      <Text style={[
                        styles.calendarDayText,
                        !isCurrentMonth && styles.calendarDayTextInactive,
                        hasEvent && styles.calendarDayTextWithEvent,
                      ]}>
                        {isCurrentMonth ? dayNum : ''}
                      </Text>
                      {hasEvent && <View style={styles.eventDot} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        )}

        <View style={styles.eventsSection}>
          {todayEvents.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Today's Events</Text>
              {todayEvents.map(renderEventCard)}
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(renderEventCard)
            ) : (
              <View style={styles.emptyState}>
                <Icon name="calendar-outline" size={48} color="#9CA3AF" />
                <Text style={styles.emptyStateText}>No upcoming events</Text>
                <Text style={styles.emptyStateSubtext}>
                  Join clubs to see their events here
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Icon name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
  headerButtons: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 2,
  },
  viewModeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewModeButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  viewModeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  viewModeTextActive: {
    color: '#374151',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarNavButton: {
    padding: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  calendar: {},
  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    paddingVertical: 8,
  },
  calendarDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  calendarDayInactive: {
    opacity: 0.3,
  },
  calendarDayWithEvent: {
    backgroundColor: '#EDE9FE',
    borderRadius: 8,
  },
  calendarDayText: {
    fontSize: 14,
    color: '#374151',
  },
  calendarDayTextInactive: {
    color: '#9CA3AF',
  },
  calendarDayTextWithEvent: {
    color: '#6B46C1',
    fontWeight: '600',
  },
  eventDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6B46C1',
  },
  eventsSection: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  eventColorBar: {
    width: 4,
  },
  eventContent: {
    flex: 1,
    padding: 16,
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
    gap: 4,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDetailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6B46C1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default CalendarScreen;