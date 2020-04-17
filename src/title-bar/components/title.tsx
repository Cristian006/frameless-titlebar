import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from '../style.css';
import { ThemeContext } from '../theme';
import { TitleProps, TitleTheme, Align, MenuStyle } from '../typings';

const getMargin = (margin: string, align: Align, hasIcon: boolean, hasMenu: boolean, style: MenuStyle) => {
  if (align === 'left') {
    return margin === 'left' ? '0px' : 'auto';
  }

  if (align === 'right') {
    if (margin === 'left') {
      return hasIcon && (style === 'vertical' || !hasMenu) ? '0px' : 'auto';
    }
    return margin === 'right' ? '0px' : 'auto';
  }

  if (align === 'center') {
    return (margin === 'left' && hasIcon) && (!hasMenu || style === 'vertical') ? '0px' : 'auto';
  }

  return 'auto';
};

const getPadding = (marginLeft: string, hasIcon: boolean, hasMenu: boolean, style: MenuStyle) => {
  if (marginLeft === '0px') {
    if (!hasIcon && (!hasMenu || style === 'stacked')) {
      return '0px 10px'
    } else if (!hasIcon && (!hasMenu || style === 'stacked')) {
      return '0px 8px'
    }
  }
  return '0px 6px'
}

const Title = ({
  focused,
  children,
  hasIcon,
  hasMenu,
}: TitleProps) => {
  const {
    bar: {
      height,
      title,
      inActiveOpacity
    },
    menu: {
      style
    },
  } = useContext(ThemeContext);
  const {
    color,
    align,
    fontFamily,
    fontWeight
  } = title as Required<TitleTheme>;
  const marginLeft = getMargin('left', align, hasIcon, hasMenu, style!);
  const marginRight = getMargin('right', align, hasIcon, hasMenu, style!);
  const padding = getPadding(marginLeft, hasIcon, hasMenu, style!);
  const lineHeight = typeof height === 'number' ? `${height}px` : height;
  return (
    <div
      className={styles.Title}
      style={{
        opacity: focused ? 1 : inActiveOpacity,
        marginLeft,
        marginRight,
        padding,
        lineHeight,
        color,
        fontFamily,
        fontWeight,
      }}
    >
      {children}
    </div>
  );
};

Title.propTypes = {
  isWin: PropTypes.bool,
  focused: PropTypes.bool,
  children: PropTypes.node
};

export default Title;
