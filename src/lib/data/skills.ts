export interface SkillCategory {
	labelKey: string;
	items: string[];
}

export const skills: SkillCategory[] = [
	{
		labelKey: 'skills.cat1',
		items: ['JavaScript', 'TypeScript', 'Java', 'Dart (Flutter)', 'SQL / PL-SQL']
	},
	{
		labelKey: 'skills.cat2',
		items: ['Next.js / React', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'Responsive Design']
	},
	{
		labelKey: 'skills.cat3',
		items: ['Node.js / Express', 'NestJS', 'Spring Boot', 'CodeIgniter', 'RESTful API']
	},
	{
		labelKey: 'skills.cat4',
		items: ['PostgreSQL', 'Oracle DB', 'GitHub / GitLab', 'Linux (Ubuntu/Arch)', 'Asana / Trello']
	}
];
