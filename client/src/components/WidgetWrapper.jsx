import { useTheme } from "@emotion/react";

function WidgetWrapper({ style, children, className }) {
  const theme = useTheme();
  return (
    <div
      className={`pt-6 px-6 pb-3 ${className}`}
      style={{
        ...style,
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.75rem",
      }}
    >
      {children}
    </div>
  );
}

export default WidgetWrapper;
