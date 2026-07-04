import { ResearchTheme, Publication, TeamMember, LaboratoryService, NewsItem } from './types';

export const RESEARCH_THEMES: ResearchTheme[] = [
  {
    id: 'theme-1',
    number: 'Theme #1',
    title: 'Clinical & Infectious Disease Microbiology',
    shortDesc: 'Clinical microbiology, host–pathogen interaction, and disease mechanism–based research.',
    longDesc: 'Focusing on human infectious diseases, this theme includes the investigation of pathogenic microbes, diagnostic approaches, and a molecular understanding of infection pathways for improved clinical outcomes and therapeutic strategies.',
    iconName: 'Activity',
    status: 'ongoing',
    imageUrl: '/src/assets/images/theme_clinical_1783104675878.jpg'
  },
  {
    id: 'theme-2',
    number: 'Theme #2',
    title: 'Agricultural & Plant Health Microbiology',
    shortDesc: 'Plant–microbe interactions, soil microbiology, and agricultural pathogen research.',
    longDesc: 'Aimed at improving crop health and productivity. This area focuses on beneficial microbes, plant disease control, and sustainable agricultural biotechnology solutions for ecological balance.',
    iconName: 'Leaf',
    status: 'ongoing',
    imageUrl: '/src/assets/images/theme_agricultural_1783104687353.jpg'
  },
  {
    id: 'theme-3',
    number: 'Theme #3',
    title: 'Antimicrobial Resistance & One Health',
    shortDesc: 'Investigation of antimicrobial resistance (AMR) in clinical, environmental, and agricultural settings.',
    longDesc: 'Conducted under the integrated One Health framework. This includes resistance gene profiling, active surveillance of resistant pathogens, and integrated strategies linking human, animal, and environmental health.',
    iconName: 'ShieldAlert',
    status: 'ongoing',
    imageUrl: '/src/assets/images/theme_resistance_1783104703215.jpg'
  },
  {
    id: 'theme-4',
    number: 'Theme #4',
    title: 'Natural Therapeutics & Antimicrobial Discovery',
    shortDesc: 'Discovery and characterization of bioactive compounds from natural sources.',
    longDesc: 'Sourcing compounds from plants, microbes, and biological systems. Research includes antimicrobial, anticancer, and pharmacological screening along with molecular mechanism studies for sustainable drug development.',
    iconName: 'Sparkles',
    status: 'ongoing',
    imageUrl: '/src/assets/images/theme_therapeutics_1783104721709.jpg'
  },
  {
    id: 'theme-5',
    number: 'Theme #5',
    title: 'Applied Molecular Microbiology',
    shortDesc: 'Application of molecular biology tools in microbiology for identification and functional analysis.',
    longDesc: 'Using advanced techniques for the characterization and functional analysis of microorganisms. This includes genomics, gene expression studies, enzyme production, and molecular diagnostics for applied and translational research.',
    iconName: 'Dna',
    status: 'ongoing',
    imageUrl: '/src/assets/images/theme_molecular_1783104738281.jpg'
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-4',
    title: 'Isolation and Characterization of Rhizospheric and Endophytic Bacteria from Maize Plants for Potential Usage in Sustainable Agriculture',
    authors: 'MHSL Project Team',
    conference: '2nd International Conference on Recent Advances in Science and Technology, University of Rajshahi',
    date: 'November 2025',
    doi: '10.13140/RG.2.2.35952.52483',
    abstract: 'Feeding a rapidly growing population sustainably requires boosting agricultural productivity through nutrient-mobilizing bacteria that reduce chemical fertilizer dependence. Maize (Zea mays) is a highly versatile crop grown globally, which demands high nitrogen and phosphate. This study isolated and characterized thirteen rhizospheric and endophytic bacteria from maize plants grown in Bangladesh. Four select isolates showed outstanding in vitro plant growth-promoting screening assays. In vivo trials highlighted significant improvements in germination indices, vigor index, root/shoot weight, carotenoid content, and Deficit / ROS scavenging activity, showing major potential for eco-friendly sustainable agriculture.',
    githubUrl: 'https://github.com/Abidn007/Molecular-Health-Science-Laboratory/blob/main/src/assets/images/Isolation%20and%20Characterization%20of%20Rhizospheric%20and%20Endophytic%20Bacteria%20from%20Maize%20Plants%20for%20Potential%20Usage%20in%20Sustainable%20Agriculture.pdf',
    pdfUrl: 'https://raw.githubusercontent.com/Abidn007/Molecular-Health-Science-Laboratory/main/src/assets/images/Isolation%20and%20Characterization%20of%20Rhizospheric%20and%20Endophytic%20Bacteria%20from%20Maize%20Plants%20for%20Potential%20Usage%20in%20Sustainable%20Agriculture.pdf'
  },
  {
    id: 'pub-3',
    title: 'Isolation and Characterization of Rhizospheric Bacteria from Heavy Metal Contaminated Soil of Savar, Dhaka and Evaluation of Their Potential Plant Growth Promoting Attributes',
    authors: 'MHSL Project Team',
    conference: 'International Biotechnology Conference 2025 at BRAC University, Dhaka, Bangladesh',
    date: 'June 2025',
    abstract: 'Soil pollution caused by heavy metals is a major problem in industrial zones of Bangladesh like Savar and Dhaka. The main goal of this study is to isolate and characterize heavy metal-resistant PGPRs from the rhizosphere of vegetable plants in Savar irrigated by tannery wastewater. Nine bacteria were isolated and screened for plant growth-promoting (PGP) traits including nitrogen fixation, phosphate and zinc solubilization, ammonia production, IAA synthesis, and siderophore production. Isolates Iso-6 and Iso-8 showed excellent heavy metal removal efficiency against Cd, Mn, and Pb under salinity stress. Controlled pot experiments on rice demonstrated that inoculation with these bacterial strains meaningfully increased plant height, germination, vigor, and chlorophyll content compared to uninoculated controls.',
    githubUrl: 'https://github.com/Abidn007/Molecular-Health-Science-Laboratory/blob/main/src/assets/images/IsolationandCharacterizationofRhizosphericBacteriafromHeavyMetalContaminatedSoilofSavarDhakaandEvaluationofTheirPotentialPlantGrowthPromotingAttributes.pdf',
    pdfUrl: 'https://raw.githubusercontent.com/Abidn007/Molecular-Health-Science-Laboratory/main/src/assets/images/IsolationandCharacterizationofRhizosphericBacteriafromHeavyMetalContaminatedSoilofSavarDhakaandEvaluationofTheirPotentialPlantGrowthPromotingAttributes.pdf'
  },
  {
    id: 'pub-2',
    title: 'Isolation and Characterization of Ocular Pathogenic Bacteria Associated with Eyeglasses',
    authors: 'MHSL Project Team',
    conference: 'International Conference and Bioscience Carnival at RMSTU, Rangamati, Bangladesh',
    date: 'May 2025',
    abstract: 'The human eye is a major sensory organ susceptible to many infectious agents, such as bacteria including Staphylococcus epidermidis, Staphylococcus aureus, Pseudomonas aeruginosa, and many more. These bacteria contaminate eyeglasses and can be transmitted into the eyes, resulting in conjunctivitis, keratitis, corneal ulcers, endophthalmitis, and dacryocystitis. The goals of this study were to study the eyeglass cleaning behaviors of users and the prevalence of ocular pathogens on eyeglasses. In total, eleven bacterial isolates were selected using Mannitol Salt Agar and Eosin Methyl Blue Agar media and characterized using morphological and biochemical tests. Survey findings revealed that a significant number of individuals were unfamiliar about the presence of germs on glasses. Investigation of cleaning efficacy showed alcohol-based wipes have the best prevention against pathogens. In antibiogram studies, the majority of isolates were susceptible to vancomycin and kanamycin, but resistant to azithromycin.',
    githubUrl: 'https://github.com/Abidn007/Molecular-Health-Science-Laboratory/blob/main/src/assets/images/IsolationandCharacterzationofOcularPathogenicBacteriaAssociatedwitheyeglasses.pdf',
    pdfUrl: 'https://raw.githubusercontent.com/Abidn007/Molecular-Health-Science-Laboratory/main/src/assets/images/IsolationandCharacterzationofOcularPathogenicBacteriaAssociatedwitheyeglasses.pdf'
  },
  {
    id: 'pub-1',
    title: 'Investigation on pathogenic microorganisms in poultry chicken meat from local markets of Rajshahi, Bangladesh',
    authors: 'MHSL Project Team',
    conference: 'International Conference on “The Role of Science and Technology Towards 4IR” organized by the Faculty of Science, University of Rajshahi',
    date: 'October 2023',
    doi: '10.13140/RG.2.2.17095.41126',
    abstract: 'This study investigates raw poultry chicken meat (broiler, sonali, and layer) from Rajshahi markets, revealing the presence of potentially pathogenic and multidrug-resistant bacteria including Klebsiella, Salmonella, Shigella, Staphylococcus, and Escherichia coli. Using a combination of morphological, biochemical, and antibiotic sensitivity tests, the study demonstrates serious public health concerns related to foodborne illnesses and antimicrobial resistance. Despite widespread resistance, a few antibiotics—namely Imipenem, Ciprofloxacin, and Rifampicin—were found effective. These findings underscore the urgent need for safer food handling practices, public awareness, and responsible antibiotic use in Bangladesh’s poultry industry.',
    githubUrl: 'https://github.com/Abidn007/Molecular-Health-Science-Laboratory/blob/main/src/assets/images/Investigation%20on%20pathogenic%20microorganisms%20in%20poultry%20chicken%20meat%20from%20local%20markets%20of%20Rajshahi%2C%20Bangladesh.pdf',
    pdfUrl: 'https://raw.githubusercontent.com/Abidn007/Molecular-Health-Science-Laboratory/main/src/assets/images/Investigation%20on%20pathogenic%20microorganisms%20in%20poultry%20chicken%20meat%20from%20local%20markets%20of%20Rajshahi%2C%20Bangladesh.pdf'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'pi',
    name: 'Dr. Khondokar Nasirujjaman',
    role: 'Principal Investigator / Professor',
    department: 'Genetic Engineering and Biotechnology',
    institution: 'University of Rajshahi',
    photoInitials: 'KN',
    researchGate: 'https://www.researchgate.net/profile/Khondokar-Nasirujjaman'
  },
  // Current Students
  {
    id: 'cur-1',
    name: 'Fatematuz Johra',
    role: 'MS (Thesis) and Project Student',
    session: '2019-20',
    department: 'Genetic Engineering and Biotechnology',
    institution: 'University of Rajshahi',
    photoInitials: 'FJ',
    researchGate: 'https://www.researchgate.net/profile/Fatematuz-Johra-2'
  },
  {
    id: 'cur-2',
    name: 'Md. Abid Hassan',
    role: 'MS (Thesis) and Project Student',
    session: '2020-21',
    department: 'Genetic Engineering and Biotechnology',
    institution: 'University of Rajshahi',
    photoInitials: 'AH',
    researchGate: 'https://www.researchgate.net/profile/Md-Abid-Hassan?ev=hdr_xprf'
  },
  {
    id: 'cur-3',
    name: 'Muntasir Rahman Siam',
    role: 'Project Student (B.Sc. Hons)',
    session: '2020-21',
    department: 'Genetic Engineering and Biotechnology',
    institution: 'University of Rajshahi',
    photoInitials: 'MS'
  },
  {
    id: 'cur-4',
    name: 'Baby Biswas',
    role: 'Project Student (B.Sc. Hons)',
    session: '2021-22',
    department: 'Genetic Engineering and Biotechnology',
    institution: 'University of Rajshahi',
    photoInitials: 'BB'
  },
  // Alumni
  {
    id: 'alu-1',
    name: 'Fariha Tasnim Megha',
    role: 'Alumni (MS Thesis & Project Student)',
    session: '2016-17',
    nowPosition: 'PhD Student at The University of Queensland, Brisbane, Australia',
    department: 'Genetic Engineering and Biotechnology',
    institution: 'University of Rajshahi',
    photoInitials: 'FM',
    researchGate: 'https://www.researchgate.net/profile/Faria-Megha'
  },
  {
    id: 'alu-2',
    name: 'Md Robiul Hasan',
    role: 'Alumni (MS Thesis & Project Student)',
    session: '2017-18',
    nowPosition: 'PhD Student at Iowa State University, Ames, United States',
    department: 'Genetic Engineering and Biotechnology',
    institution: 'University of Rajshahi',
    photoInitials: 'RH',
    researchGate: 'https://www.researchgate.net/profile/Md-Robiul-Hasan-4'
  },
  {
    id: 'alu-3',
    name: 'Mim Islam',
    role: 'Alumni (MS Thesis & Project Student)',
    session: '2017-18',
    department: 'Genetic Engineering and Biotechnology',
    institution: 'University of Rajshahi',
    photoInitials: 'MI',
    researchGate: 'https://www.researchgate.net/profile/Mim-Islam-3'
  },
  {
    id: 'alu-4',
    name: 'Mrittika Rani Mondol',
    role: 'Alumni (MS Thesis & Project Student)',
    session: '2018-19',
    department: 'Genetic Engineering and Biotechnology',
    institution: 'University of Rajshahi',
    photoInitials: 'MM',
    researchGate: 'https://www.researchgate.net/profile/Mrittika-Rani-Mondol'
  },
  {
    id: 'alu-5',
    name: 'Md. Sadaab Hassan',
    role: 'Alumni (Project Student)',
    session: '2018-19',
    department: 'Genetic Engineering and Biotechnology',
    institution: 'University of Rajshahi',
    photoInitials: 'SH',
    researchGate: 'https://www.researchgate.net/profile/Md-Sadaab-Hassan'
  },
  {
    id: 'alu-6',
    name: 'Nowshin Anjum Diba',
    role: 'Alumni (Project Student)',
    session: '2019-20',
    department: 'Genetic Engineering and Biotechnology',
    institution: 'University of Rajshahi',
    photoInitials: 'ND',
    researchGate: 'https://www.researchgate.net/profile/Nowshin-Anjum-Diba'
  }
];

export const LABORATORY_SERVICES: LaboratoryService[] = [
  { id: 'srv-1', name: 'Bacterial Isolation', priceBDT: 2500, category: 'Microbiology', duration: '1 week' },
  { id: 'srv-2', name: 'Biochemical Identification', priceBDT: 1800, category: 'Microbiology', duration: '2-3 Days' },
  { id: 'srv-3', name: 'Antibiotic Sensitivity Test (AST)', priceBDT: 1500, category: 'Microbiology', duration: '2 Days' },
  { id: 'srv-4', name: 'Centrifugation Service', priceBDT: 500, category: 'Equipment Use', duration: 'Same Day' },
  { id: 'srv-6', name: 'Bacterial Enumeration (CFU Count)', priceBDT: 1200, category: 'Microbiology', duration: '2 Days' }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Research Poster on Ocular Pathogenic Bacteria Presented at Rangamati Bioscience Carnival',
    date: '2025-05-18',
    category: 'Event',
    content: 'The Molecular Health Science Laboratory team successfully presented their research findings on eyeglasses-borne ocular pathogens at the International Conference and Bioscience Carnival held at RMSTU, Rangamati. The study highlights clean-glass habits and the effectiveness of alcohol-based sanitation wipes.',
    summary: 'MHSL presented eyeglasses-associated pathogenic bacteria research at the Bioscience Carnival in Rangamati.'
  },
  {
    id: 'news-2',
    title: 'Outstanding Performance of Heavy Metal PGPR Inoculation on Crop Trials',
    date: '2025-06-22',
    category: 'Research',
    content: 'Our latest pot experiment trials using rhizospheric isolates Iso-6 and Iso-8 on industrial-zone crop soil showed substantial improvements. Crops showed up to 84% heavy metal extraction efficiency and better biomass yields, opening doors to phytoremediation in Savar regions.',
    summary: 'Controlled trials of heavy-metal resistant PGPR strains show notable success for sustainable bioremediation.'
  },
  {
    id: 'news-3',
    title: 'Welcome Session: 2021-22 Project Students Join MHSL Bench',
    date: '2026-03-10',
    category: 'Announcement',
    content: 'We are thrilled to welcome the incoming session of B.Sc. project students to the Molecular Health Science Laboratory! They will be actively trained in molecular microbiology techniques, antimicrobial profiling, and sustainable biofertilizer design.',
    summary: 'New undergraduate project students join the laboratory for their graduation thesis work.'
  },
  {
    id: 'news-4',
    title: 'MHSL Alumni Faria Tasnim Megha Secures Prestigious PhD Candidacy at UQ Australia',
    date: '2025-08-01',
    category: 'Event',
    content: 'We celebrate our brilliant alumni Faria Tasnim Megha (Session 2016-17) who recently joined The University of Queensland, Brisbane, Australia as a PhD researcher. Her work at MHSL paved the way for advanced academic exploration in health biotech.',
    summary: 'MHSL alum Faria Tasnim Megha joins the University of Queensland for PhD studies.'
  }
];
