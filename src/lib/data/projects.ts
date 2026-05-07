export interface Project {
	slug: string;
	index: string;
	title: string;
	blurb: string;
	year: string;
	role: string;
	type: string;
	stack: string[];
	live: string | null;
	repo: string | null;
}

export const projects: Project[] = [
	{
		slug: 'praya',
		index: '001',
		title: 'Praya Single Billing',
		blurb: 'SAP integration for billing operations across 13 ports in Indonesia. Handles 3B+ IDR in daily transactions.',
		year: '2024',
		role: 'Fullstack Developer',
		type: 'Group · PT. ILCS',
		stack: ['React', 'Express.js', 'Oracle DB', 'SAP'],
		live: null,
		repo: null
	},
	{
		slug: 'bizhub',
		index: '002',
		title: 'Bizhub — Kemnaker',
		blurb: "Employment expansion platform for Indonesia's Ministry of Manpower. Chat feature, admin panel, 10K+ daily users.",
		year: '2024',
		role: 'Frontend Developer',
		type: 'Group · Mahatech',
		stack: ['Next.js', 'TypeScript', 'Tailwind'],
		live: 'https://bizhub.kemnaker.go.id/',
		repo: null
	},
	{
		slug: 'truck-booking',
		index: '003',
		title: 'Truck Booking System',
		blurb: 'Micro-frontend dashboard for port truck logistics. Full end-to-end UI and backend services.',
		year: '2023',
		role: 'Fullstack Developer',
		type: 'Group · PT. ILCS',
		stack: ['Next.js', 'TypeScript', 'Express.js', 'Tailwind'],
		live: null,
		repo: null
	},
	{
		slug: 'wedding-web',
		index: '004',
		title: 'Wedding Invitation Web',
		blurb: 'Custom wedding site with personalized invite names, RSVP, and mobile-first responsive design.',
		year: '2025',
		role: 'Solo Developer',
		type: 'Personal',
		stack: ['Next.js', 'Tailwind CSS'],
		live: 'https://ivan-anggi-wedding.vercel.app/',
		repo: null
	},
	{
		slug: 'quran-reader',
		index: '005',
		title: 'Quran Reader Web',
		blurb: 'Lightweight Quran reading app. Search by surah name or number, mobile last-read bookmark, auto-scroll.',
		year: '2022',
		role: 'Solo Developer',
		type: 'Personal',
		stack: ['React', 'JavaScript'],
		live: 'https://fadhil-quran.vercel.app/quran',
		repo: null
	},
	{
		slug: 'quran-mobile',
		index: '006',
		title: 'Simple Quran Mobile',
		blurb: 'Flutter mobile app — clean Quran reader, no ads, adjustable font size. Built for learning Flutter.',
		year: '2025',
		role: 'Solo Developer',
		type: 'Personal · WIP',
		stack: ['Flutter', 'Dart'],
		live: null,
		repo: null
	}
];
