import {Link} from "react-router-dom"
import '../css/navbar.css'

export default function Navbar() {
  return (
    <nav>
      <Link to = '/'>Home</Link>
      <Link to = '/register'>Register</Link>
      <Link to = '/login'>Login</Link>
    </nav>
  )
}
