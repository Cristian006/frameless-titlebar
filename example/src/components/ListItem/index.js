import React, { PureComponent } from 'react';
import classnames from 'classnames';
import './styles.css';

class ListItem extends PureComponent {
  render() {
    const { children, onClick, selected } = this.props;
    return (
      <span className={classnames('Wrapper', { Selected: selected })} onClick={onClick}>{children}</span>
    );
  }
}

export default ListItem;
