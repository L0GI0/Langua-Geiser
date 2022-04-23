import react from 'react';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
// material
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import palette from './palette';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';
import { Shadows } from '@mui/material/styles/shadows'
import { CSSObject } from '@mui/material'
// ----------------------------------------------------------------------

interface Props {
    children: React.ReactNode
}

const IserThemeOptions = {
    palette,
    shape: { borderRadius: 8 },
    customShadows,
    sidebarWidth: 240,
} as const;


export default function ThemeProvider({ children }: Props) {
  const themeOptions = useMemo(
    () => (IserThemeOptions),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);
  theme.shadows = shadows as Shadows;

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}