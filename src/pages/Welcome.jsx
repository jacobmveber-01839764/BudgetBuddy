import React from 'react';
import './Welcome.css';
import logo from '../assets/BudgetBuddyLogo.png';
import budgethero from '../assets/welcome/budgethero1.png';
import money1 from '../assets/welcome/money1.png';
import money2 from '../assets/welcome/money2.png';
import money3 from '../assets/welcome/money3.png';

export default function Welcome() {
  return (
    <div className="container">
      <div className="jumbotron mt-4 mb-5">
        <div className="row">
          <div className="col-8">
            <h1>Start Building Your Wealth</h1>
            <p>BudgetBuddy’s top notch budgeting tools will help you start building wealth, no matter your income or debt.</p>
            <button className="btn btn-outline-success">Get Started</button>
          </div>
          <div className="col-4">
            <img className="w-100" src={budgethero} alt="budgethero" />
          </div>
        </div>
      </div>
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-4">
            <div className="container-fluid" style={{ maxWidth: '200px' }}>
              <img src={money1} alt="money1" className="w-100" />
              <h6>Track Your Spending</h6>
              <p>Keep track of how much you spend on any number of spending categories.</p>
            </div>
          </div>
          <div className="col-4">
            <div className="container-fluid">
              <img src={money2} alt="money2" className="w-100" style={{ maxWidth: '200px' }} />
              <h6>Plan Your Income</h6>
              <p>Map out your income into savings categories to manage your money faster and easier than ever.</p>
            </div>
          </div>
          <div className="col-4">
            <div className="container-fluid">
              <img src={money3} alt="money3" className="w-100" style={{ maxWidth: '200px' }} />
              <h6>See Your Wealth Grow</h6>
              <p>Use BudgetBuddy’s widgets to visualize your wealth growing and debt shrinking.</p>
            </div>
          </div>
        </div>
        <button className="btn btn-outline-success">Get Started</button>
      </div>
    </div>
  );
}