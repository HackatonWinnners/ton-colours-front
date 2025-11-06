import type { FC } from "react";
import { Placeholder, Title, List } from "@telegram-apps/telegram-ui";
import { Page } from "@/components/Page.tsx";

export const LaunchParamsPage: FC = () => {
  return (
    <Page>
      <List>
        <Title level="1" style={{ textAlign: "center" }}>
          Search
        </Title>
      </List>
      <Placeholder description="This section is under development" />
    </Page>
  );
};
