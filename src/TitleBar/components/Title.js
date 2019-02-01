import React from 'react';

const styles = {
  Title: {
    margin: '0px 6px 0px 0px',
    textAlign: 'center',
    display: 'flex',
    whiteSpace: 'nowrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    WebkitAppRegion: 'drag'
  }
};

class Title extends React.Component {
  render() {
    let { theme, isWin, children, flex } = this.props;
    let lineHeight = isWin ? theme.winBarHeight : theme.barHeight;
    let padding = isWin ? '0px 4px' : '0 70px';
    let color = theme.barTitleColor;
    let fontFamily = theme.titleFontFamily;
    let fontWeight = theme.titleFontWeight;

    return (
      <div
        style={{ ...styles.Title, lineHeight, padding, color, flex, fontFamily, fontWeight }}
      >
        {children}
      </div>
    );
  }
}

export default Title;
