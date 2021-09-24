import { RiMoonClearFill as MoonIcon } from 'react-icons/ri';
import { FaSun as SunIcon } from 'react-icons/fa';

export default function DarkModeToggle({ theme, setTheme }) {
  return (
    <div
      className="theme-switcher"
      onClick={() => (theme === 'light' ? setTheme('dark') : setTheme('light'))}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </div>
  );
}
