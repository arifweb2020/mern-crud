import React from 'react';
import {
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown,
} from "react-bootstrap";
import {Link,useHistory} from 'react-router-dom'

function Header(props) {
    const history = useHistory()
    return (
        <Navbar expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/"><Link to="/">TODO-LISt</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <Form inline>
                            <FormControl
                                type="text"
                                placeholder="Search"
                                className="mr-sm-2"
                               // onChange={(e) => setSearch(e.target.value)}
                            />
                        </Form>
                    </Nav>
                    <Nav className="me-auto">
                    <Nav.Link href="/mynotes"><Link to="/mynotes">My Notes</Link></Nav.Link>
                        
                        <NavDropdown title="Arif" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{
                                localStorage.removeItem("userInfo")
                                history.push("/")
                            }}>Logout</NavDropdown.Item>
                            
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;