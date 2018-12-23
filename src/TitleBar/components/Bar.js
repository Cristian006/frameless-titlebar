import React from 'react';
import electron from 'electron';
import ThemeContext from '../Theme';

const styles = {
  Bar: {
    flexGrow: 0,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'row',
    fontSize: '12px',
    width: '100%',
    WebkitAppRegion: 'drag',
    userSelect: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif'
  }
};

const currentWindow = electron.remote.getCurrentWindow();
class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleDoubleClick(e) {
    let { isWin } = this.props;
    if (!isWin) {
      let bounds = electron.screen.getPrimaryDisplay().workArea;
      currentWindow.setBounds(bounds, true);
    }
  }

  render() {
    let props = this.props;
    let theme = this.context;
    let height = props.isWin ? theme.winBarHeight : theme.barHeight;
    let backgroundColor = theme.barBackgroundColor;
    let color = theme.barColor;
    let borderBottom = theme.barShowBorder ? theme.barBorderBottom : '';

    return (
      <div
        style={{ ...styles.Bar, height, backgroundColor, color, borderBottom }}
        onDoubleClick={this.handleDoubleClick}
      >
        {props.children}
      </div>
    );
  }
}

Bar.contextType = ThemeContext;

Bar.defaultProps = {
  isWin: false
}

export default Bar;
