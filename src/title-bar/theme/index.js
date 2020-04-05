import { createContext, useEffect, useState } from 'react';
import merge from 'deepmerge';

const menuTheme = {
  dark: {
    palette: 'dark',
    style: 'default',
    disabled: {
      opacity: 0.3,
    },
    button: {
      color: {
        active: '#fff',
      },
      background: {
        active: 'rgb(48, 48, 48)',
      }
    },
    item: {
      height: 30,
      color: 'inherit',
      highlight: {
        color: '#fff',
        background: '#0372ef'
      }
    },
    separator: {
      color: '#e1e4e8'
    },
    header: { // sub label header
      show: true,
      color: '#6a737d',
    },
    accelerator: {
      color: '#6a737d',
    },
    icon: {
      highlight: true,
    },
    list: {
      minWidth: 200,
      maxWidth: 400,
      marginBottom: 10,
      marginRight: 0,
      background: 'rgb(48, 48, 48)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
    },
    overlay: {
      background: 'black',
      opacity: 0.4,
    },
  },
  light: {
    palette: 'light',
    button: {
      color: {
        active: '#24292e',
      },
      background: {
        active: '#fff',
      },
    },
    item: {
      color: '#24292e'
    },
    list: {
      background: '#fff',
    }
  },
  vertical: {
    style: 'vertical',
  },
  stacked: {
    style: 'stacked',
    list: {
      marginRight: 200
    }
  }
}

const controlsTheme = {
  dark: {
    color: '#fff',
    border: 'none',
    layout: 'right',
    borderRadius: 0,
    border: '',
    default: {
      color: 'inherit',
      hoverColor: '#fff',
      hoverBackground: 'rgba(255,255,255,0.3)',
    },
    close: {
      color: 'inherit',
      hoverColor: '#fff',
      hoverBackground: '#e81123'
    }
  },
  light: {
    color: '#000',
    default: {
      hoverBackground: 'rgba(0, 0, 0, 0.1)'
    },
  },
  linux: {
    borderRadius: '50%',
    border: '1px solid rgba(0,0,0,0.06)',
    close: {
      hoverBackground: '#c85458'
    }
  }
}

const barTheme = {
  dark: {
    palette: 'dark', // light, dark
    height: '28px',
    color: '#fff',
    background: '#24292e',
    borderBottom: '1px solid #000',
    titleColor: 'inherit',
    titleAlign: 'center',
    titleFontFamily: 'inherit',
    titleFontWeight: 'normal',
    inActiveOpacity: 0.6, // dim menu bar & title color when window is not in focus
    button: {
      color: 'inherit',
      background: {
        default: 'transparent',
        hover: 'rgba(255,255,255,0.3)'
      }
    },
  },
  light: {
    palette: 'light',
    color: '#24292e',
    background: '#e8e8e8',
    borderBottom: '1px solid #d3d4d5',
    button: {
      background: {
        hover: 'rgba(0, 0, 0, 0.1)'
      }
    }
  },
  darwin: {
    height: '22px',
  },
};

const getMenuTheme = (palette, menuStyle = 'default') => {
  let menu = menuTheme['dark']
  if (palette === 'light') {
    menu = merge(menu, menuTheme['light'])
  }
  if (menuStyle !== 'default') {
    menu = merge(menu, menuTheme[menuStyle])
  }
  return menu;
}

const getControlsTheme = (palette, platform) => {
  let controls = controlsTheme['dark']
  if (palette === 'light') {
    controls = merge(controls, controlsTheme['light'])
  }
  if (platform === 'linux') {
    controls = merge(controls, controlsTheme['linux'])
  }
  return controls
}

const getBarTheme = (palette, platform) => {
  let bar = barTheme['dark']
  if (palette === 'light') {
    bar = merge(bar, barTheme['light'])
  }
  if (platform === 'darwin') {
    bar = merge(bar, barTheme['darwin'])
  }
  return bar
}

const mergeTheme = (overrides = null, platform = 'win32') => {
  let theme = {
    platform
  };
  let paletteType = overrides?.palette ?? 'dark';
  if (overrides?.bar) {
    paletteType = overrides.bar.palette ?? paletteType;
    theme['bar'] = merge(getBarTheme(paletteType, platform), overrides.bar)
  } else {
    theme['bar'] = getBarTheme(paletteType, platform);
  }

  theme['controls'] = getControlsTheme(paletteType, platform)
  if (overrides?.controls) {
    theme['controls'] = merge(theme['controls'], overrides.controls)
  }

  let menuStyle = 'default'
  if (overrides?.menu) {
    let menuPalette = overrides.menu.palette ?? paletteType
    menuStyle = overrides.menu.style ?? menuStyle
    theme['menu'] = merge(getMenuTheme(menuPalette, menuStyle), overrides.menu)
  } else {
    theme['menu'] = getMenuTheme(paletteType, menuStyle)
  }

  return theme
};

export const useTheme = (overrides, platform = 'win32') => {
  const [currentTheme, setTheme] = useState(mergeTheme(overrides, platform));
  useEffect(() => {
    setTheme(mergeTheme(overrides, platform));
  }, [overrides, platform]);

  return currentTheme;
};

export const ThemeContext = createContext(mergeTheme());
