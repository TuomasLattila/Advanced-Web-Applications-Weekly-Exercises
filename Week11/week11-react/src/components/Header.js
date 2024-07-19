import React, { Suspense } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

const pages = [{title: 'Home', url: '/'}, {title: 'About', url: '/about'},];

function Header() {
  const { t, i18n } = useTranslation(['translation']);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  return (
    <AppBar position="static">
      <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          {pages.map((page) => (
            <Button
              LinkComponent={Link}
              to={page.url}
              key={page.title}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {t(page.title)}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: "flex" }}>
          <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            id='fi'
            onClick={() => changeLanguage("fi")}
          >
            FI
          </Button>
          <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            id='en'
            onClick={() => changeLanguage("en")}
          >
            EN
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default function App() {
  return (
    <Suspense fallback="loading">
      <Header />
    </Suspense>
  );
}