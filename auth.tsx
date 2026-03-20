// Sign In / Create Account Screen - U-Farm
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Mail, 
  Phone, 
  Lock, 
  User, 
  MapPin, 
  ThermometerSun, 
  Droplets,
  Sprout,
  Tractor,
  ChevronLeft,
  Eye,
  EyeOff,
  Check
} from 'lucide-react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { 
  Animated, 
  KeyboardAvoidingView, 
  Platform, 
  Pressable, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/colors';
import { router } from 'expo-router';

interface InputFieldProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
}

function InputField({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType }: InputFieldProps) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(!secureTextEntry);

  return (
    <View style={[
      styles.inputContainer,
      { 
        backgroundColor: theme.card,
        borderColor: isFocused ? Colors.primary.emerald : theme.border,
        borderWidth: isFocused ? 2 : 1,
      }
    ]}>
      <View style={styles.inputIconContainer}>
        {icon}
      </View>
      <TextInput
        style={[styles.input, { color: theme.text }]}
        placeholder={placeholder}
        placeholderTextColor={theme.textMuted}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isVisible}
        keyboardType={keyboardType || 'default'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={styles.visibilityToggle}>
          {isVisible ? <EyeOff size={20} color={theme.textMuted} /> : <Eye size={20} color={theme.textMuted} />}
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function AuthScreen() {
  const { theme, themeMode } = useTheme();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'signin' | 'create'>('signin');
  const [isFarmer, setIsFarmer] = useState(true);
  const [scaleAnim] = useState(new Animated.Value(1));

  // Form states
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [cropType, setCropType] = useState('');

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleSubmit = () => {
    // Store user info for display in settings
    router.push('/(tabs)/home');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <View style={[styles.backButtonCircle, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <ChevronLeft size={24} color={themeMode === 'dark' ? Colors.accent.gold : Colors.primary.emerald} />
          </View>
        </TouchableOpacity>

        {/* GPS Banner */}
        <LinearGradient
          colors={[Colors.primary.emerald, Colors.primary.emeraldDark]}
          style={styles.gpsBanner}
        >
          <View style={styles.gpsRow}>
            <MapPin size={18} color={Colors.accent.lime} />
            <Text style={styles.gpsText}>{t('gpsDetected')}</Text>
          </View>
          <View style={styles.gpsDetails}>
            <View style={styles.gpsDetail}>
              <Text style={styles.gpsLabel}>{t('location')}</Text>
              <Text style={styles.gpsValue}>Wakiso District, Uganda</Text>
            </View>
            <View style={styles.gpsDivider} />
            <View style={styles.gpsDetail}>
              <ThermometerSun size={16} color={Colors.accent.lime} />
              <Text style={styles.gpsValue}>24°C</Text>
            </View>
            <View style={styles.gpsDivider} />
            <View style={styles.gpsDetail}>
              <Droplets size={16} color={Colors.accent.lime} />
              <Text style={styles.gpsValue}>{t('humidity')}</Text>
            </View>
          </View>
          <Tractor size={50} color="rgba(255,255,255,0.1)" style={styles.bannerDecoration} />
        </LinearGradient>

        {/* Tabs */}
        <View style={[styles.tabContainer, { backgroundColor: theme.cardAlt, borderColor: theme.border }]}>
          <Pressable
            style={[
              styles.tab,
              activeTab === 'signin' && [styles.activeTab, { borderBottomColor: Colors.accent.gold }]
            ]}
            onPress={() => setActiveTab('signin')}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === 'signin' ? (themeMode === 'dark' ? Colors.accent.gold : Colors.primary.emerald) : theme.textMuted }
            ]}>
              {t('signInTitle')}
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tab,
              activeTab === 'create' && [styles.activeTab, { borderBottomColor: Colors.accent.gold }]
            ]}
            onPress={() => setActiveTab('create')}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === 'create' ? (themeMode === 'dark' ? Colors.accent.gold : Colors.primary.emerald) : theme.textMuted }
            ]}>
              {t('createAccountTitle')}
            </Text>
          </Pressable>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {activeTab === 'create' && (
            <InputField
              icon={<User size={20} color={Colors.primary.emerald} />}
              placeholder={t('fullName')}
              value={fullName}
              onChangeText={setFullName}
            />
          )}
          
          <InputField
            icon={<Mail size={20} color={Colors.primary.emerald} />}
            placeholder={t('email')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          
          <InputField
            icon={<Phone size={20} color={Colors.primary.emerald} />}
            placeholder={t('phone')}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          
          <InputField
            icon={<Lock size={20} color={Colors.primary.emerald} />}
            placeholder={t('password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {activeTab === 'create' && (
            <>
              <InputField
                icon={<Tractor size={20} color={Colors.primary.emerald} />}
                placeholder={t('farmSize')}
                value={farmSize}
                onChangeText={setFarmSize}
              />
              
              <InputField
                icon={<Sprout size={20} color={Colors.primary.emerald} />}
                placeholder={t('cropType')}
                value={cropType}
                onChangeText={setCropType}
              />

              {/* User Type Toggle */}
              <View style={styles.userTypeContainer}>
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    isFarmer && { backgroundColor: Colors.primary.emerald + '20', borderColor: Colors.primary.emerald }
                  ]}
                  onPress={() => setIsFarmer(true)}
                >
                  <Tractor size={18} color={isFarmer ? Colors.primary.emerald : theme.textMuted} />
                  <Text style={[
                    styles.userTypeText,
                    { color: isFarmer ? Colors.primary.emerald : theme.textMuted }
                  ]}>
                    {t('iAmFarmer')}
                  </Text>
                  {isFarmer && <Check size={16} color={Colors.primary.emerald} />}
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    !isFarmer && { backgroundColor: Colors.accent.gold + '20', borderColor: Colors.accent.gold }
                  ]}
                  onPress={() => setIsFarmer(false)}
                >
                  <User size={18} color={!isFarmer ? Colors.accent.gold : theme.textMuted} />
                  <Text style={[
                    styles.userTypeText,
                    { color: !isFarmer ? Colors.accent.gold : theme.textMuted }
                  ]}>
                    {t('iAmExtensionWorker')}
                  </Text>
                  {!isFarmer && <Check size={16} color={Colors.accent.gold} />}
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Forgot Password */}
          {activeTab === 'signin' && (
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={[styles.forgotPasswordText, { color: Colors.accent.gold }]}>
                {t('forgotPassword')}
              </Text>
            </TouchableOpacity>
          )}

          {/* Submit Button */}
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleSubmit}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[Colors.primary.emerald, Colors.accent.lime]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>
                  {activeTab === 'signin' ? t('signIn') : t('createAccount')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Social Login */}
          <View style={styles.socialSection}>
            <Text style={[styles.orText, { color: theme.textMuted }]}>
              {t('orContinueWith')}
            </Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#FFFFFF', borderColor: theme.border }]}>
                <FontAwesome name="google" size={24} color="#EA4335" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#000000', borderColor: theme.border }]}>
                <FontAwesome name="apple" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms */}
          <Text style={[styles.termsText, { color: theme.textMuted }]}>
            {t('termsText')}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  backButton: {
    marginBottom: 16,
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
  gpsBanner: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  gpsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  gpsText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  gpsDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  gpsDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  gpsLabel: {
    color: Colors.accent.lime,
    fontSize: 11,
    fontWeight: '500',
  },
  gpsValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  gpsDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  bannerDecoration: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  visibilityToggle: {
    padding: 4,
  },
  userTypeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  userTypeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  socialSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  orText: {
    fontSize: 14,
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  socialIconText: {
    fontSize: 24,
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 18,
  },
});
