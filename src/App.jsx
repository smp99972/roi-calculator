import { useMemo, useState } from "react";
import "./App.css";

export default function App() {
  const [customerValue, setCustomerValue] = useState("");
  const [missedLeads, setMissedLeads] = useState("");

  const monthlyInvestment = 999;
  const weeksPerMonth = 4.33;
  const assumedRecoveryRate = 0.35;

  const results = useMemo(() => {
    const value = Number(customerValue) || 0;
    const leads = Number(missedLeads) || 0;

    const monthlyMissedLeads = leads * weeksPerMonth;
    const recoveredLeads = monthlyMissedLeads * assumedRecoveryRate;
    const potentialRevenue = recoveredLeads * value;

    const roiMultiple =
      monthlyInvestment > 0 ? potentialRevenue / monthlyInvestment : 0;

    const monthsCovered =
      monthlyInvestment > 0 ? value / monthlyInvestment : 0;

    const breakEvenCustomers =
      value > 0 ? monthlyInvestment / value : 0;

    return {
      potentialRevenue,
      roiMultiple,
      monthsCovered,
      breakEvenCustomers,
    };
  }, [customerValue, missedLeads]);

  return (
    <div className="shell">
      <div className="panel">
        <div className="top">
          <div className="brand-row">
            <div className="logo-mark">Ai</div>
            <div>
              <h1>Agent Force AI</h1>
              <div className="sub-title">ROI Calculator</div>
            </div>
          </div>

          <p className="intro">
            See how much revenue you could recover with an AI receptionist
            answering 24/7.
          </p>
        </div>

        <div className="form">
          <label>Average Value Per Customer ($)</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter amount"
            value={customerValue}
            onChange={(e) => setCustomerValue(e.target.value)}
          />

          <label>Missed Leads Per Week</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter number"
            value={missedLeads}
            onChange={(e) => setMissedLeads(e.target.value)}
          />
        </div>

        <div className="result hero-result">
          <div className="result-label">Potential Revenue Recovery</div>
          <div className="main-number">
            ${Math.round(results.potentialRevenue).toLocaleString()}
            <span>/month</span>
          </div>
          <p>
            Based on your inputs, this is your potential additional monthly
            revenue.
          </p>
        </div>

        <div className="investment-box">
          <div>
            <div className="small-label">Monthly Investment</div>
            <div className="investment-number">$999<span>/month</span></div>
          </div>

          <div className="divider"></div>

          <div className="investment-copy">
            One AI Receptionist.<br />
            24/7 Coverage. No misses.<br />
            Just more revenue.
          </div>
        </div>

        <div className="mini-grid">
          <div className="mini-card">
            <div className="mini-label">ROI Multiple</div>
            <div className="mini-number">
              {results.roiMultiple.toFixed(1)}x
            </div>
          </div>

          <div className="mini-card">
            <div className="mini-label">1 Customer Covers</div>
            <div className="mini-number">
              {results.monthsCovered.toFixed(1)} months
            </div>
            <p>Break-even: {results.breakEvenCustomers.toFixed(3)} customers/month</p>
            <p>Even one recovered customer can often pay for months of service.</p>
          </div>
        </div>

        <button className="cta-button">
        Launch My 7-in-1 AI Sales Receptionist
        </button>

        <div className="setup-note">
          🔒 100% Done-For-You Setup Included
        </div>
      </div>
    </div>
  );
}