function DisplayReport({ report }) {
  const totalRevenue = report[report.length - 1];
  const movies = [...report];
  movies.pop();
  if (report.length === 1)
    return <h1 className="text-center text-2xl m-2">No reports available</h1>;
  else {
    return (
      <div>
        <h1 className="text-center text-4xl m-2 text-bold m-4">Movie Report</h1>
        <div className="m-4 text-xl">
          {movies.map((ele) => (
            <p key={Math.random()} className="text-center">
              Location: {ele.location}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time:
              {ele.movieTime}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Revenue:{ele.revenue}
            </p>
          ))}
        </div>
        <h2 className="text-center text-bold text-3xl">
          Grand Total:&nbsp;&nbsp;&nbsp;{totalRevenue?.grandTotalMovie ?? 0}
        </h2>
      </div>
    );
  }
}

export default DisplayReport;
