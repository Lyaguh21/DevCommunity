import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

export default function App() {
  return (
    <MantineProvider forceColorScheme="light">
      <Notifications />
      <Router />
    </MantineProvider>
  );
}
