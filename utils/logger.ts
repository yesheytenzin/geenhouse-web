type LogLevel = "info" | "warn" | "error";

interface LogMessageProps {
  level: LogLevel;
  message: string;
  additionalInfo?: any;
}

const logMessage = ({
  level,
  message,
  additionalInfo,
}: LogMessageProps): void => {
  const timestamp = new Date().toISOString();

  switch (level) {
    case "info":
      console.info(`[INFO] ${timestamp} - ${message}`, additionalInfo);
      break;
    case "warn":
      console.warn(`[WARN] ${timestamp} - ${message}`, additionalInfo);
      break;
    case "error":
      console.error(`[ERROR] ${timestamp} - ${message}`, additionalInfo);
      break;
    default:
      console.log(`[LOG] ${timestamp} - ${message}`, additionalInfo);
  }
};

// Convenience functions
const info = (message: string, additionalInfo?: any): void => {
  logMessage({ level: "info", message, additionalInfo });
};

const warn = (message: string, additionalInfo?: any): void => {
  logMessage({ level: "warn", message, additionalInfo });
};

const error = (message: string, additionalInfo?: any): void => {
  logMessage({ level: "error", message, additionalInfo });
};

export { info, warn, error };
