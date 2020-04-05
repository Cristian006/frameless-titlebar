import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../style.css';
import MenuItem from './menu-item';
import { ThemeContext } from '../theme';
import {
  useRect,
  useMenuScroll,
  useLayoutBounds,
  useScrollFocus
} from '../effects';
import { currentSelected, menuItemClick, calcMaximums } from '../utils';

const MenuList = ({
  menu,
  parentRef,
  currentWindow,
  depth,
  selectedPath,
  dispatch
}) => {
  const theme = useContext(ThemeContext);
  const menuRef = useRef();
  const scrollRef = useRef();
  const parentBounds = useRect(parentRef);
  const bounds = useRect(menuRef);
  const [maxHeight, maxWidth] = calcMaximums(bounds, theme);
  const layout = useLayoutBounds(parentBounds, depth);
  const handleScroll = useMenuScroll(scrollRef);
  useScrollFocus(
    currentSelected(selectedPath, depth),
    theme.menu.item.height,
    parentBounds,
    scrollRef
  );

  return (
    <div
      className={styles.MenuListContainer}
      style={{
        color: theme.menu.item.color,
        top: layout.top,
        left: layout.left
      }}
      ref={menuRef}
    >
      <div
        className={styles.MenuListScrollView}
        style={{
          background: theme.menu.list.background,
          boxShadow: theme.menu.list.boxShadow
        }}
      >
        <div
          className={styles.MenuList}
          style={{
            maxHeight,
            maxWidth
          }}
          onWheel={handleScroll}
          ref={scrollRef}
        >
          <div className={styles.MenuListVertical}>
            <ul className={styles.MenuListItems}>
              {menu &&
                menu.map((item, idx) => (
                  <MenuItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${item.label}-${depth}-${idx}`}
                    idx={idx}
                    item={item}
                    currentWindow={currentWindow}
                    depth={depth}
                    selectedPath={selectedPath}
                    dispatch={dispatch}
                    onClick={e =>
                      menuItemClick(e, idx, item, menu, dispatch, currentWindow)
                    }
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

MenuList.propTypes = {
  menu: PropTypes.array,
  parentRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  currentWindow: PropTypes.object,
  depth: PropTypes.number,
  selectedPath: PropTypes.array,
  dispatch: PropTypes.func
};

export default React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MenuList {...props} parentRef={ref} />
));
