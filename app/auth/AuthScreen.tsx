import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from '@/utils/stylings';
import { colors, spacingX, spacingY, radius } from '@/constants/theme';

const { height } = Dimensions.get('window');

const AuthScreen = () => {
  const router = useRouter();

  const handleLogin = () => router.push('/auth/login' as any);
  const handleRegister = () => router.push('/auth/register' as any);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.Neutral300} />

      <SafeAreaView style={styles.container}>
        {/* Logo trên cao */}
        <View style={styles.header}>
          <Text style={styles.logo}>SMART DEBT</Text>
        </View>

        {/* Buttons căn giữa màn hình */}
        <View style={styles.centerContent}>
          <Text style={styles.label}>Đăng nhập ngay:</Text>

          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.8}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleRegister}
            activeOpacity={0.8}
            style={styles.registerButton}
          >
            <Text style={styles.registerButtonText}>Tạo tài khoản</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Neutral300,
    // Giữ padding này để nội dung không bị dính sát lề màn hình nếu thiết bị quá nhỏ
    paddingHorizontal: spacingX._20, 
  },
  header: {
    alignItems: 'center',
    marginTop: spacingY._40,
  },
  logo: {
    fontSize: scale(40),
    fontFamily: 'RowdiesBold',
    fontWeight: '900',
    color: colors.primary300,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  centerContent: {
    flex: 1,
    width: '100%',          // THÊM: Đảm bảo container chiếm hết chiều ngang
    justifyContent: 'center', // Căn giữa dọc
    alignItems: 'center',     // QUAN TRỌNG: Căn giữa ngang cho các nút con
    gap: spacingY._20,
    paddingBottom: scale(120), // Thêm khoảng cách dưới cùng nếu cần
  },
  label: {
    fontSize: scale(16),
    fontFamily: 'RobotoRegular',
    color: colors.Neutral100,
    textAlign: 'center',      // Căn giữa chữ
    alignSelf: 'center',      // Đảm bảo khung chữ nằm giữa
    marginBottom: spacingY._10,
  },
  loginButton: {
    backgroundColor: colors.primary300,
    height: spacingY._60,
    width: '80%',             // Nút chiếm 80% chiều rộng của centerContent
    borderRadius: radius._30,
    justifyContent: 'center', // Căn giữa chữ trong nút (dọc)
    alignItems: 'center',     // Căn giữa chữ trong nút (ngang)
    shadowColor: colors.primary300,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontFamily: 'RobotoBold',
    fontSize: scale(17),
    fontWeight: '700',
  },
  registerButton: {
    backgroundColor: 'transparent',
    height: spacingY._60,
    width: '80%',             // Nút chiếm 80% chiều rộng
    borderRadius: radius._30,
    borderWidth: 2,
    borderColor: colors.Neutral100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontFamily: 'RobotoBold',
    fontSize: scale(17),
    fontWeight: '600',
  },
});

export default AuthScreen;
