export interface Experience {
	period: string;
	role: string;
	company: string;
	description: string;
	tech: string[];
}

export const experience: Experience[] = [
	{
		period: 'Sep 2023 - Present',
		role: 'Software Developer',
		company: 'PT. Integrasi Logistik Cipta Solusi · Jakarta Utara',
		description:
			'Developed and maintained the SAP integration for Praya Single Billing, a mission-critical system processing IDR 150M-1B+ per port daily across 13 Indonesian ports. Built the full-stack Truck Booking System, engineered Oracle PL/SQL procedures, and provided live production support to ensure high system stability.',
		tech: ['React', 'Express.js', 'Oracle DB', 'PL/SQL', 'TypeScript', 'Next.js']
	},
	{
		period: 'Feb 2022 - Sep 2023',
		role: 'L2 Developer',
		company: 'PT. Integrasi Logistik Cipta Solusi · Jakarta Utara',
		description:
			'Provided real-time support and monitoring for 6 live port systems. Identified, diagnosed, and resolved software issues to maintain system performance and stability across production environments.',
		tech: ['JavaScript', 'SQL', 'Linux']
	},
	{
		period: 'Jun 2024 - Sep 2024',
		role: 'Frontend Web Developer',
		company: 'Mahatech · Remote, Freelance',
		description:
			'Developed responsive admin and user interfaces using Next.js for a platform serving 10,000+ daily active users. Integrated frontend with backend services and contributed to UI/UX improvements.',
		tech: ['Next.js', 'TypeScript', 'Tailwind CSS']
	},
	{
		period: 'Apr 2023',
		role: 'Frontend Web Developer',
		company: 'Ideatech · Remote, Freelance',
		description:
			'Built the competition scoring frontend for Kementerian Agama from scratch, HTML, CSS, Bootstrap, and integrated it with backend APIs. Also resolved backend bugs improving overall system reliability.',
		tech: ['HTML', 'CSS', 'Bootstrap', 'JavaScript']
	},
	{
		period: 'Sep 2021 - Jan 2022',
		role: 'Online IT Bootcamp',
		company: 'PT Enigma Cipta Humanika',
		description:
			'Completed an intensive online IT bootcamp covering full-stack web development fundamentals. Gained foundational knowledge in JavaScript, front-end and back-end technologies, and software development best practices that paved the way for my career in tech.',
		tech: ['JavaScript', 'HTML', 'CSS', 'Git']
	}
];
