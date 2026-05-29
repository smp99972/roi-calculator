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
        <div className="header">
          <div className="brand-row">
            <div className="logo-mark">Ai</div>

            <div>
              <h1>Agent Force AI</h1>
              <div className="sub-title">ROI Calculator</div>
            </div>
          </div>

          <p className="intro">
            See how much revenue you could recover with an AI receptionist
            answering calls, texts, chats, and messages 24/7.
          </p>
        </div>

        <div className="input-grid">
          <div className="input-group">
            <label>Average Value Per Customer ($)</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Example: 2500"
              value={customerValue}
              onChange={(e) => setCustomerValue(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Missed Leads Per Week</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Example: 10"
              value={missedLeads}
              onChange={(e) => setMissedLeads(e.target.value)}
            />
          </div>
        </div>

        <div className="main-layout">
          <div className="revenue-card">
            <div className="result-label">Potential Revenue Recovery</div>

            <div className="main-number">
              ${Math.round(results.potentialRevenue).toLocaleString()}
              <span>/month</span>
            </div>

            <p>
              Based on your inputs, this is your estimated additional monthly
              revenue opportunity.
            </p>
          </div>

          <div className="side-card">
            <div className="small-label">Monthly Investment</div>
            <div className="investment-number">
              $999<span>/month</span>
            </div>

            <div className="side-divider"></div>

            <p>
              One AI Receptionist.<br />
              24/7 Coverage. No misses.<br />
              Just more revenue.
            </p>
          </div>
        </div>

        <div className="bottom-grid">
          <div className="metric-card">
            <div className="metric-label">ROI Multiple</div>
            <div className="metric-number">
              {results.roiMultiple.toFixed(1)}x
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">1 Customer Covers</div>
            <div className="metric-number">
              {results.monthsCovered.toFixed(1)} months
            </div>

            <p>
              Break-even: {results.breakEvenCustomers.toFixed(3)} customers/month
            </p>
          </div>

          <div className="metric-card wide">
            <div className="metric-label">Why It Matters</div>
            <p>
              Even one recovered customer can often pay for months of service.
            </p>
          </div>
        </div>

        <button className="cta-button">
          Launch My AI Receptionist
        </button>

        <div className="setup-note">
          🔒 100% Done-For-You Setup Included
        </div>
      </div>
    </div>
  );
}