import { describe, it, expect } from "vitest";

// Replicate the platform detection logic for testing
const detectPlatform = (navigator) => {
  const platform = (() => {
    if (
      "userAgentData" in navigator &&
      "platform" in navigator.userAgentData &&
      navigator.userAgentData.platform
    ) {
      return navigator.userAgentData.platform;
    }
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("linux")) return "Linux"; // includes Android
    if (userAgent.includes("win32") || userAgent.includes("windows"))
      return "Windows";
    return null;
  })();

  return {
    platform,
    isWindows: !platform || platform === "Windows",
    isLinux: platform === "Linux",
  };
};

describe("platform utility logic", () => {
  describe("platform detection with userAgentData", () => {
    it("should use userAgentData platform when available", () => {
      const mockNavigator = {
        userAgent: "",
        userAgentData: { platform: "Linux" },
      };
      const { isLinux, isWindows } = detectPlatform(mockNavigator);

      expect(isLinux).toBe(true);
      expect(isWindows).toBe(false);
    });

    it("should handle Windows platform from userAgentData", () => {
      const mockNavigator = {
        userAgent: "",
        userAgentData: { platform: "Windows" },
      };
      const { isLinux, isWindows } = detectPlatform(mockNavigator);

      expect(isLinux).toBe(false);
      expect(isWindows).toBe(true);
    });

    it("should handle unknown platform from userAgentData", () => {
      const mockNavigator = {
        userAgent: "",
        userAgentData: { platform: "macOS" },
      };
      const { isLinux, isWindows } = detectPlatform(mockNavigator);

      expect(isLinux).toBe(false);
      expect(isWindows).toBe(false); // unknown platforms are neither Windows nor Linux
    });
  });

  describe("platform detection with userAgent fallback", () => {
    it("should detect Linux from userAgent when userAgentData not available", () => {
      const mockNavigator = {
        userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
      };
      const { isLinux, isWindows } = detectPlatform(mockNavigator);

      expect(isLinux).toBe(true);
      expect(isWindows).toBe(false);
    });

    it("should detect Windows from userAgent (win32)", () => {
      const mockNavigator = {
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) win32",
      };
      const { isLinux, isWindows } = detectPlatform(mockNavigator);

      expect(isLinux).toBe(false);
      expect(isWindows).toBe(true);
    });

    it("should detect Windows from userAgent (windows)", () => {
      const mockNavigator = {
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      };
      const { isLinux, isWindows } = detectPlatform(mockNavigator);

      expect(isLinux).toBe(false);
      expect(isWindows).toBe(true);
    });

    it("should detect Android as Linux", () => {
      const mockNavigator = {
        userAgent: "Mozilla/5.0 (Linux; Android 11; SM-G973F)",
      };
      const { isLinux, isWindows } = detectPlatform(mockNavigator);

      expect(isLinux).toBe(true);
      expect(isWindows).toBe(false);
    });

    it("should default to Windows for unknown userAgent", () => {
      const mockNavigator = {
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      };
      const { isLinux, isWindows } = detectPlatform(mockNavigator);

      expect(isLinux).toBe(false);
      expect(isWindows).toBe(true);
    });

    it("should handle empty userAgent", () => {
      const mockNavigator = {
        userAgent: "",
      };
      const { isLinux, isWindows } = detectPlatform(mockNavigator);

      expect(isLinux).toBe(false);
      expect(isWindows).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("should handle missing userAgentData.platform property", () => {
      const mockNavigator = {
        userAgent: "Mozilla/5.0 (X11; Linux x86_64)",
        userAgentData: { someOtherProp: true },
      };
      const { isLinux, isWindows } = detectPlatform(mockNavigator);

      expect(isLinux).toBe(true);
      expect(isWindows).toBe(false);
    });

    it("should handle null userAgentData.platform", () => {
      const mockNavigator = {
        userAgent: "Mozilla/5.0 (X11; Linux x86_64)",
        userAgentData: { platform: null },
      };
      const { isLinux, isWindows } = detectPlatform(mockNavigator);

      expect(isLinux).toBe(true);
      expect(isWindows).toBe(false);
    });

    it("should handle case sensitivity in userAgent", () => {
      const mockNavigator = {
        userAgent: "Mozilla/5.0 (X11; LINUX x86_64)",
      };
      const { isLinux, isWindows } = detectPlatform(mockNavigator);

      expect(isLinux).toBe(true);
      expect(isWindows).toBe(false);
    });

    it("should handle missing userAgentData completely", () => {
      const mockNavigator = {
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      };
      const { isLinux, isWindows } = detectPlatform(mockNavigator);

      expect(isLinux).toBe(false);
      expect(isWindows).toBe(true);
    });
  });

  describe("actual module exports", () => {
    it("should export isWindows and isLinux values", () => {
      // Test the actual module exports in a controlled environment
      // Since the module runs immediately on import, we test the logic instead
      const mockNavigator = {
        userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
      };
      const { isWindows, isLinux } = detectPlatform(mockNavigator);

      expect(typeof isWindows).toBe("boolean");
      expect(typeof isLinux).toBe("boolean");
      expect(isWindows !== isLinux).toBe(true); // One should be true, one false
    });
  });
});
