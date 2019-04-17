import React, { Component } from 'react';

const styles = {
  Container: {
    position: 'absolute',
    outline: 'none',
    border: 'none',
    zIndex: 2000,
  },
  ScrollView: {
    overflow: 'hidden',
  },
  Menu: {
    overflow: 'hidden',
  },
  Vertical: {
    padding: '5px 0',
    marginLeft: 0,
    overflow: 'visible',
    textAlign: 'left',
    whiteSpace: 'nowrap',
  },
  Items: {
    tabIndex: 0,
    display: 'block',
    margin: '0 auto',
    padding: 0,
    width: '100%',
    justifyContent: 'flex-end',
    listStyleType: 'none',
  }
}

class MenuListContainer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activeDescendant: null,
    };
    this.handleFocus = this.handleFocus.bind(this);
  }
  
  componentDidMount() {
    if (this.state.activeDescendant) {
      return;
    }

    this.focusFirstItem();
  }

  handleFocus(e) {

  }

  focusFirstItem = () => {
    this.setState({
      activeDescendant: this.props.children[0]
    });
  };

  handleScroll = (e) => {
    var scrollTop = this.content.scrollTop;
    var scrollHeight = this.content.scrollHeight;
    var height = this.content.clientHeight;
    var wheelDelta = e.deltaY;
    var isDeltaPositive = wheelDelta > 0;
    const step = 10; // scroll speed

    if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
      this.content.scrollTop = scrollHeight;
      return this.stopScrolling(e);
    }
    else if (!isDeltaPositive && -wheelDelta > scrollTop) {
      this.content.scrollTop = 0;
      return this.stopScrolling(e);
    } else {
      this.content.scrollTop += wheelDelta > 0 ? step : -step;
      return this.stopScrolling(e);
    }
  };

  stopScrolling = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.returnValue = false;
    return false;
  };

  render() {
    const {
      theme,
      rect,
      submenu
    } = this.props;
    const maxHeight = Math.max(10, window.innerHeight - (this.item && this.item.getBoundingClientRect().top || 0) - theme.menuMarginBottom);
    // const maxWidth = Math.max(theme.menuMinWidth, window.innerWidth - (this.item && this.item.getBoundingClientRect().right));
    const WontFit = submenu && (window.innerWidth <= (rect.right + (this.item && this.item.getBoundingClientRect().width || 0)));
    let top = (submenu && WontFit) ? rect.height : 0;
    let left = submenu ? (WontFit ? 10 : rect.offsetWidth) : rect.left;

    return (
      <div
        ref={r => { this.item = r; }}
        style={{
          ...styles.Container,
          left: left,
          top: top,
          color: theme.menuActiveTextColor
        }}
        //onFocus={this.handleFocus}
      >
        <div
          style={{
            ...styles.ScrollView,
            background: theme.menuBackgroundColor,
            boxShadow: theme.menuShowBoxShadow ? theme.menuBoxShadow : ''
          }}
        >
          <div
            onWheel={this.handleScroll}
            ref={r => this.content = r}
            style={{
              ...styles.Menu,
              maxHeight,
            }}
          >
            <div
              style={styles.Vertical}
            >
              <ul
                style={{
                  ...styles.Items
                }}
              >
                {this.props.children}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuListContainer;