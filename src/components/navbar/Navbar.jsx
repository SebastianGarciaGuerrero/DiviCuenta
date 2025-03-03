import '../../assets/css/Navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='navbar-logo'>
            <a href='#'>DiviCuentas</a>
        </div>
        <ul className='navbar-links'>
            <li><a href='#inicio'>Inicio</a></li>
            <li><a href='#inicio'>Sobre Nosotros</a></li>
            <li><a href='#inicio'>Inicia Sesión</a></li>
        </ul>
        <button className='navbar-toggle' aria-label='Abrir Menu'>
            <span className='hamburger'></span>
        </button>
    </nav>
  )
}

export default Navbar