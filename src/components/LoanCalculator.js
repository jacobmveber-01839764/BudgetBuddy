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
            <h4 className="mb-5">Loan Calculator</h4>

            <form onSubmit={(event) => event.preventDefault()}>
                <FormInputGroup text="Loan Amount $" placeholder="" value={loanAmount} onInput={(event) => setLoanAmount(event.target.value)}/>
                <FormInputGroup text="Interest Rate %" placeholder="" value={interestRate} onInput={(event) => setInterestRate(event.target.value)}/>
                <FormInputGroup text="Loan Duration in Years" placeholder="" value={loanDuration} onInput={(event) => setLoanDuration(event.target.value)}/>
                
                <h4 className="alert alert-info fw-bold">
                    Monthly Payment: ${monthlyPayment.toFixed(2)}
                    <h5 className="mt-4">Principal Paid: ${loanAmount}</h5>
                    <h5>Interest Paid: ${interestPaid.toFixed(2)}</h5>
                </h4>
                <button type="submit" className="btn btn-primary btn-lg w-100 mt-3 center" onClick={calculateMonthlyPayment}>Calculate</button>
            </form>
        </div>
    )
};

export default LoanCalculator;