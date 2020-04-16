import React, { useContext } from 'react';
import { ThemeContext } from '../theme';
import styles from '../style.css';
import cx from 'classnames';

interface LogoProps {
  children: React.ReactNode;
  src?: string;
}

const Logo = ({ children, src }: LogoProps) => {
  const theme = useContext(ThemeContext);

  const className = cx({
    [styles.Logo]: true,
    [styles.Vertical]: theme.menu.style === 'vertical',
  })

  if (src && src !== '') {
    return <img className={className} src={src} style={{ width: theme.bar.icon!.width, height: theme.bar.icon!.height }} />
  }

  return (
    <div className={className} style={{ width: theme.bar.icon!.width, height: theme.bar.icon!.height }}>
      {children}
    </div>
  )
}

export default Logo;
