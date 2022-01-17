import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../../actions/constants'
import { Container, Card, Button } from 'react-bootstrap';

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: LOGOUT });
        // eslint-disable-next-line
    }, [])
    return (
        <div style={{ marginTop: '10%', marginBottom: "15%" }}>
            <Container className='text-center'>
                <Card bg='light'>
                    <Card.Body className='p-4'>
                        <h2>Logout Successful</h2><br />
                        <h4>If you want to login press <Button variant="secondary" onClick={() => navigate("/login")}>Login</Button></h4>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}
