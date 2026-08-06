export type TuitionMode = "Home Tuition" | "Online Tuition";
export type GenderPref = "Any" | "Female" | "Male";

export type Tuition = {
  id: string;
  code: string;
  grade: string;
  subjects: string;
  board: string;
  mode: TuitionMode;
  city: string;
  area: string;
  address: string;
  timings: string;
  budget: number;
  gender: GenderPref;
  notes: string;
  applicants: number;
  postedAt: string;
  status: "Approved" | "Under Review" | "Closed and Hired" | "On Hold";
  distanceKm: number;
  sessionsPerWeek: number;
};

export const CITIES = ["Karachi", "Lahore", "Islamabad", "Hyderabad", "Rawalpindi", "Multan"];

export const tuitions: Tuition[] = [
  {
    id: "t1",
    code: "KT-20233830",
    grade: "Class 1 & KG 2",
    subjects: "All subjects",
    board: "Oxford + Sindh",
    mode: "Home Tuition",
    city: "Karachi",
    area: "Gulistan-e-Johar",
    address: "Block 9, near Sindh Baloch Society, Pehlwan Goth",
    timings: "6:00 PM – 8:00 PM",
    budget: 12000,
    gender: "Female",
    notes: "Two siblings, prefers a patient female tutor with early-years experience.",
    applicants: 4,
    postedAt: "2026-08-05T15:49:00Z",
    status: "Approved",
    distanceKm: 3.2,
    sessionsPerWeek: 5,
  },
  {
    id: "t2",
    code: "KT-20233832",
    grade: "Grade 4",
    subjects: "All subjects",
    board: "Cambridge",
    mode: "Home Tuition",
    city: "Karachi",
    area: "Gulistan-e-Johar",
    address: "Block 7, near Chase Plus / Rehmania Mosque",
    timings: "5:00 PM – 6:30 PM",
    budget: 18000,
    gender: "Any",
    notes: "Needs help with Maths confidence and weekly progress reports.",
    applicants: 7,
    postedAt: "2026-08-05T11:20:00Z",
    status: "Approved",
    distanceKm: 5.8,
    sessionsPerWeek: 4,
  },
  {
    id: "t3",
    code: "KT-20233834",
    grade: "IGCSE",
    subjects: "Physics, Chemistry",
    board: "Cambridge",
    mode: "Online Tuition",
    city: "Islamabad",
    area: "F-11",
    address: "Online — Zoom sessions",
    timings: "8:00 PM – 9:30 PM",
    budget: 35000,
    gender: "Male",
    notes: "Exam prep for May series. Past-paper drilling required.",
    applicants: 12,
    postedAt: "2026-08-04T09:05:00Z",
    status: "Approved",
    distanceKm: 0,
    sessionsPerWeek: 3,
  },
  {
    id: "t4",
    code: "KT-20233836",
    grade: "Grade 10",
    subjects: "English, Urdu",
    board: "Federal Board",
    mode: "Home Tuition",
    city: "Lahore",
    area: "DHA Phase 5",
    address: "Street 12, near Jalal Sons",
    timings: "4:00 PM – 5:30 PM",
    budget: 22000,
    gender: "Female",
    notes: "Board exams in March. Focus on writing and comprehension.",
    applicants: 3,
    postedAt: "2026-08-03T13:40:00Z",
    status: "Under Review",
    distanceKm: 9.4,
    sessionsPerWeek: 3,
  },
  {
    id: "t5",
    code: "KT-20233829",
    grade: "IGCSE",
    subjects: "Arabic as a foreign language 0544",
    board: "Cambridge",
    mode: "Online Tuition",
    city: "Hyderabad",
    area: "Latifabad",
    address: "Online — Google Meet",
    timings: "7:00 PM – 8:00 PM",
    budget: 26000,
    gender: "Any",
    notes: "Specialist subject, flexible schedule.",
    applicants: 2,
    postedAt: "2026-07-30T18:10:00Z",
    status: "Closed and Hired",
    distanceKm: 0,
    sessionsPerWeek: 2,
  },
  {
    id: "t6",
    code: "KT-20233841",
    grade: "O-Levels",
    subjects: "Mathematics D",
    board: "Cambridge",
    mode: "Home Tuition",
    city: "Karachi",
    area: "Bahadurabad",
    address: "Near Dhoraji Colony roundabout",
    timings: "6:30 PM – 8:00 PM",
    budget: 30000,
    gender: "Male",
    notes: "Twins, one hour each. Strong grasp of variants required.",
    applicants: 9,
    postedAt: "2026-08-06T05:15:00Z",
    status: "Approved",
    distanceKm: 7.1,
    sessionsPerWeek: 4,
  },
];

export type Stage =
  | "Screening"
  | "Short Listed"
  | "Interview"
  | "Demo Session"
  | "Hired"
  | "Not Selected";

export const STAGES: { key: Stage; hint: string }[] = [
  { key: "Screening", hint: "Coordinator reviewing your profile" },
  { key: "Short Listed", hint: "You made the parent's shortlist" },
  { key: "Interview", hint: "Call scheduled with the family" },
  { key: "Demo Session", hint: "Trial class booked" },
  { key: "Hired", hint: "Confirmed and running" },
  { key: "Not Selected", hint: "Closed for this cycle" },
];

export type Application = {
  id: string;
  code: string;
  title: string;
  city: string;
  stage: Stage;
  updatedAt: string;
  fee: number;
  next?: string;
};

export const applications: Application[] = [
  {
    id: "a1",
    code: "KT-20233830",
    title: "Class 1 & KG 2 — All subjects",
    city: "Karachi",
    stage: "Screening",
    updatedAt: "2026-08-06T06:10:00Z",
    fee: 12000,
    next: "Awaiting coordinator review",
  },
  {
    id: "a2",
    code: "KT-20233832",
    title: "Grade 4 — All subjects",
    city: "Karachi",
    stage: "Short Listed",
    updatedAt: "2026-08-05T16:00:00Z",
    fee: 18000,
    next: "Parent choosing between 3 tutors",
  },
  {
    id: "a3",
    code: "KT-20233834",
    title: "IGCSE — Physics, Chemistry",
    city: "Islamabad",
    stage: "Interview",
    updatedAt: "2026-08-06T07:30:00Z",
    fee: 35000,
    next: "Call today, 9:00 PM",
  },
  {
    id: "a4",
    code: "KT-20233841",
    title: "O-Levels — Mathematics D",
    city: "Karachi",
    stage: "Demo Session",
    updatedAt: "2026-08-06T08:00:00Z",
    fee: 30000,
    next: "Demo Friday, 6:30 PM",
  },
  {
    id: "a5",
    code: "KT-20233829",
    title: "IGCSE — Arabic 0544",
    city: "Hyderabad",
    stage: "Hired",
    updatedAt: "2026-07-31T10:00:00Z",
    fee: 26000,
    next: "Running since 1 Aug",
  },
  {
    id: "a6",
    code: "KT-20233821",
    title: "Grade 8 — Science",
    city: "Lahore",
    stage: "Not Selected",
    updatedAt: "2026-07-22T10:00:00Z",
    fee: 15000,
  },
];

export type HiredTuition = {
  id: string;
  code: string;
  student: string;
  grade: string;
  subjects: string;
  city: string;
  mode: TuitionMode;
  fee: number;
  startedOn: string;
  sessionsDone: number;
  sessionsPlanned: number;
  nextSession: string;
  attendanceRate: number;
};

export const hired: HiredTuition[] = [
  {
    id: "h1",
    code: "KT-20233829",
    student: "Zainab R.",
    grade: "IGCSE",
    subjects: "Arabic 0544",
    city: "Hyderabad",
    mode: "Online Tuition",
    fee: 26000,
    startedOn: "2026-08-01",
    sessionsDone: 6,
    sessionsPlanned: 8,
    nextSession: "Today, 7:00 PM",
    attendanceRate: 100,
  },
  {
    id: "h2",
    code: "KT-20233812",
    student: "Ahmed K.",
    grade: "Grade 6",
    subjects: "Maths, Science",
    city: "Karachi",
    mode: "Home Tuition",
    fee: 20000,
    startedOn: "2026-05-12",
    sessionsDone: 42,
    sessionsPlanned: 48,
    nextSession: "Tomorrow, 5:00 PM",
    attendanceRate: 94,
  },
  {
    id: "h3",
    code: "KT-20233798",
    student: "Hira S.",
    grade: "O-Levels",
    subjects: "Physics",
    city: "Karachi",
    mode: "Online Tuition",
    fee: 28000,
    startedOn: "2026-03-02",
    sessionsDone: 66,
    sessionsPlanned: 72,
    nextSession: "Sat, 11:00 AM",
    attendanceRate: 97,
  },
];

export type Session = {
  id: string;
  student: string;
  subject: string;
  day: string;
  time: string;
  mode: TuitionMode;
  status: "Upcoming" | "Completed" | "Missed";
};

export const sessions: Session[] = [
  { id: "s1", student: "Zainab R.", subject: "Arabic 0544", day: "Today", time: "7:00 PM", mode: "Online Tuition", status: "Upcoming" },
  { id: "s2", student: "Ahmed K.", subject: "Maths", day: "Today", time: "5:00 PM", mode: "Home Tuition", status: "Completed" },
  { id: "s3", student: "Hira S.", subject: "Physics", day: "Tomorrow", time: "11:00 AM", mode: "Online Tuition", status: "Upcoming" },
  { id: "s4", student: "Ahmed K.", subject: "Science", day: "Tomorrow", time: "5:00 PM", mode: "Home Tuition", status: "Upcoming" },
  { id: "s5", student: "Zainab R.", subject: "Arabic 0544", day: "Friday", time: "7:00 PM", mode: "Online Tuition", status: "Upcoming" },
  { id: "s6", student: "Hira S.", subject: "Physics", day: "Saturday", time: "11:00 AM", mode: "Online Tuition", status: "Upcoming" },
];

export type Payout = {
  id: string;
  month: string;
  amount: number;
  status: "Paid" | "Processing" | "Scheduled";
  paidOn?: string;
  method: string;
};

export const payouts: Payout[] = [
  { id: "p1", month: "July 2026", amount: 74000, status: "Paid", paidOn: "3 Aug 2026", method: "Meezan •••• 4821" },
  { id: "p2", month: "June 2026", amount: 68000, status: "Paid", paidOn: "3 Jul 2026", method: "Meezan •••• 4821" },
  { id: "p3", month: "May 2026", amount: 52000, status: "Paid", paidOn: "4 Jun 2026", method: "Meezan •••• 4821" },
  { id: "p4", month: "August 2026", amount: 34000, status: "Processing", method: "Meezan •••• 4821" },
];

export const earningsTrend = [
  { month: "Feb", amount: 18000 },
  { month: "Mar", amount: 31000 },
  { month: "Apr", amount: 44000 },
  { month: "May", amount: 52000 },
  { month: "Jun", amount: 68000 },
  { month: "Jul", amount: 74000 },
];

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: "match" | "stage" | "payout" | "session" | "system";
  unread: boolean;
};

export const notifications: Notification[] = [
  { id: "n1", title: "New match near you", body: "O-Levels Maths D in Bahadurabad — 7.1 km away, PKR 30,000/mo.", time: "12 min ago", kind: "match", unread: true },
  { id: "n2", title: "Interview scheduled", body: "KT-20233834 — call with the family today at 9:00 PM.", time: "1 hr ago", kind: "stage", unread: true },
  { id: "n3", title: "Demo confirmed", body: "KT-20233841 demo session set for Friday 6:30 PM.", time: "3 hrs ago", kind: "session", unread: true },
  { id: "n4", title: "Payout on the way", body: "PKR 34,000 for August is being processed.", time: "Yesterday", kind: "payout", unread: false },
  { id: "n5", title: "Verify your CNIC", body: "One document left to unlock the Verified Tutor badge.", time: "2 days ago", kind: "system", unread: false },
];

export const tutor = {
  name: "Ali Raza",
  email: "ali.raza@keeptutors.pk",
  phone: "+92 300 1234567",
  city: "Karachi",
  rating: 4.8,
  reviewCount: 37,
  subjects: ["Mathematics", "Physics", "Arabic"],
  grades: ["Grade 1–8", "O-Levels", "IGCSE"],
  experienceYears: 6,
  responseMinutes: 14,
  acceptanceRate: 82,
  verified: false,
  bio: "Six years of teaching Maths and Physics across Cambridge and Federal boards. Patient with early-years learners, exam-focused with senior students.",
};

export const profileChecklist = [
  { label: "Basic details", done: true },
  { label: "Subjects & grades", done: true },
  { label: "Bank details", done: true },
  { label: "Profile photo", done: true },
  { label: "CNIC verification", done: false },
  { label: "Degree / transcript", done: false },
  { label: "Intro video", done: false },
];

export const reviews = [
  { id: "r1", parent: "Mrs. Farah", stars: 5, text: "Ali is punctual and my son's Maths grade jumped two levels in a term.", when: "2 weeks ago" },
  { id: "r2", parent: "Mr. Bilal", stars: 5, text: "Very structured. Sends a short progress note after every session.", when: "1 month ago" },
  { id: "r3", parent: "Mrs. Sana", stars: 4, text: "Great with exam prep. Occasionally reschedules but always informs early.", when: "2 months ago" },
];

export const importantLinks = [
  { label: "Tutor Handbook", desc: "Standards, conduct and session etiquette", href: "#" },
  { label: "Fee & Commission Policy", desc: "How payouts and deductions work", href: "#" },
  { label: "Demo Session Guide", desc: "Win more demos with this checklist", href: "#" },
  { label: "Report an Issue", desc: "Escalate to the operations team", href: "#" },
  { label: "WhatsApp Support", desc: "Mon–Sat, 10 AM – 8 PM", href: "#" },
];

export const currency = (n: number) =>
  `PKR ${n.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;
