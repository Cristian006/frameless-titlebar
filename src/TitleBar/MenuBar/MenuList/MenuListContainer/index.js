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
      top: 0,
      left: 0,
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.setRef = this.setRef.bind(this);
    this.setContent = this.setContent.bind(this);
    this.onLayout = this.onLayout.bind(this);
  }
  
  componentDidMount() {
    if (this.state.activeDescendant) {
      return;
    }
    this.focusFirstItem();
    this.onLayout();
  }

  onLayout() {
    const {
      parentRef,
      rect,
      submenu
    } = this.props;
    let boundingRect = this.itemRef.getBoundingClientRect();
    let top = 0;
    let left = rect.left;

    if (submenu) {
      let parentRect = parentRef.getBoundingClientRect();    
      // scroll view > scroll content > ul > li > this
      var scrollTop = parentRef.parentNode.parentNode.parentNode.scrollTop; // get parent menu's scroll offset
      top = parentRef.offsetTop - scrollTop;
      left = parentRect.width;
      if (window.innerWidth <= (parentRect.right + boundingRect.width)) {
        top = parentRef.offsetTop + (parentRect.height / 3);
        left = 10;
      }
    }

    this.setState({
      top,
      left
    });
  }

  setRef(ref) {
    this.itemRef = ref;
  }

  setContent(ref) {
    this.contentRef = ref;
  }

  handleFocus(e) {

  }

  focusFirstItem = () => {
    this.setState({
      activeDescendant: this.props.children[0]
    });
  };

  handleScroll = (e) => {
    var scrollTop = this.contentRef.scrollTop;
    var scrollHeight = this.contentRef.scrollHeight;
    var height = this.contentRef.clientHeight;
    var wheelDelta = e.deltaY;
    var isDeltaPositive = wheelDelta > 0;
    const step = 10; // scroll speed

    if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
      this.contentRef.scrollTop = scrollHeight;
      return this.stopScrolling(e);
    }
    else if (!isDeltaPositive && -wheelDelta > scrollTop) {
      this.contentRef.scrollTop = 0;
      return this.stopScrolling(e);
    } else {
      this.contentRef.scrollTop += wheelDelta > 0 ? step : -step;
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
    const { theme } = this.props;
    const maxHeight = Math.max(10, window.innerHeight - (this.itemRef && this.itemRef.getBoundingClientRect().top || 0) - theme.menuMarginBottom);
    const maxWidth = Math.min(window.innerHeight, window.innerWidth - (this.itemRef && this.itemRef.getBoundingClientRect().left || 0));
    const {
      top,
      left
    } = this.state;

    return (
      <div
        ref={this.setRef}
        style={{
          ...styles.Container,
          left: left,
          top: top,
          color: theme.menuActiveTextColor
        }}
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
            ref={this.setContent}
            style={{
              ...styles.Menu,
              maxHeight,
              maxWidth,
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