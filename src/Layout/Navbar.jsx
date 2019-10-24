import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap';

const NavbarSW = () => {


  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="https://swapi.co/">Starwars API</NavbarBrand>
      </Navbar>
    </div>
  );
}

export default NavbarSW;