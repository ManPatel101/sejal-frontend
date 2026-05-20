export default function Badge({ children }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        background: "#fef2f2",
        color: "#dc2626",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: "700",
      }}
    >
      {children}
    </span>
  );
}