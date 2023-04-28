import React, { useEffect, useState } from "react";
import FormInputGroup from "./FormInputGroup";

const LoanCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState("");
    const [loanDuration, setLoanDuration] = useState("");
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [interestPaid, setInterestPaid] = useState(0);

    const calculateMonthlyPayment = (event) => {
        event.preventDefault();

        const percentageToDecimal = (percent) => {
            return percent / 12 / 100;
        }

        const yearsToMonths = (years) => {
            return years * 12;
        }

        setMonthlyPayment(percentageToDecimal(interestRate * loanAmount) / (1 - Math.pow(1 + percentageToDecimal(interestRate), -yearsToMonths(loanDuration))));
    }

    useEffect(() => {
        setInterestPaid(monthlyPayment * (loanDuration * 12) - loanAmount);
    }, [monthlyPayment]);

    (() => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')
    
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated')
        }, false)
        })
    })()

    return (
        <div className="widget">
            <h4>Loan Calculator</h4>

            <form className="needs-validation" onSubmit={calculateMonthlyPayment} noValidate>
                <div className="row">
                    <div className="col-6">
                        <div className="input-group">
                            <label className="input-group-text">Loan Amount $</label>
                            <input type="number" className="form-control" placeholder="" min={1000} step=".01" value={loanAmount} onChange={(event) => setLoanAmount(event.target.value)} required/>
                            <div className="invalid-feedback">
                                Please enter a valid loan amount
                                <br/>
                                Loan amount must be of at least $1,000
                            </div>
                        </div>
                        <div className="input-group mt-3">
                            <label className="input-group-text">Interest Rate %</label>
                            <input type="number" className="form-control" placeholder="" min={5} step=".001" value={interestRate} onChange={(event) => setInterestRate(event.target.value)} required/>
                            <div className="invalid-feedback">
                                Please enter a valid interest rate
                                <br/>
                                Interest rate must be of at least 5.0%
                            </div>
                        </div>
                        <div className="input-group mt-3">
                            <label className="input-group-text">Loan Duration in Years</label>
                            <input type="number" className="form-control" placeholder="" min={2} value={loanDuration} onChange={(event) => setLoanDuration(event.target.value)} required/>
                            <div className="invalid-feedback">
                                Please enter a valid loan duration in years
                                <br/>
                                Loan duration cannot be less than 2 years
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <h4 className="alert alert-info h-100 fw-bold">
                            Monthly Payment: ${monthlyPayment.toFixed(2)}
                            <h5 className="mt-4">Principal Paid: ${loanAmount}</h5>
                            <h5>Interest Paid: ${interestPaid.toFixed(2)}</h5>
                        </h4>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100 mt-3 center">Calculate</button>
            </form>
        </div>
    )
};

export default LoanCalculator;
