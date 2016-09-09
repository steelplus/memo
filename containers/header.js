var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var MenuItem = ReactBootstrap.MenuItem;
var NavDropdown = ReactBootstrap.NavDropdown;
var Image = ReactBootstrap.Image

var Header = React.createClass(
  {
    render: function(){
      return(
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="./index.html">あおばちゃんねる</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} href="#">リンク1</NavItem>
              <NavItem eventKey={2} href="#">リンク2</NavItem>
              <NavDropdown eventKey={3} title="リスト1" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar>
        </div>
      )
    }
  }
)

ReactDOM.render(
  <Header/>, document.getElementById('header')
)
