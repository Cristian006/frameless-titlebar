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
      return theme.menuBackgroundColor;
    }

    if (hovering) {
      return theme.menuItemHoverBackground;
    }
  }

  return 'transparent';
};

const getBorderColor = (open, theme) => {
  return open ? theme.menuBackgroundColor : '';
};

const getColor = (item, open, theme) => {
  if (open && !item.disabled) {
    return theme.menuActiveTextColor;
  }
  return theme.menuItemTextColor;
};

const getOpacity = (item, focused, theme) => {
  if (!focused) {
    return theme.inActiveOpacity;
  }

  if (item.disabled) {
    return theme.menuDisabledOpacity;
  }

  return 1;
};

const altKeyCodeMatch = (keys, str) => {
  return !!keys.altKey && keys.keyCode === str.charCodeAt(0);
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
  keys,
  myRef,
  style,
  overflowed,
  idx,
  depth,
  selectedPath,
  dispatch,
  icon
}) => {
  const theme = useContext(ThemeContext);
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

  useEffect(() => {
    if (!overflowed && altKeyCodeMatch(keys, label.first)) {
      onClick();
    }
  }, [keys, label]);

  const selected = currentSelected(selectedPath, depth) === idx;
  const selectedSub =
    selected && currentSelected(selectedPath, depth + 1) !== null;

  const backgroundColor = getBackgroundColor(item, selected, hovering, theme);
  const borderColor = getBorderColor(selected, theme);
  const color = getColor(item, selected, theme);
  const opacity = getOpacity(item, focused, theme);
  const isSubMenu = isItemSubMenu(item);

  const setRefs = c => {
    // eslint-disable-next-line no-param-reassign
    myRef.current = c;
    hoverRef.current = c;
  };

  return (
    <div
      className={styles.MenuButtonContainer}
      style={{
        ...style,
        backgroundColor
      }}
      ref={setRefs}
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
            background: theme.menuOverlayBackground,
            opacity: theme.menuDimOpacity,
            top: bounds.bottom
          }}
          onClick={onClose}
        />
      )}
      <div className={styles.MenuButtonWrapper}>
        <button
          className={styles.MenuButton}
          style={{
            borderColor,
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
                    textDecoration: keys.altKey ? 'underline' : 'none'
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
  keys: PropTypes.object,
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
