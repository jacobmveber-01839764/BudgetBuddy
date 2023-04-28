import React from 'react';
import './Welcome.css';
import logo from '../assets/BudgetBuddyLogo.png';
import budgethero from '../assets/welcome/budgethero1.png';
import money1 from '../assets/welcome/money1.png';
import money2 from '../assets/welcome/money2.png';
import money3 from '../assets/welcome/money3.png';
import { Container, Button, Row, Col, Image } from 'react-bootstrap'

export default function Welcome() {
  return (
    <div>
        <Container className="mt-4 mb-5">
            <Row className="d-flex justify-content-between">
                <Col md={6} className='justify-contents-left'>
                    <h1 className="mb-3" style={{
                        fontSize: "calc(24px + 2vw)", 
                        fontWeight: 'bold',
                    }}
                        >Start Building Your Wealth</h1>
                    <p className="mb-4">BudgetBuddy’s top notch budgeting tools will help you start building wealth, no matter your income or debt.</p>
                    <Button className='mx-0 mb-4' variant="outline-success" href="/signup">Get Started</Button>
                </Col>
                <Col className='d-flex' md={4}>
                    <Image className='align-self-end w-100' src={budgethero} fluid />
                </Col>
            </Row>
        </Container>
        <Container className="text-center">
            <Row className="mb-4">
                <Col md={4}>
                    <div className="mx-auto" style={{ maxWidth: '180px' }}>
                        <Image src={money1} fluid />
                        <h6>Track Your Spending</h6>
                        <p>Keep track of how much you spend on any number of spending categories.</p>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="mx-auto" style={{ maxWidth: '180px' }}>
                        <Image src={money2} fluid />
                        <h6>Plan Your Income</h6>
                        <p>Map out your income into savings categories to manage your money faster and easier than ever.</p>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="mx-auto" style={{ maxWidth: '180px' }}>
                        <Image src={money3} fluid />
                        <h6>See Your Wealth Grow</h6>
                        <p>Use BudgetBuddy’s widgets to visualize your wealth growing and debt shrinking.</p>
                    </div>
                </Col>
            </Row>
            <Button className="mx-auto mb-5" variant="outline-success" href="/signup">Create an account for free</Button>
        </Container>
    </div>
  );
}