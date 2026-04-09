import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import { LightMode, DarkMode } from '@mui/icons-material'; // better icons
import { useColorScheme } from '@mui/material/styles';
import { useState } from 'react';

export default function ColorModeToggle(props: IconButtonProps) {
  const { mode, setMode } = useColorScheme();
  const [animating, setAnimating] = useState(false);

  if (!mode || !setMode) return null;

  const handleToggle = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600); // match duration of animation
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const iconStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.6s ease',
    transform: animating ? 'rotate(0deg) scale(1.2)' : 'rotate(360deg) scale(1)',
  };

  return (
    <IconButton
      onClick={handleToggle}
      aria-label={`Toggle color mode (current: ${mode})`}
      {...props}
      style={{borderRadius: '50%'}}
    >
      <span style={iconStyle}>
        {mode === 'light' ? <LightMode /> : <DarkMode />}
      </span>
    </IconButton>
  );
}