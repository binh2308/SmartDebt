import React, { useState, useRef } from 'react'; // SỬA: Import useRef
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  ScrollView,           // THÊM: Để cuộn được
  KeyboardAvoidingView, // THÊM: Để tránh bàn phím
  Platform,             // THÊM: Để check hệ điều hành
  Keyboard              // THÊM: Để ẩn bàn phím thủ công nếu cần
} from 'react-native';
import { useRouter } from 'expo-router';
import { scale } from '@/utils/stylings';
import { colors, spacingX, spacingY, radius } from '@/constants/theme';

const RegisterScreen = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // THÊM: Tạo ref để điều khiển việc nhảy ô nhập liệu
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const handleRegister = async () => {
    Keyboard.dismiss(); // Ẩn bàn phím khi bấm đăng ký
    if (!name || !email || !password || !confirmPassword) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp.');
      return;
    }

    setLoading(true);

    try {
      setTimeout(() => {
        setLoading(false);
        alert('Đăng ký thành công!');
        router.replace('/auth/login' as any);
      }, 1500);
    } catch (error) {
      setLoading(false);
      alert('Đăng ký thất bại');
    }
  };

  const goToLogin = () => {
    router.replace('/auth/login' as any);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.Neutral300} />

      <SafeAreaView style={styles.container}>
        {/* THÊM: KeyboardAvoidingView giúp đẩy giao diện lên khi bàn phím hiện 
           Behavior 'padding' tốt cho iOS, 'height' tốt cho Android
        */}
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* THÊM: ScrollView để người dùng có thể lướt lên xuống 
             keyboardShouldPersistTaps="handled" giúp bấm nút Đăng ký được ngay mà ko cần ẩn phím trước
          */}
          <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.logo}>SMART DEBT</Text>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.title}>Tạo tài khoản mới:</Text>

              {/* Name input */}
              <View style={styles.inputContainer}>
                <Text style={styles.icon}></Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập tên"
                  placeholderTextColor={colors.Neutral100}
                  value={name}
                  onChangeText={setName}
                  editable={!loading}
                  returnKeyType="next" // Đổi nút enter thành nút Next
                  onSubmitEditing={() => emailRef.current?.focus()} // Nhảy sang ô Email
                  blurOnSubmit={false}
                />
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.icon}></Text>
                <TextInput
                  ref={emailRef} // Gắn Ref
                  style={styles.input}
                  placeholder="Nhập email"
                  placeholderTextColor={colors.Neutral100}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()} // Nhảy sang Password
                  blurOnSubmit={false}
                />
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.icon}></Text>
                <TextInput
                  ref={passwordRef} // Gắn Ref
                  style={styles.input}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor={colors.Neutral100}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  editable={!loading}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()} // Nhảy sang Confirm
                  blurOnSubmit={false}
                />
              </View>

              {/* Confirm password */}
              <View style={styles.inputContainer}>
                <Text style={styles.icon}></Text>
                <TextInput
                  ref={confirmPasswordRef} // Gắn Ref
                  style={styles.input}
                  placeholder="Xác nhận mật khẩu"
                  placeholderTextColor={colors.Neutral100}
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  editable={!loading}
                  returnKeyType="done" // Nút cuối cùng là Done
                  onSubmitEditing={handleRegister} // Bấm xong thì gọi hàm Đăng ký luôn
                />
              </View>

              {/* Register button */}
              <TouchableOpacity
                onPress={handleRegister}
                activeOpacity={0.8}
                style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.loginButtonText}>Đăng ký</Text>
                )}
              </TouchableOpacity>

              {/* Back to login */}
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Đã có tài khoản ? </Text>
                <TouchableOpacity onPress={goToLogin} disabled={loading}>
                  <Text style={styles.registerLink}>Đăng nhập</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* View đệm dưới cùng để khi bàn phím hiện lên vẫn có khoảng trống */}
            <View style={{ height: spacingY._40 }} /> 

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Neutral300,
  },
  scrollContent: {
    flexGrow: 1, // Quan trọng để ScrollView hoạt động đúng
    paddingHorizontal: spacingX._20,
    paddingBottom: spacingY._40, // Căn giữa nội dung nếu màn hình dài
  },
  header: {
    alignItems: 'center',
    marginTop: spacingY._40, // Sửa padding thành margin cho thoáng
    marginBottom: spacingY._40,
  },
  logo: {
    fontSize: scale(40),
    fontFamily: 'RowdiesBold',
    fontWeight: '900',
    color: colors.primary300,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  formSection: {
    gap: spacingY._20,
  },
  title: {
    fontSize: scale(15),
    color: '#FFFFFF',
    fontFamily: 'RobotoBold',
    fontWeight: '700',
    marginBottom: spacingY._10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.Neutral100,
    borderRadius: radius._30,
    paddingHorizontal: spacingX._20,
    height: spacingY._60,
  },
  icon: {
    marginRight: spacingX._12,
    fontSize: scale(20),
    color: colors.Neutral100,
  },
  input: {
    flex: 1,
    fontSize: scale(15),
    fontFamily: 'RobotoRegular',
    fontWeight: '400',
    color: '#FFFFFF',
    paddingVertical: 0,
  },
  loginButton: {
    backgroundColor: colors.primary300,
    height: spacingY._60,
    borderRadius: radius._30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary300,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    marginTop: spacingY._10,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontFamily: 'RobotoBold',
    fontSize: scale(17),
    fontWeight: '700',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacingY._10,
    paddingBottom: spacingY._20, // Thêm padding bottom nhẹ
  },
  registerText: {
    fontSize: scale(14),
    fontFamily: 'RobotoRegular',
    fontWeight: '400',
    color: colors.Neutral100,
  },
  registerLink: {
    fontSize: scale(14),
    color: colors.primary300,
    fontFamily: 'RobotoRegular',
    fontWeight: '600',
  },
});

export default RegisterScreen;