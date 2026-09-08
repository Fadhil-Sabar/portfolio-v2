export interface LocalizedText {
	en: string;
	id: string;
}

export interface Project {
		slug: string;
		index: string;
		title: string;
		blurb: LocalizedText;
		description: LocalizedText;
		year: string;
		role: LocalizedText;
		type: LocalizedText;
		category: 'work' | 'personal';
		stack: string[];
		live: string | null;
		repo: string | null;
		image: string | null;
	}

	export const projects: Project[] = [
		{
			slug: 'twibbonify',
			index: '011',
			title: 'Twibbonify',
			blurb: { en: 'Browser-based batch photo processing tool that identifies photo areas and downloads up to 100 results as a ZIP.', id: 'Alat pemrosesan foto batch berbasis browser yang mengenali area foto dan mengunduh hingga 100 hasil dalam format ZIP.' },
			description: { en: `<p>Twibbonify is a browser-based tool for processing up to 100 photos at once. It automatically identifies the photo area in a template, places each uploaded image within that area, and lets users download the completed results as a ZIP archive.</p>
	<p>I built the entire experience to run locally in the browser, keeping users' photos private while making batch processing fast and straightforward. The app is installable as a Progressive Web App and uses IndexedDB through Dexie to manage local processing data without requiring a backend.</p>
	<p>This solo project was built with React, TypeScript, Vite, IndexedDB, Dexie, and PWA tooling.</p>`, id: `<p>Twibbonify adalah alat berbasis browser untuk memproses hingga 100 foto sekaligus. Aplikasi ini otomatis mengenali area foto pada template, menempatkan setiap gambar yang diunggah ke area tersebut, lalu memungkinkan pengguna mengunduh hasilnya sebagai arsip ZIP.</p>
<p>Saya membangun seluruh pengalaman agar berjalan secara lokal di browser, sehingga foto pengguna tetap privat sekaligus membuat pemrosesan batch cepat dan sederhana. Aplikasi ini dapat dipasang sebagai Progressive Web App dan menggunakan IndexedDB melalui Dexie untuk mengelola data pemrosesan lokal tanpa backend.</p>
<p>Proyek solo ini dibuat dengan React, TypeScript, Vite, IndexedDB, Dexie, dan perangkat PWA.</p>` },
			year: '2026',
			role: { en: 'Solo Developer', id: 'Pengembang Solo' },
			type: { en: 'Personal', id: 'Pribadi' },
			category: 'personal',
			stack: ['React', 'TypeScript', 'Vite', 'IndexedDB/Dexie', 'PWA'],
			live: 'https://twibbonify.fadhil-andriawan.dev/',
			repo: 'https://github.com/Fadhil-Sabar/twibbonify',
			image: '/images/projects/project11.webp'
		},
		{
			slug: 'ollama-interaction',
			index: '010',
			title: 'Ollama Interaction',
			blurb: { en: 'Minimalist web interface for local LLMs via Ollama with RAG, link analysis, and thread management.', id: 'Antarmuka web minimalis untuk LLM lokal melalui Ollama dengan RAG, analisis tautan, dan pengelolaan thread.' },
			description: { en: `<p>I built this project because I wanted a clean, private interface for chatting with local LLMs through Ollama. Most existing UIs felt bloated or required a backend, so I made one that runs entirely in the browser with zero server dependencies.</p>
	<p>The interface uses a Zinc minimalist monochromatic palette with full dark and light mode support. I integrated local RAG so users can attach .txt or .md files as context for the model, plus web link analysis through Jina Reader that lets the model fetch and process live web content autonomously via Ollama's tools API. There is also a web search tool integration for real time information retrieval.</p>
	<p>For conversation management I built thread organization with create, rename, and delete capabilities, all persisted in LocalStorage. The chat uses Ollama's streaming API with a sliding window of the last 10 messages to maintain context without memory bloat. There is smart auto scroll that only anchors to the bottom when the user is already at the latest message, allowing uninterrupted reading of history during generation.</p>
	<p>The tech stack is just using vanilla HTML, CSS with Tailwind via CDN, and jQuery with Marked.js for rendering.</p>`, id: `<p>Saya membuat proyek ini karena ingin memiliki antarmuka yang bersih dan privat untuk berinteraksi dengan LLM lokal melalui Ollama. Sebagian besar UI yang ada terasa terlalu rumit atau membutuhkan backend, jadi saya membuat versi yang berjalan sepenuhnya di browser tanpa dependensi server.</p>
<p>Antarmukanya menggunakan palet monokrom minimalis Zinc dengan dukungan mode gelap dan terang. Saya mengintegrasikan RAG lokal agar pengguna dapat melampirkan berkas .txt atau .md sebagai konteks model, serta analisis tautan web melalui Jina Reader agar model dapat mengambil dan memproses konten web secara mandiri melalui API tools Ollama. Tersedia pula integrasi pencarian web untuk mengambil informasi terkini.</p>
<p>Untuk pengelolaan percakapan, saya membangun organisasi thread dengan kemampuan membuat, mengganti nama, dan menghapus, semuanya tersimpan di LocalStorage. Chat menggunakan streaming API Ollama dengan jendela geser berisi 10 pesan terakhir agar konteks terjaga tanpa membebani memori. Auto-scroll cerdas hanya menempel di bagian bawah ketika pengguna sedang melihat pesan terbaru, sehingga riwayat tetap nyaman dibaca saat generasi berlangsung.</p>
<p>Stack teknologinya hanya HTML vanilla, CSS dengan Tailwind melalui CDN, dan jQuery dengan Marked.js untuk rendering.</p>` },
			year: '2026',
			role: { en: 'Solo Developer', id: 'Pengembang Solo' },
			type: { en: 'Personal', id: 'Pribadi' },
			category: 'personal',
			stack: ['Ollama', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Jina AI'],
			live: null,
			repo: 'https://github.com/Fadhil-Sabar/ollama-interaction',
			image: '/images/projects/project10.webp'
		},
		{
			slug: 'diru-log',
			index: '009',
			title: 'Diru Log - Personal Blog',
			blurb: { en: 'Personal blog built with SvelteKit 5, mdsvex, and Tailwind CSS v4. Deployed on Cloudflare Pages with KV-based pageviews and Giscus comments.', id: 'Blog pribadi yang dibuat dengan SvelteKit 5, mdsvex, dan Tailwind CSS v4. Dideploy di Cloudflare Pages dengan pageview berbasis KV dan komentar Giscus.' },
			description: { en: `<p>Diru Log is my personal blog where I write about Linux, AI, web development, and tech experiments. I built it from scratch with SvelteKit 5 and Tailwind CSS v4, deployed on Cloudflare Pages for optimal performance.</p>
	<p>The blog features a full markdown-based content engine using mdsvex, with automatic reading time calculation, a searchable blog listing page, and image lightbox for a better reading experience. I integrated Cloudflare KV for server-side pageview tracking per post, Giscus for GitHub-backed comments, and GoatCounter for privacy-friendly analytics. The UI includes a reusable component library (button, badge, dialog, navigation menu, item cards) built with Tailwind variants and Lucide icons, plus dark/light theme support via mode-watcher.</p>
	<p>I wrote three blog posts so far: my first post introducing the blog, a detailed guide on my Linux development experience, and a write-up about experimenting with local LLMs using Ollama and LM Studio, complete with embedded images and a video component.</p>
	<p>For SEO, I implemented Open Graph and Twitter Card meta tags, canonical URLs, and semantic HTML structure. The entire site is a solo project where I handled design, development, content writing, and deployment end-to-end.</p>`, id: `<p>Diru Log adalah blog pribadi saya untuk menulis tentang Linux, AI, pengembangan web, dan eksperimen teknologi. Saya membangunnya dari nol dengan SvelteKit 5 dan Tailwind CSS v4, lalu mendeploy-nya di Cloudflare Pages untuk performa optimal.</p>
<p>Blog ini memiliki mesin konten berbasis markdown menggunakan mdsvex, perhitungan waktu baca otomatis, halaman daftar blog yang dapat dicari, dan lightbox gambar untuk pengalaman membaca yang lebih baik. Saya mengintegrasikan Cloudflare KV untuk pelacakan pageview sisi server per tulisan, Giscus untuk komentar berbasis GitHub, dan GoatCounter untuk analitik yang ramah privasi. UI-nya mencakup pustaka komponen yang dapat digunakan ulang serta dukungan tema gelap/terang melalui mode-watcher.</p>
<p>Saya telah menulis tiga tulisan: pengenalan blog, panduan pengalaman pengembangan Linux, dan catatan eksperimen LLM lokal dengan Ollama dan LM Studio.</p>
<p>Untuk SEO, saya menerapkan meta tag Open Graph dan Twitter Card, URL kanonis, serta struktur HTML semantik. Ini adalah proyek solo yang saya tangani dari desain, pengembangan, penulisan konten, hingga deployment.</p>` },
			year: '2026',
			role: { en: 'Solo Developer', id: 'Pengembang Solo' },
			type: { en: 'Personal', id: 'Pribadi' },
			category: 'personal',
			stack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages'],
			live: 'https://log.fadhil-andriawan.dev',
			repo: 'https://github.com/Fadhil-Sabar/diru-log',
			image: '/images/projects/project9.png'
		},
		{
			slug: 'marinews',
			index: '008',
			title: 'MARINews - Mahkamah Agung RI',
			blurb: { en: 'Official news portal for the Supreme Court of Indonesia. Built REST API, citation system, PWA, and CMS features with Laravel.', id: 'Portal berita resmi Mahkamah Agung Republik Indonesia. Membangun REST API, sistem sitasi, PWA, dan fitur CMS dengan Laravel.' },
			description: { en: `<p>This project is the official news portal for the Supreme Court of Indonesia (MA RI), serving legal news, articles, and JDIH documentation to the public. I worked as a fullstack developer in a 4-person team, contributing 48+ commits across API development, CMS enhancements, and production maintenance.</p>
	<p>I architected and built the public REST API endpoints for news and articles with search, date range filtering, pagination, and category-based queries, secured by an API key authentication system I implemented from scratch. I also built the JDIH (legal documentation) integration, connecting content with the Supreme Court's legal document repository.</p>
	<p>One of the more complex features was the legal citation system. I built a citation popover that lets readers reference legal documents directly from article pages, complete with a Dokumen Pustrajak import pipeline and CKEditor integration for content managers. On the front-end side, I added PWA support for offline reading, pageviews tracking, and responsive layout improvements.</p>
	<p>Throughout this project, I leveraged AI coding assistants like Claude, Antigravity and OpenCode to accelerate development, generating boilerplate for API controllers and migrations, debugging edge cases in the citation JS logic, and optimizing SQL queries for better performance. This allowed me to focus more on architecture decisions and edge-case handling while cutting down repetitive coding time significantly.</p>`, id: `<p>Proyek ini adalah portal berita resmi Mahkamah Agung Republik Indonesia (MA RI) yang menyajikan berita hukum, artikel, dan dokumentasi JDIH kepada publik. Saya bekerja sebagai fullstack developer dalam tim beranggotakan empat orang, dengan kontribusi lebih dari 48 commit untuk pengembangan API, penyempurnaan CMS, dan pemeliharaan produksi.</p>
<p>Saya merancang dan membangun endpoint REST API publik untuk berita dan artikel dengan pencarian, filter rentang tanggal, pagination, dan kueri berbasis kategori, yang diamankan dengan sistem autentikasi API key yang saya implementasikan dari nol. Saya juga membangun integrasi JDIH yang menghubungkan konten dengan repositori dokumen hukum Mahkamah Agung.</p>
<p>Salah satu fitur paling kompleks adalah sistem sitasi hukum. Saya membuat popover sitasi agar pembaca dapat merujuk dokumen hukum langsung dari halaman artikel, lengkap dengan pipeline impor Dokumen Pustrajak dan integrasi CKEditor untuk pengelola konten. Di sisi front-end, saya menambahkan dukungan PWA untuk membaca offline, pelacakan pageview, dan penyempurnaan layout responsif.</p>
<p>Dalam proyek ini saya memanfaatkan asisten coding AI seperti Claude, Antigravity, dan OpenCode untuk mempercepat pengembangan, debugging, serta optimasi kueri SQL.</p>` },
			year: '2026',
			role: { en: 'Fullstack Developer', id: 'Pengembang Fullstack' },
			type: { en: 'Group · Freelance', id: 'Tim · Freelance' },
			category: 'work',
			stack: ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
			live: 'https://marinews.mahkamahagung.go.id',
			repo: '',
			image: '/images/projects/project8.webp'
		},
		{
			slug: 'truck-booking-mfe',
			index: '003',
			title: 'Truck Booking System - MFE',
			blurb: { en: 'Micro-frontend rebuild of port truck logistics booking system using Next.js, TypeScript, and TanStack. Live on Pelindo\'s application portal.', id: 'Pembangunan ulang sistem pemesanan truk pelabuhan dengan arsitektur micro-frontend menggunakan Next.js, TypeScript, dan TanStack. Berjalan di portal aplikasi Pelindo.' },
			description: { en: `<p>This project was built to rebuild the Truck Booking System (TBS) into a new Micro Frontend architecture. The original TBS required a lot of configuration just to integrate MFE, so we decided to create a new project from scratch dedicated solely to that integration.</p>
			<p>Throughout this project, I learned a great deal about TanStack, Micro Frontend, and TypeScript. It was a deliberate challenge to build with an entirely new stack and step out of my comfort zone. There were learning curves along the way, but the result was really worth.
	Currently the system is live on the Adhara web page, Pelindo's application portal.</p>
			`, id: `<p>Proyek ini dibuat untuk membangun ulang Truck Booking System (TBS) ke arsitektur Micro Frontend. TBS lama membutuhkan banyak konfigurasi untuk integrasi MFE, sehingga kami memutuskan membuat proyek baru dari awal yang didedikasikan untuk integrasi tersebut.</p><p>Dalam proyek ini saya mempelajari TanStack, Micro Frontend, dan TypeScript. Tantangan membangun dengan stack yang benar-benar baru membantu saya keluar dari zona nyaman. Hasilnya sepadan; sistem kini berjalan di halaman Adhara, portal aplikasi Pelindo.</p>` },
			year: '2025',
			role: { en: 'Fullstack Developer', id: 'Pengembang Fullstack' },
			type: { en: 'Group · PT. ILCS', id: 'Tim · PT. ILCS' },
			category: 'work',
			stack: ['Next.js', 'TypeScript', 'Express.js', 'Tailwind'],
			live: 'https://portal.mch.ilcs.xyz',
			repo: null,
			image: '/images/projects/project6.png'
		},
		{
			slug: 'wedding-web',
			index: '004',
			title: 'Wedding Invitation Web',
			blurb: { en: 'Custom wedding site with personalized invite names, RSVP, and mobile-first responsive design.', id: 'Situs pernikahan khusus dengan nama undangan yang dipersonalisasi, RSVP, dan desain responsif yang mengutamakan perangkat seluler.' },
			description: { en: `<p>This project was made as a tribute to my brother and also as a challenge to myself. My brother researched the template design, and I remade it with some improvements.</p>
	<p>The main features include showing wedding details, custom invitation names, and RSVP for wishes.</p>
	<p>Since most visitors use mobile devices, I had to learn Tailwind CSS for responsive layouts and Next.js for the framework. I chose Next.js for its performance and SEO benefits with static sites.</p>
	<p>I built this website alone and wanted to deliver the best I could, I learned a lot about responsive design, project structure, clean code, and SEO.</p>`, id: `<p>Proyek ini dibuat sebagai bentuk penghormatan untuk saudara saya sekaligus tantangan bagi diri sendiri. Saudara saya meneliti desain template, lalu saya membuatnya ulang dengan beberapa peningkatan.</p><p>Fitur utamanya mencakup detail pernikahan, nama undangan khusus, dan RSVP untuk ucapan.</p><p>Karena sebagian besar pengunjung menggunakan perangkat seluler, saya mempelajari Tailwind CSS untuk layout responsif dan Next.js sebagai framework. Next.js dipilih karena performa dan manfaat SEO-nya untuk situs statis.</p><p>Saya membangun situs ini sendirian dan belajar banyak tentang desain responsif, struktur proyek, clean code, dan SEO.</p>` },
			year: '2025',
			role: { en: 'Solo Developer', id: 'Pengembang Solo' },
			type: { en: 'Personal', id: 'Pribadi' },
			category: 'personal',
			stack: ['Next.js', 'Tailwind CSS'],
			live: 'https://ivan-anggi-wedding.vercel.app/',
			repo: 'https://github.com/Fadhil-Sabar/brother-wedding',
			image: '/images/projects/project2.jpg'
		},
		{
			slug: 'quran-mobile',
			index: '006',
			title: 'Simple Quran Mobile',
			blurb: { en: 'Flutter mobile app, clean Quran reader, no ads, adjustable font size. Built for learning Flutter.', id: 'Aplikasi mobile Quran dengan Flutter, pembaca Quran yang bersih tanpa iklan dan ukuran font yang dapat diatur. Dibuat untuk mempelajari Flutter.' },
			description: { en: `<p>This project was made for my learning purpose in Flutter. My company gave me a new challenge to step up as a mobile developer. Like I did back in 2022 with the Quran Reader web app, I took the same approach, learning by doing.</p>
	<p>The idea came from myself: I wanted an app that simply shows the Quran without any advanced features, but with accessibility features like adjustable font size. Lightweight, useful, and without ads.</p>
	<p>As a coder, I prefer learning by doing. Because of that, I quickly understood how the code works, syntax, and project structure. I gained a lot from this Flutter project, building apps, working with widgets, and many Flutter-specific tips. The app is not yet finished.</p>`, id: `<p>Proyek ini dibuat untuk belajar Flutter. Perusahaan saya memberi tantangan baru untuk berkembang sebagai mobile developer. Seperti pendekatan yang saya lakukan pada aplikasi Quran Reader web tahun 2022, saya belajar dengan langsung membangun.</p><p>Idenya berasal dari saya: aplikasi yang hanya menampilkan Quran tanpa fitur rumit, tetapi tetap memiliki aksesibilitas seperti ukuran font yang dapat diatur. Ringan, berguna, dan tanpa iklan.</p><p>Saya cepat memahami cara kerja kode, sintaks, dan struktur proyek melalui praktik. Saya belajar banyak tentang widget dan berbagai hal khusus Flutter. Aplikasi ini belum selesai.</p>` },
			year: '2025',
			role: { en: 'Solo Developer', id: 'Pengembang Solo' },
			type: { en: 'Personal · WIP', id: 'Pribadi · Dalam Pengerjaan' },
			category: 'personal',
			stack: ['Flutter', 'Dart'],
			live: null,
			repo: null,
			image: '/images/projects/project5.jpg'
		},
		{
			slug: 'praya',
			index: '001',
			title: 'Praya Single Billing',
			blurb: { en: 'SAP integration for billing operations across 13 ports in Indonesia. Handles 3B+ IDR in daily transactions.', id: 'Integrasi SAP untuk operasional billing di 13 pelabuhan Indonesia. Menangani transaksi harian senilai lebih dari Rp3 miliar.' },
			description: { en: `<p>I'm proudly present, my best project in my company application. In this task, I was given challenge to implement SAP Integration within my company app, a massive project. I had to map every detail of transaction in my company app to the integrator.</p>
	<p>I needed to integrate efficiently and fast due to high transaction load in every single port in Indonesia, without any unhandled errors that may cause transaction failure and obstruct user experience. The idea was: I created 2 new tables to handle this. First I read the detail of each transaction, find the correct mapping for each transaction with keys, and send the data by mapping to SAP's standard code.</p>
	<p>The struggle was real, we took at least 3 days to find the exact, fast and efficient way to integrate between my app and the integrator until I found the best approach. I learned a lot about writing efficient code, avoiding redundancy, making queries lightweight, and mapping to the right SAP code. I also found that communication within my team is really important, especially for brainstorming. Now it's been running for almost 1 year with more than 3 Billion Rupiah in daily transactions. There was also a challenge for me to automate new terminal implementation so I don't have to do manual mapping, I did it, in general it is worked and no need to manually mapping each new component.</p>`, id: `<p>Saya bangga dengan proyek ini karena merupakan proyek terbaik yang saya kerjakan di aplikasi perusahaan. Saya mendapat tantangan untuk menerapkan integrasi SAP dan memetakan setiap detail transaksi di aplikasi perusahaan ke integrator.</p><p>Integrasi harus efisien dan cepat karena beban transaksi tinggi di setiap pelabuhan Indonesia. Saya membuat dua tabel baru, membaca detail setiap transaksi, menemukan mapping yang tepat berdasarkan key, lalu mengirimkan data menggunakan kode standar SAP.</p><p>Setelah tiga hari mencari pendekatan yang cepat dan efisien, saya menemukan solusi terbaik. Saya belajar menulis kode efisien, menghindari redundansi, meringankan kueri, dan melakukan mapping ke kode SAP yang benar. Integrasi ini telah berjalan hampir satu tahun dengan transaksi harian lebih dari Rp3 miliar. Saya juga mengotomatisasi implementasi terminal baru agar tidak perlu melakukan mapping manual.</p>` },
			year: '2024',
			role: { en: 'Fullstack Developer', id: 'Pengembang Fullstack' },
			type: { en: 'Group · PT. ILCS', id: 'Tim · PT. ILCS' },
			category: 'work',
			stack: ['React', 'Express.js', 'Oracle DB', 'SAP'],
			live: 'https://praya.ilcs.co.id',
			repo: null,
			image: '/images/projects/project4.jpg'
		},
		{
			slug: 'bizhub',
			index: '002',
			title: 'Bizhub, Kemnaker',
			blurb: { en: "Employment expansion platform for Indonesia's Ministry of Manpower. Chat feature, admin panel, 10K+ daily users.", id: 'Platform perluasan kesempatan kerja untuk Kementerian Ketenagakerjaan RI. Memiliki fitur chat, panel admin, dan lebih dari 10 ribu pengguna harian.' },
			description: { en: `<p>This project is built for Kemnaker (Indonesia Ministry of Manpower). The platform facilitates every citizen in the context of the employment expansion program.</p>
	<p>I was responsible for the front-end development, especially for building the chat feature, integrating it with back-end services, maintaining mobile-friendly pages, bug fixing, and creating admin pages.</p>
	<p>I learned a lot from this project, especially TypeScript, Tailwind CSS, and Next.js. I also improved my communication skills working with teammates, and learned a great deal from my teams.</p>`, id: `<p>Proyek ini dibuat untuk Kemnaker, Kementerian Ketenagakerjaan Indonesia. Platform ini membantu masyarakat dalam program perluasan kesempatan kerja.</p><p>Saya bertanggung jawab atas pengembangan front-end, terutama membangun fitur chat, mengintegrasikannya dengan layanan back-end, menjaga halaman tetap ramah seluler, memperbaiki bug, dan membuat halaman admin.</p><p>Saya belajar banyak dari proyek ini, khususnya TypeScript, Tailwind CSS, dan Next.js. Saya juga meningkatkan kemampuan komunikasi melalui kerja tim.</p>` },
			year: '2024',
			role: { en: 'Frontend Developer', id: 'Pengembang Frontend' },
			type: { en: 'Group · Mahatech', id: 'Tim · Mahatech' },
			category: 'work',
			stack: ['Next.js', 'TypeScript', 'Tailwind'],
			live: 'https://bizhub.kemnaker.go.id/',
			repo: null,
			image: '/images/projects/project3.jpg'
		},
		{
			slug: 'parama',
			index: '007',
			title: 'Parama Customer Portal',
			blurb: { en: 'Maintained and enhanced an enterprise customer portal, bug fixing, minor feature development, and production issue resolution using React, Express.js, and Oracle PL/SQL.', id: 'Memelihara dan mengembangkan portal pelanggan enterprise, memperbaiki bug, membuat fitur minor, dan menangani masalah produksi dengan React, Express.js, dan Oracle PL/SQL.' },
			description: { en: `<p>As a Software Developer on the Parama Customer Portal, I was responsible for maintaining and enhancing a web-based customer portal serving enterprise clients. My work involved identifying and resolving software defects across multiple modules to ensure system stability, as well as developing minor feature enhancements based on business requirements and user feedback. I collaborated closely with the internal team to ensure all changes adhered to the existing architecture and coding standards.</p>
	<p>Beyond feature work, I conducted systematic debugging and root cause analysis to address production issues efficiently, minimizing downtime and improving overall application reliability. This role strengthened my ability to work within an established codebase, prioritize fixes based on impact, and deliver consistent value through both maintenance and incremental improvements.</p>`, id: `<p>Sebagai Software Developer di Parama Customer Portal, saya bertanggung jawab memelihara dan mengembangkan portal pelanggan berbasis web untuk klien enterprise. Pekerjaan saya mencakup menemukan dan memperbaiki cacat perangkat lunak di berbagai modul, serta mengembangkan peningkatan fitur kecil berdasarkan kebutuhan bisnis dan masukan pengguna. Saya bekerja erat dengan tim internal agar setiap perubahan mengikuti arsitektur dan standar coding yang ada.</p><p>Selain mengerjakan fitur, saya melakukan debugging sistematis dan analisis akar masalah untuk menangani isu produksi secara efisien, mengurangi downtime, dan meningkatkan keandalan aplikasi. Peran ini memperkuat kemampuan saya bekerja dalam codebase yang sudah ada, memprioritaskan perbaikan berdasarkan dampak, dan memberi nilai secara konsisten melalui pemeliharaan serta peningkatan bertahap.</p>` },
			year: '2024',
			role: { en: 'Fullstack Developer', id: 'Pengembang Fullstack' },
			type: { en: 'Group · PT. ILCS', id: 'Tim · PT. ILCS' },
			category: 'work',
			stack: ['React', 'Express.js', 'Oracle DB'],
			live: 'https://parama.pelindo.co.id',
			repo: null,
			image: '/images/projects/project7.png'
		},
		{
			slug: 'quran-reader',
			index: '005',
			title: 'Quran Reader Web',
			blurb: { en: 'Lightweight Quran reading app. Search by surah name or number, mobile last-read bookmark, auto-scroll.', id: 'Aplikasi baca Quran ringan. Cari berdasarkan nama atau nomor surah, bookmark bacaan terakhir di mobile, dan auto-scroll.' },
			description: { en: `<p>This project was made for my learning purpose. At my current company, I had to challenge myself to learn the company's tech stack. With only my bootcamp knowledge and school background, I couldn't understand the company's code. <b>So I decided to learn by building small projects.</b></p>
	<p>The features are simple: fetch from API and display on the web page. Users can search surah by verse name or number, and copy verses. I added extra features for mobile: last-read surah bookmark (from my dad's idea) and auto-scroll to the last read position.</p>
	<p>Through this project, I learned how the front-end tech at my company works, initializing a React project, consuming APIs, rendering pages, and project structure. It's definitely not clean code, I just threw code together with a \"if it works, don't touch it\" mentality, but it was a crucial learning step.</p>`, id: `<p>Proyek ini dibuat untuk belajar. Di perusahaan saat ini, saya menantang diri mempelajari stack teknologi yang digunakan perusahaan. Dengan bekal bootcamp dan sekolah, saya belum memahami codebase perusahaan, jadi saya belajar dengan membangun proyek-proyek kecil.</p><p>Fiturnya sederhana: mengambil data dari API dan menampilkannya di halaman web. Pengguna dapat mencari surah berdasarkan nama atau nomor ayat dan menyalin ayat. Saya menambahkan fitur untuk mobile berupa bookmark surah terakhir dibaca dan auto-scroll ke posisi terakhir.</p><p>Melalui proyek ini, saya belajar cara kerja teknologi front-end di perusahaan, menginisialisasi proyek React, menggunakan API, merender halaman, dan menyusun proyek. Kodenya belum rapi, tetapi menjadi langkah belajar yang penting.</p>` },
			year: '2022',
			role: { en: 'Solo Developer', id: 'Pengembang Solo' },
			type: { en: 'Personal', id: 'Pribadi' },
			category: 'personal',
			stack: ['React', 'JavaScript'],
			live: 'https://fadhil-quran.vercel.app/quran',
			repo: 'https://gitlab.com/Fadhil-A/learn-react',
			image: '/images/projects/project1.jpg'
		},
	];

	export const projectCategories = ['work', 'personal'] as const;