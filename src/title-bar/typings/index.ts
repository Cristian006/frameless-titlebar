export interface MenuItem {
  id?: number | string;
  label?: string;
  disabled?: boolean;
  hidden?: boolean;
  submenu?: MenuItem[];
  type?: 'normal' | 'separator' | 'submenu' | 'checkbox' | 'radio';
  checked?: boolean;
  icon?: string;
  before?: number | string;
  after?: number | string;
  accelerator?: string;
  click?: (menu: MenuItem, browser: object | undefined, e: Event) => void;
}

export type Platform = 'win32' | 'linux' | 'darwin';

export interface ControlProps {
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  disableMaximize?: boolean;
  disableMinimize?: boolean;
}

export interface WindowControlsProps extends ControlProps {
  focused?: boolean;
}

export interface TitleBarProps extends ControlProps {
  onDoubleClick?: (e: React.MouseEvent) => void;
  platform?: Platform;
  children?: React.ReactNode;
  menu?: MenuItem[];
  theme?: TitleBarTheme;
  icon?: React.ReactNode;
  iconSrc?: string;
  title?: string;
  currentWindow?: object;
}

export type Palette = 'light' | 'dark';
export type Align = 'left' | 'center' | 'right';
export interface TitleTheme {
  color?: string;
  align?: Align;
  fontFamily?: string;
  fontWeight?: number | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "normal" | "bold" | "bolder" | "lighter";
}

export interface ColorMap {
  color?: string;
  background?: string;
}

export interface MenuButtonTheme {
  maxWidth?: number;
  default?: ColorMap;
  hover?: ColorMap;
  active?: ColorMap;
  disabledOpacity?: number;
}

export interface BarTheme {
  palette?: Palette;
  height?: number | string;
  color?: string;
  background?: string;
  borderBottom?: string;
  inActiveOpacity?: number;
  fontFamily?: string;
  icon?: IconTheme;
  title?: TitleTheme;
  button?: MenuButtonTheme;
}

export interface ControlButton {
  default?: ColorMap;
  hover?: ColorMap;
  disabledOpacity?: number;
}

export type ControlsLayout = 'right' | 'left';

export interface ControlsTheme {
  border?: string;
  borderRadius?: number | string;
  layout?: ControlsLayout;
  normal?: ControlButton;
  close?: ControlButton;
}

export interface MenuItemTheme {
  height?: number;
  disabledOpacity?: number;
  default?: ColorMap;
  active?: ColorMap;
}

export interface SeparatorTheme {
  color?: string;
}

export interface MenuHeaderTheme {
  show?: boolean;
  color?: string;
}

export interface AcceleratorTheme {
  color?: string;
}

export interface IconTheme {
  color?: string;
  width?: number;
  height?: number;
}

export interface StatusIconTheme {
  highlight?: boolean;
}

export interface ListTheme {
  minWidth?: number;
  maxWidth?: number;
  marginBottom?: number;
  background?: string;
  boxShadow?: string;
  zIndex?: number;
}

export interface OverlayTheme {
  background?: string;
  opacity?: number;
  zIndex?: number;
}

export type MenuStyle = 'default' | 'stacked' | 'vertical';

export interface MenuTheme {
  palette?: Palette;
  style?: MenuStyle;
  item?: MenuItemTheme;
  separator?: SeparatorTheme;
  header?: MenuHeaderTheme;
  accelerator?: AcceleratorTheme;
  icon?: StatusIconTheme;
  list?: ListTheme;
  overlay?: OverlayTheme;
  marginRight?: number;
}


export interface TitleBarTheme {
  platform?: Platform;
  bar?: BarTheme;
  controls?: ControlsTheme;
  menu?: MenuTheme;
}

export interface MenuBarProps {
  menu?: MenuItem[];
  focused: boolean;
  currentWindow?: object;
}

export interface MenuItemProps {
  item: MenuItem;
  onClick: (e: any) => void;
  currentWindow?: object;
  depth: number;
  selectedPath: number[];
  dispatch: any;
  idx: number;
}

export interface HorizontalMenuProps {
  menu: MenuItem[];
  focused: boolean;
  menuBar: React.RefObject<HTMLElement>;
  currentWindow?: object;
}

export interface VerticalMenuProps {
  menu: MenuItem[];
  focused: boolean;
  currentWindow?: object;
}

export interface OverflowState {
  menu: MenuItem[];
  index: number;
  hide: boolean;
}

export type RectResult = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
};

export interface MenuListProps {
  menu: MenuItem[];
  currentWindow?: object;
  depth: number;
  selectedPath: number[];
  dispatch: any;
  subLabel?: string;
}

export interface FullMenuListProps extends MenuListProps {
  parentRef: React.MutableRefObject<HTMLElement | null>;
}

export interface MenuButtonProps {
  focused: boolean;
  currentWindow?: object;
  item: MenuItem;
  altKey: boolean;
  style?: object;
  idx: number;
  depth: number;
  selectedPath: number[];
  dispatch: any;
  icon?: JSX.Element;
}

export interface FullMenuBottonProps extends MenuButtonProps {
  myRef: React.RefObject<HTMLDivElement>;
}

export interface TitleProps {
  focused: boolean;
  hasIcon: boolean;
  hasMenu: boolean;
  children?: React.ReactNode;
}

export interface BarProps {
  onDoubleClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode | React.ReactNodeArray;
  bottomBar?: boolean;
}

export interface WindowButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  close: boolean;
  controls: Required<ControlsTheme>;
  platform: Platform;
  isDisabled: boolean;
}
