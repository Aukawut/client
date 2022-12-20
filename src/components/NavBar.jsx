
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  // console.log(typeof(token));
  const logout = () => {
    localStorage.removeItem("token")
    navigate('/signin')
  }
  return (
    <Navbar bg="dark" variant='dark' expand="lg">
      <Container fluid>
        <Navbar.Brand ><i class="fa-solid fa-fire-flame-curved"></i> | F Dev.com</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link><Link to="/">HOME</Link></Nav.Link>
            <Nav.Link><Link to="/signin">LOGIN</Link></Nav.Link>
            <Nav.Link><Link to="/travel">TRAVEL</Link></Nav.Link>
          
          </Nav>
         
          {token ? <> <i class="fa-solid fa-arrow-right-from-bracket text-white" style={{cursor:'pointer'}} onClick={logout}></i></> : <></>}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;