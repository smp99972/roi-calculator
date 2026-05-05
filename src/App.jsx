import { useMemo, useState } from "react";
import "./App.css";

export default function App() {
  const [customerValue, setCustomerValue] = useState(2500);
  const [missedLeads, setMissedLeads] = useState(15);
  const [closeRate, setCloseRate] = useState(10);
  const [leadQuality, setLeadQuality] = useState(70);
  const [recoveryRate, setRecoveryRate] = useState(35);
  const [monthlyFee, setMonthlyFee] = useState(899);

  const weeksPerMonth = 4.33;

  const results = useMemo(() => {
    const monthlyMissedLeads = missedLeads * weeksPerMonth;
    const qualifiedLeads = monthlyMissedLeads * (leadQuality / 100);
    const potentialCustomers = qualifiedLeads * (closeRate / 100);
    const recoveredCustomers = potentialCustomers * (recoveryRate / 100);

    const expectedRevenue = recoveredCustomers * customerValue;

  const conservativeCustomers =
   qualifiedLeads * (closeRate / 2 / 100) * (recoveryRate / 2 / 100);


    const conservativeRevenue = conservativeCustomers * customerValue;

    const roiMultiple =
      monthlyFee > 0 ? expectedRevenue / monthlyFee : 0;

    const monthsCoveredByOneCustomer =
      monthlyFee > 0 ? customerValue / monthlyFee : 0;

    const breakEvenCustomersPerMonth =
      customerValue > 0 ? monthlyFee / customerValue : 0;

    return {
      expectedRevenue,
      conservativeRevenue,
      roiMultiple,
      monthsCoveredByOneCustomer,
      breakEvenCustomersPerMonth,
    };
  }, [
    customerValue,
    missedLeads,
    closeRate,
    leadQuality,
    recoveryRate,
    monthlyFee,
  ]);

  return (
    <div className="shell">
      <div className="panel">
      <div style={{ marginBottom: 24 }}>
  <div className="muted" style={{ marginBottom: 8, color: "#00B3A4", fontWeight: 700 }}>
  AI Lead Recovery Calculator
  </div>

  <h1>Agent Force AI ROI Calculator</h1>

  <p className="muted" style={{ marginTop: 10, maxWidth: 620 }}>
    Estimate how much missed leads and slow responses could be costing
    your business every month — and how quickly an AI agent could pay for itself.
  </p>
</div>

        <div className="grid">
          <div className="card">
            <label className="label">Average Value Per Customer ($)</label>
            <input
              className="input"
              type="number"
              value={customerValue}
              onChange={(e) => setCustomerValue(+e.target.value)}
            />

            <label className="label">Missed Leads Per Week</label>
            <input
              className="input"
              type="number"
              value={missedLeads}
              onChange={(e) => setMissedLeads(+e.target.value)}
            />

            <label className="label">Close Rate (%)</label>
            <input
              className="input"
              type="number"
              value={closeRate}
              onChange={(e) => setCloseRate(+e.target.value)}
            />

            <label className="label">% Qualified Leads</label>
            <input
              className="input"
              type="number"
              value={leadQuality}
              onChange={(e) => setLeadQuality(+e.target.value)}
            />

            <label className="label">% Leads You Could Recover</label>
            <input
              className="input"
              type="number"
              value={recoveryRate}
              onChange={(e) => setRecoveryRate(+e.target.value)}
            />

            <label className="label">Monthly Investment ($)</label>
            <input
              className="input"
              type="number"
              value={monthlyFee}
              onChange={(e) => setMonthlyFee(+e.target.value)}
            />
          </div>

          <div className="card">
          <div className="muted" style={{ marginBottom: 12, fontSize: 13 }}>
            Based on your inputs, you could be missing this much revenue every month:
</div>
            <div className="result result--hero">
              <div className="muted">
                Conservative Recoverable Monthly Revenue
              </div>
              <div className="big">
                ${Math.round(results.conservativeRevenue).toLocaleString()}
              </div>
              <div className="muted" style={{ marginTop: 6 }}>
                Recommended projection for realistic planning
              </div>
            </div>

            <div className="result" style={{ marginTop: 16 }}>
              <div className="muted">
                Expected Recoverable Monthly Revenue
              </div>
              <div className="big">
                ${Math.round(results.expectedRevenue).toLocaleString()}
              </div>
            </div>

            <div className="result" style={{ marginTop: 16 }}>
              <div className="muted">ROI Multiple</div>
              <div className="big">
                {results.roiMultiple.toFixed(1)}x
              </div>
            </div>

            <div className="result" style={{ marginTop: 16 }}>
              <div className="muted">1 Customer Covers</div>
              <div className="big">
                {results.monthsCoveredByOneCustomer.toFixed(1)} months
              </div>
              <div className="muted" style={{ marginTop: 6 }}>
                Break-even:{" "}
                {results.breakEvenCustomersPerMonth.toFixed(3)} customers/month
              </div>
              <div className="muted" style={{ marginTop: 10 }}>
                Even one recovered customer can often pay for months of service.
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <button
                className="btn"
                onClick={() =>
                  alert(
                    "Next step: connect this button to your booking page or payment link."
                  )
                }
              >
                Install My AI Agent
              </button>
              <div className="muted" style={{ marginTop: 8 }}>
                Want this set up for your business? Click above to request setup.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}