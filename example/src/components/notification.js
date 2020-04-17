import React, { useContext, useState } from 'react';
import { Typography } from '@material-ui/core';
import { NotificationImportant } from '@material-ui/icons';
import { TitleBarThemeContext, TitleBarButton } from 'frameless-titlebar';

const Item = ({ idx, onClick }) => {
  return (
    <div style={{ padding: 12 }} onClick={onClick}>
      <Typography color="inherit">Notification {idx}</Typography>
      <Typography variant="body1" color="inherit">This is a custom button and pop up making use of frameless-titlebar's theme context</Typography>
    </div>
  )
}

const MAX_HEIGHT = 300;
const MAX_WIDTH = 300;
const BUTTON_WIDTH = 48;

const Notification = ({ onNotificationClick }) => {
  const theme = useContext(TitleBarThemeContext);
  const [open, setOpen] = useState(false);

  return (
    <TitleBarButton
      label={<NotificationImportant style={{ width: theme.bar.icon.width, height: theme.bar.icon.height }} />}
      open={open}
      theme={{ ...theme.bar.button }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!open) {
          setOpen(true)
        }
      }}
      onOverlayClick={() => setOpen(false)}
      hideOverlay={theme.menu.style === 'stacked'}
    >
      <div
        className="NotificationPopOut"
        style={{
          width: MAX_WIDTH,
          maxHeight: MAX_HEIGHT,
          position: 'absolute',
          top: '100%',
          left: Math.ceil(BUTTON_WIDTH / 2) - Math.ceil(MAX_WIDTH / 2),
          zIndex: theme.menu.list.zIndex,
          background: theme.menu.list.background,
          boxShadow: theme.menu.list.boxShadow,
          overflowX: 'hidden',
          overflowY: 'auto',
          color: theme.menu.item.default.color
        }}
      >
        <Item key="one" idx={1} onClick={() => onNotificationClick(1)} />
        <Item key="two" idx={2} onClick={() => onNotificationClick(2)} />
        <Item key="three" idx={3} onClick={() => onNotificationClick(3)} />
      </div>
    </TitleBarButton>
  )
}

export default Notification;
