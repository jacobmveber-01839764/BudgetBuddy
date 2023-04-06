import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import './Login.css'

export default function Login() {
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form>
                    <h3>Sign In</h3>
                    <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                    />
                    </div>
                    <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                    />
                    </div>
                    <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                        />
                         <label id="remember-me" className="custom-control-label" htmlFor="customCheck1">
                        Remember me
                        </label>
                    </div>
                    </div>
                    <div className="d-grid">
                    <button type="submit" className="btn btn-primary mb-3">
                        Submit
                    </button>
                    </div>
                    <p className="forgot-password">
                        Don't have an account? <a href="/signup">sign up</a>
                    </p>
                    <p className="forgot-password">
                    Forgot <a href="#">password?</a>
                    </p>
                </form>
            </div>
        </div>
    )
}