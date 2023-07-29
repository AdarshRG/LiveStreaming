import React from 'react'
import Nav from 'react-bootstrap/Nav';

function Header() {
  return (
    <Nav style={{height:"80px"}} className='bg-primary ' defaultActiveKey="/home" as="ul">
      <Nav.Item className='p-3' as="li">
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item className='p-3'  as="li">
        <Nav.Link href="/livestream">Streaming</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default Header