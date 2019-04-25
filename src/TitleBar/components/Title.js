import React from 'react';

const styles = {
  Title: {
    flex: '0 1 auto',
    fontSize: '12px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }
};

class Title extends React.Component {
  render() {
    let { theme, isWin, children, flex, inActive, align } = this.props;
    let lineHeight = isWin ? theme.winBarHeight : theme.barHeight;
    let padding = isWin ? '0px 4px' : 0;
    let color = theme.barTitleColor;
    let fontFamily = theme.titleFontFamily;
    let fontWeight = theme.titleFontWeight;
    let opacity = inActive ? theme.inActiveOpacity : 1;
    let marginLeft = (!isWin && theme.showIconDarLin) ? 0 : (align === 'left' ? 0 : 'auto');
    let marginRight = align === 'center' ? 'auto' : 0;

    return (
      <div
        style={{ ...styles.Title, marginLeft, marginRight, lineHeight, color, flex, fontFamily, fontWeight, opacity, padding }}
      >
        {children}
      </div>
    );
  }
}

export default Title;
