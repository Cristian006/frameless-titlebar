import React, { useContext, useRef, RefObject } from 'react';
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
import { MenuListProps, FullMenuListProps } from '../typings';

const MenuList = ({
  menu,
  parentRef,
  currentWindow,
  depth,
  selectedPath,
  dispatch,
  subLabel
}: FullMenuListProps) => {
  const theme = useContext(ThemeContext);
  const menuRef = useRef(null);
  const scrollRef = useRef(null);
  const parentBounds = useRect(parentRef);
  const bounds = useRect(menuRef);
  const [maxHeight, maxWidth] = calcMaximums(bounds, theme);
  const hasSubLabel = !!(subLabel && subLabel !== "" && theme.menu.header!.show!);
  const layout = useLayoutBounds(parentBounds, depth, hasSubLabel);
  const handleScroll = useMenuScroll(scrollRef);
  useScrollFocus(
    currentSelected(selectedPath, depth),
    theme.menu.item!.height!,
    parentBounds,
    scrollRef
  );
  return (
    <div
      className={styles.MenuListContainer}
      style={{
        color: theme.menu.item!.default!.color,
        top: layout.top,
        left: layout.left,
        zIndex: theme.menu.list!.zIndex!,
        background: theme.menu.list!.background,
        boxShadow: theme.menu.list!.boxShadow
      }}
      ref={menuRef}
    >
      {
        hasSubLabel &&
        <div
          className={styles.SubMenuLabel}
          style={{
            color: theme.menu.header?.color
          }}
        >
          {subLabel}
        </div>
      }
      <div
        className={styles.MenuListScrollView}
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
          <div
            className={styles.MenuListVertical}
            style={{
              padding: hasSubLabel ? '0px 0px 5px 0px' : '5px 0px'
            }}
          >
            <ul className={styles.MenuListItems}>
              {menu &&
                menu.map((item, idx) => (
                  <MenuItem
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

// export default MenuList;

export default React.forwardRef<HTMLElement, MenuListProps>((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MenuList {...props} parentRef={ref as RefObject<HTMLElement>} />
));

