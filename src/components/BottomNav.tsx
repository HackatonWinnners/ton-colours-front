import { Link } from "@/components/Link/Link.tsx";
import { useLocation } from "react-router-dom";

export default function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "var(--tg-theme-secondary-bg-color, #f5f5f5)",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        padding: 12,
        minHeight: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        color: "var(--tg-theme-text-color, #111)",
      }}
    >
      <Link
        to="/"
        aria-label="Home"
        style={{
          textDecoration: "none",
          color:
            pathname === "/"
              ? "var(--tg-theme-button-color, #007AFF)"
              : "var(--tg-theme-text-color, #111)",
          opacity: pathname === "/" ? 1 : 0.7,
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: pathname === "/" ? "scale(1.1)" : "scale(1.0)" }}
        >
          <path
            d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-10.5z"
            fill="currentColor"
          />
        </svg>
      </Link>
      <Link
        to="/profile"
        aria-label="Profile"
        style={{
          textDecoration: "none",
          color:
            pathname === "/profile"
              ? "var(--tg-theme-button-color, #007AFF)"
              : "var(--tg-theme-text-color, #111)",
          opacity: pathname === "/profile" ? 1 : 0.7,
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: pathname === "/profile" ? "scale(1.1)" : "scale(1.0)" }}
        >
          <circle cx="12" cy="8" r="4" fill="currentColor" />
          <path d="M4 21c0-4 4-7 8-7s8 3 8 7" fill="currentColor" />
        </svg>
      </Link>
      <Link
        to="/launch-params"
        aria-label="Search"
        style={{
          textDecoration: "none",
          color:
            pathname === "/launch-params"
              ? "var(--tg-theme-button-color, #007AFF)"
              : "var(--tg-theme-text-color, #111)",
          opacity: pathname === "/launch-params" ? 1 : 0.7,
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: pathname === "/launch-params" ? "scale(1.1)" : "scale(1.0)" }}
        >
          <circle
            cx="11"
            cy="11"
            r="7"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <line
            x1="16.65"
            y1="16.65"
            x2="21"
            y2="21"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </Link>
      <Link
        to="/theme-params"
        aria-label="Menu"
        style={{
          textDecoration: "none",
          color:
            pathname === "/theme-params"
              ? "var(--tg-theme-button-color, #007AFF)"
              : "var(--tg-theme-text-color, #111)",
          opacity: pathname === "/theme-params" ? 1 : 0.7,
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: pathname === "/theme-params" ? "scale(1.1)" : "scale(1.0)" }}
        >
          <line
            x1="4"
            y1="6"
            x2="20"
            y2="6"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="4"
            y1="12"
            x2="20"
            y2="12"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="4"
            y1="18"
            x2="20"
            y2="18"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </Link>
    </nav>
  );
}
