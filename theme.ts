"use client";

import { createTheme, virtualColor } from "@mantine/core";

export const theme = createTheme({
  colors: {
    "creativity-fg": virtualColor({
      name: "creativity-fg",
      dark: "blue.5",
      light: "blue.5",
    }),
    "activity-fg": virtualColor({
      name: "activity-fg",
      dark: "red.5",
      light: "red.5",
    }),
    "service-fg": virtualColor({
      name: "service-fg",
      dark: "teal.5",
      light: "teal.5",
    }),
    "creativity-bg": virtualColor({
      name: "creativity-bg",
      dark: "blue.1",
      light: "blue.1",
    }),
    "activity-bg": virtualColor({
      name: "activity-bg",
      dark: "red.1",
      light: "red.1",
    }),
    "service-bg": virtualColor({
      name: "service-bg",
      dark: "teal.1",
      light: "teal.1",
    }),
  },
});
