import React from 'react';
import ThemeContext from '../Theme';

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
    let props = this.props;
    let theme = this.context;
    let lineHeight = props.isWin ? theme.winBarHeight : theme.barHeight;
    let padding = props.isWin ? '0px 4px' : '0 70px';
    let flex = props.flex;
    let color = theme.barTitleColor;

    return (
      <div
        style={{ ...styles.Title, lineHeight, padding, color, flex }}
      >
        {props.children}
      </div>
    );
  }
}

Title.contextType = ThemeContext;

export default Title;
