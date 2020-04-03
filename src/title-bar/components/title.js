import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from '../style.css';
import { ThemeContext } from '../theme';

const getMargin = (margin, align) => {
  if (align === 'left') {
    return margin === 'left' ? '0px' : 'auto';
  }

  if (align === 'right') {
    return margin === 'right' ? '0px' : 'auto';
  }

  return 'auto';
};

const Title = ({
  isWin,
  focused,
  children,
  hasIcon
}) => {
  const {
    align,
    winBarHeight,
    barHeight,
    inActiveOpacity,
    barTitleColor,
    titleFontFamily,
    titleFontWeight
  } = useContext(ThemeContext);
  const marginLeft = getMargin('left', align);
  const marginRight = getMargin('right', align);
  const padding = (isWin || (!hasIcon && marginLeft === '0px')) ? '0px 8px' : 0;
  return (
    <div
      className={styles.Title}
      style={{
        padding: padding,
        lineHeight: isWin ? winBarHeight : barHeight,
        opacity: focused ? 1 : inActiveOpacity,
        marginLeft: marginLeft,
        marginRight: marginRight,
        color: barTitleColor,
        fontFamily: titleFontFamily,
        fontWeight: titleFontWeight
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
