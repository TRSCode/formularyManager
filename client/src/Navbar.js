// Navbar created using tutorial found on https://www.youtube.com/watch?v=SLfhMt5OUPI
import logoMM from './logoMM.png'
export default function Navbar() {
    
    return <nav className="nav">
        <a href="/dashboard" className="site-title"><img src={logoMM} className="logoSize" alt="Med Manager" />Med Manager</a>
        <ul>
            <CustomLink href="/formulary">Formulary</CustomLink>
            <CustomLink href="/add">Add Med</CustomLink>
            <CustomLink href="/dashboard">Home</CustomLink>
        </ul>
    </nav>
}

// Function to create an active link more dynamic
function CustomLink({ href, children, ...props }){
    const path = window.location.pathname
    return (
        <li className={path === href ? "active": ""}>
            <a href= { href } {...props}> { children }</a>
        </li>
    )
}