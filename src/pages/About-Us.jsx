import React from 'react';
import umass_lowell from './images/umass_lowell.jpeg'
import river_hawk from './images/river_hawk.png'
import budget_hero from './images/budgethero1.png'

export default function AboutUs() {
    return (
        <>
        <div className="container overflow-auto">
            <header>
                <div className="container h-100">
                <div className="row h-100 align-items-center">
                    <div className="mt-4 col-12 text-center">
                    <h1 className="fw-light">About Us</h1>
                    <p className="lead">Budget Buddy</p>
                    </div>
                </div>
                </div>
            </header>

            <div className="container h-100">
                <div className="row h-100 align-items-center">
                <div className="mt-4 col-12 text-center">
                    <img className="img-fluid col-8" src={umass_lowell} alt="uml campus" />
                </div>
                </div>
            </div>
            
            <p className="mt-5">We're four computer science students from UMass Lowell. Our names are Daniel Quinonez, Jacob Veber, Gabe Herrera, and Chris Olaf.</p>

            <p className="mt-4">
                Using Budget Buddy, we are hoping to help young people learn how to better take control of their finances. We know that it can be extremely 
                difficult to balance bills and other expenses at the same time as being a full-time student, so we want to make it as 
                easy as possible for students to quickly understand what their budget looks like. In addition, we want to help young people 
                make plans to pay off any loans they have needed to take out if, for example, they are a college student. This way, we hope that the 
                daunting task of managing debt while being a young adult with little or unstable income can be made easier. 
            </p>

            <p className="mt-4 mb-5">
                By helping the young demographic manage their way through debt, we are aiming to help them gain financial independence as soon as 
                possible, so that they can live their lives post-graduation with the most opportunities. Also, and possibly most 
                importantly, we hope that by using Budget Buddy, people gain an idea of how to effectively balance their budget. 
                This way, they will be able to manage their money in a more effective way after they graduate and move into the professional 
                world. We want young people to have an idea of how budgeting can work for them when they begin to make more money in their 
                careers and begin to take on more debt in order to do things like buy a house.
            </p>

            <div className="row mb-5">
                <img src={river_hawk} className="col-4" alt="uml logo" />
                <img src={budget_hero} className="col-4 offset-4" alt="budget hero" />
            </div>
        </div>
        </>
    );
}