// UI state definitions for flash steps and error states
import { StepCode, ErrorCode } from "./manager";

// Icon imports - these will need to be passed from the component
export const getStepsConfig = (icons) => {
  const { bolt, cable, systemUpdate, done } = icons;

  return {
    [StepCode.INITIALIZING]: {
      status: "Initializing...",
      bgColor: "bg-gray-400 dark:bg-gray-700",
      icon: bolt,
    },
    [StepCode.READY]: {
      status: "Tap to start",
      bgColor: "bg-[#51ff00]",
      icon: bolt,
      iconStyle: "",
    },
    [StepCode.CONNECTING]: {
      status: "Waiting for connection",
      description:
        "Follow the instructions to connect your device to your computer",
      bgColor: "bg-yellow-500",
      icon: cable,
    },
    [StepCode.REPAIR_PARTITION_TABLES]: {
      status: "Repairing partition tables...",
      description: "Do not unplug your device until the process is complete",
      bgColor: "bg-lime-400",
      icon: systemUpdate,
    },
    [StepCode.ERASE_DEVICE]: {
      status: "Erasing device...",
      description: "Do not unplug your device until the process is complete",
      bgColor: "bg-lime-400",
      icon: systemUpdate,
    },
    [StepCode.FLASH_SYSTEM]: {
      status: "Flashing device...",
      description: "Do not unplug your device until the process is complete",
      bgColor: "bg-lime-400",
      icon: systemUpdate,
    },
    [StepCode.FINALIZING]: {
      status: "Finalizing...",
      description: "Do not unplug your device until the process is complete",
      bgColor: "bg-lime-400",
      icon: systemUpdate,
    },
    [StepCode.DONE]: {
      status: "Done",
      description:
        "Your device was flashed successfully. It should now boot into the openpilot setup.",
      bgColor: "bg-green-500",
      icon: done,
    },
  };
};

export const getErrorsConfig = (icons, isLinux = false) => {
  const { exclamation, deviceQuestion, cable, deviceExclamation } = icons;

  const errors = {
    [ErrorCode.UNKNOWN]: {
      status: "Unknown error",
      description:
        "An unknown error has occurred. Unplug your device, restart your browser and try again.",
      bgColor: "bg-red-500",
      icon: exclamation,
    },
    [ErrorCode.REQUIREMENTS_NOT_MET]: {
      status: "Requirements not met",
      description:
        "Your system does not meet the requirements to flash your device. Make sure to use a browser which supports WebUSB and is up to date.",
    },
    [ErrorCode.STORAGE_SPACE]: {
      description:
        "Your system does not have enough space available to download AGNOS. Your browser may be restricting the available space if you are in a private, incognito or guest session.",
    },
    [ErrorCode.UNRECOGNIZED_DEVICE]: {
      status: "Unrecognized device",
      description:
        "The device connected to your computer is not supported. Try using a different cable, USB port, or computer. If the problem persists, join the #hw-three-3x channel on Discord for help.",
      bgColor: "bg-yellow-500",
      icon: deviceQuestion,
    },
    [ErrorCode.LOST_CONNECTION]: {
      status: "Lost connection",
      description:
        "The connection to your device was lost. Unplug your device and try again.",
      icon: cable,
    },
    [ErrorCode.REPAIR_PARTITION_TABLES_FAILED]: {
      status: "Repairing partition tables failed",
      description:
        "Your device's partition tables could not be repaired. Try using a different cable, USB port, or computer. If the problem persists, join the #hw-three-3x channel on Discord for help.",
      icon: deviceExclamation,
    },
    [ErrorCode.ERASE_FAILED]: {
      status: "Erase failed",
      description:
        "The device could not be erased. Try using a different cable, USB port, or computer. If the problem persists, join the #hw-three-3x channel on Discord for help.",
      icon: deviceExclamation,
    },
    [ErrorCode.FLASH_SYSTEM_FAILED]: {
      status: "Flash failed",
      description:
        "AGNOS could not be flashed to your device. Try using a different cable, USB port, or computer. If the problem persists, join the #hw-three-3x channel on Discord for help.",
      icon: deviceExclamation,
    },
  };

  // Platform-specific modifications
  if (isLinux) {
    errors[ErrorCode.LOST_CONNECTION].description +=
      " Did you forget to unbind the device from qcserial?";
  }

  return errors;
};
