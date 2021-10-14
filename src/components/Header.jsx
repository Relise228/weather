
import React, { useState } from "react";
import { Container, FormControl, InputGroup, Navbar, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import logo from '../img/logo.png'

export default ({city}) => {
    const [value, setValue] = useState('')
    const history = useHistory();



    return <Navbar bg='dark'>
        <Container className='d-flex'>
            <Navbar.Brand className="d-flex p-2 align-items-center" href="/" style={{ color: 'white' }}>
                <img
                    src={logo}
                    width="70"
                    height="70"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
                <p style={{ marginLeft: 20 + 'px' }}>Weather</p>
            </Navbar.Brand>
            <InputGroup className="mb-1 p-2 ml-auto w-25">
                    <FormControl
                        value={value}
                        name='country'
                        placeholder={city}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <Button onClick={()=> {
                        history.push(`?city=${value}`)
                    }} variant="primary" id="button-addon2">
                        Search
                    </Button>
                </InputGroup>
        </Container>
    </Navbar>

}