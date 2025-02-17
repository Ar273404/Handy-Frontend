// import React from 'react';
// import { Bar } from 'react-chartjs-2';

// const JobAnalytics = ({ jobs }) => {
//   const data = {
//     labels: jobs.map((job) => job.title),
//     datasets: [
//       {
//         label: 'Job Ratings',
//         data: jobs.map((job) => job.rating || 0),
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="bg-white rounded shadow p-4">
//       <h2 className="text-xl font-bold">Job Analytics</h2>
//       <Bar data={data} />
//     </div>
//   );
// };

// export default JobAnalytics;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register Chart.js modules
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const JobAnalytics = ({ jobs }) => {
  const data = {
    labels: jobs.map((job) => job.title),
    datasets: [
      {
        label: 'Job Ratings',
        data: jobs.map((job) => job.rating || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-bold">Job Analytics</h2>
      <Bar data={data} />
    </div>
  );
};

export default JobAnalytics;

