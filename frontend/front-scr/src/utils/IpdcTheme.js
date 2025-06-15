import {createTheme} from '@mui/system'; 

import {darkScrollbar} from '@mui/material';
//todo: CssBaseline  for consistenet theming
//      - <CssBaseline enableColorScheme />
//      - No base font-size is declared on the <html>, but 16px is assumed (the browser default).
//         see implication https://mui.com/material-ui/customization/typography/#html-font-size
export default function IPDCTheme() {
  return createTheme({
    mode: 'dark',
    comopnents: {
      MuiCssBaseline: (themeParam)=>({
        body: themeParam.palette.mode==='dark'? darkScrollbar(): null,
      })
    }
  });
}
