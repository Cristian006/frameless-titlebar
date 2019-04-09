import React from 'react';

const styles = {
  Title: {
    flex: '0 1 auto',
    fontSize: '12px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class Title extends React.Component {
  render() {
    let { theme, isWin, children, flex, inActive } = this.props;
    let lineHeight = isWin ? theme.winBarHeight : theme.barHeight;
    let padding = isWin ? '0px 4px' : '0 70px';
    let color = theme.barTitleColor;
    let fontFamily = theme.titleFontFamily;
    let fontWeight = theme.titleFontWeight;
    let opacity = inActive ? theme.inActiveOpacity : 1;

    return (
      <div
        style={{ ...styles.Title, lineHeight, padding, color, flex, fontFamily, fontWeight, opacity }}
      >
        {children}
      </div>
    );
  }
}

export default Title;
