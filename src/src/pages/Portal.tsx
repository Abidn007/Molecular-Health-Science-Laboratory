import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { saveInternalFile, fetchInternalFiles } from '../firebase';
import { InternalProjectFile, LabTask } from '../types';
import { 
  Database, Plus, Search, FileText, CheckCircle, Trash, RefreshCw, 
  AlertCircle, ShieldCheck, ClipboardList, Check, Sparkles, ExternalLink,
  KeyRound, Mail, GraduationCap, Microscope, Beaker, Calendar, BookOpen, 
  Clock, Activity, Settings, UserCheck, Eye, EyeOff, CheckSquare, LogOut,
  Facebook, Linkedin
} from 'lucide-react';

// @ts-ignore
import babyImage from '../assets/images/cur_4_baby_1783082561357.jpg';

// Authorized Student list with explicit Student ID, Password, and profiles
const AUTHORIZED_STUDENTS = [
  {
    name: 'Mrittika Rani Mondol',
    studentId: '1912461128',
    password: '1210677364',
    photoInitials: 'MM',
    avatarUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTmWkb2IMQTAuocEx61S_B0KAchqcxlmOJ7URBM031dDeoOWIaupG0hlOkJfx0lLCHP9l7_3KIEW09KefcKFA9We6eS_bICPkS6_J_pzEUzYZmhjsZbpxMc3fwJHPDwP0LqU6FMuqfx_6fwCdouKEBjpt4VlBbSx9Z_YWNGmaLgkOBWayyBfVPykdLz-U/s320/Mrittika%20Rani%20Mondol.jpeg',
    role: 'Alumni (MS Thesis & Project Student)',
    session: '2018-19'
  },
  {
    name: 'Muntasir Rahman Siam',
    studentId: '2111061115',
    password: '1515397574',
    photoInitials: 'MS',
    avatarUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjE7ZU3xqx7zAhiolIo2GNooGUciARpsLnOaRJJl5bD-IKp3jX9wnCBsQRosU39RW3UhwYnMvJYNdSqiXJVIG0GQ6s15NSl583u8_AH9rMduvthh-TnO0heegQKEidP8KC7NhgybOyozPjsgoGgCHniibhtqMCOQX-818Vxt8SnYH2nyQWf0caHLt9a0yE/s320/Muntasir%20Rahman%20Siam.jpg',
    role: 'Project Student (B.Sc. Hons)',
    session: '2020-21'
  },
  {
    name: 'Fatematuz johra Mila',
    studentId: '2012061110',
    password: '1412704600',
    photoInitials: 'FJ',
    avatarUrl: 'https://i1.rgstatic.net/ii/profile.image/11431281449732688-1747820313513_Q128/Fatematuz-Johra-2.jpg',
    role: 'MS (Thesis) and Project Student',
    session: '2019-20'
  },
  {
    name: 'Baby Biswas',
    studentId: '2212061103',
    password: '1613805132',
    photoInitials: 'BB',
    avatarUrl: babyImage,
    role: 'Project Student (B.Sc. Hons)',
    session: '2021-22'
  },
  {
    name: 'Md. Abid Hassan',
    studentId: '2111061105',
    password: '1513555341',
    photoInitials: 'AH',
    avatarUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjk1vP8IGgPeo2fObJbQw2RBNmxMwqgvp-YqhcehGJCd1gAwH3Bu9lOgkgKQj8yv0U5yR91x58xYUB_bnheVZHuWYak1OAWFpGg3ozwSGXo1DaL0ZYUGDrjOXzWLCr007D4o-9zfWgDCqsl1YxdPYatSKzISTNhzQZC3fk1hNY-P9nERWcO_1_fZm9vR9s/s320/Md.%20Abid%20Hassan.jpeg',
    role: 'MS (Thesis) and Project Student',
    session: '2020-21'
  }
];

// Principal Investigator Authorized Access
const PI_EMAIL_ID = 'khondokar@gmail.com';
const PI_MOCK_USER = {
  uid: 'pi-khondokar',
  displayName: 'Dr. Khondokar Nasirujjaman',
  email: 'khondokar@gmail.com',
  photoInitials: 'KN',
  avatarUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwDBbfX6Zx60IcKeFa9VUurC8SeKEpxeG4ZFtz0sBlFJ-zKN-khh7guCGNqWhyP_9QxM9Cftrp_6ET-yVU8bxNLdGTTCYxwUAVmd3eObwC0caaPwtIf39pHRX3pgWpvw1TYwF6QWlAE2NHxMzyNNfNwRnC2D4u857Ez5_0QcGEpqyXrY8sNLY6yxbiGbI/s320/DR.%20KHONDOKAR%20NASIRUJJAMAN.png',
  role: 'Principal Investigator / Professor',
  session: 'Director'
};

// Default preloaded Lab Protocols
const DEFAULT_PROTOCOLS = [
  {
    id: 'p-1',
    title: 'Genomic DNA Extraction (Gram-Negative Bacteria)',
    purpose: 'To isolate high-quality genomic DNA from rhizospheric pseudomonas samples.',
    steps: [
      'Centrifuge 1.5 mL of overnight culture at 10,000 rpm for 3 minutes to harvest the bacterial pellet.',
      'Resuspend the pellet in 480 µL of 50mM EDTA / Tris buffer to lyse outer membranes.',
      'Add 120 µL of Lysozyme enzyme and incubate at 37°C for 30 minutes to digest the peptidoglycan layer.',
      'Add 600 µL of Nuclei Lysis Solution and mix gently. Incubate at 80°C for 5 minutes.',
      'Add 3 µL of RNase solution and incubate at 37°C for 15-30 minutes.',
      'Add 200 µL of Protein Precipitation Solution and vortex vigorously for 20 seconds. Centrifuge at 13,000 rpm for 5 minutes.',
      'Transfer the supernatant containing DNA to a clean tube. Add 600 µL of Isopropanol to precipitate DNA.',
      'Centrifuge at 13,000 rpm, wash with 70% ethanol, air-dry the pellet, and rehydrate in 100 µL of Rehydration Buffer.'
    ],
    precautions: 'Handle all lysis buffers with protective gloves. Keep enzymes on sterile ice blocks.',
    duration: '1.5 Hours',
    difficulty: 'Intermediate'
  },
  {
    id: 'p-2',
    title: 'Polymerase Chain Reaction (PCR) - 16S rRNA Amplification',
    purpose: 'To amplify the ribosomal gene cluster for subsequent phylogenetic identification.',
    steps: [
      'Prepare master mix: 12.5 µL Taq 2X Master Mix, 1.0 µL of Forward Primer (27F), 1.0 µL of Reverse Primer (1492R).',
      'Add 8.5 µL of Nuclease-Free Water to make the total reaction volume 23 µL.',
      'Dispense the prepared PCR mix into standard sterile thin-wall PCR tubes.',
      'Add 2.0 µL of template DNA (50 ng/µL concentration) into each reaction tube.',
      'Program the thermal cycler: Initial Denaturation at 95°C for 5 min; then 30 cycles of: Denaturation (95°C for 30s), Annealing (55°C for 30s), Extension (72°C for 1.5 min); Final Extension at 72°C for 7 min; Hold at 4°C.'
    ],
    precautions: 'Prevent carry-over contamination by preparing mixes in a dedicated PCR hood with UV sterilization.',
    duration: '2.5 Hours',
    difficulty: 'Advanced'
  },
  {
    id: 'p-3',
    title: 'Agarose Gel Electrophoresis (1.0% w/v gel)',
    purpose: 'To analyze molecular weight sizes of PCR products or plasmid vectors.',
    steps: [
      'Weigh 1.0 g of high-purity Agarose powder and dissolve it in 100 mL of 1X TAE buffer inside an Erlenmeyer flask.',
      'Heat the mixture in a microwave for 1.5 - 2 minutes until the liquid becomes completely crystal clear.',
      'Allow the flask to cool down to 50-60°C (touch-safe to hand).',
      'Add 3-5 µL of Ethidium Bromide or safe gel stain and swirl gently to distribute.',
      'Set the casting tray with appropriate combs. Pour the agarose gel and allow it to solidify for 30 minutes.',
      'Remove combs, place gel in the electrophoresis tank, and submerge under 1X TAE buffer.',
      'Mix 5 µL of PCR sample with 1 µL of 6X loading dye, load into wells along with a 1kb DNA ladder.',
      'Run the gel at 85V - 100V for 45-60 minutes.'
    ],
    precautions: 'Ethidium bromide is a known mutagen. Wear protective gloves and dispose of waste strictly in biohazard containers.',
    duration: '1.0 Hours',
    difficulty: 'Easy'
  },
  {
    id: 'p-4',
    title: 'Kirby-Bauer Antibiotic Sensitivity Test (AST)',
    purpose: 'Standard disk-diffusion test for screening antibiotic resistance profiles of clinical isolates.',
    steps: [
      'Prepare Mueller-Hinton Agar (MHA) plates and ensure they are dry before inoculation.',
      'Adjust the turbidity of a fresh overnight liquid bacterial culture to match the 0.5 McFarland standard (approx 1.5x10^8 CFU/mL).',
      'Dip a sterile cotton swab into the bacterial suspension and streak uniformly across the MHA plate in three directions.',
      'Allow the plate to dry for 3-5 minutes.',
      'Using sterile forceps, place antibiotic disks (e.g. Imipenem, Ciprofloxacin, Amoxicillin) at equal distances.',
      'Incubate the plates in an inverted position at 37°C for 16-18 hours.',
      'Measure the zone of inhibition in millimeters using a calliper and consult clinical breakpoint guidelines.'
    ],
    precautions: 'Ensure culture is fresh and standardized. Over-incubation can lead to false resistant readings.',
    duration: '24 Hours',
    difficulty: 'Intermediate'
  }
];

// Default preloaded Lab Equipments status
const DEFAULT_EQUIPMENTS = [
  { id: 'eq-1', name: 'Eppendorf Refrigerated Centrifuge 5424 R', status: 'Available', room: 'Room 304', details: 'Max Speed 15,000 RPM, optimized for DNA/RNA prep.' },
  { id: 'eq-2', name: 'Esco Class II Type A2 Biosafety Cabinet', status: 'In Use', room: 'Room 304', details: 'UV-equipped hood, certified HEPA filter, active air inflow.' },
  { id: 'eq-3', name: 'Bio-Rad T100 Thermal Cycler (PCR)', status: 'Available', room: 'Room 305', details: '96-well gradient block, touch screen controls.' },
  { id: 'eq-4', name: 'Vertical Steam Sterilizing Autoclave', status: 'In Use', room: 'Room 303', details: 'Operates at 121°C, 15 psi. High-capacity media sterilizer.' },
  { id: 'eq-5', name: 'Major Science Gel Documentation & UV Transilluminator', status: 'Available', room: 'Room 305', details: 'High resolution digital CCD camera with darkroom enclosure.' },
  { id: 'eq-6', name: 'Panasonic Cryopreservation -80°C Ultra-Low Freezer', status: 'Available', room: 'Room 303', details: 'Secure glycerol stock bank, active temperature logging.' }
];

// Default preloaded Ongoing Work Batches
const DEFAULT_BATCHES = [
  { id: 'b-1', title: 'Isolation & Identification of PGPR Strains from Sugarmill Soils', lead: 'Fatematuz johra Mila', progress: 75, phase: 'Biochemical Profiling', updated: '2026-07-01' },
  { id: 'b-2', title: 'AMR Surveillance of Multidrug-Resistant E. coli in Poultry Markets', lead: 'Md. Abid Hassan', progress: 45, phase: 'Antibiogram Screening', updated: '2026-07-02' },
  { id: 'b-3', title: 'Bioactive Phyto-chemical Inhibition of Pseudomonas Biofilms', lead: 'Muntasir Rahman Siam', progress: 90, phase: 'Microscopic Documentation', updated: '2026-06-30' },
  { id: 'b-4', title: 'Diagnostic Gene Profiling of Ocular Pathogens in Local Eyeglasses', lead: 'Baby Biswas', progress: 20, phase: 'Genomic Extraction', updated: '2026-07-03' }
];

// Default preloaded Chemicals & Reagents Stock Tracker
const DEFAULT_REAGENTS = [
  { id: 'rg-1', name: 'Agarose Powder (Biotech Grade, 500g)', stock: 15, unit: 'g', room: 'Cabinet B', level: 'low' },
  { id: 'rg-2', name: 'Taq Polymerase Master Mix (2X, 5 mL)', stock: 85, unit: 'mL', room: 'Freezer -20°C', level: 'normal' },
  { id: 'rg-3', name: 'Absolute Ethanol (99.9%, 2.5L)', stock: 8, unit: '%', room: 'Flammable Storage', level: 'critical' },
  { id: 'rg-4', name: 'Peptone for Bacteriological Broths (500g)', stock: 70, unit: 'g', room: 'Cabinet A', level: 'normal' },
  { id: 'rg-5', name: 'Ethidium Bromide Gel Dye (10mg/mL, 10mL)', stock: 40, unit: 'mL', room: 'Toxic Cabinet', level: 'normal' },
  { id: 'rg-6', name: 'Yeast Extract Powder (500g)', stock: 65, unit: 'g', room: 'Cabinet A', level: 'normal' }
];

// Default preloaded Bacterial Isolates Registry
const DEFAULT_ISOLATES = [
  { id: 'is-1', code: 'RU-BS1', species: 'Bacillus subtilis', category: 'Bioremediator / PGPR', features: 'High heavy metal absorption, spore-forming, isolated from Savar rhizosphere soil.', storage: '-80°C Glycerol Bank #A3' },
  { id: 'is-2', code: 'RU-PA3', species: 'Pseudomonas aeruginosa', category: 'Biofilm Producer', features: 'Thick extracellular matrix, mucoid strain isolated from local industrial effluents.', storage: '-80°C Glycerol Bank #A4' },
  { id: 'is-3', code: 'RU-SA1', species: 'Staphylococcus aureus', category: 'MRSA surveillance isolate', features: 'Methicillin-resistant, positive for mecA gene markers, highly virulent.', storage: '-80°C Glycerol Bank #B1' },
  { id: 'is-4', code: 'RU-EC5', species: 'Escherichia coli (AMR)', category: 'MDR Indicator', features: 'Resistant to 3rd generation cephalosporins, isolates from poultry chicken samples.', storage: '4°C Slant Bank #C2' }
];

interface PortalProps {
  user: User | null;
  onLogin: () => void;
  isLoggingIn: boolean;
  onDemoLogin?: () => void;
  loginError?: string | null;
  setLoginError?: (err: string | null) => void;
  onCustomLogin?: (user: any) => void;
  onLogout?: () => void;
}

export default function Portal({ user, onLogin, isLoggingIn, onDemoLogin, loginError, setLoginError, onCustomLogin, onLogout }: PortalProps) {
  // Navigation internal state
  const [activePortalTab, setActivePortalTab] = useState<'protocols' | 'equipments' | 'progress' | 'reagents' | 'isolates' | 'logs'>('protocols');

  // Selected login role (student vs pi) above the single login card
  const [loginRole, setLoginRole] = useState<'student' | 'pi'>('student');

  // Input states for Student Login
  const [studentIdInput, setStudentIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Input states for PI Login
  const [piEmailInput, setPiEmailInput] = useState('');
  const [piPasswordInput, setPiPasswordInput] = useState('');
  const [showPiPassword, setShowPiPassword] = useState(false);

  // PI Registration / Sign Up States
  const [registeredPi, setRegisteredPi] = useState<{
    email: string;
    name: string;
    password?: string;
    designation: string;
  } | null>(() => {
    const saved = localStorage.getItem('mhsl_registered_pi');
    return saved ? JSON.parse(saved) : null;
  });

  const [piMode, setPiMode] = useState<'login' | 'signup' | 'forgot'>(() => {
    const saved = localStorage.getItem('mhsl_registered_pi');
    return saved ? 'login' : 'signup';
  });

  const [piRegName, setPiRegName] = useState('');
  const [piRegEmail, setPiRegEmail] = useState('');
  const [piRegPassword, setPiRegPassword] = useState('');
  const [piRegConfirmPassword, setPiRegConfirmPassword] = useState('');
  const [piRegDesignation, setPiRegDesignation] = useState('');

  // Authentication error inside the login forms
  const [authError, setAuthError] = useState<string | null>(null);

  // Interactive dynamic states saved to localStorage
  const [protocols, setProtocols] = useState<any[]>(() => {
    const saved = localStorage.getItem('mhsl_protocols');
    return saved ? JSON.parse(saved) : DEFAULT_PROTOCOLS;
  });

  const [equipments, setEquipments] = useState<any[]>(() => {
    const saved = localStorage.getItem('mhsl_equipments');
    return saved ? JSON.parse(saved) : DEFAULT_EQUIPMENTS;
  });

  const [batches, setBatches] = useState<any[]>(() => {
    const saved = localStorage.getItem('mhsl_batches');
    return saved ? JSON.parse(saved) : DEFAULT_BATCHES;
  });

  const [reagents, setReagents] = useState<any[]>(() => {
    const saved = localStorage.getItem('mhsl_reagents');
    return saved ? JSON.parse(saved) : DEFAULT_REAGENTS;
  });

  const [isolates, setIsolates] = useState<any[]>(() => {
    const saved = localStorage.getItem('mhsl_isolates');
    return saved ? JSON.parse(saved) : DEFAULT_ISOLATES;
  });

  // Database files state
  const [internalFiles, setInternalFiles] = useState<InternalProjectFile[]>([]);
  // Local files fallback state
  const [localFiles, setLocalFiles] = useState<InternalProjectFile[]>(() => {
    try {
      const saved = localStorage.getItem('mhsl_local_files');
      return saved ? JSON.parse(saved) : [
        {
          id: 'mock-1',
          title: 'Rhizospheric PGPR Isolate #RU-4 Antibiogram',
          description: 'Identified Pseudomonas strain with high phosphate solubilization and multi-drug resistance index.',
          uploadedBy: 'Md. Abid Hassan',
          uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          category: 'Rhizosphere Isolates',
          fileSize: '4.8 MB',
          downloadUrl: 'https://example.com/mock-reads-ru4'
        },
        {
          id: 'mock-2',
          title: 'Metagenomic Sequencing Reads - Batch RU-2026',
          description: 'Raw FASTQ files from soil metagenomics near Rajshahi sugar mills industrial effluent.',
          uploadedBy: 'Fatematuz johra Mila',
          uploadedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          category: 'Metagenomic Reads',
          fileSize: '124.5 MB',
          downloadUrl: 'https://example.com/mock-reads-metagenomic'
        }
      ];
    } catch {
      return [];
    }
  });

  const [loadingFiles, setLoadingFiles] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Form state for Files
  const [fileTitle, setFileTitle] = useState('');
  const [fileCategory, setFileCategory] = useState('DNA Sequencing');
  const [fileDesc, setFileDesc] = useState('');
  const [fileSizeStr, setFileSizeStr] = useState('14.2 MB');
  const [fileDownloadUrl, setFileDownloadUrl] = useState('https://example.com/mock-file-download');
  const [searchTerm, setSearchTerm] = useState('');

  // Interactive local Lab Task Board
  const [tasks, setTasks] = useState<LabTask[]>(() => {
    const saved = localStorage.getItem('mhsl_lab_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 't-1', title: 'Autoclave nutrient agar media for Batch 2026', assignedTo: 'Fatematuz johra Mila', status: 'todo', dueDate: 'Sunday' },
      { id: 't-2', title: 'Extract genomic DNA from Poultry Isolate #4', assignedTo: 'Md. Abid Hassan', status: 'in-progress', dueDate: 'Monday' },
      { id: 't-3', title: 'Refill 70% ethanol and clean biosafety cabinets', assignedTo: 'Muntasir Rahman Siam', status: 'completed', dueDate: 'Today' },
    ];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssigned, setNewTaskAssigned] = useState('Fatematuz johra Mila');

  // New Items Add Forms
  const [newProtocolTitle, setNewProtocolTitle] = useState('');
  const [newProtocolPurpose, setNewProtocolPurpose] = useState('');
  const [newProtocolSteps, setNewProtocolSteps] = useState('');
  const [newProtocolPrecautions, setNewProtocolPrecautions] = useState('');
  const [newProtocolDifficulty, setNewProtocolDifficulty] = useState('Easy');
  const [newProtocolDuration, setNewProtocolDuration] = useState('1.5 Hours');
  const [showAddProtocol, setShowAddProtocol] = useState(false);

  // Equipment reservation
  const [selectedEqId, setSelectedEqId] = useState<string | null>(null);
  const [reserveDate, setReserveDate] = useState('2026-07-04');
  const [reserveTime, setReserveTime] = useState('09:00 AM');
  const [reservePurpose, setReservePurpose] = useState('');
  const [reservationMessage, setReservationMessage] = useState<string | null>(null);

  // Add ongoing batch state
  const [newBatchTitle, setNewBatchTitle] = useState('');
  const [newBatchLead, setNewBatchLead] = useState('');
  const [newBatchPhase, setNewBatchPhase] = useState('');
  const [newBatchProgress, setNewBatchProgress] = useState(50);
  const [showAddBatch, setShowAddBatch] = useState(false);

  // Add Reagent state
  const [newReagentName, setNewReagentName] = useState('');
  const [newReagentStock, setNewReagentStock] = useState(100);
  const [newReagentUnit, setNewReagentUnit] = useState('%');
  const [newReagentRoom, setNewReagentRoom] = useState('Cabinet A');
  const [showAddReagent, setShowAddReagent] = useState(false);

  // Add Isolate state
  const [newIsolateCode, setNewIsolateCode] = useState('');
  const [newIsolateSpecies, setNewIsolateSpecies] = useState('');
  const [newIsolateCategory, setNewIsolateCategory] = useState('');
  const [newIsolateFeatures, setNewIsolateFeatures] = useState('');
  const [newIsolateStorage, setNewIsolateStorage] = useState('');
  const [showAddIsolate, setShowAddIsolate] = useState(false);

  // Save changes to localstorage when states update
  useEffect(() => {
    localStorage.setItem('mhsl_protocols', JSON.stringify(protocols));
  }, [protocols]);

  useEffect(() => {
    localStorage.setItem('mhsl_equipments', JSON.stringify(equipments));
  }, [equipments]);

  useEffect(() => {
    localStorage.setItem('mhsl_batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('mhsl_reagents', JSON.stringify(reagents));
  }, [reagents]);

  useEffect(() => {
    localStorage.setItem('mhsl_isolates', JSON.stringify(isolates));
  }, [isolates]);

  useEffect(() => {
    localStorage.setItem('mhsl_lab_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Load files from Firestore & combine with local files fallback
  const loadFiles = async () => {
    setLoadingFiles(true);
    try {
      const data = await fetchInternalFiles();
      const dbIds = new Set(data.map(f => f.id));
      const uniqueLocal = localFiles.filter(lf => !dbIds.has(lf.id));
      setInternalFiles([...data, ...uniqueLocal]);
    } catch (err) {
      console.error(err);
      setInternalFiles(localFiles);
    } finally {
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadFiles();
    }
  }, [user]);

  // Handle custom Student login verification
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const match = AUTHORIZED_STUDENTS.find(
      (s) => s.studentId === studentIdInput.trim() && s.password === passwordInput.trim()
    );

    if (match) {
      const mockSession = {
        uid: `student-${match.studentId}`,
        displayName: match.name,
        email: `ID: ${match.studentId}`,
        photoURL: match.avatarUrl,
        emailVerified: true,
        // custom properties
        photoInitials: match.photoInitials,
        role: match.role,
        session: match.session,
        isStudent: true
      };
      
      if (onCustomLogin) {
        onCustomLogin(mockSession);
      }
    } else {
      setAuthError('Authentication failed. Invalid Student ID or Password.');
    }
  };

  // Handle custom PI Login verification
  const handlePiLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const email = piEmailInput.trim().toLowerCase();

    const savedPi = localStorage.getItem('mhsl_registered_pi');
    const piProfile = savedPi ? JSON.parse(savedPi) : null;

    // Fallback default: if there is no saved profile and they input khondokar@gmail.com, allow password123
    if (!piProfile) {
      if (email === 'khondokar@gmail.com' && piPasswordInput.trim() === 'password123') {
        const mockSession = {
          uid: 'pi-khondokar',
          displayName: 'Dr. Khondokar Nasirujjaman',
          email: 'khondokar@gmail.com',
          photoInitials: 'KN',
          avatarUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwDBbfX6Zx60IcKeFa9VUurC8SeKEpxeG4ZFtz0sBlFJ-zKN-khh7guCGNqWhyP_9QxM9Cftrp_6ET-yVU8bxNLdGTTCYxwUAVmd3eObwC0caaPwtIf39pHRX3pgWpvw1TYwF6QWlAE2NHxMzyNNfNwRnC2D4u857Ez5_0QcGEpqyXrY8sNLY6yxbiGbI/s320/DR.%20KHONDOKAR%20NASIRUJJAMAN.png',
          role: 'Director & Professor, Department of GEB',
          session: 'Director',
          isPi: true
        };
        if (onCustomLogin) {
          onCustomLogin(mockSession);
        }
        return;
      }
      setAuthError('No registered Principal Investigator profile found with this email. Please sign up first.');
      setPiMode('signup');
      return;
    }

    if (email !== piProfile.email) {
      setAuthError('Authentication failed: Profile not found with this email.');
      return;
    }

    if (piPasswordInput.trim() !== piProfile.password) {
      setAuthError('Authentication failed: Incorrect password.');
      return;
    }

    // Success! Log in using the registered profile details
    const mockSession = {
      uid: 'pi-khondokar',
      displayName: piProfile.name || 'Dr. Khondokar Nasirujjaman',
      email: piProfile.email,
      photoInitials: 'KN',
      avatarUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwDBbfX6Zx60IcKeFa9VUurC8SeKEpxeG4ZFtz0sBlFJ-zKN-khh7guCGNqWhyP_9QxM9Cftrp_6ET-yVU8bxNLdGTTCYxwUAVmd3eObwC0caaPwtIf39pHRX3pgWpvw1TYwF6QWlAE2NHxMzyNNfNwRnC2D4u857Ez5_0QcGEpqyXrY8sNLY6yxbiGbI/s320/DR.%20KHONDOKAR%20NASIRUJJAMAN.png',
      role: piProfile.designation || 'Principal Investigator / Professor',
      session: 'Director',
      isPi: true
    };

    if (onCustomLogin) {
      onCustomLogin(mockSession);
    }
  };

  // Handle custom PI Signup / Registration
  const handlePiSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const email = piRegEmail.trim().toLowerCase();

    if (!piRegPassword || piRegPassword.length < 6) {
      setAuthError('Registration failed: Password must be at least 6 characters.');
      return;
    }

    if (piRegPassword !== piRegConfirmPassword) {
      setAuthError('Registration failed: Passwords do not match.');
      return;
    }

    const piProfile = {
      name: piRegName,
      email: email,
      password: piRegPassword,
      designation: piRegDesignation
    };

    localStorage.setItem('mhsl_registered_pi', JSON.stringify(piProfile));
    setRegisteredPi(piProfile);

    // autofill credentials for transition and switch to login
    setPiEmailInput(email);
    setPiPasswordInput(piRegPassword);
    setPiMode('login');
    
    // Notify user of success
    setAuthError(null);
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileTitle || !fileDesc) return;

    const newFile: InternalProjectFile = {
      id: `local-${Date.now()}`,
      title: fileTitle,
      description: fileDesc,
      uploadedBy: user?.displayName || user?.email || 'Anonymous Lab Member',
      uploadedAt: new Date().toISOString(),
      category: fileCategory,
      fileSize: fileSizeStr,
      downloadUrl: fileDownloadUrl,
    };

    setUploadStatus('Securely compiling file metrics and uploading...');
    try {
      await saveInternalFile({
        title: fileTitle,
        description: fileDesc,
        uploadedBy: newFile.uploadedBy,
        category: fileCategory,
        fileSize: fileSizeStr,
        downloadUrl: fileDownloadUrl,
      });

      setFileTitle('');
      setFileDesc('');
      setUploadStatus('Data uploaded and encrypted in Firestore collection.');
      setTimeout(() => setUploadStatus(null), 3000);
      loadFiles(); // reload list
    } catch (err) {
      console.warn('Firestore write failed, falling back to local storage:', err);
      const updatedLocal = [newFile, ...localFiles];
      setLocalFiles(updatedLocal);
      try {
        localStorage.setItem('mhsl_local_files', JSON.stringify(updatedLocal));
      } catch (storageErr) {
        console.error(storageErr);
      }
      
      setFileTitle('');
      setFileDesc('');
      setUploadStatus('Synced locally (Database is in offline fallback mode).');
      setTimeout(() => setUploadStatus(null), 3000);
      
      setInternalFiles(prev => {
        const dbFiles = prev.filter(f => !f.id.startsWith('local-') && !f.id.startsWith('mock-'));
        return [...dbFiles, ...updatedLocal];
      });
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    const task: LabTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      assignedTo: newTaskAssigned,
      status: 'todo',
      dueDate: 'This Week',
    };

    setTasks([task, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const nextStatusMap: Record<LabTask['status'], LabTask['status']> = {
            todo: 'in-progress',
            'in-progress': 'completed',
            completed: 'todo',
          };
          return { ...t, status: nextStatusMap[t.status] };
        }
        return t;
      })
    );
  };

  // Add items functions
  const handleAddProtocol = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProtocolTitle || !newProtocolPurpose) return;

    const stepArray = newProtocolSteps
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const protocolItem = {
      id: `protocol-${Date.now()}`,
      title: newProtocolTitle,
      purpose: newProtocolPurpose,
      steps: stepArray.length > 0 ? stepArray : ['Standard lab operation guidelines.'],
      precautions: newProtocolPrecautions || 'Wear standard PPE.',
      duration: newProtocolDuration,
      difficulty: newProtocolDifficulty
    };

    setProtocols([protocolItem, ...protocols]);
    setNewProtocolTitle('');
    setNewProtocolPurpose('');
    setNewProtocolSteps('');
    setNewProtocolPrecautions('');
    setShowAddProtocol(false);
  };

  const handleEquipmentReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEqId || !reservePurpose) return;

    const targetEq = equipments.find(eq => eq.id === selectedEqId);
    if (!targetEq) return;

    // Update equipment status to "In Use"
    setEquipments(
      equipments.map(eq => {
        if (eq.id === selectedEqId) {
          return { ...eq, status: 'In Use' };
        }
        return eq;
      })
    );

    setReservationMessage(`Successfully reserved ${targetEq.name} for ${reserveDate} at ${reserveTime}!`);
    setTimeout(() => {
      setReservationMessage(null);
      setSelectedEqId(null);
      setReservePurpose('');
    }, 4000);
  };

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchTitle || !newBatchLead) return;

    const batchItem = {
      id: `batch-${Date.now()}`,
      title: newBatchTitle,
      lead: newBatchLead,
      progress: Number(newBatchProgress),
      phase: newBatchPhase || 'Research Phase',
      updated: new Date().toISOString().split('T')[0]
    };

    setBatches([batchItem, ...batches]);
    setNewBatchTitle('');
    setNewBatchLead('');
    setNewBatchPhase('');
    setNewBatchProgress(50);
    setShowAddBatch(false);
  };

  const handleAddReagent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReagentName) return;

    const stockNum = Number(newReagentStock);
    let level = 'normal';
    if (stockNum <= 10) level = 'critical';
    else if (stockNum <= 25) level = 'low';

    const reagentItem = {
      id: `reagent-${Date.now()}`,
      name: newReagentName,
      stock: stockNum,
      unit: newReagentUnit,
      room: newReagentRoom,
      level: level
    };

    setReagents([reagentItem, ...reagents]);
    setNewReagentName('');
    setNewReagentStock(100);
    setShowAddReagent(false);
  };

  const handleAddIsolate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIsolateCode || !newIsolateSpecies) return;

    const isolateItem = {
      id: `isolate-${Date.now()}`,
      code: newIsolateCode,
      species: newIsolateSpecies,
      category: newIsolateCategory || 'Bacterial Isolate',
      features: newIsolateFeatures,
      storage: newIsolateStorage || '-80°C Glycerol Bank'
    };

    setIsolates([isolateItem, ...isolates]);
    setNewIsolateCode('');
    setNewIsolateSpecies('');
    setNewIsolateCategory('');
    setNewIsolateFeatures('');
    setNewIsolateStorage('');
    setShowAddIsolate(false);
  };

  // Human Greeting generator based on current system time
  const getGreetingMessage = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const filteredFiles = internalFiles.filter(
    (file) =>
      file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Redesigned materials / auth-gate login layout
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8" id="login-gate">
        {/* Elegant top introductory card */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-teal to-teal-deep text-white flex items-center justify-center mx-auto text-4xl font-serif font-extrabold shadow-md select-none transform hover:rotate-6 transition-all duration-300">
            M
          </div>
          <div className="space-y-1">
            <h1 className="font-serif font-bold text-3xl text-teal-deep tracking-tight">Molecular Health Science Laboratory</h1>
            <p className="text-xs uppercase tracking-widest text-gold font-mono font-extrabold">RU Workbench Intranet Portal</p>
          </div>
          <p className="text-xs text-ink-soft leading-relaxed">
            Authorized workspace for current researchers, Professor &amp; PI, and thesis candidates at the Department of Genetic Engineering and Biotechnology, University of Rajshahi.
          </p>
        </div>

        {authError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded-2xl p-4 flex items-start gap-3 shadow-xs animate-fade-in max-w-md mx-auto">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-rose-950">Access Denied</p>
              <p className="text-rose-800 leading-relaxed font-semibold">{authError}</p>
            </div>
          </div>
        )}

        {/* Unified Selector Tabs above the Single Login Card */}
        <div className="flex justify-center items-center gap-2 max-w-md mx-auto bg-bg-alt p-1.5 rounded-2xl border border-line">
          <button
            type="button"
            onClick={() => {
              setLoginRole('student');
              setAuthError(null);
            }}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold font-mono transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer ${
              loginRole === 'student'
                ? 'bg-gradient-to-r from-teal to-teal-deep text-white shadow-md'
                : 'text-ink-soft hover:text-teal'
            }`}
          >
            <GraduationCap className="w-4.5 h-4.5" />
            Sign as Student
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginRole('pi');
              setAuthError(null);
            }}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold font-mono transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer ${
              loginRole === 'pi'
                ? 'bg-gradient-to-r from-gold to-[#9a3412] text-white shadow-md'
                : 'text-ink-soft hover:text-gold'
            }`}
          >
            <Microscope className="w-4.5 h-4.5" />
            Sign as PI
          </button>
        </div>

        {/* ONLY ONE Login Portal Card Container */}
        <div className="max-w-md mx-auto bg-paper border border-line rounded-3xl p-8 shadow-md relative overflow-hidden transition-all duration-300">
          
          {/* Subtle background visual flair depending on current selected role */}
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none ${
            loginRole === 'student' ? 'bg-teal' : 'bg-gold'
          }`} />

          {/* Render STUDENT Login form */}
          {loginRole === 'student' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <div className="p-2.5 bg-teal-pale text-teal-deep rounded-xl">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-teal-deep leading-tight">Registered Student Access</h3>
                  <p className="text-[10px] text-ink-faint uppercase font-mono tracking-wider">B.Sc. &amp; MS Thesis Researchers</p>
                </div>
              </div>

              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Student ID *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-faint">
                      <GraduationCap className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={studentIdInput}
                      onChange={(e) => setStudentIdInput(e.target.value)}
                      placeholder="e.g. 2111061105"
                      className="w-full pl-10 pr-4 py-2.5 border border-line rounded-xl text-xs bg-bg focus:outline-none focus:border-teal font-mono transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Personal Password *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-faint">
                      <KeyRound className="w-4 h-4" />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter 10-digit PIN code"
                      className="w-full pl-10 pr-10 py-2.5 border border-line rounded-xl text-xs bg-bg focus:outline-none focus:border-teal font-mono transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-faint hover:text-teal"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-teal to-teal-deep text-white font-bold text-xs rounded-xl uppercase tracking-wider cursor-pointer shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  Verify Student Access
                </button>
              </form>
            </div>
          )}

          {/* Render PRINCIPAL INVESTIGATOR forms */}
          {loginRole === 'pi' && (
            <div className="animate-fade-in">
              
              {/* SUB-VIEW 1: SIGN IN FORM */}
              {piMode === 'login' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-line pb-4">
                    <div className="p-2.5 bg-gold-pale text-gold rounded-xl">
                      <Microscope className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-teal-deep leading-tight">PI Workbench Login</h3>
                      <p className="text-[10px] text-ink-faint uppercase font-mono tracking-wider">Director &amp; Advisory Access</p>
                    </div>
                  </div>

                  <form onSubmit={handlePiLogin} className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">PI Registered Email *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-faint">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          required
                          value={piEmailInput}
                          onChange={(e) => setPiEmailInput(e.target.value)}
                          placeholder="Enter your mail"
                          className="w-full pl-10 pr-4 py-2.5 border border-line rounded-xl text-xs bg-bg focus:outline-none focus:border-gold font-mono transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">PI Access Password *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-faint">
                          <KeyRound className="w-4 h-4" />
                        </span>
                        <input
                          type={showPiPassword ? 'text' : 'password'}
                          required
                          value={piPasswordInput}
                          onChange={(e) => setPiPasswordInput(e.target.value)}
                          placeholder="Enter your custom PI password"
                          className="w-full pl-10 pr-10 py-2.5 border border-line rounded-xl text-xs bg-bg focus:outline-none focus:border-gold font-mono transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPiPassword(!showPiPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-faint hover:text-gold"
                        >
                          {showPiPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-gold to-[#9a3412] text-white font-bold text-xs rounded-xl uppercase tracking-wider cursor-pointer shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all"
                    >
                      Authenticate PI Node
                    </button>
                  </form>

                  <div className="pt-2 flex flex-col items-center gap-2 text-center text-[11px] text-ink-soft bg-bg p-3.5 rounded-xl border border-line">
                    <span>Need to configure your supervising password?</span>
                    <button
                      type="button"
                      onClick={() => {
                        setPiMode('signup');
                        setAuthError(null);
                      }}
                      className="text-xs font-bold text-gold hover:underline uppercase tracking-wider font-mono animate-pulse"
                    >
                      Create PI Signup Profile &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* SUB-VIEW 2: REGISTRATION / SIGN UP FORM */}
              {piMode === 'signup' && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 border-b border-line pb-4">
                    <div className="p-2.5 bg-amber-50 text-gold border border-gold/20 rounded-xl">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-teal-deep leading-tight">PI Sign Up</h3>
                    </div>
                  </div>

                  <form onSubmit={handlePiSignup} className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={piRegName}
                        onChange={(e) => setPiRegName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-3 py-2.5 border border-line rounded-xl text-xs bg-bg focus:outline-none focus:border-gold font-sans transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Academic Email *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-faint">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          required
                          value={piRegEmail}
                          onChange={(e) => setPiRegEmail(e.target.value)}
                          placeholder="Enter your mail"
                          className="w-full pl-10 pr-4 py-2.5 border border-line rounded-xl text-xs bg-bg focus:outline-none focus:border-gold font-mono transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Designation &amp; Department *</label>
                      <input
                        type="text"
                        required
                        value={piRegDesignation}
                        onChange={(e) => setPiRegDesignation(e.target.value)}
                        placeholder="Enter your designation"
                        className="w-full px-3 py-2.5 border border-line rounded-xl text-xs bg-bg focus:outline-none focus:border-gold font-sans transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Password *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-faint">
                          <KeyRound className="w-4 h-4" />
                        </span>
                        <input
                          type={showPiPassword ? 'text' : 'password'}
                          required
                          value={piRegPassword}
                          onChange={(e) => setPiRegPassword(e.target.value)}
                          placeholder="At least 6 characters"
                          className="w-full pl-10 pr-10 py-2.5 border border-line rounded-xl text-xs bg-bg focus:outline-none focus:border-gold font-mono transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Confirm Password *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-faint">
                          <KeyRound className="w-4 h-4" />
                        </span>
                        <input
                          type={showPiPassword ? 'text' : 'password'}
                          required
                          value={piRegConfirmPassword}
                          onChange={(e) => setPiRegConfirmPassword(e.target.value)}
                          placeholder="Re-enter password"
                          className="w-full pl-10 pr-10 py-2.5 border border-line rounded-xl text-xs bg-bg focus:outline-none focus:border-gold font-mono transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPiPassword(!showPiPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-faint hover:text-gold"
                        >
                          {showPiPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-gold to-amber-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider cursor-pointer shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all"
                    >
                      Sign Up &amp; Create Profile
                    </button>
                  </form>

                  <div className="pt-2 text-center text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setPiMode('login');
                        setAuthError(null);
                      }}
                      className="text-ink-soft hover:text-gold hover:underline font-semibold"
                    >
                      Already have a profile? Sign In
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Contact & Social Connect Section */}
        <div className="max-w-md mx-auto pt-4 text-center">
          <div className="border-t border-line/60 pt-6 space-y-3.5">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-ink-soft">Contact &amp; Connect</h4>
            <div className="flex justify-center items-center gap-3">
              <a 
                href="" 
                className="p-2.5 bg-paper hover:bg-bg border border-line rounded-2xl hover:border-teal/30 hover:text-teal transition-all shadow-xs inline-flex items-center justify-center text-ink-soft shrink-0 w-11 h-11"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="" 
                className="p-2.5 bg-paper hover:bg-bg border border-line rounded-2xl hover:border-teal/30 hover:text-teal transition-all shadow-xs inline-flex items-center justify-center text-ink-soft shrink-0 w-11 h-11"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="" 
                className="p-2.5 bg-paper hover:bg-bg border border-line rounded-2xl hover:border-teal/30 hover:text-teal transition-all shadow-xs inline-flex items-center justify-center shrink-0 w-11 h-11 text-ink-soft"
                title="ResearchGate"
              >
                <span className="font-serif font-extrabold text-base tracking-tighter leading-none flex items-center gap-0.5 select-none">
                  R<sup className="text-[10px] font-sans font-extrabold tracking-normal">G</sup>
                </span>
              </a>
            </div>
            <p className="text-[10px] text-ink-faint font-mono">
              Department of Genetic Engineering and Biotechnology &middot; University of Rajshahi
            </p>
          </div>
        </div>

      </div>
    );
  }

  // Once authenticated successfully: render a majestic workbench dashboard!
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="secured-member-portal">
      {/* Premium Secure Banner with Dynamic Greeting and Time-sensitive background */}
      <div className="bg-teal-deep text-white p-6 sm:p-8 rounded-3xl border border-teal flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-pale/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Profile and dynamic greetings */}
        <div className="flex items-center gap-4.5 z-10">
          <div className="relative group shrink-0">
            <div className="absolute inset-0 bg-gold rounded-2xl blur-xs group-hover:scale-105 transition-all" />
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.displayName || 'Researcher'} 
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white relative z-10"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gold to-amber-700 text-white font-extrabold flex items-center justify-center text-xl border-2 border-white relative z-10 font-mono">
                {(user as any).photoInitials || 'AH'}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 border border-white text-[8px] font-bold px-1.5 py-0.5 rounded-full text-white z-20">
              ACTIVE
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold-pale font-extrabold">MHSL Laboratory Intranet</span>
              <span className="bg-white/10 text-white font-mono text-[9px] px-2 py-0.5 rounded font-semibold">
                {(user as any).session || 'MHSL MS Thesis'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
              {getGreetingMessage()}, {user.displayName || 'Lab Researcher'}!
            </h1>
            <p className="text-xs text-white/75 font-semibold">
              {(user as any).role || 'Graduate Researcher'} &middot; <span className="font-mono text-[11px] text-white/60">{user.email}</span>
            </p>
          </div>
        </div>

        {/* Quick actions right aligned */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-2.5 shrink-0 z-10 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl text-xs text-white border border-white/15 space-y-0.5 flex flex-col justify-center">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[9px] text-gold-pale font-bold uppercase tracking-wider">Server Status</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>GEB Secure Node &middot; Online</span>
            </div>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-rose-600/25 hover:bg-rose-600/45 border border-rose-500/20 hover:border-rose-500/40 text-rose-100 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs hover:-translate-y-0.5 active:translate-y-0"
              title="Log Out of Intranet"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-300" />
              <span>Exit Portal</span>
            </button>
          )}
        </div>
      </div>

      {/* Secured Intranet Tabs Navigation */}
      <div className="border-b border-line overflow-x-auto pb-px flex items-center gap-1 scrollbar-none" id="workbench-tabs">
        <button
          onClick={() => setActivePortalTab('protocols')}
          className={`px-4.5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
            activePortalTab === 'protocols'
              ? 'border-teal text-teal-deep font-extrabold'
              : 'border-transparent text-ink-soft hover:text-teal'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Lab Protocols
        </button>
        <button
          onClick={() => setActivePortalTab('equipments')}
          className={`px-4.5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
            activePortalTab === 'equipments'
              ? 'border-teal text-teal-deep font-extrabold'
              : 'border-transparent text-ink-soft hover:text-teal'
          }`}
        >
          <Microscope className="w-4 h-4" />
          Lab Equipments
        </button>
        <button
          onClick={() => setActivePortalTab('progress')}
          className={`px-4.5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
            activePortalTab === 'progress'
              ? 'border-teal text-teal-deep font-extrabold'
              : 'border-transparent text-ink-soft hover:text-teal'
          }`}
        >
          <Activity className="w-4 h-4" />
          Ongoing Progress
        </button>
        <button
          onClick={() => setActivePortalTab('reagents')}
          className={`px-4.5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
            activePortalTab === 'reagents'
              ? 'border-teal text-teal-deep font-extrabold'
              : 'border-transparent text-ink-soft hover:text-teal'
          }`}
        >
          <Beaker className="w-4 h-4" />
          Chemical Inventory
        </button>
        <button
          onClick={() => setActivePortalTab('isolates')}
          className={`px-4.5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
            activePortalTab === 'isolates'
              ? 'border-teal text-teal-deep font-extrabold'
              : 'border-transparent text-ink-soft hover:text-teal'
          }`}
        >
          <Settings className="w-4 h-4" />
          Isolate Registry
        </button>
        <button
          onClick={() => setActivePortalTab('logs')}
          className={`px-4.5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
            activePortalTab === 'logs'
              ? 'border-teal text-teal-deep font-extrabold'
              : 'border-transparent text-ink-soft hover:text-teal'
          }`}
        >
          <Database className="w-4 h-4" />
          Research Logs Repository
        </button>
      </div>

      {/* Dynamic Tab Panels */}
      <div className="space-y-6">

        {/* Tab 1: Protocols Panel */}
        {activePortalTab === 'protocols' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-teal-deep">Standard Operating Procedures (SOPs)</h2>
                <p className="text-xs text-ink-soft">Review verified molecular, microbial, and biological protocols from MHSL archives</p>
              </div>
              <button
                onClick={() => setShowAddProtocol(!showAddProtocol)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal hover:bg-teal-deep text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all shadow-xs shrink-0 self-start"
              >
                <Plus className="w-4 h-4" />
                {showAddProtocol ? 'Close Editor' : 'Draft New SOP'}
              </button>
            </div>

            {showAddProtocol && (
              <form onSubmit={handleAddProtocol} className="bg-paper border border-line p-6 rounded-2xl space-y-4 max-w-2xl">
                <h3 className="font-serif font-bold text-base text-teal-deep border-b border-line pb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal" />
                  SOP Authoring Interface
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Protocol Title *</label>
                    <input
                      type="text"
                      required
                      value={newProtocolTitle}
                      onChange={(e) => setNewProtocolTitle(e.target.value)}
                      placeholder="e.g. Plasmid Extraction Protocol"
                      className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Estimated Duration</label>
                    <input
                      type="text"
                      value={newProtocolDuration}
                      onChange={(e) => setNewProtocolDuration(e.target.value)}
                      placeholder="e.g. 2.0 Hours"
                      className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Target Objective / Purpose *</label>
                    <input
                      type="text"
                      required
                      value={newProtocolPurpose}
                      onChange={(e) => setNewProtocolPurpose(e.target.value)}
                      placeholder="Brief summary of what this protocol isolates or assays..."
                      className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Difficulty Level</label>
                    <select
                      value={newProtocolDifficulty}
                      onChange={(e) => setNewProtocolDifficulty(e.target.value)}
                      className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                    >
                      <option value="Easy">Easy (Undergrad level)</option>
                      <option value="Intermediate">Intermediate (Thesis level)</option>
                      <option value="Advanced">Advanced (PI / PhD level)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Steps (One step per line) *</label>
                  <textarea
                    required
                    rows={5}
                    value={newProtocolSteps}
                    onChange={(e) => setNewProtocolSteps(e.target.value)}
                    placeholder="1. Harvest overnight cells...&#10;2. Add lysis buffer...&#10;3. Centrifuge and wash..."
                    className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal font-sans resize-y"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Key Precautions &amp; Hazard Warning</label>
                  <input
                    type="text"
                    value={newProtocolPrecautions}
                    onChange={(e) => setNewProtocolPrecautions(e.target.value)}
                    placeholder="e.g. Always wear gloves, contains ethidium bromide!"
                    className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal hover:bg-teal-deep text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all"
                >
                  Publish to Lab Intranet
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {protocols.map((proto) => (
                <div key={proto.id} className="bg-paper border border-line rounded-2xl p-6 space-y-4 hover:border-teal/30 hover:shadow-xs transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] font-bold text-gold bg-gold-pale/35 px-2.5 py-0.5 rounded-full uppercase">
                        {proto.difficulty}
                      </span>
                      <span className="text-[9px] uppercase font-bold text-teal bg-teal-pale px-2 py-0.5 rounded font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {proto.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-teal-deep font-serif leading-snug">{proto.title}</h3>
                    <p className="text-xs text-ink-soft leading-relaxed italic border-l-2 border-gold-pale pl-2">{proto.purpose}</p>
                    
                    <div className="space-y-2 pt-2">
                      <span className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Standard Procedure Steps:</span>
                      <ol className="list-decimal list-inside text-xs text-ink-soft space-y-1.5 pl-1.5 leading-relaxed">
                        {proto.steps.slice(0, 3).map((step: string, idx: number) => (
                          <li key={idx} className="truncate">{step}</li>
                        ))}
                        {proto.steps.length > 3 && (
                          <li className="text-[10px] text-teal font-semibold font-mono">... {proto.steps.length - 3} more steps written inside files</li>
                        )}
                      </ol>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-line/50 flex flex-col gap-2">
                    <div className="text-[10px] text-rose-700 font-medium flex items-center gap-1 bg-rose-50 p-2 rounded-lg border border-rose-100">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span className="truncate"><strong>Precaution:</strong> {proto.precautions}</span>
                    </div>
                    <button
                      onClick={() => {
                        alert(`Full Protocol Procedure:\n\n${proto.title}\n-------------------------\n\nSteps:\n${proto.steps.map((s: string, i: number) => `${i+1}. ${s}`).join('\n')}\n\nPrecaution:\n- ${proto.precautions}`);
                      }}
                      className="w-full text-center py-2 bg-bg hover:bg-teal-pale/30 text-teal-deep text-xs font-bold uppercase rounded-xl border border-line hover:border-teal/30 transition-all cursor-pointer"
                    >
                      Open Full Screen Instructions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Lab Equipments Panel */}
        {activePortalTab === 'equipments' && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-1">
              <h2 className="text-xl font-serif font-bold text-teal-deep">Equipment Registry &amp; Scheduler</h2>
              <p className="text-xs text-ink-soft">Real-time occupancy status and scheduling coordinates for high-precision analytical hardware</p>
            </div>

            {reservationMessage && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-4 flex items-start gap-3 shadow-xs animate-fade-in max-w-lg">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold leading-relaxed">{reservationMessage}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Equipments status grid */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {equipments.map((eq) => (
                  <div
                    key={eq.id}
                    onClick={() => {
                      if (eq.status === 'Available') {
                        setSelectedEqId(eq.id);
                      } else {
                        alert(`${eq.name} is currently occupied by another ongoing protocol batch. Try booking for later.`);
                      }
                    }}
                    className={`bg-paper border rounded-2xl p-5 space-y-3 cursor-pointer transition-all hover:shadow-xs flex flex-col justify-between ${
                      selectedEqId === eq.id 
                        ? 'border-gold shadow-md bg-gold-pale/10 ring-2 ring-gold' 
                        : eq.status === 'In Use'
                        ? 'border-rose-100 bg-rose-50/25 opacity-90'
                        : 'border-line hover:border-teal'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] font-extrabold text-ink-faint uppercase">
                          {eq.room}
                        </span>
                        <span className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-full font-mono ${
                          eq.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {eq.status}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-teal-deep text-sm leading-snug">{eq.name}</h4>
                      <p className="text-xs text-ink-soft leading-relaxed">{eq.details}</p>
                    </div>

                    <div className="pt-2 border-t border-line/40 text-[10px] font-semibold text-teal font-mono uppercase flex items-center justify-between">
                      <span>{eq.status === 'Available' ? 'Click to Reserve slot' : 'Currently Busy'}</span>
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Reservation Sidebar form */}
              <div className="lg:col-span-4 bg-paper border border-line rounded-3xl p-6 space-y-4 shadow-xs">
                <h3 className="font-serif font-bold text-base text-teal-deep flex items-center gap-1.5 border-b border-line pb-3">
                  <Calendar className="w-5 h-5 text-teal" />
                  Secure Slot Reservation
                </h3>

                {selectedEqId ? (
                  <form onSubmit={handleEquipmentReserve} className="space-y-4 animate-fade-in">
                    <div className="bg-teal-pale text-teal-deep p-3 rounded-xl border border-teal/15 text-xs space-y-1">
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-teal font-extrabold">Selected Apparatus</span>
                      <span className="font-bold">{equipments.find(e => e.id === selectedEqId)?.name}</span>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Reservation Date *</label>
                      <input
                        type="date"
                        required
                        value={reserveDate}
                        onChange={(e) => setReserveDate(e.target.value)}
                        className="w-full p-2 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Start Time *</label>
                      <select
                        value={reserveTime}
                        onChange={(e) => setReserveTime(e.target.value)}
                        className="w-full p-2 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal font-mono"
                      >
                        <option value="09:00 AM">09:00 AM - Morning Batch</option>
                        <option value="12:00 PM">12:00 PM - Midday Run</option>
                        <option value="03:00 PM">03:00 PM - Afternoon Slot</option>
                        <option value="06:00 PM">06:00 PM - Late Session</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Purpose / Protocol batch *</label>
                      <input
                        type="text"
                        required
                        value={reservePurpose}
                        onChange={(e) => setReservePurpose(e.target.value)}
                        placeholder="e.g. 16S Amplification for Isolate Iso-6"
                        className="w-full p-2 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedEqId(null)}
                        className="py-2 bg-bg hover:bg-paper border border-line text-ink-soft text-xs font-bold rounded-lg uppercase tracking-wider transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="py-2 bg-gold hover:bg-amber-800 text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-all"
                      >
                        Book Slot
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-2 text-ink-faint">
                    <Microscope className="w-8 h-8 mx-auto" />
                    <p className="text-xs font-semibold">No equipment selected</p>
                    <p className="text-[10px] leading-relaxed max-w-xs mx-auto">
                      Click any of the green "Available" devices on the left registry grid to instantly start booking your exclusive reservation slot.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Ongoing Work Progress Panel */}
        {activePortalTab === 'progress' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-teal-deep">Ongoing Work Progress Tracker</h2>
                <p className="text-xs text-ink-soft">Active research tasks, project timelines, and percentage completions across departments</p>
              </div>
              <button
                onClick={() => setShowAddBatch(!showAddBatch)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal hover:bg-teal-deep text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all shadow-xs shrink-0 self-start"
              >
                <Plus className="w-4 h-4" />
                {showAddBatch ? 'Close Panel' : 'Log New Batch'}
              </button>
            </div>

            {showAddBatch && (
              <form onSubmit={handleAddBatch} className="bg-paper border border-line p-6 rounded-2xl space-y-4 max-w-lg">
                <h3 className="font-serif font-bold text-base text-teal-deep border-b border-line pb-2 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-teal" />
                  Log Experimental Batch Run
                </h3>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Research Title / Experiment Name *</label>
                  <input
                    type="text"
                    required
                    value={newBatchTitle}
                    onChange={(e) => setNewBatchTitle(e.target.value)}
                    placeholder="e.g. Isolation of AMR profiles from clinical hospital dust"
                    className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Lead Researcher *</label>
                    <input
                      type="text"
                      required
                      value={newBatchLead}
                      onChange={(e) => setNewBatchLead(e.target.value)}
                      placeholder="e.g. Md. Abid Hassan"
                      className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Current Phase / Status</label>
                    <input
                      type="text"
                      value={newBatchPhase}
                      onChange={(e) => setNewBatchPhase(e.target.value)}
                      placeholder="e.g. Media preparation, Sequencing"
                      className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Completion Progress ({newBatchProgress}%)</label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={newBatchProgress}
                    onChange={(e) => setNewBatchProgress(Number(e.target.value))}
                    className="w-full h-2 bg-bg rounded-lg appearance-none cursor-pointer accent-teal focus:outline-none"
                  />
                  <div className="flex justify-between text-[9px] text-ink-faint font-mono">
                    <span>0% Inception</span>
                    <span>50% Mid-run</span>
                    <span>100% Analysis Done</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal hover:bg-teal-deep text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all"
                >
                  Publish Active Batch
                </button>
              </form>
            )}

            {/* Timelines list */}
            <div className="space-y-4">
              {batches.map((batch) => (
                <div key={batch.id} className="bg-paper border border-line rounded-2xl p-5 hover:border-teal/35 transition-all space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[9px] text-teal font-bold bg-teal-pale px-2 py-0.5 rounded-full">
                          {batch.phase}
                        </span>
                        <span className="text-[10px] font-mono text-ink-faint">
                          Last Updated: {batch.updated}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-teal-deep text-base">{batch.title}</h4>
                    </div>

                    <div className="text-right sm:text-right">
                      <span className="block text-[10px] font-mono text-ink-faint">Lead Project Head</span>
                      <strong className="text-xs text-teal-deep font-sans">{batch.lead}</strong>
                    </div>
                  </div>

                  {/* Progress bar container */}
                  <div className="space-y-1.5 pt-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold text-ink-soft">
                      <span>Experimental Milestones Accomplished</span>
                      <span className="text-teal-deep">{batch.progress}%</span>
                    </div>
                    <div className="w-full bg-bg rounded-full h-3.5 border border-line/45 p-0.5 overflow-hidden">
                      <div
                        style={{ width: `${batch.progress}%` }}
                        className="bg-gradient-to-r from-teal via-teal-deep to-gold h-full rounded-full transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Reagents Inventory Panel */}
        {activePortalTab === 'reagents' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-teal-deep">Chemical &amp; Reagents Inventory</h2>
                <p className="text-xs text-ink-soft">Consumable bio-reagents, molecular enzymes, and agar culture media stocks and locations</p>
              </div>
              <button
                onClick={() => setShowAddReagent(!showAddReagent)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal hover:bg-teal-deep text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all shadow-xs shrink-0 self-start"
              >
                <Plus className="w-4 h-4" />
                {showAddReagent ? 'Close Panel' : 'Log Reagent'}
              </button>
            </div>

            {showAddReagent && (
              <form onSubmit={handleAddReagent} className="bg-paper border border-line p-6 rounded-2xl space-y-4 max-w-lg">
                <h3 className="font-serif font-bold text-base text-teal-deep border-b border-line pb-2 flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-teal" />
                  Log Consumable Stock
                </h3>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Chemical / Reagent Name *</label>
                  <input
                    type="text"
                    required
                    value={newReagentName}
                    onChange={(e) => setNewReagentName(e.target.value)}
                    placeholder="e.g. Taq DNA Polymerase 5U/µl"
                    className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Stock Amount *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="1000"
                      value={newReagentStock}
                      onChange={(e) => setNewReagentStock(Number(e.target.value))}
                      className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Unit / Scale</label>
                    <input
                      type="text"
                      value={newReagentUnit}
                      onChange={(e) => setNewReagentUnit(e.target.value)}
                      placeholder="e.g. g, mL, vials"
                      className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Storage Location</label>
                    <input
                      type="text"
                      value={newReagentRoom}
                      onChange={(e) => setNewReagentRoom(e.target.value)}
                      placeholder="e.g. Freezer -20C"
                      className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal hover:bg-teal-deep text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all"
                >
                  Add Reagent Item
                </button>
              </form>
            )}

            {/* Inventory stock visual grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reagents.map((reagent) => (
                <div key={reagent.id} className="bg-paper border border-line rounded-2xl p-5 hover:border-teal/30 transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-ink-faint uppercase font-bold">
                        {reagent.room}
                      </span>
                      <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded font-extrabold ${
                        reagent.level === 'critical' 
                          ? 'bg-rose-100 text-rose-800 animate-pulse' 
                          : reagent.level === 'low'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-teal-pale text-teal-deep'
                      }`}>
                        {reagent.level.toUpperCase()} STOCK
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-teal-deep text-sm leading-snug">{reagent.name}</h4>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-line/45">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-ink-soft font-semibold">Remaining:</span>
                      <strong className="text-teal-deep font-extrabold">{reagent.stock} {reagent.unit}</strong>
                    </div>
                    {/* Visual bar */}
                    <div className="w-full bg-bg rounded-full h-2 overflow-hidden">
                      <div
                        style={{ width: `${Math.min(reagent.stock, 100)}%` }}
                        className={`h-full rounded-full ${
                          reagent.level === 'critical' ? 'bg-rose-600' : reagent.level === 'low' ? 'bg-amber-500' : 'bg-teal'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Isolate Registry Panel */}
        {activePortalTab === 'isolates' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-teal-deep">Bacterial Isolate &amp; Strain Registry</h2>
                <p className="text-xs text-ink-soft">Validated glycerol stocks, slant library codes, morphological profiles and genomic properties</p>
              </div>
              <button
                onClick={() => setShowAddIsolate(!showAddIsolate)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal hover:bg-teal-deep text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all shadow-xs shrink-0 self-start"
              >
                <Plus className="w-4 h-4" />
                {showAddIsolate ? 'Close Panel' : 'Register Isolate'}
              </button>
            </div>

            {showAddIsolate && (
              <form onSubmit={handleAddIsolate} className="bg-paper border border-line p-6 rounded-2xl space-y-4 max-w-lg">
                <h3 className="font-serif font-bold text-base text-teal-deep border-b border-line pb-2 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-teal" />
                  Register Strain Glycerol Stock
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Strain Code *</label>
                    <input
                      type="text"
                      required
                      value={newIsolateCode}
                      onChange={(e) => setNewIsolateCode(e.target.value)}
                      placeholder="e.g. RU-BS12"
                      className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Scientific Species Name *</label>
                    <input
                      type="text"
                      required
                      value={newIsolateSpecies}
                      onChange={(e) => setNewIsolateSpecies(e.target.value)}
                      placeholder="e.g. Bacillus coagulans"
                      className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Category classification</label>
                    <input
                      type="text"
                      value={newIsolateCategory}
                      onChange={(e) => setNewIsolateCategory(e.target.value)}
                      placeholder="e.g. PGPR biofertilizer, Clinical MDR"
                      className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Cryo Box Storage Location</label>
                    <input
                      type="text"
                      value={newIsolateStorage}
                      onChange={(e) => setNewIsolateStorage(e.target.value)}
                      placeholder="e.g. Freezer -80C Box #A5"
                      className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Isolate Attributes &amp; Phenotypic Features</label>
                  <textarea
                    rows={3}
                    value={newIsolateFeatures}
                    onChange={(e) => setNewIsolateFeatures(e.target.value)}
                    placeholder="Morphological markers, gene sequence status, specific bioassays..."
                    className="w-full p-2.5 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal hover:bg-teal-deep text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all"
                >
                  Save Isolate Coordinates
                </button>
              </form>
            )}

            {/* Isolates list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isolates.map((iso) => (
                <div key={iso.id} className="bg-paper border border-line rounded-2xl p-6 hover:border-teal/30 transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-teal bg-teal-pale px-2.5 py-0.5 rounded font-bold uppercase tracking-wide">
                        {iso.code}
                      </span>
                      <span className="text-[10px] font-semibold text-gold bg-gold-pale/35 px-2.5 py-0.5 rounded-full font-mono">
                        {iso.storage}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-serif font-extrabold italic text-teal-deep text-base">{iso.species}</h4>
                      <p className="text-[10px] font-mono text-ink-faint uppercase tracking-wider font-bold">{iso.category}</p>
                    </div>
                    <p className="text-xs text-ink-soft leading-relaxed bg-bg/40 border border-line/40 p-3 rounded-xl">
                      {iso.features}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-line/50 text-[10px] font-mono text-ink-faint flex items-center justify-between">
                    <span>MHSL Cryo Strain Bank Code Verified</span>
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Research Logs & Repository (Existing original code functionality) */}
        {activePortalTab === 'logs' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center pb-2 border-b border-line">
              <div>
                <h2 className="text-xl font-serif font-bold text-teal-deep">Secure Database Inventory</h2>
                <p className="text-xs text-ink-soft">Raw sequencing reads, sequencing plates and antibiograms stored securely in Cloud Firestore</p>
              </div>
              <button
                onClick={loadFiles}
                disabled={loadingFiles}
                className="inline-flex items-center gap-1.5 text-xs text-teal font-semibold hover:underline cursor-pointer border border-line bg-white px-3 py-1.5 rounded-xl shadow-xs"
              >
                <RefreshCw className={`w-3 h-3 ${loadingFiles ? 'animate-spin' : ''}`} />
                Sync Database
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Form upload */}
              <div className="lg:col-span-5 space-y-6">
                <form onSubmit={handleFileUpload} className="bg-paper border border-line p-6 rounded-2xl space-y-4 shadow-xs">
                  <h3 className="font-serif font-bold text-base text-teal-deep flex items-center gap-1.5 border-b border-line pb-3">
                    <Database className="w-5 h-5 text-teal" />
                    Upload Research Logs &amp; Runs
                  </h3>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Document Title / Run Name *</label>
                    <input
                      type="text"
                      required
                      value={fileTitle}
                      onChange={(e) => setFileTitle(e.target.value)}
                      placeholder="e.g. Antibiotic sensitivity assay log"
                      className="w-full p-2 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Category *</label>
                      <select
                        value={fileCategory}
                        onChange={(e) => setFileCategory(e.target.value)}
                        className="w-full p-2 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                      >
                        <option value="DNA Sequencing">DNA Sequencing</option>
                        <option value="AST Logs">AST Logs</option>
                        <option value="Rhizosphere Isolates">Rhizospheric PGPR</option>
                        <option value="Culture Protocol">Culture Protocol</option>
                        <option value="Metagenomic Reads">Metagenomic Reads</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Mock File Size</label>
                      <input
                        type="text"
                        value={fileSizeStr}
                        onChange={(e) => setFileSizeStr(e.target.value)}
                        placeholder="e.g. 15.4 MB"
                        className="w-full p-2 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Metadata Description *</label>
                    <textarea
                      required
                      value={fileDesc}
                      onChange={(e) => setFileDesc(e.target.value)}
                      placeholder="Include morphological, biochemical, or antibiogram notes for reference..."
                      className="w-full p-2 border border-line rounded-lg text-xs bg-bg h-24 focus:outline-none focus:border-teal resize-y"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-ink-soft uppercase font-bold">Shareable Download URL</label>
                    <input
                      type="url"
                      value={fileDownloadUrl}
                      onChange={(e) => setFileDownloadUrl(e.target.value)}
                      className="w-full p-2 border border-line rounded-lg text-xs bg-bg focus:outline-none focus:border-teal font-mono text-[10px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-teal hover:bg-teal-deep text-white font-bold text-xs rounded-lg uppercase tracking-wider cursor-pointer transition-all"
                  >
                    Upload Metadata to Firestore
                  </button>

                  {uploadStatus && (
                    <div className="bg-teal-pale text-teal-deep border border-teal/10 p-2.5 rounded-lg text-center text-[10px] font-mono">
                      {uploadStatus}
                    </div>
                  )}
                </form>

                {/* Local Task board */}
                <div className="bg-paper border border-line p-6 rounded-2xl space-y-4">
                  <h3 className="font-serif font-bold text-base text-teal-deep flex items-center gap-1.5 border-b border-line pb-2">
                    <ClipboardList className="w-5 h-5 text-teal" />
                    Active Bench Tasks
                  </h3>
                  <form onSubmit={handleAddTask} className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Add new bench task..."
                      className="p-2 border border-line rounded-lg text-xs bg-bg grow focus:outline-none focus:border-teal"
                    />
                    <button type="submit" className="bg-gold text-white p-2 rounded-lg hover:bg-amber-800 shrink-0 cursor-pointer">
                      <Plus className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                          task.status === 'completed'
                            ? 'bg-emerald-50/50 border-emerald-100 text-ink-faint line-through'
                            : task.status === 'in-progress'
                            ? 'bg-amber-50/30 border-amber-100'
                            : 'bg-bg border-line hover:border-teal'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 max-w-[200px] sm:max-w-xs">
                          <button
                            type="button"
                            className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                              task.status === 'completed' ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-line bg-white'
                            }`}
                          >
                            {task.status === 'completed' && <Check className="w-3 h-3" />}
                          </button>
                          <span className="text-xs font-medium truncate">{task.title}</span>
                        </div>
                        <div className="text-right font-mono text-[9px] text-ink-faint uppercase font-bold shrink-0">
                          {task.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data listing files */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-faint">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search secure database archives..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-line rounded-xl bg-bg text-xs focus:outline-none focus:border-teal shadow-xs"
                  />
                </div>

                {loadingFiles ? (
                  <div className="py-12 text-center space-y-2">
                    <RefreshCw className="w-8 h-8 text-teal animate-spin mx-auto" />
                    <p className="text-xs text-ink-soft">Fetching database coordinates...</p>
                  </div>
                ) : filteredFiles.length === 0 ? (
                  <div className="py-12 text-center space-y-2 border border-dashed border-line rounded-2xl bg-bg/40">
                    <AlertCircle className="w-8 h-8 text-ink-faint mx-auto" />
                    <p className="text-xs text-ink-soft font-semibold">No secure logs found in Firestore</p>
                    <p className="text-[10px] text-ink-faint max-w-sm mx-auto">
                      Fill out the form on the left to sync research runs.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4" id="secure-internal-logs-list">
                    {filteredFiles.map((file) => (
                      <div
                        key={file.id}
                        className="bg-paper border border-line rounded-2xl p-5 hover:border-teal hover:shadow-xs transition-all space-y-3"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-[9px] text-teal font-bold bg-teal-pale px-2 py-0.5 rounded-full">
                                {file.category}
                              </span>
                              <span className="text-[10px] font-mono text-ink-faint">
                                {new Date(file.uploadedAt).toLocaleDateString()}
                              </span>
                            </div>
                            <h4 className="font-serif font-bold text-teal-deep text-base">{file.title}</h4>
                            <p className="text-xs text-ink-soft leading-relaxed">{file.description}</p>
                          </div>
                          <span className="font-mono text-[10px] text-gold bg-gold-pale/30 px-2 py-0.5 rounded font-bold shrink-0">
                            {file.fileSize || 'N/A'}
                          </span>
                        </div>

                        <div className="pt-3 border-t border-line/40 flex justify-between items-center text-[10px] font-mono text-ink-faint">
                          <span>Logged By: <strong className="text-ink-soft">{file.uploadedBy}</strong></span>
                          {file.downloadUrl && (
                            <a
                              href={file.downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-teal font-bold hover:underline flex items-center gap-0.5"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              Download Raw Reads
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
