import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { icons, getIcon } from "./icons.js";

describe("icons utility", () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe("icons object", () => {
    it("should export all required icon paths", () => {
      expect(icons).toBeDefined();
      expect(typeof icons).toBe("object");
    });

    it("should contain main interface icons", () => {
      expect(icons.bolt).toBe("/assets/bolt.svg");
      expect(icons.cable).toBe("/assets/cable.svg");
      expect(icons.done).toBe("/assets/done.svg");
      expect(icons.exclamation).toBe("/assets/exclamation.svg");
      expect(icons.systemUpdate).toBe("/assets/system_update_c3.svg");
    });

    it("should contain device state icons", () => {
      expect(icons.deviceExclamation).toBe("/assets/device_exclamation_c3.svg");
      expect(icons.deviceQuestion).toBe("/assets/device_question_c3.svg");
    });

    it("should contain branding and UI icons", () => {
      expect(icons.comma).toBe("/assets/comma.svg");
      expect(icons.qdlPorts).toBe("/assets/qdl-ports.svg");
    });

    it("should have all paths starting with /assets/", () => {
      Object.values(icons).forEach((iconPath) => {
        expect(iconPath).toMatch(/^\/assets\/.+\.svg$/);
      });
    });
  });

  describe("getIcon function", () => {
    it("should return correct icon path for valid icon name", () => {
      expect(getIcon("bolt")).toBe("/assets/bolt.svg");
      expect(getIcon("cable")).toBe("/assets/cable.svg");
      expect(getIcon("done")).toBe("/assets/done.svg");
    });

    it("should return fallback icon for invalid icon name", () => {
      const result = getIcon("nonexistent");
      expect(result).toBe(icons.exclamation);
    });

    it("should log warning for invalid icon name", () => {
      getIcon("nonexistent");
      expect(consoleSpy).toHaveBeenCalledWith(
        'Icon "nonexistent" not found in icon system'
      );
    });

    it("should not log warning for valid icon name", () => {
      getIcon("bolt");
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it("should handle empty string input", () => {
      const result = getIcon("");
      expect(result).toBe(icons.exclamation);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Icon "" not found in icon system'
      );
    });

    it("should handle undefined input", () => {
      const result = getIcon(undefined);
      expect(result).toBe(icons.exclamation);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Icon "undefined" not found in icon system'
      );
    });

    it("should handle null input", () => {
      const result = getIcon(null);
      expect(result).toBe(icons.exclamation);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Icon "null" not found in icon system'
      );
    });
  });
});
