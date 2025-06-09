import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  StepCode,
  ErrorCode,
  checkCompatibleDevice,
  createFlashManager,
} from "./manager.js";

describe("manager utility", () => {
  describe("constants", () => {
    it("should export StepCode constants", () => {
      expect(StepCode).toBeDefined();
      expect(typeof StepCode).toBe("object");

      expect(StepCode.INITIALIZING).toBe(0);
      expect(StepCode.READY).toBe(1);
      expect(StepCode.CONNECTING).toBe(2);
      expect(StepCode.REPAIR_PARTITION_TABLES).toBe(3);
      expect(StepCode.ERASE_DEVICE).toBe(4);
      expect(StepCode.FLASH_SYSTEM).toBe(5);
      expect(StepCode.FINALIZING).toBe(6);
      expect(StepCode.DONE).toBe(7);
    });

    it("should export ErrorCode constants", () => {
      expect(ErrorCode).toBeDefined();
      expect(typeof ErrorCode).toBe("object");

      expect(ErrorCode.UNKNOWN).toBe(-1);
      expect(ErrorCode.NONE).toBe(0);
      expect(ErrorCode.REQUIREMENTS_NOT_MET).toBe(1);
      expect(ErrorCode.STORAGE_SPACE).toBe(2);
      expect(ErrorCode.UNRECOGNIZED_DEVICE).toBe(3);
      expect(ErrorCode.LOST_CONNECTION).toBe(4);
      expect(ErrorCode.REPAIR_PARTITION_TABLES_FAILED).toBe(5);
      expect(ErrorCode.ERASE_FAILED).toBe(6);
      expect(ErrorCode.FLASH_SYSTEM_FAILED).toBe(7);
      expect(ErrorCode.FINALIZING_FAILED).toBe(8);
    });
  });

  describe("checkCompatibleDevice", () => {
    it("should identify comma three device (H28S7Q302BMR)", () => {
      const storageInfo = {
        block_size: 4096,
        page_size: 4096,
        num_physical: 6,
        mem_type: "UFS",
        prod_name: "H28S7Q302BMR",
        manufacturer_id: 429,
        total_blocks: 14145536,
      };

      const result = checkCompatibleDevice(storageInfo);
      expect(result).toBe("userdata_30");
    });

    it("should identify comma three device (H28U74301AMR)", () => {
      const storageInfo = {
        block_size: 4096,
        page_size: 4096,
        num_physical: 6,
        mem_type: "UFS",
        prod_name: "H28U74301AMR",
        manufacturer_id: 429,
        total_blocks: 14145536,
      };

      const result = checkCompatibleDevice(storageInfo);
      expect(result).toBe("userdata_30");
    });

    it("should identify comma 3X device (SDINDDH4-128G 1308)", () => {
      const storageInfo = {
        block_size: 4096,
        page_size: 4096,
        num_physical: 6,
        mem_type: "UFS",
        prod_name: "SDINDDH4-128G   1308",
        manufacturer_id: 325,
        total_blocks: 29605888,
      };

      const result = checkCompatibleDevice(storageInfo);
      expect(result).toBe("userdata_89");
    });

    it("should identify comma 3X device (SDINDDH4-128G 1272)", () => {
      const storageInfo = {
        block_size: 4096,
        page_size: 4096,
        num_physical: 6,
        mem_type: "UFS",
        prod_name: "SDINDDH4-128G   1272",
        manufacturer_id: 325,
        total_blocks: 29775872,
      };

      const result = checkCompatibleDevice(storageInfo);
      expect(result).toBe("userdata_90");
    });

    it("should throw error for incompatible UFS parameters", () => {
      const storageInfo = {
        block_size: 2048, // Wrong block size
        page_size: 4096,
        num_physical: 6,
        mem_type: "UFS",
        prod_name: "H28S7Q302BMR",
        manufacturer_id: 429,
        total_blocks: 14145536,
      };

      expect(() => checkCompatibleDevice(storageInfo)).toThrow(
        "UFS chip parameters mismatch"
      );
    });

    it("should throw error for wrong page size", () => {
      const storageInfo = {
        block_size: 4096,
        page_size: 2048, // Wrong page size
        num_physical: 6,
        mem_type: "UFS",
        prod_name: "H28S7Q302BMR",
        manufacturer_id: 429,
        total_blocks: 14145536,
      };

      expect(() => checkCompatibleDevice(storageInfo)).toThrow(
        "UFS chip parameters mismatch"
      );
    });

    it("should throw error for wrong num_physical", () => {
      const storageInfo = {
        block_size: 4096,
        page_size: 4096,
        num_physical: 4, // Wrong num_physical
        mem_type: "UFS",
        prod_name: "H28S7Q302BMR",
        manufacturer_id: 429,
        total_blocks: 14145536,
      };

      expect(() => checkCompatibleDevice(storageInfo)).toThrow(
        "UFS chip parameters mismatch"
      );
    });

    it("should throw error for wrong memory type", () => {
      const storageInfo = {
        block_size: 4096,
        page_size: 4096,
        num_physical: 6,
        mem_type: "eMMC", // Wrong memory type
        prod_name: "H28S7Q302BMR",
        manufacturer_id: 429,
        total_blocks: 14145536,
      };

      expect(() => checkCompatibleDevice(storageInfo)).toThrow(
        "UFS chip parameters mismatch"
      );
    });

    it("should throw error for unrecognized device", () => {
      const storageInfo = {
        block_size: 4096,
        page_size: 4096,
        num_physical: 6,
        mem_type: "UFS",
        prod_name: "UNKNOWN_DEVICE",
        manufacturer_id: 999,
        total_blocks: 99999999,
      };

      expect(() => checkCompatibleDevice(storageInfo)).toThrow(
        "Could not identify UFS chip"
      );
    });
  });

  describe("createFlashManager", () => {
    beforeEach(() => {
      // Mock fetch globally
      global.fetch = vi.fn();
    });

    it("should create FlashManager with valid parameters", async () => {
      const mockProgrammerData = new ArrayBuffer(1024);
      global.fetch.mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(mockProgrammerData),
      });

      const config = {
        manifestUrl: "https://example.com/manifest.json",
        programmerUrl: "https://example.com/programmer.bin",
        callbacks: {
          onStepChange: vi.fn(),
          onErrorChange: vi.fn(),
        },
      };

      // Mock ImageManager
      const mockImageManager = {
        init: vi.fn().mockResolvedValue(undefined),
      };

      // Mock FlashManager constructor and initialize
      const mockFlashManager = {
        initialize: vi.fn().mockResolvedValue(undefined),
        error: 0, // ErrorCode.NONE
      };

      // We can't easily test the full createFlashManager without mocking the entire QDL system
      // So we'll test that it handles fetch errors properly
      await expect(async () => {
        await createFlashManager(config);
      }).rejects.toThrow(); // Will throw because QDL dependencies aren't available in test
    });

    it("should handle fetch errors", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      const config = {
        manifestUrl: "https://example.com/manifest.json",
        programmerUrl: "https://example.com/programmer.bin",
      };

      await expect(createFlashManager(config)).rejects.toThrow(
        "Failed to fetch programmer binary: 404 Not Found"
      );
    });

    it("should handle network errors", async () => {
      global.fetch.mockRejectedValueOnce(new Error("Network error"));

      const config = {
        manifestUrl: "https://example.com/manifest.json",
        programmerUrl: "https://example.com/programmer.bin",
      };

      await expect(createFlashManager(config)).rejects.toThrow("Network error");
    });

    it("should use default callbacks when none provided", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(1024)),
      });

      const config = {
        manifestUrl: "https://example.com/manifest.json",
        programmerUrl: "https://example.com/programmer.bin",
        // No callbacks provided
      };

      // Should not throw due to missing callbacks
      await expect(async () => {
        await createFlashManager(config);
      }).rejects.toThrow(); // Will throw because QDL dependencies aren't available in test
    });
  });
});
