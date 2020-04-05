import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../theme';
import { useRect, useHover } from '../effects';
import MenuList from './menu-list';
import { currentSelected, isItemSubMenu } from '../utils';
import styles from '../style.css';

const getBackgroundColor = (item, selected, hovering, theme) => {
  if (!item.disabled) {
    if (selected) {
      return theme.button.background.active ?? theme.list.background;
    }

    if (hovering) {
      return theme.button.background.hover;
    }
  }

  return theme.button.background.default;
};

const getColor = (item, open, theme) => {
  if (open && !item.disabled) {
    return theme.button.color.active;
  }
  return theme.button.color.default;
};

const getOpacity = (item, focused, theme, inActiveOpacity) => {
  if (!focused) {
    return inActiveOpacity;
  }

  if (item.disabled) {
    return theme.disabled.opacity;
  }

  return 1;
};

const useAltLabel = l => {
  const [label, setLabel] = useState({
    first: l.slice(0, 1),
    rest: l.slice(1)
  });
  useEffect(() => {
    setLabel({
      first: l.slice(0, 1),
      rest: l.slice(1)
    });
  }, [l]);

  return label;
};

const MenuButton = ({
  focused,
  currentWindow,
  item,
  altKey,
  myRef,
  style,
  overflowed,
  idx,
  depth,
  selectedPath,
  dispatch,
  icon
}) => {
  const {
    bar: { inActiveOpacity },
    menu: theme
  } = useContext(ThemeContext);
  // eslint-disable-next-line no-unused-vars
  const [hoverRef, hovering] = useHover();
  const bounds = useRect(hoverRef);
  const label = useAltLabel(item.label);
  const onClose = useCallback(() => {
    hoverRef.current.blur();
    dispatch({ type: 'set', depth, selected: -1 });
  }, [hoverRef.current]);
  const onClick = useCallback(() => {
    if (!item.disabled) {
      dispatch({ type: 'button-set', depth, selected: idx });
    }
  }, [idx]);

  useEffect(() => {
    if (currentSelected(selectedPath, depth) >= 0 && hovering) {
      onClick();
    }
  }, [hovering]);

  const selected = currentSelected(selectedPath, depth) === idx;
  const selectedSub =
    selected && currentSelected(selectedPath, depth + 1) !== null;

  const backgroundColor = getBackgroundColor(item, selected, hovering, theme);
  const color = getColor(item, selected, theme);
  const opacity = getOpacity(item, focused, theme, inActiveOpacity);
  const isSubMenu = isItemSubMenu(item);
  const textDecoration = !item.disabled && altKey ? 'underline' : 'none';

  return (
    <div
      className={styles.MenuButtonContainer}
      style={{
        ...style,
        backgroundColor
      }}
      ref={myRef}
      tabIndex="0"
      aria-haspopup
    >
      {!item.disabled && isSubMenu && selectedSub && (
        <MenuList
          key={depth}
          menu={item.submenu}
          ref={myRef}
          currentWindow={currentWindow}
          depth={depth + 1}
          selectedPath={selectedPath}
          dispatch={dispatch}
        />
      )}
      {selectedSub && (
        <div
          className={styles.MenuOverlay}
          style={{
            background: theme.overlay.background,
            opacity: theme.overlay.opacity,
            top: bounds.bottom
          }}
          onClick={onClose}
        />
      )}
      <div className={styles.MenuButtonWrapper}>
        <button
          ref={hoverRef}
          className={styles.MenuButton}
          style={{
            color
          }}
          onClick={onClick}
          tabIndex="-1"
        >
          <div className={styles.MenuButtonLabelWrapper} style={{ opacity }}>
            {icon}
            {!icon && (
              // eslint-disable-next-line react/jsx-fragments
              <Fragment>
                <span
                  className={styles.MenuButtonLabel}
                  style={{
                    textDecoration
                  }}
                  aria-hidden="true"
                  tabIndex="-1"
                >
                  {label.first}
                </span>
                <span
                  className={styles.MenuButtonLabel}
                  aria-hidden="true"
                  tabIndex="-1"
                >
                  {label.rest}
                </span>
              </Fragment>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

MenuButton.propTypes = {
  idx: PropTypes.number,
  focused: PropTypes.bool,
  currentWindow: PropTypes.object,
  item: PropTypes.object,
  altKey: PropTypes.bool,
  myRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  style: PropTypes.object,
  overflowed: PropTypes.bool,
  depth: PropTypes.number,
  selectedPath: PropTypes.array,
  dispatch: PropTypes.func,
  icon: PropTypes.node
};

export default React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MenuButton {...props} myRef={ref} />
));
