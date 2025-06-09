import { describe, it, expect } from "vitest";
import { getStepsConfig, getErrorsConfig } from "./errors.js";
import { StepCode, ErrorCode } from "./manager.js";

// Mock icons for testing
const mockIcons = {
  bolt: "/assets/bolt.svg",
  cable: "/assets/cable.svg",
  systemUpdate: "/assets/system_update_c3.svg",
  done: "/assets/done.svg",
  exclamation: "/assets/exclamation.svg",
  deviceQuestion: "/assets/device_question_c3.svg",
  deviceExclamation: "/assets/device_exclamation_c3.svg",
};

describe("errors utility", () => {
  describe("getStepsConfig", () => {
    it("should return steps configuration object", () => {
      const stepsConfig = getStepsConfig(mockIcons);

      expect(stepsConfig).toBeDefined();
      expect(typeof stepsConfig).toBe("object");
    });

    it("should contain all step codes", () => {
      const stepsConfig = getStepsConfig(mockIcons);

      // Check that all expected step codes are present
      expect(stepsConfig).toHaveProperty(StepCode.INITIALIZING.toString());
      expect(stepsConfig).toHaveProperty(StepCode.READY.toString());
      expect(stepsConfig).toHaveProperty(StepCode.CONNECTING.toString());
      expect(stepsConfig).toHaveProperty(
        StepCode.REPAIR_PARTITION_TABLES.toString()
      );
      expect(stepsConfig).toHaveProperty(StepCode.ERASE_DEVICE.toString());
      expect(stepsConfig).toHaveProperty(StepCode.FLASH_SYSTEM.toString());
      expect(stepsConfig).toHaveProperty(StepCode.FINALIZING.toString());
      expect(stepsConfig).toHaveProperty(StepCode.DONE.toString());
    });

    it("should have proper structure for each step", () => {
      const stepsConfig = getStepsConfig(mockIcons);

      Object.values(stepsConfig).forEach((step) => {
        expect(step).toHaveProperty("status");
        expect(step).toHaveProperty("bgColor");
        expect(step).toHaveProperty("icon");
        expect(typeof step.status).toBe("string");
        expect(typeof step.bgColor).toBe("string");
        expect(typeof step.icon).toBe("string");
      });
    });

    it("should use correct icons for each step", () => {
      const stepsConfig = getStepsConfig(mockIcons);

      expect(stepsConfig[StepCode.INITIALIZING].icon).toBe(mockIcons.bolt);
      expect(stepsConfig[StepCode.READY].icon).toBe(mockIcons.bolt);
      expect(stepsConfig[StepCode.CONNECTING].icon).toBe(mockIcons.cable);
      expect(stepsConfig[StepCode.REPAIR_PARTITION_TABLES].icon).toBe(
        mockIcons.systemUpdate
      );
      expect(stepsConfig[StepCode.ERASE_DEVICE].icon).toBe(
        mockIcons.systemUpdate
      );
      expect(stepsConfig[StepCode.FLASH_SYSTEM].icon).toBe(
        mockIcons.systemUpdate
      );
      expect(stepsConfig[StepCode.FINALIZING].icon).toBe(
        mockIcons.systemUpdate
      );
      expect(stepsConfig[StepCode.DONE].icon).toBe(mockIcons.done);
    });

    it("should have appropriate status messages", () => {
      const stepsConfig = getStepsConfig(mockIcons);

      expect(stepsConfig[StepCode.INITIALIZING].status).toBe("Initializing...");
      expect(stepsConfig[StepCode.READY].status).toBe("Tap to start");
      expect(stepsConfig[StepCode.CONNECTING].status).toBe(
        "Waiting for connection"
      );
      expect(stepsConfig[StepCode.DONE].status).toBe("Done");
    });

    it("should have background colors for all steps", () => {
      const stepsConfig = getStepsConfig(mockIcons);

      Object.values(stepsConfig).forEach((step) => {
        // Updated regex to handle complex Tailwind classes like "bg-gray-400 dark:bg-gray-700"
        expect(step.bgColor).toMatch(/^bg-[\w\-[\]#:]+(\s+[\w\-:]+)*$/);
      });
    });

    it("should include descriptions for appropriate steps", () => {
      const stepsConfig = getStepsConfig(mockIcons);

      expect(stepsConfig[StepCode.CONNECTING]).toHaveProperty("description");
      expect(stepsConfig[StepCode.REPAIR_PARTITION_TABLES]).toHaveProperty(
        "description"
      );
      expect(stepsConfig[StepCode.ERASE_DEVICE]).toHaveProperty("description");
      expect(stepsConfig[StepCode.FLASH_SYSTEM]).toHaveProperty("description");
      expect(stepsConfig[StepCode.FINALIZING]).toHaveProperty("description");
      expect(stepsConfig[StepCode.DONE]).toHaveProperty("description");

      // Ready step has iconStyle property
      expect(stepsConfig[StepCode.READY]).toHaveProperty("iconStyle");
    });
  });

  describe("getErrorsConfig", () => {
    it("should return errors configuration object", () => {
      const errorsConfig = getErrorsConfig(mockIcons);

      expect(errorsConfig).toBeDefined();
      expect(typeof errorsConfig).toBe("object");
    });

    it("should contain all error codes", () => {
      const errorsConfig = getErrorsConfig(mockIcons);

      expect(errorsConfig).toHaveProperty(ErrorCode.UNKNOWN.toString());
      expect(errorsConfig).toHaveProperty(
        ErrorCode.REQUIREMENTS_NOT_MET.toString()
      );
      expect(errorsConfig).toHaveProperty(ErrorCode.STORAGE_SPACE.toString());
      expect(errorsConfig).toHaveProperty(
        ErrorCode.UNRECOGNIZED_DEVICE.toString()
      );
      expect(errorsConfig).toHaveProperty(ErrorCode.LOST_CONNECTION.toString());
      expect(errorsConfig).toHaveProperty(
        ErrorCode.REPAIR_PARTITION_TABLES_FAILED.toString()
      );
      expect(errorsConfig).toHaveProperty(ErrorCode.ERASE_FAILED.toString());
      expect(errorsConfig).toHaveProperty(
        ErrorCode.FLASH_SYSTEM_FAILED.toString()
      );
    });

    it("should have proper structure for each error", () => {
      const errorsConfig = getErrorsConfig(mockIcons);

      Object.values(errorsConfig).forEach((error) => {
        expect(error).toHaveProperty("description");
        expect(typeof error.description).toBe("string");

        // Some errors have status and bgColor
        if (error.status) {
          expect(typeof error.status).toBe("string");
        }
        if (error.bgColor) {
          expect(typeof error.bgColor).toBe("string");
        }
        if (error.icon) {
          expect(typeof error.icon).toBe("string");
        }
      });
    });

    it("should use correct icons for each error", () => {
      const errorsConfig = getErrorsConfig(mockIcons);

      expect(errorsConfig[ErrorCode.UNKNOWN].icon).toBe(mockIcons.exclamation);
      expect(errorsConfig[ErrorCode.UNRECOGNIZED_DEVICE].icon).toBe(
        mockIcons.deviceQuestion
      );
      expect(errorsConfig[ErrorCode.LOST_CONNECTION].icon).toBe(
        mockIcons.cable
      );
      expect(errorsConfig[ErrorCode.REPAIR_PARTITION_TABLES_FAILED].icon).toBe(
        mockIcons.deviceExclamation
      );
      expect(errorsConfig[ErrorCode.ERASE_FAILED].icon).toBe(
        mockIcons.deviceExclamation
      );
      expect(errorsConfig[ErrorCode.FLASH_SYSTEM_FAILED].icon).toBe(
        mockIcons.deviceExclamation
      );
    });

    it("should handle Windows platform (default)", () => {
      const errorsConfig = getErrorsConfig(mockIcons, false);

      expect(errorsConfig[ErrorCode.LOST_CONNECTION].description).toBe(
        "The connection to your device was lost. Unplug your device and try again."
      );
    });

    it("should handle Linux platform with additional context", () => {
      const errorsConfig = getErrorsConfig(mockIcons, true);

      expect(errorsConfig[ErrorCode.LOST_CONNECTION].description).toBe(
        "The connection to your device was lost. Unplug your device and try again. Did you forget to unbind the device from qcserial?"
      );
    });

    it("should have appropriate error messages", () => {
      const errorsConfig = getErrorsConfig(mockIcons);

      expect(errorsConfig[ErrorCode.UNKNOWN].status).toBe("Unknown error");
      expect(errorsConfig[ErrorCode.REQUIREMENTS_NOT_MET].status).toBe(
        "Requirements not met"
      );
      expect(errorsConfig[ErrorCode.UNRECOGNIZED_DEVICE].status).toBe(
        "Unrecognized device"
      );
      expect(errorsConfig[ErrorCode.LOST_CONNECTION].status).toBe(
        "Lost connection"
      );
    });

    it("should include Discord channel references for hardware issues", () => {
      const errorsConfig = getErrorsConfig(mockIcons);

      const hardwareErrorDescriptions = [
        errorsConfig[ErrorCode.UNRECOGNIZED_DEVICE].description,
        errorsConfig[ErrorCode.REPAIR_PARTITION_TABLES_FAILED].description,
        errorsConfig[ErrorCode.ERASE_FAILED].description,
        errorsConfig[ErrorCode.FLASH_SYSTEM_FAILED].description,
      ];

      hardwareErrorDescriptions.forEach((description) => {
        expect(description).toContain("#hw-three-3x channel on Discord");
      });
    });

    it("should handle missing icons gracefully", () => {
      const incompleteIcons = {
        exclamation: "/assets/exclamation.svg",
        // Missing other icons
      };

      const errorsConfig = getErrorsConfig(incompleteIcons);

      expect(errorsConfig[ErrorCode.UNKNOWN].icon).toBe(
        "/assets/exclamation.svg"
      );
      expect(errorsConfig[ErrorCode.UNRECOGNIZED_DEVICE].icon).toBeUndefined();
    });

    it("should maintain platform independence for most errors", () => {
      const windowsConfig = getErrorsConfig(mockIcons, false);
      const linuxConfig = getErrorsConfig(mockIcons, true);

      // Most errors should be the same across platforms
      const platformIndependentErrors = [
        ErrorCode.UNKNOWN,
        ErrorCode.REQUIREMENTS_NOT_MET,
        ErrorCode.STORAGE_SPACE,
        ErrorCode.UNRECOGNIZED_DEVICE,
        ErrorCode.REPAIR_PARTITION_TABLES_FAILED,
        ErrorCode.ERASE_FAILED,
        ErrorCode.FLASH_SYSTEM_FAILED,
      ];

      platformIndependentErrors.forEach((errorCode) => {
        expect(windowsConfig[errorCode].description).toBe(
          linuxConfig[errorCode].description
        );
      });

      // Only lost-connection should differ
      expect(windowsConfig[ErrorCode.LOST_CONNECTION].description).not.toBe(
        linuxConfig[ErrorCode.LOST_CONNECTION].description
      );
    });
  });
});
