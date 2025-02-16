import Image from 'next/image';
import QC from '../content/images/QC.png';
import { Github } from 'lucide-react';

interface Project {
    title: string;
    date: string;
    description: string;
    image: any;
    link: string;
    githubUrl: string;
    bulletPoints: string[]; 
}

const Projects = () => {
    const projects: Project[] = [
        {
            title: 'QuietChat',
            date: 'Feb 15, 2025',
            description: 'A privacy-focused chat app.',
            image: QC,
            link: 'https://qchat-jw2m.onrender.com/',
            githubUrl: 'https://github.com/Harruta/Qchat',
            bulletPoints: [
                'Encrypted Messages',
                'Users can create a Temporary Account if they dont want to share info.',
                'A local storage mode: when enabled, it does not store messages in the database.'
            ]
        },
    ];

    return (
        <div className="w-full mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className={`bg-white dark:bg-[#242424] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full ${
                            projects.length === 1 ? 'md:col-span-2' : ''
                        }`}
                    >
                        {project.image && (
                            <div className="h-40 overflow-hidden">
                                <Image 
                                    src={project.image} 
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    width={600}
                                    height={240}
                                />
                            </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-baseline justify-between mb-4">
                                <h2 className="text-lg font-medium dark:text-white">{project.title}</h2>
                                <time className="text-sm text-gray-500 dark:text-gray-400 ml-4 shrink-0">{project.date}</time>
                            </div>

                            <p className="text-[15px] text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                {project.description}
                            </p>

                            <ul className="space-y-2 mb-6 flex-1">
                                {project.bulletPoints.map((point, i) => (
                                    <li key={i} className="flex items-start text-[13px] text-gray-600 dark:text-gray-400">
                                        <span className="mr-2 mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                <a 
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[13px] text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                                >
                                    View Project
                                </a>
                                {project.githubUrl && (
                                    <a 
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[13px] text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        <Github size={14} /> Source
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
