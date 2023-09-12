import React, { Component } from "react";
import { Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import palmTree from "../images/palm_tree.png";

const ROLE_KEY = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
interface NavMenuProps {}

interface NavMenuState {
  collapsed: boolean;
}
interface DecodedUserInfo {
  [ROLE_KEY]: string[];
}
export class NavMenu extends Component<NavMenuProps, NavMenuState> {
  static displayName = NavMenu.name;

  constructor(props: NavMenuProps) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleLogout = () => {
    localStorage.clear();
    window.location.href = "http://localhost:3000/login";
  };
  render() {
    const userString = localStorage.getItem("user");
    let user = null;
    if (userString) {
      try {
        user = JSON.parse(userString);
      } catch (error) {
        console.log("Error");
      }
    }
    let adminRole = false;
    if (user !== null) {
      const userInfo = jwt_decode(user.accessToken) as DecodedUserInfo;
      adminRole = userInfo[ROLE_KEY].includes("Admin");
    }
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          container
          light
        >
          <NavbarBrand tag={Link} to="/">
            <img src={palmTree} width={"75px"} />
            <p className="testas">Travel Guru</p>
          </NavbarBrand>
          {user ? (
            <ul className="navbar-nav flex-grow">
              {adminRole ? (
                // <NavItem>
                //   <NavLink
                //     tag={Link}
                //     className="text-dark"
                //     to="/reportsAdminPage"
                //   >
                //     Reports
                //   </NavLink>
                // </NavItem>
                <p>....................</p>
              ) : (
                <></>
              )}
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/profile">
                  Profile
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink tag={Link} className="text-dark" to="/oldprofile">
                  Old-Profile
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink
                  tag={Link}
                  className="text-dark"
                  to="/"
                  onClick={this.handleLogout}
                >
                  Logout
                </NavLink>
              </NavItem>
            </ul>
          ) : (
            <ul className="navbar-nav flex-grow">
              {/* <NavItem>
                <NavLink tag={Link} className="text-dark" to="/profile">
                  Profile
                </NavLink>
              </NavItem> */}
              {/* <NavItem>
                <NavLink tag={Link} className="text-dark" to="/oldprofile">
                  Old-Profile
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/register">
                  Register
                </NavLink>
              </NavItem>
            </ul>
          )}
        </Navbar>
      </header>
    );
  }
}
