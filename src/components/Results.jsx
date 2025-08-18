import { calculateInvestmentResults, formatter } from "../util/investment";

function Results({ input }) {
  const resultsData = calculateInvestmentResults(input);
  
  // คำนวณยอดรวมทั้งหมด
  const totalInvestment = input.initialInvestment + (input.annualInvestment * input.duration);
  const totalInterest = resultsData[resultsData.length - 1]?.valueEndOfYear - totalInvestment || 0;
  const finalValue = resultsData[resultsData.length - 1]?.valueEndOfYear || 0;

  return (
    <>
      {/* Summary Cards */}
      <div className="summary-section">
        <div className="summary-card">
          <h3>Total Investment</h3>
          <p className="summary-value">{formatter.format(totalInvestment)}</p>
        </div>
        <div className="summary-card">
          <h3>Total Interest</h3>
          <p className="summary-value">{formatter.format(totalInterest)}</p>
        </div>
        <div className="summary-card">
          <h3>Final Value</h3>
          <p className="summary-value">{formatter.format(finalValue)}</p>
        </div>
      </div>

      {/* Results Table */}
      <div id="result">
        <h2 className="results-title">Investment Results by Year</h2>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Investment Value</th>
              <th>Interest (Year)</th>
              <th>Total Interest</th>
              <th>Invested Capital</th>
            </tr>
          </thead>
          <tbody>
            {resultsData.map((yearData) => {
              // คำนวณ total interest สะสม
              const totalInterest = resultsData
                .filter((result) => result.year <= yearData.year)
                .reduce((sum, result) => sum + result.interest, 0);
              
              // คำนวณ total capital ที่ลงทุนไปแล้ว
              const totalAmountInvested = yearData.year * input.annualInvestment + input.initialInvestment;
              
              return (
                <tr key={yearData.year}>
                  <td className="year-cell">{yearData.year}</td>
                  <td className="value-cell">{formatter.format(yearData.valueEndOfYear)}</td>
                  <td className="interest-cell">{formatter.format(yearData.interest)}</td>
                  <td className="total-interest-cell">{formatter.format(totalInterest)}</td>
                  <td className="capital-cell">{formatter.format(totalAmountInvested)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Results;