import React, { Component } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DefaultProfilePicture from '../assets/images/profile.png';

var x = 0;
var y = 0;
var w = 0;
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
function makeImage() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  const img = new Image()
  img.src = "kilterboard.png"
  img.onload = () => {
    ctx.drawImage(img, 0, 0)

  }
}
function drawCircle() {
  x = 63;
  y = 75;
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 19; i++) {
      y = i * 61 + 30;
      w = getRandomIntInclusive(1, 17);
      x = w * 61;
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      ctx.strokeStyle = '#cc0000';
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, 2 * Math.PI);
      ctx.lineWidth = 5;
      ctx.stroke();
    }
  }
}
export default class Home extends Component {

  state = {
    email: '',
    profilePhoto: localStorage.getItem('imgUrl') ? localStorage.getItem('imgUrl') : DefaultProfilePicture,
    name: localStorage.getItem('name')
  }
  componentDidMount() {
    const body = {
      token: localStorage.getItem('token'),
    }
    fetch('/authenticated_endpoint', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(json => {
      if (json.error) {
        toast.error(json.error)
        this.props.LogOut();
      }
      else {
        this.setState({
          email: json.email
        })
      }
    });
  }
  render() {
    return (
      <div>
        <Navbar
          bg="primary"
          variant="dark"
          sticky="top"
          className="d-flex justify-content-between"
        >
          <Nav>Kinter Bot</Nav>
          <Nav className="d-flx justify-content-center align-items-center">
            <h5>{this.state.name}</h5>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="bg-transparent border-0">
                <img src={this.state.profilePhoto} width='30' height='30' className="img-thumbnail rounded-circle p-0" alt="" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="mr-5">
                <Dropdown.Item onClick={this.props.LogOut}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar>
        <form>
          <input type="button" onClick={<drawCircle />} />
        </form>
        <canvas id="myCanvas" width="1080" height="1170"></canvas>
        {<makeImage />}
        <img src={require('./kilterboard.png')} />
      </div>
    );
  }
}
