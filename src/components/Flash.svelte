<script>
  import { onMount } from "svelte";
  import { createFlashManager, StepCode, ErrorCode } from "../utils/manager";
  import { isLinux } from "../utils/platform";
  import { getStepsConfig, getErrorsConfig } from "../utils/errors";
  import { icons as iconPaths } from "../utils/icons";
  import DeviceIcon from "./DeviceIcon.svelte";
  import config from "../config";

  let step = StepCode.INITIALIZING;
  let message = "";
  let progress = -1;
  let error = ErrorCode.NONE;
  let connected = false;
  let serial = null;

  let qdlManager;

  // Create configuration objects using the extracted utilities
  const icons = {
    bolt: iconPaths.bolt,
    cable: iconPaths.cable,
    systemUpdate: iconPaths.systemUpdate,
    done: iconPaths.done,
    exclamation: iconPaths.exclamation,
    deviceQuestion: iconPaths.deviceQuestion,
    deviceExclamation: iconPaths.deviceExclamation,
  };

  const steps = getStepsConfig(icons);
  const errors = getErrorsConfig(icons, isLinux);

  onMount(async () => {
    try {
      qdlManager = await createFlashManager({
        manifestUrl: config.manifests.release,
        programmerUrl: config.loader.url,
        callbacks: {
          onStepChange: (v) => (step = v),
          onMessageChange: (v) => (message = v),
          onProgressChange: (v) => (progress = v),
          onErrorChange: (v) => (error = v),
          onConnectionChange: (v) => (connected = v),
          onSerialChange: (v) => (serial = v),
        },
      });
    } catch (err) {
      console.error("Error creating Flash manager:", err);
      error = ErrorCode.UNKNOWN;
    }
  });

  const handleStart = () => {
    qdlManager?.start();
  };
  const handleRetry = () => window.location.reload();

  $: uiState = {
    ...steps[step],
    ...(error ? { ...errors[ErrorCode.UNKNOWN], ...errors[error] } : {}),
  };
  $: ({ status, description, bgColor, icon, iconStyle = "invert" } = uiState);
  $: title = (() => {
    if (message && !error) {
      let t = `${message}...`;
      if (progress >= 0) t += ` (${(progress * 100).toFixed(0)}%)`;
      return t;
    } else if (error === ErrorCode.STORAGE_SPACE) return message;
    return status;
  })();

  const beforeUnloadListener = (event) => {
    event.preventDefault();
    return (event.returnValue =
      "Flash in progress. Are you sure you want to leave?");
  };

  $: showWarning =
    step >= StepCode.REPAIR_PARTITION_TABLES && step <= StepCode.FINALIZING;

  $: if (typeof window !== "undefined") {
    if (showWarning) {
      window.addEventListener("beforeunload", beforeUnloadListener, {
        capture: true,
      });
    } else {
      window.removeEventListener("beforeunload", beforeUnloadListener, {
        capture: true,
      });
    }
  }
</script>

<div
  id="flash"
  class="relative flex flex-col gap-8 justify-center items-center h-full"
>
  <div
    class={`p-8 rounded-full ${bgColor}`}
    style:cursor={step === StepCode.READY && !error ? "pointer" : "default"}
    on:click={step === StepCode.READY && !error ? handleStart : null}
  >
    <img
      src={icon}
      alt="cable"
      width="128"
      height="128"
      class={`${iconStyle} ${!error && step !== StepCode.DONE ? "animate-pulse" : ""}`}
    />
  </div>
  <div
    class="w-full max-w-3xl px-8 transition-opacity duration-300"
    style:opacity={progress === -1 ? 0 : 1}
  >
    <div class="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        class={`absolute top-0 bottom-0 left-0 w-full transition-all ${bgColor}`}
        style:transform="translateX({progress * 100 - 100}%)"
      ></div>
    </div>
  </div>
  <span class="text-3xl dark:text-white font-mono font-light">{title}</span>
  <span class="text-xl dark:text-white px-8 max-w-xl">{description}</span>
  {#if error}
    <button
      class="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors"
      on:click={handleRetry}>Retry</button
    >
  {/if}
  {#if connected}
    <div
      class="absolute bottom-0 m-0 lg:m-4 p-4 w-full sm:w-auto sm:min-w-[350px] sm:border sm:border-gray-200 dark:sm:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md flex flex-row gap-2"
      style:left="50%"
      style:transform="translate(-50%, -50%)"
    >
      <div class="flex flex-row gap-2">
        <DeviceIcon />
        Device connected
      </div>
      <span class="text-gray-400">|</span>
      <div class="flex flex-row gap-2">
        <span
          >Serial:<span class="ml-2 font-mono">{serial || "unknown"}</span
          ></span
        >
      </div>
    </div>
  {/if}
</div>
