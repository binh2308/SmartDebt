import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AuthScreen from "./AuthScreen";

// Tạo mock router GLOBAL
const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("AuthScreen", () => {
  beforeEach(() => {
    mockPush.mockClear(); // reset số lần gọi
  });

  test("render đúng UI", () => {
    const { getByText } = render(<AuthScreen />);

    expect(getByText("SMART DEBT")).toBeTruthy();
    expect(getByText("Đăng nhập ngay:")).toBeTruthy();
    expect(getByText("Đăng nhập")).toBeTruthy();
    expect(getByText("Tạo tài khoản")).toBeTruthy();
  });

  test("bấm nút Đăng nhập", () => {
    const { getByText } = render(<AuthScreen />);

    fireEvent.press(getByText("Đăng nhập"));

    expect(mockPush).toHaveBeenCalledWith("/auth/login");
  });

  test("không crash khi render", () => {
    expect(() => render(<AuthScreen />)).not.toThrow();
  });
});
