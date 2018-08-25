import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    font-size: 20px;
    & > a {
        text-decoration: underline;
        color: blue;
    }
`

const NoResponse = () =>
        <Container>
            Server no response. Please return to <Link to='/GouGouHome:3000'>Home</Link> and try again
        </Container>

export default NoResponse