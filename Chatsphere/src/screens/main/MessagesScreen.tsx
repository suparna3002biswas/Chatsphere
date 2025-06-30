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
import Icon from 'react-native-vector-icons/Ionicons';

const MessagesScreen: React.FC = () => {
  const mockChats = [
    {
      id: '1',
      name: 'Tech Society',
      type: 'group',
      lastMessage: 'Hey everyone! Don\'t forget about tomorrow\'s meeting',
      timestamp: '2 min ago',
      unreadCount: 3,
      avatar: 'https://via.placeholder.com/50',
      isOnline: true,
    },
    {
      id: '2',
      name: 'John Doe',
      type: 'direct',
      lastMessage: 'Thanks for sharing the notes!',
      timestamp: '15 min ago',
      unreadCount: 0,
      avatar: 'https://via.placeholder.com/50',
      isOnline: true,
    },
    {
      id: '3',
      name: 'Photography Club',
      type: 'group',
      lastMessage: 'Sarah: Amazing shots from yesterday\'s workshop',
      timestamp: '1 hour ago',
      unreadCount: 1,
      avatar: 'https://via.placeholder.com/50',
      isOnline: false,
    },
    {
      id: '4',
      name: 'Maria Garcia',
      type: 'direct',
      lastMessage: 'See you at the basketball game tomorrow!',
      timestamp: '3 hours ago',
      unreadCount: 0,
      avatar: 'https://via.placeholder.com/50',
      isOnline: false,
    },
  ];

  const renderChatItem = (chat: any) => (
    <TouchableOpacity key={chat.id} style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: chat.avatar }} style={styles.avatar} />
        {chat.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{chat.name}</Text>
          <Text style={styles.timestamp}>{chat.timestamp}</Text>
        </View>
        
        <View style={styles.chatMessage}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          {chat.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.chatType}>
        {chat.type === 'group' && (
          <Icon name="people" size={16} color="#6B7280" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="search" size={24} color="#6B46C1" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="create-outline" size={24} color="#6B46C1" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.chatsList}>
          {mockChats.map(renderChatItem)}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton}>
        <Icon name="chatbubble" size={24} color="#FFFFFF" />
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
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  chatsList: {
    paddingHorizontal: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
  },
  chatMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#6B46C1',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  chatType: {
    marginLeft: 8,
  },
  floatingButton: {
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

export default MessagesScreen;