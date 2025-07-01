import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { Router } from "./providers/Router";

export default function App() {
  return (
    <MantineProvider forceColorScheme="light">
      <Notifications position="top-right" autoClose={1500} />
      <Router />
    </MantineProvider>
  );
}
