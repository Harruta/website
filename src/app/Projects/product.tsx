import { StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';
import { monoFont } from '../styles/fonts/fonts';
import Image from 'next/image';
import QC from '../content/images/QC.png';
import Brain from '../content/images/Brain.png';
import { Github } from 'lucide-react';

interface Project {
    title: string;
    date: string;
    description: string;
    image?: StaticImageData;
    link: string;
    githubUrl?: string;
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
        {
            title: 'Brainly',
            date: 'Mar 21, 2025',
            description: "A place where one can store all their bookmarks",
            image: Brain,
            link: "https://brain-bay-two.vercel.app/",
            githubUrl: 'https://github.com/Harruta/brain-frontend',
            bulletPoints:[
                'Users can create an account and store their bookmarks',
            ]
        },
        
    ];

    return (
        <div className="w-full mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-[#242424] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                    >
                        {project.image && (
                            <div className="h-32 overflow-hidden">
                                <Image 
                                    src={project.image} 
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    width={400}
                                    height={160}
                                />
                            </div>
                        )}
                        <div className="p-4 flex-1 flex flex-col">
                            <div className="flex items-baseline justify-between mb-2">
                                <h2 className="text-base font-medium dark:text-white">{project.title}</h2>
                                <time className="text-xs text-gray-500 dark:text-gray-400 ml-2 shrink-0">{project.date}</time>
                            </div>

                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                                {project.description}
                            </p>

                            <ul className="space-y-1.5 mb-4 flex-1">
                                {project.bulletPoints.map((point, i) => (
                                    <li key={i} className="flex items-start text-xs text-gray-600 dark:text-gray-400">
                                        <span className="mr-2 mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
                                        {point}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-center gap-3 mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                                <a 
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                                >
                                    View Project
                                </a>
                                {project.githubUrl && (
                                    <a 
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        <Github size={12} /> Source
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* More Soon Section */}
            <div className="mt-24 space-y-8">
                <div className="flex items-center justify-center gap-4">
                    <a 
                        href="https://github.com/Harruta"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center text-muted-foreground hover:text-purple-500 transition-colors duration-200"
                    >
                        View more on Github
                        <svg
                            className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </a>
                </div>

                <h2 className={cn(
                    "text-center text-4xl md:text-7xl font-extrabold",
                    "bg-gradient-to-r from-gray-400/60 via-gray-500/60 to-gray-600/60 bg-clip-text text-transparent",
                    "opacity-30 transition-opacity duration-300 hover:opacity-40",
                    monoFont.className
                )}>
                    More Soon
                </h2>
            </div>
        </div>
    );
};

export default Projects;
