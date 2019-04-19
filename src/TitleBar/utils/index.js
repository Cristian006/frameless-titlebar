import isEqual from 'lodash.isequal';

export const debounce = (func, wait, immediate) => {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const getProperty = (path, obj) => path.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, obj);

export const reduxSet = (obj, path, val) => {
  const [prop, ...restPath] = path;
  if (typeof prop === 'undefined') {
    if (!isEqual(obj, val)) {
      return val;
    }
    return obj;
  }
  let before;
  if (prop in obj) {
    before = obj[prop];
  } else {
    before = {};
  }
  const after = reduxSet(before, restPath, val);
  if (after !== before) {
    let result;
    if (Array.isArray(obj)) {
      result = obj.slice();
      result[prop] = after;
    } else {
      result = {
        ...obj,
        [prop]: after
      };
    }
    return result;
  }
  return obj;
};

export const defaultMenuItem = {
  id: '',
  enabled: true,
  label: '',
  checked: false,
  visible: true,
  type: 'normal',
  accelerator: '',
  position: '',
  submenu: [],
  click: () => {}
};

export const darkTheme = {
  /* Title */
  barTheme: 'dark', // light, dark
  barHeight: '22px', // Change this value if you set 'titleBarStyle' to 'hiddenInset'
  winBarHeight: '28px',
  barColor: '#fff',
  barTitleColor: 'inherit',
  barBackgroundColor: '#24292e',
  barShowBorder: false,
  barBorderBottom: '1px solid #000',
  // should the icon be shown in the center of the toolbar on Mac/Linux apps alongside the app or title property
  showIconDarLin: true,

  /* Menu */
  menuStyle: 'horizontal', // horizontal, vertical
  menuDimItems: true,
  menuDimOpacity: 0.6,
  menuDisabledOpacity: 0.3,
  menuBackgroundColor: '#fff',
  menuItemTextColor: '#fff',
  menuItemHoverBackground: 'rgba(255,255,255,0.3)',
  menuActiveTextColor: '#24292e',
  menuTextHighlightColor: '#fff',
  menuHighlightColor: '#0372ef',
  accentStatusIcon: false,
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
  windowDefaultActive: 'rgba(0, 0, 0, 0.2)',
};
