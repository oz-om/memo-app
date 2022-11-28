import Menu from './header/Menu';
import Logo from './header/Logo';
import Guest from './header/Guest';

export default function Head() {
  return (
    <header>
      <div className="container">
        <div className="flex justify-between items-center px-2 py-2 shadow shadow-cyan-500/50 rounded-lg">
          <Menu />
          <Logo />
          <Guest />
        </div>
      </div>
    </header>
  )
}