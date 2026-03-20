// Settings Page - U-Farm
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ChevronLeft,
  User,
  Lock,
  Globe,
  Moon,
  Bell,
  Tractor,
  HelpCircle,
  Star,
  LogOut,
  ChevronRight,
  Check,
  X,
  Sprout,
  MapPin,
  Edit3,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react-native';
import React, { useState } from 'react';
import { 
  Alert,
  Animated, 
  Modal, 
  Pressable, 
  ScrollView, 
  StyleSheet, 
  Switch,
  Text, 
  TextInput,
  TouchableOpacity, 
  View,
  Linking
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/colors';
import { router } from 'expo-router';

const languageFlags: Record<Language, { flag: string; name: string }> = {
  en: { flag: '🇬🇧', name: 'English' },
  sw: { flag: '🇰🇪', name: 'Kiswahili' },
  lg: { flag: '🇺🇬', name: 'Luganda' },
};

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  value?: string;
  onPress?: () => void;
  showArrow?: boolean;
  isDestructive?: boolean;
}

function SettingsItem({ icon, title, value, onPress, showArrow = true, isDestructive }: SettingsItemProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity 
      style={[
        styles.settingsItem,
        { backgroundColor: theme.card, borderColor: theme.border }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[
        styles.settingsIconContainer,
        { backgroundColor: isDestructive ? Colors.status.error + '15' : Colors.primary.emerald + '15' }
      ]}>
        {icon}
      </View>
      <Text style={[
        styles.settingsItemTitle,
        { color: isDestructive ? Colors.status.error : theme.text }
      ]}>
        {title}
      </Text>
      {value && (
        <Text style={[styles.settingsItemValue, { color: theme.textMuted }]} numberOfLines={1}>
          {value}
        </Text>
      )}
      {showArrow && <ChevronRight size={20} color={theme.textMuted} />}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const { theme, themeMode, toggleTheme } = useTheme();
  const { t, currentLanguage, setLanguage } = useLanguage();
  const insets = useSafeAreaInsets();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showFarmModal, setShowFarmModal] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // User data - in real app, this would come from user context/storage
  const [userProfile, setUserProfile] = useState({
    fullName: 'John Mukasa',
    email: 'john.mukasa@email.com',
    phone: '+256 712 345 678',
    location: 'Wakiso, Uganda',
    farmSize: '5 acres',
    crops: 'Maize, Beans, Tomatoes',
    userType: 'Farmer'
  });

  // Form states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [farmSize, setFarmSize] = useState(userProfile.farmSize);
  const [crops, setCrops] = useState(userProfile.crops);
  const [location, setLocation] = useState(userProfile.location);

  const handleLogout = () => {
    Alert.alert(
      t('logOut'),
      currentLanguage === 'sw' ? 'Una uhakika unataka kutoka?' : 
      currentLanguage === 'lg' ? 'Okakasa oyagala okufuluma?' : 
      'Are you sure you want to log out?',
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('logOut'), 
          style: 'destructive',
          onPress: () => router.replace('/auth')
        }
      ]
    );
  };

  const handleSavePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert(
        currentLanguage === 'sw' ? 'Kosa' : currentLanguage === 'lg' ? 'Ensobi' : 'Error',
        currentLanguage === 'sw' ? 'Tafadhali jaza sehemu zote' : currentLanguage === 'lg' ? 'Bambi zza ebifo byonna' : 'Please fill in all fields'
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert(
        currentLanguage === 'sw' ? 'Kosa' : currentLanguage === 'lg' ? 'Ensobi' : 'Error',
        currentLanguage === 'sw' ? 'Nenosiri mpya hazifanani' : currentLanguage === 'lg' ? 'Akabonero akapya tekakwatagana' : 'New passwords do not match'
      );
      return;
    }
    
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    Alert.alert(
      currentLanguage === 'sw' ? 'Mafanikio' : currentLanguage === 'lg' ? 'Kiwede' : 'Success',
      currentLanguage === 'sw' ? 'Nenosiri lako limebadilishwa' : currentLanguage === 'lg' ? 'Akabonero ko kakyusiddwa' : 'Your password has been changed'
    );
  };

  const handleSaveFarmInfo = () => {
    setUserProfile({ ...userProfile, farmSize, crops, location });
    setShowFarmModal(false);
    Alert.alert(
      currentLanguage === 'sw' ? 'Mafanikio' : currentLanguage === 'lg' ? 'Kiwede' : 'Success',
      currentLanguage === 'sw' ? 'Taarifa za shamba zimehifadhiwa' : currentLanguage === 'lg' ? 'Amawulire g�ettaka gakuumidwa' : 'Farm information saved'
    );
  };

  const handleHelpSupport = () => {
    const options = [
      { 
        text: currentLanguage === 'sw' ? 'Barua Pepe' : currentLanguage === 'lg' ? 'Email' : 'Email Support', 
        onPress: () => Linking.openURL('mailto:support@ufarm.app') 
      },
      { 
        text: currentLanguage === 'sw' ? 'Simu' : currentLanguage === 'lg' ? 'Simu' : 'Phone Support', 
        onPress: () => Linking.openURL('tel:+256800123456') 
      },
      { 
        text: currentLanguage === 'sw' ? 'Maoni' : currentLanguage === 'lg' ? 'Obubaka' : 'WhatsApp', 
        onPress: () => Linking.openURL('https://wa.me/256800123456') 
      },
      { text: t('cancel'), style: 'cancel' }
    ];
    
    Alert.alert(
      t('helpSupport'),
      currentLanguage === 'sw' ? 'Chagua njia ya mawasiliano' : currentLanguage === 'lg' ? 'Londa engeri yokutuusa' : 'Choose contact method',
      options
    );
  };

  const handleRateUs = () => {
    Alert.alert(
      t('rateUs'),
      currentLanguage === 'sw' ? 'Je, unapenda U-Farm? Tafadhali tupe ukadiriaji wako!' : 
      currentLanguage === 'lg' ? 'Oyagala U-Farm? Bambi tuwe omuwendo!' : 
      'Do you love U-Farm? Please give us your rating!',
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: currentLanguage === 'sw' ? 'Toa Ukadiriaji' : currentLanguage === 'lg' ? 'Wa Omuwendo' : 'Rate Now', 
          onPress: () => {
            Alert.alert(
              currentLanguage === 'sw' ? 'Asante!' : currentLanguage === 'lg' ? 'Webale!' : 'Thank You!',
              currentLanguage === 'sw' ? 'Tunakushukuru kwa maoni yako' : currentLanguage === 'lg' ? 'Tukwebala ku bwomuwendo gwo' : 'We appreciate your feedback'
            );
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/home')}
          >
            <View style={[styles.backButtonCircle, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <ChevronLeft size={24} color={themeMode === 'dark' ? Colors.accent.gold : Colors.primary.emerald} />
            </View>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>{t('settings')}</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Profile Card */}
        <LinearGradient
          colors={themeMode === 'dark' 
            ? [Colors.background.darkForest, Colors.background.darkCard]
            : [Colors.primary.emerald, Colors.primary.emeraldDark]
          }
          style={styles.profileCard}
        >
          <View style={styles.profileAvatar}>
            <User size={40} color={Colors.primary.emerald} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile.fullName}</Text>
            <Text style={styles.profileRole}>
              {currentLanguage === 'sw' ? 
                (userProfile.userType === 'Farmer' ? 'Mkulima' : 'Afisa Ugani') : 
                currentLanguage === 'lg' ? 
                (userProfile.userType === 'Farmer' ? 'Mulimi' : 'Mukugu wOkulima') : 
                userProfile.userType}
            </Text>
            <View style={styles.profileDetails}>
              <MapPin size={12} color={Colors.accent.lime} />
              <Text style={styles.profileLocation}>{userProfile.location}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Settings Sections */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
            {currentLanguage === 'sw' ? 'Akaunti' : currentLanguage === 'lg' ? 'Akawunti' : 'Account'}
          </Text>
          
          {/* User Info Display */}
          <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.infoRow}>
              <Mail size={16} color={Colors.primary.emerald} />
              <Text style={[styles.infoLabel, { color: theme.textMuted }]}>{t('email')}</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>{userProfile.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Phone size={16} color={Colors.primary.emerald} />
              <Text style={[styles.infoLabel, { color: theme.textMuted }]}>{t('phone')}</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>{userProfile.phone}</Text>
            </View>
          </View>
          
          <SettingsItem
            icon={<Lock size={20} color={Colors.primary.emerald} />}
            title={t('changePassword')}
            onPress={() => setShowPasswordModal(true)}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
            {currentLanguage === 'sw' ? 'Mipangilio' : currentLanguage === 'lg' ? 'Enteekateeka' : 'Preferences'}
          </Text>
          
          <SettingsItem
            icon={<Globe size={20} color={Colors.primary.emerald} />}
            title={t('language')}
            value={languageFlags[currentLanguage].name}
            onPress={() => setShowLanguageModal(true)}
          />
          
          <View style={[styles.settingsItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={[styles.settingsIconContainer, { backgroundColor: Colors.primary.emerald + '15' }]}>
              <Moon size={20} color={Colors.primary.emerald} />
            </View>
            <Text style={[styles.settingsItemTitle, { color: theme.text }]}>{t('darkMode')}</Text>
            <Switch
              value={themeMode === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#D1D5DB', true: Colors.primary.emerald }}
              thumbColor={themeMode === 'dark' ? Colors.accent.gold : '#FFFFFF'}
            />
          </View>
          
          <View style={[styles.settingsItem, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={[styles.settingsIconContainer, { backgroundColor: Colors.primary.emerald + '15' }]}>
              <Bell size={20} color={Colors.primary.emerald} />
            </View>
            <Text style={[styles.settingsItemTitle, { color: theme.text }]}>{t('notifications')}</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#D1D5DB', true: Colors.primary.emerald }}
              thumbColor={notifications ? Colors.accent.gold : '#FFFFFF'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
            {currentLanguage === 'sw' ? 'Shamba' : currentLanguage === 'lg' ? 'Ettaka' : 'Farm'}
          </Text>
          
          {/* Farm Info Display */}
          <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.infoRow}>
              <Tractor size={16} color={Colors.primary.emerald} />
              <Text style={[styles.infoLabel, { color: theme.textMuted }]}>{t('farmSize')}</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>{userProfile.farmSize}</Text>
            </View>
            <View style={styles.infoRow}>
              <Sprout size={16} color={Colors.primary.emerald} />
              <Text style={[styles.infoLabel, { color: theme.textMuted }]}>{t('cropType')}</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>{userProfile.crops}</Text>
            </View>
          </View>
          
          <SettingsItem
            icon={<Edit3 size={20} color={Colors.primary.emerald} />}
            title={currentLanguage === 'sw' ? 'Hariri Taarifa za Shamba' : currentLanguage === 'lg' ? 'Kyusa Amawulire gEttaka' : 'Edit Farm Information'}
            onPress={() => setShowFarmModal(true)}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
            {currentLanguage === 'sw' ? 'Msaada' : currentLanguage === 'lg' ? 'Obuyambi' : 'Support'}
          </Text>
          <SettingsItem
            icon={<HelpCircle size={20} color={Colors.primary.emerald} />}
            title={t('helpSupport')}
            onPress={handleHelpSupport}
          />
          <SettingsItem
            icon={<Star size={20} color={Colors.accent.gold} />}
            title={t('rateUs')}
            onPress={handleRateUs}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <LogOut size={20} color={Colors.status.error} />
          <Text style={styles.logoutText}>{t('logOut')}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Language Modal */}
      <Modal
        visible={showLanguageModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowLanguageModal(false)}
        >
          <View style={[styles.languageModal, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {t('language')}
            </Text>
            {(Object.keys(languageFlags) as Language[]).map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.languageOption,
                  currentLanguage === lang && { backgroundColor: Colors.primary.emeraldGlow }
                ]}
                onPress={() => {
                  void setLanguage(lang);
                  setShowLanguageModal(false);
                }}
              >
                <Text style={styles.languageFlag}>{languageFlags[lang].flag}</Text>
                <Text style={[styles.languageName, { color: theme.text }]}>
                  {languageFlags[lang].name}
                </Text>
                {currentLanguage === lang && (
                  <View style={[styles.checkmark, { backgroundColor: Colors.primary.emerald }]}>
                    <Check size={12} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Password Modal */}
      <Modal
        visible={showPasswordModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowPasswordModal(false)}
        >
          <View style={[styles.passwordModal, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                {t('changePassword')}
              </Text>
              <TouchableOpacity onPress={() => setShowPasswordModal(false)}>
                <X size={24} color={theme.textMuted} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.passwordInput, { 
                backgroundColor: theme.background, 
                color: theme.text,
                borderColor: theme.border 
              }]}
              placeholder={t('currentPassword')}
              placeholderTextColor={theme.textMuted}
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={[styles.passwordInput, { 
                backgroundColor: theme.background, 
                color: theme.text,
                borderColor: theme.border 
              }]}
              placeholder={t('newPassword')}
              placeholderTextColor={theme.textMuted}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={[styles.passwordInput, { 
                backgroundColor: theme.background, 
                color: theme.text,
                borderColor: theme.border 
              }]}
              placeholder={t('confirmPassword')}
              placeholderTextColor={theme.textMuted}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSavePassword}
            >
              <LinearGradient
                colors={[Colors.primary.emerald, Colors.accent.lime]}
                style={styles.saveButtonGradient}
              >
                <Text style={styles.saveButtonText}>{t('saveChanges')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Farm Info Modal */}
      <Modal
        visible={showFarmModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFarmModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setShowFarmModal(false)}
        >
          <View style={[styles.farmModal, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                {currentLanguage === 'sw' ? 'Hariri Shamba' : currentLanguage === 'lg' ? 'Kyusa Ettaka' : 'Edit Farm Information'}
              </Text>
              <TouchableOpacity onPress={() => setShowFarmModal(false)}>
                <X size={24} color={theme.textMuted} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.formField}>
              <Text style={[styles.formLabel, { color: theme.textMuted }]}>
                {t('farmSize')}
              </Text>
              <TextInput
                style={[styles.formInput, { 
                  backgroundColor: theme.background, 
                  color: theme.text,
                  borderColor: theme.border 
                }]}
                placeholder="e.g. 5 acres"
                placeholderTextColor={theme.textMuted}
                value={farmSize}
                onChangeText={setFarmSize}
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={[styles.formLabel, { color: theme.textMuted }]}>
                {t('cropType')}
              </Text>
              <TextInput
                style={[styles.formInput, { 
                  backgroundColor: theme.background, 
                  color: theme.text,
                  borderColor: theme.border 
                }]}
                placeholder="e.g. Maize, Beans, Tomatoes"
                placeholderTextColor={theme.textMuted}
                value={crops}
                onChangeText={setCrops}
              />
            </View>
            
            <View style={styles.formField}>
              <Text style={[styles.formLabel, { color: theme.textMuted }]}>
                {t('location')}
              </Text>
              <TextInput
                style={[styles.formInput, { 
                  backgroundColor: theme.background, 
                  color: theme.text,
                  borderColor: theme.border 
                }]}
                placeholder="e.g. Wakiso, Uganda"
                placeholderTextColor={theme.textMuted}
                value={location}
                onChangeText={setLocation}
              />
            </View>
            
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveFarmInfo}
            >
              <LinearGradient
                colors={[Colors.primary.emerald, Colors.accent.lime]}
                style={styles.saveButtonGradient}
              >
                <Text style={styles.saveButtonText}>{t('saveChanges')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  profileCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  profileInfo: {
    gap: 4,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileRole: {
    fontSize: 14,
    color: Colors.accent.lime,
    fontWeight: '500',
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  profileLocation: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  settingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  settingsItemValue: {
    fontSize: 14,
    marginRight: 8,
    maxWidth: 120,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.status.error,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  languageModal: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 20,
    padding: 24,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  languageFlag: {
    fontSize: 24,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordModal: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 20,
    padding: 24,
  },
  farmModal: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 20,
    padding: 24,
  },
  formField: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  formInput: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
  },
  passwordInput: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 8,
  },
  saveButtonGradient: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
