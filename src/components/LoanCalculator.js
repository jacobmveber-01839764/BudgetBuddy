import React, { useEffect, useState } from "react";
import FormInputGroup from "./FormInputGroup";

const LoanCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState("");
    const [loanDuration, setLoanDuration] = useState("");
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [interestPaid, setInterestPaid] = useState(0);

    const calculateMonthlyPayment = () => {
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

    return (
        <div className="widget">
            <h4 className="mb-0">Loan Calculator</h4>

            <form onSubmit={(event) => event.preventDefault()}>
                <div className="row align-items-center">
                    <div className="col mb-3">
                        <FormInputGroup text="Loan Amount $" placeholder="Enter the value of the loan" value={loanAmount} onInput={(event) => setLoanAmount(event.target.value)}/>
                        <FormInputGroup text="Interest Rate %" placeholder="Enter interest rate of the loan" value={interestRate} onInput={(event) => setInterestRate(event.target.value)}/>
                        <FormInputGroup text="Loan Duration in Years" placeholder="Enter the duration of the loan in years" value={loanDuration} onInput={(event) => setLoanDuration(event.target.value)}/>
                    </div>
                    <div className="col">
                        <h5 className="alert alert-info fw-bold mt-3">
                            Monthly Payment: ${monthlyPayment.toFixed(2)}
                            <h6 className="mt-4">Principal Paid: ${loanAmount}</h6>
                            <h6>Interest Paid: ${interestPaid.toFixed(2)}</h6>
                        </h5>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100 center" onClick={calculateMonthlyPayment}>Calculate</button>
            </form>
        </div>
    )
};

export default LoanCalculator;