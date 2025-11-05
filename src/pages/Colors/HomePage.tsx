import { useEffect, useMemo, useState, useRef } from "react";
import CustomColorPicker from "./CustomColorPicker";
import { List, Button, Text } from "@telegram-apps/telegram-ui";
import { Page } from "@/components/Page.tsx";
import { useTonWallet, useTonConnectUI } from "@tonconnect/ui-react";
import { miniApp, isColorDark, useLaunchParams } from "@tma.js/sdk-react";

function normalizeHex(hex: string): string {
  const h = hex.trim().replace(/^#/, "");
  if (h.length === 3) {
    const r = h[0];
    const g = h[1];
    const b = h[2];
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }
  return `#${h.slice(0, 6).padEnd(6, "0")}`.toUpperCase();
}

export default function HomePage() {
  const [hex, setHex] = useState("#6A0DAD");
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const inputRef = useRef<HTMLInputElement>(null);
  const [touched, setTouched] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const lp = useLaunchParams();
  const isMobile = ["ios", "android"].includes(lp.tgWebAppPlatform);

  const colorForUi = useMemo(() => normalizeHex(hex), [hex]);
  const isHexValid = useMemo(() => /^#[0-9A-Fa-f]{6}$/.test(hex.trim()), [hex]);

  useEffect(() => {
    try {
      miniApp.setBgColor("secondary_bg_color");
      if (miniApp.setHeaderColor.supports("rgb")) {
        miniApp.setHeaderColor("#000000");
      } else {
        miniApp.setHeaderColor("bg_color");
      }
    } catch {}
  }, [colorForUi]);

  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  const onMint = async () => {
    if (!wallet) {
      return;
    }
    try {
      const res = await fetch(`/api/mint-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hex: colorForUi }),
      });
      const data = await res.json();
      if (data && data.transaction) {
        await tonConnectUI.sendTransaction(data.transaction);
        try {
          const addr = wallet.account.address;
          const key = `colors:${addr}`;
          const raw = localStorage.getItem(key);
          const list = raw ? JSON.parse(raw) : [];
          const next = Array.isArray(list) ? list : [];
          if (!next.includes(colorForUi)) {
            next.unshift(colorForUi);
            localStorage.setItem(key, JSON.stringify(next.slice(0, 50)));
          }
        } catch {}
      }
    } catch {}
  };

  return (
    <Page back={false}>
      <List>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.1)",
              background: colorForUi,
              minHeight: 140,
              position: "relative",
            }}
            onClick={() => {
              inputRef.current?.focus();
            }}
          >
            <Text
              style={{
                color: isColorDark(colorForUi) ? "#FFFFFF" : "#000000",
              }}
            >
              {hex}
            </Text>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                inputRef.current?.blur();
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={hex}
                onChange={(e) => {
                  let v = e.target.value.toUpperCase();
                  v = v.replace(/\s+/g, "");
                  if (!v.startsWith("#")) {
                    v = "#" + v.replace(/#/g, "");
                  } else {
                    v = "#" + v.slice(1).replace(/#/g, "");
                  }
                  v =
                    "#" +
                    v
                      .slice(1)
                      .replace(/[^0-9A-F]/g, "")
                      .slice(0, 6);
                  setTouched(true);
                  setHex(v);
                }}
                inputMode="text"
                enterKeyHint="done"
                spellCheck={false}
                autoCapitalize="none"
                autoCorrect="off"
                onFocus={() => {
                  setTouched(true);
                  setIsEditing(true);
                }}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    inputRef.current?.blur();
                  }
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  background: "transparent",
                  border: "none",
                  width: "100%",
                  height: "100%",
                }}
              />
            </form>
          </div>
          <div style={{ width: "100%" }}>
            <CustomColorPicker
              color={colorForUi}
              onChange={(c) => {
                let v = c.hex.toUpperCase();
                if (!v.startsWith("#")) {
                  v = "#" + v;
                }
                v =
                  "#" +
                  v
                    .slice(1)
                    .replace(/[^0-9A-F]/g, "")
                    .slice(0, 6);
                setHex(v);
              }}
            />
          </div>
          {!isHexValid && touched && (
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Enter 6 HEX digits (0–9, A–F)
            </Text>
          )}
        </div>
        {!isMobile || !isEditing ? <div style={{ height: 72 }} /> : null}
      </List>
      {(!isMobile || !isEditing) && (
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: "calc(45px + env(safe-area-inset-bottom))",
            padding: "12px 16px",
            zIndex: 100,
          }}
        >
          <Button
            style={{ width: "100%" }}
            disabled={!wallet || !isHexValid}
            onClick={(e) => {
              onMint();
            }}
          >
            Buy for 1 TON
          </Button>
        </div>
      )}
    </Page>
  );
}
