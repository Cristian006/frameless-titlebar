import React from 'react';
import electron from 'electron';

const styles = {
  Bar: {
    flexGrow: 0,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'row',
    fontSize: '12px',
    WebkitAppRegion: 'drag',
    userSelect: 'none',
    alignItems: 'center',
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
    let winRect = currentWindow.getBounds();
    let { workArea } = electron.screen.getDisplayNearestPoint({ x: winRect.x, y: winRect.y });
    currentWindow.setBounds(workArea, true);
  }

  render() {
    const { theme, children, isWin } = this.props;
    let height = isWin ? theme.winBarHeight : theme.barHeight;
    let backgroundColor = theme.barBackgroundColor;
    let color = theme.barColor;
    let padding = !isWin ? '0 70px' : 0;
    let borderBottom = theme.barShowBorder ? theme.barBorderBottom : '';

    return (
      <div
        style={{ ...styles.Bar, height, backgroundColor, color, borderBottom, padding }}
        onDoubleClick={this.handleDoubleClick}
      >
        {children}
      </div>
    );
  }
}

Bar.defaultProps = {
  isWin: false
}

export default Bar;
