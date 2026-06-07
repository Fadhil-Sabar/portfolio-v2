export interface Project {
	slug: string;
	index: string;
	title: string;
	blurb: string;
	description: string;
	year: string;
	role: string;
	type: string;
	stack: string[];
	live: string | null;
	repo: string | null;
	image: string | null;
}

export const projects: Project[] = [
	{
		slug: 'praya',
		index: '001',
		title: 'Praya Single Billing',
		blurb: 'SAP integration for billing operations across 13 ports in Indonesia. Handles 3B+ IDR in daily transactions.',
		description: `<p>I'm proudly present, my best project in my company application. In this task, I was given challenge to implement SAP Integration within my company app, a massive project. I had to map every detail of transaction in my company app to the integrator.</p>
<p>I needed to integrate efficiently and fast due to high transaction load in every single port in Indonesia, without any unhandled errors that may cause transaction failure and obstruct user experience. The idea was: I created 2 new tables to handle this. First I read the detail of each transaction, find the correct mapping for each transaction with keys, and send the data by mapping to SAP's standard code.</p>
<p>The struggle was real, we took at least 3 days to find the exact, fast and efficient way to integrate between my app and the integrator until I found the best approach. I learned a lot about writing efficient code, avoiding redundancy, making queries lightweight, and mapping to the right SAP code. I also found that communication within my team is really important, especially for brainstorming. Now it's been running for almost 1 year with more than 3 Billion Rupiah in daily transactions. There was also a challenge for me to automate new terminal implementation so I don't have to do manual mapping, I did it, in general it is worked and no need to manually mapping each new component.</p>`,
		year: '2024',
		role: 'Fullstack Developer',
		type: 'Group · PT. ILCS',
		stack: ['React', 'Express.js', 'Oracle DB', 'SAP'],
		live: null,
		repo: null,
		image: '/images/projects/project4.jpg'
	},
	{
		slug: 'bizhub',
		index: '002',
		title: 'Bizhub, Kemnaker',
		blurb: "Employment expansion platform for Indonesia's Ministry of Manpower. Chat feature, admin panel, 10K+ daily users.",
		description: `<p>This project is built for Kemnaker (Indonesia Ministry of Manpower). The platform facilitates every citizen in the context of the employment expansion program.</p>
<p>I was responsible for the front-end development, especially for building the chat feature, integrating it with back-end services, maintaining mobile-friendly pages, bug fixing, and creating admin pages.</p>
<p>I learned a lot from this project, especially TypeScript, Tailwind CSS, and Next.js. I also improved my communication skills working with teammates, and learned a great deal from my teams.</p>`,
		year: '2024',
		role: 'Frontend Developer',
		type: 'Group · Mahatech',
		stack: ['Next.js', 'TypeScript', 'Tailwind'],
		live: 'https://bizhub.kemnaker.go.id/',
		repo: null,
		image: '/images/projects/project3.jpg'
	},
	{
		slug: 'truck-booking-mfe',
		index: '003',
		title: 'Truck Booking System - MFE',
		blurb: 'Micro-frontend for port truck logistics.',
		description: `<p>This project was built to rebuild the Truck Booking System (TBS) into a new Micro Frontend architecture. The original TBS required a lot of configuration just to integrate MFE, so we decided to create a new project from scratch dedicated solely to that integration.</p>
		<p>Throughout this project, I learned a great deal about TanStack, Micro Frontend, and TypeScript. It was a deliberate challenge to build with an entirely new stack and step out of my comfort zone. There were learning curves along the way, but the result was really worth. 
Currently the system is live on the Adhara web page, Pelindo's application portal, and running stably in production since deployment.</p>
		`,
		year: '2025',
		role: 'Fullstack Developer',
		type: 'Group · PT. ILCS',
		stack: ['Next.js', 'TypeScript', 'Express.js', 'Tailwind'],
		live: null,
		repo: null,
		image: '/images/projects/project6.png'
	},
	{
		slug: 'wedding-web',
		index: '004',
		title: 'Wedding Invitation Web',
		blurb: 'Custom wedding site with personalized invite names, RSVP, and mobile-first responsive design.',
		description: `<p>This project was made as a tribute to my brother and also as a challenge to myself. My brother researched the template design, and I remade it with some improvements.</p>
<p>The main features include showing wedding details, custom invitation names, and RSVP for wishes.</p>
<p>Since most visitors use mobile devices, I had to learn Tailwind CSS for responsive layouts and Next.js for the framework. I chose Next.js for its performance and SEO benefits with static sites.</p>
<p>I built this website alone and wanted to deliver the best I could, I learned a lot about responsive design, project structure, clean code, and SEO.</p>`,
		year: '2025',
		role: 'Solo Developer',
		type: 'Personal',
		stack: ['Next.js', 'Tailwind CSS'],
		live: 'https://ivan-anggi-wedding.vercel.app/',
		repo: 'https://github.com/Fadhil-Sabar/brother-wedding',
		image: '/images/projects/project2.jpg'
	},
	{
		slug: 'quran-reader',
		index: '005',
		title: 'Quran Reader Web',
		blurb: 'Lightweight Quran reading app. Search by surah name or number, mobile last-read bookmark, auto-scroll.',
		description: `<p>This project was made for my learning purpose. At my current company, I had to challenge myself to learn the company's tech stack. With only my bootcamp knowledge and school background, I couldn't understand the company's code. <b>So I decided to learn by building small projects.</b></p>
<p>The features are simple: fetch from API and display on the web page. Users can search surah by verse name or number, and copy verses. I added extra features for mobile: last-read surah bookmark (from my dad's idea) and auto-scroll to the last read position.</p>
<p>Through this project, I learned how the front-end tech at my company works, initializing a React project, consuming APIs, rendering pages, and project structure. It's definitely not clean code, I just threw code together with a "if it works, don't touch it" mentality, but it was a crucial learning step.</p>`,
		year: '2022',
		role: 'Solo Developer',
		type: 'Personal',
		stack: ['React', 'JavaScript'],
		live: 'https://fadhil-quran.vercel.app/quran',
		repo: 'https://gitlab.com/Fadhil-A/learn-react',
		image: '/images/projects/project1.jpg'
	},
	{
		slug: 'quran-mobile',
		index: '006',
		title: 'Simple Quran Mobile',
		blurb: 'Flutter mobile app, clean Quran reader, no ads, adjustable font size. Built for learning Flutter.',
		description: `<p>This project was made for my learning purpose in Flutter. My company gave me a new challenge to step up as a mobile developer. Like I did back in 2022 with the Quran Reader web app, I took the same approach, learning by doing.</p>
<p>The idea came from myself: I wanted an app that simply shows the Quran without any advanced features, but with accessibility features like adjustable font size. Lightweight, useful, and without ads.</p>
<p>As a coder, I prefer learning by doing. Because of that, I quickly understood how the code works, syntax, and project structure. I gained a lot from this Flutter project, building apps, working with widgets, and many Flutter-specific tips. The app is not yet finished.</p>`,
		year: '2025',
		role: 'Solo Developer',
		type: 'Personal · WIP',
		stack: ['Flutter', 'Dart'],
		live: null,
		repo: null,
		image: '/images/projects/project5.jpg'
	}
];
