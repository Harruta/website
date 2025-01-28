import React from 'react';

const Journey = () => {
  const milestones = [
    { year: '2017', description: 'Started coding' },
    { year: '2018', description: 'Learned HTML, CSS, and JavaScript' },
    { year: '2020', description: 'Built my first full-stack project' },
    { year: '2022', description: 'Started contributing to open-source' },
    { year: '2025', description: 'Preparing for GSoC and building advanced apps' },
  ];

  return (
    <div className="p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">My Developer Journey</h2>
      <ul className="mt-4 space-y-4">
        {milestones.map((milestone, index) => (
          <li
            key={index}
            className="pl-4 border-l-2 border-dotted"
          >
            <span className="block font-medium">{milestone.year}</span>
            <span className="text-sm">{milestone.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Journey;
