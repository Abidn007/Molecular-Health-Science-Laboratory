export interface Publication {
  id: string;
  title: string;
  authors: string;
  conference: string;
  date: string;
  doi?: string;
  abstract: string;
  isOpen?: boolean;
  pdfUrl?: string;
  githubUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  session?: string;
  nowPosition?: string;
  photoInitials: string;
  email?: string;
  department: string;
  institution: string;
  photoUrl?: string;
  researchGate?: string;
}

export interface ResearchTheme {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  status: 'ongoing' | 'completed' | 'forthcoming';
  imageUrl?: string;
}

export interface LaboratoryService {
  id: string;
  name: string;
  priceBDT: number;
  category: string;
  duration: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'Research' | 'Announcement' | 'Event' | 'Publication';
  content: string;
  summary: string;
}

export interface InternalProjectFile {
  id: string;
  title: string;
  description: string;
  uploadedBy: string;
  uploadedAt: string;
  category: string;
  fileSize?: string;
  downloadUrl?: string;
}

export interface LabTask {
  id: string;
  title: string;
  assignedTo: string;
  status: 'todo' | 'in-progress' | 'completed';
  dueDate: string;
}
