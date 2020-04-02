import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from '../style.css';
import { ThemeContext } from '../theme';

const getMargin = (margin, align) => {
  if (align === 'center') {
    return 'auto';
  }

  if (align === 'left') {
    return margin === 'left' ? '0px' : 'auto';
  }

  if (align === 'right') {
    return margin === 'right' ? '0px' : 'auto';
  }
};

const Title = ({
  isWin,
  focused,
  children
}) => {
  const {
    showIconDarwin,
    align,
    winBarHeight,
    barHeight,
    inActiveOpacity,
    barTitleColor,
    titleFontFamily,
    titleFontWeight
  } = useContext(ThemeContext);
  const marginLeft = !isWin && showIconDarwin ? 0 : getMargin('left', align);
  const marginRight = getMargin('right', align);

  return (
    <div
      className={styles.Title}
      style={{
        padding: (isWin ? '0px 4px' : 0),
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
