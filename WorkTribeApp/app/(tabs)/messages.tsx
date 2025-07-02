import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MessageCircle, Phone, Video } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { getThemeColors, SPACING, FONT_SIZES, SHADOWS } from '@/constants/theme';

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
}

const SAMPLE_CHATS: ChatItem[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    lastMessage: 'I am interested in the driver position',
    time: '2m ago',
    unread: 2,
    avatar: '👨‍💼',
    online: true,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    lastMessage: 'When can you start the job?',
    time: '1h ago',
    unread: 0,
    avatar: '👩‍💼',
    online: false,
  },
  {
    id: '3',
    name: 'Amit Singh',
    lastMessage: 'Thank you for the opportunity',
    time: '2h ago',
    unread: 1,
    avatar: '👨‍🔧',
    online: true,
  },
  {
    id: '4',
    name: 'Sunita Devi',
    lastMessage: 'I have 5 years of experience',
    time: '1d ago',
    unread: 0,
    avatar: '👩‍🍳',
    online: false,
  },
];

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState(SAMPLE_CHATS);

  const { user, theme } = useApp();
  const colors = getThemeColors(user?.role || 'job_seeker', theme);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity style={[styles.chatItem, SHADOWS.sm]}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>{item.avatar}</Text>
        {item.online && <View style={[styles.onlineIndicator, { backgroundColor: colors.primary }]} />}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={[styles.chatName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.chatTime, { color: colors.textSecondary }]}>{item.time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text
            style={[
              styles.lastMessage,
              { color: colors.textSecondary },
              item.unread > 0 && { color: colors.text, fontWeight: '600' }
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.chatActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.surface }]}>
          <Phone size={18} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.surface }]}>
          <Video size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Messages</Text>
        <TouchableOpacity>
          <MessageCircle color={colors.primary} size={24} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={[styles.searchBar, { borderColor: colors.border }]}>
          <Search color={colors.textSecondary} size={20} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search conversations..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Chat List */}
      <View style={styles.chatListSection}>
        {filteredChats.length === 0 ? (
          <View style={styles.emptyState}>
            <MessageCircle size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No messages yet</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              Start connecting with {user?.role === 'employer' ? 'job seekers' : 'employers'} to see your conversations here
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredChats}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.chatList}
          />
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.primary }]}>
          <MessageCircle color="#fff" size={20} />
          <Text style={styles.quickActionText}>New Message</Text>
        </TouchableOpacity>
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
  chatListSection: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  chatList: {
    paddingBottom: SPACING.xl,
  },
  chatItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: SPACING.md,
  },
  avatar: {
    fontSize: 40,
    width: 50,
    height: 50,
    textAlign: 'center',
    lineHeight: 50,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  chatName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  chatTime: {
    fontSize: FONT_SIZES.xs,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: FONT_SIZES.sm,
    flex: 1,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  unreadText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: '#fff',
  },
  chatActions: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  quickActions: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: 12,
    gap: SPACING.sm,
  },
  quickActionText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: '#fff',
  },
});