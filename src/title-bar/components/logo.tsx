import React, { useContext } from 'react';
import { ThemeContext } from '../theme';
import styles from '../style.css';
import cx from 'classnames';
import { Align, Platform } from '../typings';

interface LogoProps {
  children: React.ReactNode;
  src?: string;
  hasTitle: boolean;
}

const getMarginLeft = (vertical: boolean, hasTitle: boolean, align: Align, platform: Platform) => {
  if ((vertical || platform === 'darwin') && hasTitle && (align === 'center' || align === 'right')) {
    return 'auto';
  }
  return undefined;
}

const Logo = ({ children, src, hasTitle }: LogoProps) => {
  const theme = useContext(ThemeContext);
  const vertical = theme.menu.style === 'vertical';

  const className = cx({
    [styles.Logo]: true,
    [styles.Vertical]: vertical,
  })

  const style = {
    width: theme.bar.icon!.width,
    height: theme.bar.icon!.height,
    marginLeft: getMarginLeft(vertical, hasTitle, theme.bar.title?.align!, theme.platform)
  };

  if (src && src !== '') {
    return (
      <img
        className={className}
        src={src}
        style={style}
      />
    )
  }

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

export default Logo;
