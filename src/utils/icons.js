// Centralized icon system for the Flash application
// Exports all icon paths and inline SVG definitions for consistent usage

// External SVG file paths (served from public/assets/)
export const icons = {
  // Main interface icons
  bolt: "/assets/bolt.svg",
  cable: "/assets/cable.svg",
  done: "/assets/done.svg",
  exclamation: "/assets/exclamation.svg",
  systemUpdate: "/assets/system_update_c3.svg",

  // Device state icons
  deviceExclamation: "/assets/device_exclamation_c3.svg",
  deviceQuestion: "/assets/device_question_c3.svg",

  // Branding and UI icons
  comma: "/assets/comma.svg",
  qdlPorts: "/assets/qdl-ports.svg",
};

// Helper function to get an icon path with fallback
export const getIcon = (iconName) => {
  if (!(iconName in icons)) {
    console.warn(`Icon "${iconName}" not found in icon system`);
    return icons.exclamation; // fallback
  }
  return icons[iconName];
};

// Export default icons object for backward compatibility
export default icons;
