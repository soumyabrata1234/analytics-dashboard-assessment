'use client';

export default function EVSummaryCards() {
  const stats = {
    totalEVs: 50000,
    avgRange: 59.19,
    avgMSRP: 1073.01,
    topMakes: ['TESLA', 'NISSAN', 'CHEVROLET', 'BMW', 'FORD'],
    topCities: ['Seattle', 'Bellevue', 'Vancouver', 'Kirkland', 'Sammamish'],
    evTypes: {
      BEV: 39461,
      PHEV: 10539,
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Card title="Total EVs Registered" value={stats.totalEVs.toLocaleString()} />
      <Card title="Avg. Electric Range (mi)" value={`${stats.avgRange} mi`} />
      <Card title="Avg. MSRP ($)" value={`$${stats.avgMSRP}`} />

      <Card title="Top EV Makes">
        <ul className="text-sm text-gray-600 dark:text-gray-300">
          {stats.topMakes.map((make) => (
            <li key={make}>• {make}</li>
          ))}
        </ul>
      </Card>

      <Card title="Top Cities">
        <ul className="text-sm text-gray-600 dark:text-gray-300">
          {stats.topCities.map((city) => (
            <li key={city}>• {city}</li>
          ))}
        </ul>
      </Card>

      <Card title="EV Types Distribution">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          BEV: {stats.evTypes.BEV.toLocaleString()} <br />
          PHEV: {stats.evTypes.PHEV.toLocaleString()}
        </p>
      </Card>
    </div>
  );
}

function Card({ title, value, children }) {
  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-5 cursor-pointer
                 transition-transform duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
      {value ? (
        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
      ) : (
        children
      )}
    </div>
  );
}
