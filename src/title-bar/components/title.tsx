import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from '../style.css';
import { ThemeContext } from '../theme';
import { TitleProps } from '../typings';

const getMargin = (margin: string, align: string) => {
  if (align === 'left') {
    return margin === 'left' ? '0px' : 'auto';
  }

  if (align === 'right') {
    return margin === 'right' ? '0px' : 'auto';
  }

  return 'auto';
};

const Title = ({
  focused,
  children,
  hasIcon
}: TitleProps) => {
  const {
    platform,
    bar: {
      height,
      title,
      inActiveOpacity
    }
  } = useContext(ThemeContext);
  const {
    color,
    align,
    fontFamily,
    fontWeight
  } = title!;
  const marginLeft = getMargin('left', align!);
  const marginRight = getMargin('right', align!);
  const isWin = platform === 'win32';
  const padding = (isWin || (!hasIcon && marginLeft === '0px')) ? '0px 8px' : 0;
  return (
    <div
      className={styles.Title}
      style={{
        padding: padding,
        lineHeight: `${height}px`,
        opacity: focused ? 1 : inActiveOpacity,
        marginLeft: marginLeft,
        marginRight: marginRight,
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
