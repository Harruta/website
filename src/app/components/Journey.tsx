import React from 'react';
import { cn } from '@/lib/utils';
import { monoFont } from '../styles/fonts/fonts';

const Journey = () => {
  const milestones = [
    { year: '2016', description: 'Got my very first laptop.' },
    { year: '2017', description: 'Started learning C++ on my own through YouTube videos.' },
    { year: '2018', description: 'Got introduced to hacking, played with VMs, explored dw.' },
    { year: '2019', description: 'Was obsessed with making hacking tools like keyloggers and ransomware.' },
    { year: '2020', description: 'Got bored of hacking/development. explored different paths (biggest mistake).' },
    { year: '2021', description: 'Was on a different path completely forgot about coding.' },
    { year: '2022', description: 'passed 12th and took a gap year to prepare for studying abroad (got rejected).' },
    { year: '2023', description: 'Ended up choosing a useless degree to pursue.<br/>(I did not choose CS because of the AI hype; I was too scared that AI would <br/>make coding obsolete).' },
    { year: '2024', description: 'Started getting back into coding.' },
    { year: '2025', description: 'First 6 months : </br> Focusing on dev and DSA/CP,want to be very good at it. </br>later half : </br> will be geting into AI/ML' },
    { year: '2026', description: 'Will graduade. Next aiming to do a MS in CS while working a remote job' },
  ];

  return (
    
      <div className={cn("p-4 rounded-xl shadow-md", monoFont.className)}>

      <h2 className="text-xl font-bold mb-4">My Journey</h2>
      <ul className="">
        {milestones.map((milestone, index) => (
          <li
            key={index}
            className="pl-4 border-l-2 border-dotted"
          >
            <span className="block font-medium">{milestone.year}</span>
            <span className="text-sm" dangerouslySetInnerHTML={{ __html: milestone.description }}></span>
          </li>
        ))}
      </ul>
      </div>
  );
};

export default Journey;
