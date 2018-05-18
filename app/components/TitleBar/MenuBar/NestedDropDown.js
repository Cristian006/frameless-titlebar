import React, { Component } from 'react';

export default class NestedDropdown extends Component {

  static displayName = 'NestedDropdown';

  const shape = {
    id: Prop.Type.string.isRequired,
    message: Prop.Type.node.isRequired,
    link: Prop.Type.string,
    options:Prop.Type.arrayOf(
      Prop.Type.shape(NestedDropdown.shape)
    )
  };

  static propTypes = {
    openDirection: Prop.Type.enumOf(['left', 'right']),
    displayText: Prop.Type.node.isRequired,
    hasCaret: Prop.Type.bool,
    options: Prop.Type.arrayOf(
      Prop.Type.shape(NestedDropdown.shape).isRequired
    ).isRequired
  };

  static defaultProps = {
    hasCaret: true,
    openDirection: 'left'
  };

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      selectedIds: []
    };
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.options !== nextProps.options
      || this.state.showDropdown !== nextState.showDropdown
      || this.state.selectedIds !== nextState.selectedIds;
  }

  handleDropdownToggle = () => {
    let nextState = !this.state.showDropdown;

    this.setState({
      showDropdown: nextState,
      selectedIds: []
    });
  };

  handleDropdownClose = () => {
    this.setState({
      showDropdown: false,
      selectedIds: []
    });
  };

  handleSelectedId = (selected, depthLevel) => {
    return () => {
      const updatedArray = this.state.selectedIds.slice(0);

      updatedArray[depthLevel] = selected;

      this.setState({
        selectedIds: updatedArray
      });
    };
  };

  renderDisplay() {
    const classes = classNames({
            'dropdown__display': true, //eslint-disable-line quote-props
            'dropdown__display--with-caret': this.props.hasCaret
          }),
          caret = (
            <Icon
              classes={ ['dropdown__display-caret'] }
              glyph={ iconChevronDown }
              size={ 'small' }
            />
          );

    return (
      <div className={ classes }>
        { this.props.displayText }
        { this.props.hasCaret ? caret : null }
      </div>
    );
  }

  renderSubMenu(options, depthLevel = 0) {
    if (this.state.showDropdown !== true) {
      return null;
    }

    const classes = ['dropdown__options'];

    classes.push(`dropdown__options--${this.props.openDirection}-align`);

    const menuOptions = options.map(option => {
      const display   = (option.link
              ? <a href={ option.link }>{ option.message }</a>
              : <span>{ option.message }</span>
            ),
            hasOptions = (option.options
              && option.options.length > 0
            );

      let subMenu;

      // only render selected submenu and only if nested options exist
      if ((this.state.selectedIds[depthLevel] === option.id)
        && hasOptions
      ) {
        const newDepthLevel = depthLevel + 1;

        subMenu = this.renderSubMenu(option.options, newDepthLevel);
      }

      return (
        <li
          key={ option.id }
          onMouseEnter={ this.handleSelectedId(option.id, depthLevel) }
        >
          { display }
          { subMenu }
        </li>
      );
    });

    return (
      <div className={ classNames.apply(null, classes) }>
        <ul>
          { menuOptions }
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div
        className='dropdown dropdown--nested'
        onClick={ this.handleDropdownToggle }
      >
        { this.renderDisplay() }
        { this.renderSubMenu(this.props.options) }
      </div>
    );
  }

}
