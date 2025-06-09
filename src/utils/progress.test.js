import { describe, it, expect, vi } from "vitest";
import { createSteps, withProgress } from "./progress.js";

describe("progress utility", () => {
  describe("createSteps", () => {
    it("should create callbacks for equal weighted steps", () => {
      const onProgress = vi.fn();
      const callbacks = createSteps(3, onProgress);

      expect(callbacks).toHaveLength(3);
      expect(typeof callbacks[0]).toBe("function");
      expect(typeof callbacks[1]).toBe("function");
      expect(typeof callbacks[2]).toBe("function");
    });

    it("should create callbacks for custom weighted steps", () => {
      const onProgress = vi.fn();
      const callbacks = createSteps([1, 2, 3], onProgress);

      expect(callbacks).toHaveLength(3);
      expect(typeof callbacks[0]).toBe("function");
      expect(typeof callbacks[1]).toBe("function");
      expect(typeof callbacks[2]).toBe("function");
    });

    it("should calculate correct progress for equal weights", () => {
      const onProgress = vi.fn();
      const callbacks = createSteps(3, onProgress);

      // Step 1: 50% complete
      callbacks[0](0.5);
      expect(onProgress).toHaveBeenCalledWith(0.5 / 3); // ~0.167

      // Step 2: 100% complete
      callbacks[1](1.0);
      expect(onProgress).toHaveBeenCalledWith((0.5 + 1.0) / 3); // 0.5

      // Step 3: 75% complete
      callbacks[2](0.75);
      expect(onProgress).toHaveBeenCalledWith((0.5 + 1.0 + 0.75) / 3); // ~0.75
    });

    it("should calculate correct progress for custom weights", () => {
      const onProgress = vi.fn();
      const callbacks = createSteps([1, 2, 3], onProgress); // Total weight: 6

      // Step 1 (weight 1): 100% complete
      callbacks[0](1.0);
      expect(onProgress).toHaveBeenCalledWith(1 / 6); // ~0.167

      // Step 2 (weight 2): 50% complete
      callbacks[1](0.5);
      expect(onProgress).toHaveBeenCalledWith((1 + 1) / 6); // ~0.333

      // Step 3 (weight 3): 100% complete
      callbacks[2](1.0);
      expect(onProgress).toHaveBeenCalledWith((1 + 1 + 3) / 6); // ~0.833
    });

    it("should only call onProgress when progress actually changes", () => {
      const onProgress = vi.fn();
      const callbacks = createSteps(2, onProgress);

      // First call with 0.5
      callbacks[0](0.5);
      expect(onProgress).toHaveBeenCalledTimes(1);

      // Same progress value - should not call onProgress
      callbacks[0](0.5);
      expect(onProgress).toHaveBeenCalledTimes(1);

      // Different progress value - should call onProgress
      callbacks[0](0.7);
      expect(onProgress).toHaveBeenCalledTimes(2);
    });

    it("should handle zero progress correctly", () => {
      const onProgress = vi.fn();
      const callbacks = createSteps(2, onProgress);

      // Initial progress is 0, so calling with 0 won't trigger onProgress
      // because progressParts[idx] !== progress check will be false
      callbacks[0](0.1); // Set to non-zero first
      callbacks[0](0); // Now set to zero
      expect(onProgress).toHaveBeenCalledWith(0);

      callbacks[1](0.1); // Set to non-zero first
      callbacks[1](0); // Now set to zero
      expect(onProgress).toHaveBeenCalledWith(0);
    });

    it("should handle progress values greater than 1", () => {
      const onProgress = vi.fn();
      const callbacks = createSteps(2, onProgress);

      callbacks[0](1.5); // Should work even with values > 1
      expect(onProgress).toHaveBeenCalledWith(1.5 / 2);
    });

    it("should handle single step", () => {
      const onProgress = vi.fn();
      const callbacks = createSteps(1, onProgress);

      callbacks[0](0.5);
      expect(onProgress).toHaveBeenCalledWith(0.5);

      callbacks[0](1.0);
      expect(onProgress).toHaveBeenCalledWith(1.0);
    });

    it("should handle empty array of weights", () => {
      const onProgress = vi.fn();
      const callbacks = createSteps([], onProgress);

      expect(callbacks).toHaveLength(0);
    });
  });

  describe("withProgress", () => {
    it("should create step-callback pairs for simple steps", () => {
      const onProgress = vi.fn();
      const steps = ["step1", "step2", "step3"];
      const stepPairs = withProgress(steps, onProgress);

      expect(stepPairs).toHaveLength(3);
      expect(stepPairs[0][0]).toBe("step1");
      expect(stepPairs[1][0]).toBe("step2");
      expect(stepPairs[2][0]).toBe("step3");
      expect(typeof stepPairs[0][1]).toBe("function");
      expect(typeof stepPairs[1][1]).toBe("function");
      expect(typeof stepPairs[2][1]).toBe("function");
    });

    it("should use default weight calculation for objects with size property", () => {
      const onProgress = vi.fn();
      const steps = [
        { name: "step1", size: 10 },
        { name: "step2", size: 20 },
        { name: "step3", size: 30 },
      ];
      const stepPairs = withProgress(steps, onProgress);

      // Test that weights are used properly
      stepPairs[0][1](1.0); // Step 1 complete (weight 10)
      expect(onProgress).toHaveBeenCalledWith(10 / 60); // 10 / (10+20+30)

      stepPairs[1][1](1.0); // Step 2 complete (weight 20)
      expect(onProgress).toHaveBeenCalledWith(30 / 60); // (10+20) / 60
    });

    it("should use default weight calculation for objects with length property", () => {
      const onProgress = vi.fn();
      const steps = [
        { name: "step1", length: 5 },
        { name: "step2", length: 15 },
      ];
      const stepPairs = withProgress(steps, onProgress);

      stepPairs[0][1](1.0); // Step 1 complete (weight 5)
      expect(onProgress).toHaveBeenCalledWith(5 / 20); // 5 / (5+15)
    });

    it("should use weight 1 for strings and objects without size/length", () => {
      const onProgress = vi.fn();
      const steps = [
        "stringStep",
        { name: "objectStep" },
        { data: "noSizeOrLength" },
      ];
      const stepPairs = withProgress(steps, onProgress);

      stepPairs[0][1](1.0); // Weight 1
      expect(onProgress).toHaveBeenCalledWith(1 / 3);

      stepPairs[1][1](1.0); // Weight 1
      expect(onProgress).toHaveBeenCalledWith(2 / 3);

      stepPairs[2][1](1.0); // Weight 1
      expect(onProgress).toHaveBeenCalledWith(3 / 3);
    });

    it("should use custom weight calculation function", () => {
      const onProgress = vi.fn();
      const steps = [
        { priority: "high" },
        { priority: "medium" },
        { priority: "low" },
      ];
      const getStepWeight = (step) => {
        switch (step.priority) {
          case "high":
            return 3;
          case "medium":
            return 2;
          case "low":
            return 1;
          default:
            return 1;
        }
      };
      const stepPairs = withProgress(steps, onProgress, getStepWeight);

      stepPairs[0][1](1.0); // High priority (weight 3)
      expect(onProgress).toHaveBeenCalledWith(3 / 6); // 3 / (3+2+1)

      stepPairs[1][1](1.0); // Medium priority (weight 2)
      expect(onProgress).toHaveBeenCalledWith(5 / 6); // (3+2) / 6
    });

    it("should handle numeric steps", () => {
      const onProgress = vi.fn();
      const steps = [10, 20, 30];
      const stepPairs = withProgress(steps, onProgress);

      stepPairs[0][1](1.0); // Step with value 10 (weight 10)
      expect(onProgress).toHaveBeenCalledWith(10 / 60);

      stepPairs[1][1](1.0); // Step with value 20 (weight 20)
      expect(onProgress).toHaveBeenCalledWith(30 / 60);
    });

    it("should handle empty steps array", () => {
      const onProgress = vi.fn();
      const stepPairs = withProgress([], onProgress);

      expect(stepPairs).toHaveLength(0);
    });

    it("should work with mixed step types", () => {
      const onProgress = vi.fn();
      const steps = [
        "string",
        42,
        { size: 10 },
        { length: 5 },
        { name: "noWeight" },
      ];
      const stepPairs = withProgress(steps, onProgress);

      expect(stepPairs).toHaveLength(5);
      // Weights: 1 (string) + 42 (number) + 10 (size) + 5 (length) + 1 (no weight) = 59

      stepPairs[0][1](1.0); // String step (weight 1)
      expect(onProgress).toHaveBeenCalledWith(1 / 59);
    });
  });
});
