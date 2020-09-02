import { createContext, useEffect, useState } from 'react';
import merge from 'deepmerge';
import {
  TitleBarTheme,
  Palette,
  Platform,
  MenuStyle,
  ControlsTheme,
  ControlButton,
  ColorMap,
  MenuTheme,
  MenuItemTheme,
  SeparatorTheme,
  MenuHeaderTheme,
  AcceleratorTheme,
  IconTheme,
  ListTheme,
  OverlayTheme,
  BarTheme,
  TitleTheme,
  MenuButtonTheme,
  StatusIconTheme
} from '../typings';

const menuTheme = {
  dark: <MenuTheme>{
    palette: 'dark',
    style: 'default',
    item: <MenuItemTheme>{
      height: 30,
      disabledOpacity: 0.3,
      default: <ColorMap>{
        color: 'inherit',
        background: 'transparent'
      },
      active: <ColorMap>{
        color: '#fff',
        background: '#0372ef'
      }
    },
    separator: <SeparatorTheme>{
      color: '#e1e4e8'
    },
    header: <MenuHeaderTheme>{
      show: true,
      color: '#6a737d',
    },
    accelerator: <AcceleratorTheme>{
      color: '#6a737d',
    },
    icon: <StatusIconTheme>{
      highlight: true
    },
    list: <ListTheme>{
      minWidth: 200,
      maxWidth: 400,
      marginBottom: 10,
      background: 'rgb(48, 48, 48)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      zIndex: 2001,
    },
    overlay: <OverlayTheme>{
      background: 'black',
      opacity: 0.4,
      zIndex: 2000
    },
    marginRight: 0
  },
  light: <MenuTheme>{
    palette: 'light',
    item: <MenuItemTheme>{
      default: <ColorMap>{
        color: '#24292e'
      }
    },
    list: <ListTheme>{
      background: '#fff',
    }
  },
  vertical: <MenuTheme>{
    style: 'vertical',
  },
  stacked: <MenuTheme>{
    style: 'stacked',
    marginRight: 200
  }
}

const controlsTheme = {
  dark: <ControlsTheme>{
    border: 'none',
    layout: 'right',
    borderRadius: 0,
    normal: <ControlButton>{
      default: <ColorMap>{
        color: 'inherit',
        background: 'transparent'
      },
      hover: <ColorMap>{
        color: '#fff',
        background: 'rgba(255,255,255,0.3)'
      },
      disabledOpacity: 0.3
    },
    close: <ControlButton>{
      default: <ColorMap>{
        color: 'inherit',
        background: 'transparent'
      },
      hover: <ColorMap>{
        color: '#fff',
        background: '#e81123'
      }
    }
  },
  light: <ControlsTheme>{
    color: '#000',
    normal: <ControlButton>{
      hover: <ColorMap>{
        background: 'rgba(0, 0, 0, 0.1)'
      },
      disabledOpacity: 0.3
    },
  },
  linux: <ControlsTheme>{
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: '50%',
    close: <ControlButton>{
      hover: <ColorMap>{
        background: '#c85458'
      },
    }
  }
}

const barTheme = {
  dark: <BarTheme>{
    // light, dark
    palette: 'dark',
    height: '28px',
    color: '#fff',
    background: '#24292e',
    borderBottom: '1px solid #000',
    // dim menu bar & title color when window is not in focus
    inActiveOpacity: 0.6,
    // default fontFamily for titlebar eg: menus, menu buttons, and title
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif",
    icon: <IconTheme>{
      color: '#0372ef',
      width: 20,
      height: 20
    },
    title: <TitleTheme>{
      color: 'inherit',
      align: 'center',
      // overwritable fontFamily for just the app title
      fontFamily: 'inherit',
      fontWeight: 'normal',
    },
    button: <MenuButtonTheme>{
      maxWidth: 100,
      active: <ColorMap>{
        color: '#fff',
        background: 'rgb(48, 48, 48)',
      },
      default: <ColorMap>{
        color: 'inherit',
        background: 'transparent'
      },
      hover: <ColorMap>{
        color: 'inherit',
        background: 'rgba(255,255,255,0.3)'
      },
      disabledOpacity: 0.3
    },
  },
  light: <BarTheme>{
    palette: 'light',
    color: '#24292e',
    background: '#e8e8e8',
    borderBottom: '1px solid #d3d4d5',
    button: <MenuButtonTheme>{
      active: <ColorMap>{
        color: '#24292e',
        background: '#fff',
      },
      hover: <ColorMap>{
        background: 'rgba(0, 0, 0, 0.1)'
      }
    },
  },
  darwin: <BarTheme>{
    height: '22px',
  },
};

const getMenuTheme = (palette: Palette, menuStyle: MenuStyle = 'default'): MenuTheme => {
  let menu = menuTheme['dark']
  if (palette === 'light') {
    menu = merge(menu, menuTheme['light'])
  }
  if (menuStyle !== 'default') {
    menu = merge(menu, menuTheme[menuStyle])
  }
  return menu;
}

const getControlsTheme = (palette: Palette, platform: Platform): ControlsTheme => {
  let controls: ControlsTheme = controlsTheme['dark']
  if (palette === 'light') {
    controls = merge(controls, controlsTheme['light'])
  }
  if (platform === 'linux') {
    controls = merge(controls, controlsTheme['linux'])
  }
  return controls
}

const getBarTheme = (palette: Palette, platform: Platform): BarTheme => {
  let bar = barTheme['dark']
  if (palette === 'light') {
    bar = merge(bar, barTheme['light'])
  }
  if (platform === 'darwin') {
    bar = merge(bar, barTheme['darwin'])
  }
  return bar
}

const mergeTheme = (overrides?: TitleBarTheme, platform: Platform = 'win32'): Required<TitleBarTheme> => {
  let theme: TitleBarTheme = {
    platform
  };
  let paletteType: Palette = 'dark'
  if (overrides?.bar) {
    paletteType = overrides.bar.palette ?? 'dark';
    theme['bar'] = merge(getBarTheme(paletteType, platform), overrides.bar)
  } else {
    theme['bar'] = getBarTheme(paletteType, platform);
  }

  theme['controls'] = getControlsTheme(paletteType, platform)
  if (overrides?.controls) {
    theme['controls'] = merge(theme['controls'], overrides.controls)
  }

  let menuStyle: MenuStyle = 'default'
  if (overrides?.menu) {
    let menuPalette = overrides.menu.palette ?? paletteType
    menuStyle = overrides.menu.style ?? menuStyle
    theme['menu'] = merge(getMenuTheme(menuPalette, menuStyle), overrides.menu)
  } else {
    theme['menu'] = getMenuTheme(paletteType, menuStyle)
  }
  return theme as Required<TitleBarTheme>;
};

export const useTheme = (overrides?: TitleBarTheme, platform: Platform = 'win32'): Required<TitleBarTheme> => {
  const [currentTheme, setTheme] = useState(mergeTheme(overrides, platform));
  useEffect(() => {
    setTheme(mergeTheme(overrides, platform));
  }, [overrides, platform]);
  return currentTheme;
};

export const ThemeContext = createContext(mergeTheme());
