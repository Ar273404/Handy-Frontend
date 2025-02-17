// import React, { useState } from 'react';

// const JobFilters = ({ onApplyFilters }) => {
//   const [expertise, setExpertise] = useState('');
//   const [compensationRange, setCompensationRange] = useState('');
//   const [coordinates, setCoordinates] = useState('');
//   const [distance, setDistance] = useState('');

//   const handleFilter = () => {
//     onApplyFilters({ expertise, compensationRange, coordinates, maxDistance: distance });
//   };

//   return (
//     <div className="mb-4 p-4 bg-gray-100 rounded">
//       <h3 className="text-lg font-bold mb-2">Filters</h3>
//       <div className="flex flex-wrap gap-4">
//         <input
//           type="text"
//           placeholder="Expertise (e.g., plumber)"
//           value={expertise}
//           onChange={(e) => setExpertise(e.target.value)}
//           className="p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Compensation Range (e.g., 1000-5000)"
//           value={compensationRange}
//           onChange={(e) => setCompensationRange(e.target.value)}
//           className="p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Coordinates (longitude,latitude)"
//           value={coordinates}
//           onChange={(e) => setCoordinates(e.target.value)}
//           className="p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Max Distance (meters)"
//           value={distance}
//           onChange={(e) => setDistance(e.target.value)}
//           className="p-2 border rounded"
//         />
//         <button onClick={handleFilter} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Apply Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobFilters;

import React, { useState } from 'react';

const JobFilters = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    expertise: '',
    city: '',
    state: '',
    compensationRange: '',
    maxDistance: '',
    coordinates: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFetchCoordinates = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFilters((prev) => ({ ...prev, coordinates: `${longitude},${latitude}` }));
      },
      (error) => {
        alert('Unable to fetch location. Please check your permissions.');
        console.error(error);
      }
    );
  };

  const handleSubmit = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
      <h2 className="text-lg font-bold mb-4">Filter Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Expertise */}
        <div>
          <label htmlFor="expertise" className="block text-sm font-medium">
            Expertise
          </label>
          <input
            type="text"
            id="expertise"
            name="expertise"
            value={filters.expertise}
            onChange={handleInputChange}
            placeholder="E.g., plumber, electrician"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={filters.city}
            onChange={handleInputChange}
            placeholder="E.g., Gorakhpur"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="block text-sm font-medium">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={filters.state}
            onChange={handleInputChange}
            placeholder="E.g., India"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Compensation Range */}
        <div>
          <label htmlFor="compensationRange" className="block text-sm font-medium">
            Compensation Range
          </label>
          <input
            type="text"
            id="compensationRange"
            name="compensationRange"
            value={filters.compensationRange}
            onChange={handleInputChange}
            placeholder="E.g., 500-1000"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Max Distance */}
        <div>
          <label htmlFor="maxDistance" className="block text-sm font-medium">
            Max Distance (km)
          </label>
          <input
            type="number"
            id="maxDistance"
            name="maxDistance"
            value={filters.maxDistance}
            onChange={handleInputChange}
            placeholder="E.g., 10"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Coordinates */}
        <div className="flex flex-col">
          <label htmlFor="coordinates" className="block text-sm font-medium">
            Coordinates
          </label>
          <div className="flex">
            <input
              type="text"
              id="coordinates"
              name="coordinates"
              value={filters.coordinates}
              onChange={handleInputChange}
              placeholder="Longitude,Latitude"
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleFetchCoordinates}
              type="button"
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Fetch Location
            </button>
          </div>
        </div>
      </div>

      {/* Apply Filters Button */}
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default JobFilters;

