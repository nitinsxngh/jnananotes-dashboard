/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Missing MONGO_URI in environment');
}

const SectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  { _id: true }
);

const ChapterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sections: { type: [SectionSchema], default: [] },
  },
  { _id: true }
);

const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    chapters: { type: [ChapterSchema], default: [] },
  },
  { _id: true }
);

const SyllabusSchema = new mongoose.Schema(
  {
    subjects: { type: [SubjectSchema], default: [] },
  },
  { _id: false }
);

const ExamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, trim: true },
    syllabus: { type: SyllabusSchema, default: () => ({ subjects: [] }) },
  },
  { _id: true }
);

const MajorExamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, trim: true },
    exams: { type: [ExamSchema], default: [] },
  },
  { timestamps: true }
);

const MajorExamModel = mongoose.model('MajorExam', MajorExamSchema);

function sections(names) {
  return names.map((name) => ({ name }));
}

const seedData = [
  {
    name: 'Teaching',
    code: 'TEACHING',
    exams: [
      {
        name: 'GPSTR',
        code: 'GPSTR',
        syllabus: {
          subjects: [
            {
              name: 'General Knowledge (History)',
              chapters: [
                { name: 'Ancient', sections: sections(['Indus Valley Civilization']) },
                { name: 'Medieval', sections: sections(['Kingdoms & Empires']) },
                { name: 'Modern', sections: sections(['Freedom Struggle']) },
              ],
            },
            {
              name: 'General Knowledge (Geography)',
              chapters: [
                { name: 'Physical', sections: sections(['Earth & Landforms']) },
                { name: 'Indian', sections: sections(['Climate & Resources']) },
                { name: 'World', sections: sections(['Continents & Oceans']) },
              ],
            },
            {
              name: 'General Knowledge (Polity)',
              chapters: [
                { name: 'Indian Constitution', sections: sections(['Basics']) },
                { name: 'Governance', sections: sections(['President, PM']) },
                { name: 'Panchayati Raj', sections: sections(['Local Governance']) },
              ],
            },
            {
              name: 'General Knowledge (Economics)',
              chapters: [
                { name: 'Basic Concepts', sections: sections(['Demand & Supply']) },
                { name: 'Indian Economy', sections: sections(['Development']) },
              ],
            },
            {
              name: 'General Knowledge (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Recent Events']) },
                { name: 'State', sections: sections(['State-Level Events']) },
              ],
            },
            {
              name: 'English (Grammar)',
              chapters: [
                { name: 'Parts of Speech', sections: sections(['Noun, Pronoun, Verb']) },
                { name: 'Tenses', sections: sections(['Rules']) },
                { name: 'Subject-Verb Agreement', sections: sections(['Rules']) },
                { name: 'Articles & Prepositions', sections: sections(['Usage']) },
              ],
            },
            {
              name: 'English (Vocabulary)',
              chapters: [
                { name: 'Synonyms & Antonyms', sections: sections(['Word Meaning']) },
                { name: 'Idioms & Phrases', sections: sections(['Usage']) },
              ],
            },
            {
              name: 'English (Comprehension)',
              chapters: [
                { name: 'Reading Comprehension', sections: sections(['Passage Based']) },
                { name: 'Error Detection', sections: sections(['Grammar Errors']) },
              ],
            },
            {
              name: 'Kannada (Grammar)',
              chapters: [{ name: 'Vyakarana', sections: sections(['Basic Rules']) }],
            },
            {
              name: 'Kannada (Vocabulary)',
              chapters: [{ name: 'Shabda', sections: sections(['Word Meaning']) }],
            },
            {
              name: 'Kannada (Comprehension)',
              chapters: [{ name: 'Reading', sections: sections(['Passage Based']) }],
            },
            {
              name: 'Education (Child Development)',
              chapters: [
                { name: 'Growth & Development', sections: sections(['Stages']) },
                { name: 'Learning', sections: sections(['Theories']) },
              ],
            },
            {
              name: 'Education (Psychology)',
              chapters: [
                { name: 'Intelligence', sections: sections(['Theories']) },
                { name: 'Motivation', sections: sections(['Concepts']) },
              ],
            },
            {
              name: 'Education (Pedagogy)',
              chapters: [
                { name: 'Teaching Methods', sections: sections(['Approaches']) },
                { name: 'Classroom Management', sections: sections(['Techniques']) },
                { name: 'Evaluation', sections: sections(['Assessment Methods']) },
              ],
            },
            {
              name: 'Subject (Mathematics)',
              chapters: [
                { name: 'Algebra', sections: sections(['Equations']) },
                { name: 'Geometry', sections: sections(['Shapes']) },
                { name: 'Trigonometry', sections: sections(['Basic Concepts']) },
                { name: 'Statistics', sections: sections(['Data Analysis']) },
              ],
            },
            {
              name: 'Subject (Science)',
              chapters: [
                { name: 'Physics', sections: sections(['Basic Concepts']) },
                { name: 'Chemistry', sections: sections(['Basic Concepts']) },
                { name: 'Biology', sections: sections(['Basic Concepts']) },
              ],
            },
            {
              name: 'Subject (Social Science)',
              chapters: [
                { name: 'History', sections: sections(['Ancient to Modern']) },
                { name: 'Geography', sections: sections(['India & World']) },
                { name: 'Civics', sections: sections(['Polity']) },
              ],
            },
            {
              name: 'Subject (Language)',
              chapters: [
                { name: 'Grammar', sections: sections(['Rules']) },
                { name: 'Literature', sections: sections(['Prose & Poetry']) },
                { name: 'Comprehension', sections: sections(['Passage']) },
              ],
            },
          ],
        },
      },
      {
        name: 'KPSC',
        code: 'KPSC',
        syllabus: {
          subjects: [
            {
              name: 'Prelims (General Studies I)',
              chapters: [
                { name: 'Current Affairs', sections: sections(['National & Karnataka Events']) },
                { name: 'History', sections: sections(['Ancient, Medieval, Modern India', 'Karnataka History']) },
                { name: 'Geography', sections: sections(['Indian Geography', 'Karnataka Geography']) },
                { name: 'Polity', sections: sections(['Indian Constitution']) },
                { name: 'Economy', sections: sections(['Indian Economy']) },
                { name: 'Environment', sections: sections(['Ecology & Biodiversity']) },
                { name: 'Science', sections: sections(['General Science']) },
              ],
            },
            {
              name: 'Prelims (CSAT)',
              chapters: [
                { name: 'Comprehension', sections: sections(['Reading Skills']) },
                { name: 'Reasoning', sections: sections(['Logical & Analytical Ability']) },
                { name: 'Decision Making', sections: sections(['Problem Solving']) },
                { name: 'Numeracy', sections: sections(['Basic Mathematics']) },
                { name: 'Data Interpretation', sections: sections(['Charts, Graphs']) },
              ],
            },
            {
              name: 'Mains (GS I)',
              chapters: [
                { name: 'History', sections: sections(['Modern India', 'Karnataka History']) },
                { name: 'Culture', sections: sections(['Art & Culture']) },
                { name: 'Geography', sections: sections(['Indian Geography', 'Karnataka Geography']) },
              ],
            },
            {
              name: 'Mains (GS II)',
              chapters: [
                { name: 'Polity', sections: sections(['Constitution & Governance']) },
                { name: 'Administration', sections: sections(['Public Administration']) },
                { name: 'Social Justice', sections: sections(['Welfare Schemes']) },
                { name: 'International Relations', sections: sections(['India & World']) },
              ],
            },
            {
              name: 'Mains (GS III)',
              chapters: [
                { name: 'Economy', sections: sections(['Development & Planning']) },
                { name: 'Agriculture', sections: sections(['Policies']) },
                { name: 'Science & Technology', sections: sections(['Applications']) },
                { name: 'Environment', sections: sections(['Climate Change']) },
                { name: 'Disaster Management', sections: sections(['Concepts']) },
              ],
            },
            {
              name: 'Mains (GS IV)',
              chapters: [
                { name: 'Ethics', sections: sections(['Integrity & Aptitude']) },
                { name: 'Values', sections: sections(['Human Values']) },
                { name: 'Case Studies', sections: sections(['Decision Making']) },
              ],
            },
            {
              name: 'Mains (Optional)',
              chapters: [{ name: 'Subjects', sections: sections(['History', 'Geography', 'Public Administration', 'Economics', 'Sociology', 'Political Science']) }],
            },
            {
              name: 'Mains (Language)',
              chapters: [
                { name: 'Kannada', sections: sections(['Comprehension & Essay']) },
                { name: 'English', sections: sections(['Comprehension & Essay']) },
              ],
            },
            {
              name: 'Interview (Personality Test)',
              chapters: [{ name: 'Assessment', sections: sections(['Personality Traits', 'Decision Making', 'General Awareness']) }],
            },
          ],
        },
      },
      {
        name: 'UGC NET / KSET',
        code: 'UGC_NET_KSET',
        syllabus: {
          subjects: [
            {
              name: 'Paper I (Teaching Aptitude)',
              chapters: [
                { name: 'Teaching Methods', sections: sections(['Approaches']) },
                { name: 'Learning', sections: sections(['Theories']) },
                { name: 'Evaluation', sections: sections(['Assessment Systems']) },
              ],
            },
            {
              name: 'Paper I (Research Aptitude)',
              chapters: [
                { name: 'Research Methods', sections: sections(['Types']) },
                { name: 'Data Collection', sections: sections(['Tools']) },
                { name: 'Research Ethics', sections: sections(['Concepts']) },
              ],
            },
            {
              name: 'Paper I (Comprehension)',
              chapters: [{ name: 'Reading', sections: sections(['Passage Analysis']) }],
            },
            {
              name: 'Paper I (Communication)',
              chapters: [
                { name: 'Types', sections: sections(['Verbal & Non-Verbal']) },
                { name: 'Barriers', sections: sections(['Communication Barriers']) },
              ],
            },
            {
              name: 'Paper I (Mathematical Reasoning)',
              chapters: [
                { name: 'Number Series', sections: sections(['Patterns']) },
                { name: 'Coding-Decoding', sections: sections(['Logic']) },
                { name: 'Logical Reasoning', sections: sections(['Syllogism']) },
              ],
            },
            {
              name: 'Paper I (Logical Reasoning)',
              chapters: [
                { name: 'Arguments', sections: sections(['Structure']) },
                { name: 'Inference', sections: sections(['Deduction']) },
              ],
            },
            {
              name: 'Paper I (Data Interpretation)',
              chapters: [
                { name: 'Tables', sections: sections(['Analysis']) },
                { name: 'Graphs', sections: sections(['Charts']) },
              ],
            },
            {
              name: 'Paper I (ICT)',
              chapters: [
                { name: 'Computer Basics', sections: sections(['Hardware & Software']) },
                { name: 'Internet', sections: sections(['Applications']) },
              ],
            },
            {
              name: 'Paper I (Environment)',
              chapters: [
                { name: 'Development', sections: sections(['Concepts']) },
                { name: 'Environment', sections: sections(['Pollution & Conservation']) },
              ],
            },
            {
              name: 'Paper I (Higher Education)',
              chapters: [
                { name: 'Structure', sections: sections(['Indian Education System']) },
                { name: 'Policies', sections: sections(['Regulations']) },
              ],
            },
            {
              name: 'Paper II (Commerce)',
              chapters: [
                { name: 'Accounting', sections: sections(['Financial Accounting']) },
                { name: 'Business Studies', sections: sections(['Management']) },
                { name: 'Economics', sections: sections(['Micro & Macro']) },
              ],
            },
            {
              name: 'Paper II (Management)',
              chapters: [
                { name: 'HRM', sections: sections(['Concepts']) },
                { name: 'Marketing', sections: sections(['Concepts']) },
                { name: 'Finance', sections: sections(['Basics']) },
              ],
            },
            {
              name: 'Paper II (Economics)',
              chapters: [
                { name: 'Microeconomics', sections: sections(['Consumer Theory']) },
                { name: 'Macroeconomics', sections: sections(['National Income']) },
                { name: 'Indian Economy', sections: sections(['Development']) },
              ],
            },
            {
              name: 'Paper II (History)',
              chapters: [
                { name: 'Ancient', sections: sections(['Early Civilizations']) },
                { name: 'Medieval', sections: sections(['Empires']) },
                { name: 'Modern', sections: sections(['Freedom Struggle']) },
              ],
            },
            {
              name: 'Paper II (Political Science)',
              chapters: [
                { name: 'Political Theory', sections: sections(['Concepts']) },
                { name: 'Indian Politics', sections: sections(['Constitution']) },
                { name: 'International Relations', sections: sections(['Theories']) },
              ],
            },
            {
              name: 'Paper II (Sociology)',
              chapters: [
                { name: 'Theories', sections: sections(['Classical']) },
                { name: 'Indian Society', sections: sections(['Structure']) },
                { name: 'Social Change', sections: sections(['Concepts']) },
              ],
            },
            {
              name: 'Paper II (English)',
              chapters: [
                { name: 'Literature', sections: sections(['British Literature', 'American Literature']) },
                { name: 'Criticism', sections: sections(['Literary Theory']) },
              ],
            },
            {
              name: 'Paper II (Computer Science)',
              chapters: [
                { name: 'Programming', sections: sections(['Data Structures']) },
                { name: 'Database', sections: sections(['DBMS']) },
                { name: 'Networks', sections: sections(['Computer Networks']) },
              ],
            },
          ],
        },
      },
    ],
  },
];

async function run() {
  await mongoose.connect(MONGO_URI);

  for (const major of seedData) {
    await MajorExamModel.findOneAndUpdate(
      { code: major.code || major.name },
      { name: major.name, code: major.code, exams: major.exams },
      { upsert: true, new: true }
    );
  }

  await mongoose.disconnect();
  console.log('Seed completed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

