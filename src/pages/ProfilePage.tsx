import { useMemo, useEffect, useState } from "react";
import { initData, useSignal, openLink, isColorDark } from "@tma.js/sdk-react";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import {
  List,
  Section,
  Title,
  Text,
  Placeholder,
} from "@telegram-apps/telegram-ui";
import { Page } from "@/components/Page.tsx";

export default function ProfilePage() {
  const wallet = useTonWallet();
  const data = useSignal(initData.state);
  const [colors, setColors] = useState<string[]>([]);

  const name = useMemo(() => {
    const u = data?.user;
    if (!u) return "";
    const parts = [u.first_name, u.last_name].filter(Boolean);
    return parts.join(" ");
  }, [data]);

  useEffect(() => {
    const addr = wallet?.account?.address;
    if (!addr) {
      setColors([]);
      return;
    }
    try {
      const raw = localStorage.getItem(`colors:${addr}`);
      const list = raw ? JSON.parse(raw) : [];
      const arr = Array.isArray(list) ? list : [];
      setColors(arr);
    } catch {
      setColors([]);
    }
  }, [wallet?.account?.address]);

  return (
    <Page>
      <List>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TonConnectButton />
        </div>
        <Section>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              padding: 12,
            }}
          >
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              }}
            >
              <img
                src={data?.user?.photo_url}
                alt={name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            {data?.user?.is_premium && (
              <div
                style={{
                  background: "#fff",
                  color: "#111",
                  borderRadius: 18,
                  padding: "6px 12px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#111",
                    display: "inline-block",
                  }}
                />
                <Text>Gold</Text>
              </div>
            )}
            <Title level="1">{name || "User"}</Title>
            <Text>{data?.user?.username ? `@${data.user.username}` : ""}</Text>
          </div>
        </Section>

        {wallet && colors.length > 0 && (
          <Section>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                paddingTop: 8,
              }}
            >
              <Title level="3" style={{ textAlign: "center" }}>
                Your Colours
              </Title>
              {colors.map((c, i) => (
                <div
                  key={`${c}-${i}`}
                  onClick={() => {
                    const url = `https://getgems.io/?search=${encodeURIComponent(
                      c
                    )}`;
                    const ok = window.confirm(
                      "Are you sure you want to open the collection on GetGems?"
                    );
                    if (ok) openLink(url);
                  }}
                  style={{
                    background: c,
                    borderRadius: 12,
                    minHeight: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Text
                    style={{ color: isColorDark(c) ? "#FFFFFF" : "#000000" }}
                  >
                    {c}
                  </Text>
                </div>
              ))}
            </div>
          </Section>
        )}

        {!wallet && (
          <Section>
            <Placeholder
              header="Wallet not connected"
              description="Connect your wallet to display your colours"
            />
          </Section>
        )}

        {wallet && colors.length === 0 && (
          <Section>
            <Placeholder
              header="No colours yet"
              description="You don't have any colours yet. Buy one to get started."
            />
          </Section>
        )}
      </List>
    </Page>
  );
}
