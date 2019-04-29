export const darkTheme = {
  /* Title */
  barTheme: 'dark', // light, dark
  barHeight: '22px', // defines the bar height for mac os
  winBarHeight: '28px', // defines the bar height for windows os
  barColor: '#fff',
  barTitleColor: 'inherit',
  barBackgroundColor: '#24292e',
  barShowBorder: false,
  titleFontFamily: 'inherit',
  titleFontWeight: 'normal',
  barBorderBottom: '1px solid #000',
  inActiveOpacity: 0.6, // dim menu bar & title color when window is not in focus
  // should the icon be shown in the center of the toolbar on Mac/Linux apps alongside the app or title property
  showIconDarwin: true,
  /* Menu */
  menuStyle: 'horizontal', // horizontal, vertical, stacked
  menuDimItems: true, // dim other active menu items when menu list is open
  menuDimOpacity: 0.6,
  menuDisabledOpacity: 0.3,
  menuMarginBottom: 10, // margin from bottom for max height
  stackedMenuMarginRight: 200, // margin from right for max width
  menuMaxWidth: 350, // max width of a menu list
  menuBackgroundColor: '#fff',
  menuItemHeight: '30px',
  menuItemTextColor: '#fff',
  menuItemHoverBackground: 'rgba(255,255,255,0.3)',
  menuActiveTextColor: '#24292e',
  menuTextHighlightColor: '#fff',
  menuHighlightColor: '#0372ef',
  accentStatusIcon: true,
  menuSubLabelHeaders: true,
  menuSubLabelColor: '#6a737d',
  menuAcceleratorColor: '#6a737d',
  menuShowBoxShadow: true,
  menuBoxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  /* Menu Overlay */
  menuOverlayBackground: 'black',
  menuOverlayOpacity: 0.4,
  menuSeparatorColor: '#e1e4e8',
  /* WindowControls */
  windowControlsColor: '#fff',
  windowCloseHover: '#fff',
  windowCloseBackground: '#e81123',
  windowCloseActive: '#bf0f1d',
  windowDefaultBackground: 'rgba(255,255,255,0.3)',
  windowDefaultActive: 'rgba(255,255,255,0.2)',
  controlsLayout: 'right', // window control placement for linux systems
  linuxBorder: '1px solid rgba(0,0,0,0.06)', // linux window controls border color
  linuxCloseBackground: '#c85458', // linux close button background color
  linuxCloseColor: '#3b383d',
  linuxCloseActive: '#C24A41',
};

export const lightTheme = {
  ...darkTheme,
  /* Title */
  barTheme: 'light',
  barColor: '#24292e',
  barBackgroundColor: '#e8e8e8',
  barBorderBottom: '1px solid #d3d4d5',

  /* Menu */
  menuItemTextColor: '#24292e',
  menuItemHoverBackground: 'rgba(0, 0, 0, 0.1)',

  /* WindowControls */
  windowControlsColor: '#000',
  windowDefaultBackground: 'rgba(0, 0, 0, 0.1)',
  windowDefaultActive: 'rgba(0, 0, 0, 0.2)'
};
