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
    name: 'UPSC',
    code: 'UPSC',
    exams: [
      {
        name: 'UPSC CSE',
        code: 'UPSC_CSE',
        syllabus: {
          subjects: [
            {
              name: 'Prelims (General Studies)',
              chapters: [
                { name: 'Current Affairs', sections: sections(['National & International Events']) },
                { name: 'History', sections: sections(['Ancient, Medieval, Modern India', 'Indian National Movement']) },
                { name: 'Geography', sections: sections(['Physical Geography', 'Indian & World Geography']) },
                { name: 'Polity', sections: sections(['Constitution, Governance, Rights']) },
                { name: 'Economy', sections: sections(['Economic & Social Development']) },
                { name: 'Environment', sections: sections(['Ecology, Biodiversity, Climate Change']) },
                { name: 'Science', sections: sections(['General Science']) },
              ],
            },
            {
              name: 'Prelims (CSAT)',
              chapters: [
                { name: 'Comprehension', sections: sections(['Reading Skills']) },
                { name: 'Interpersonal Skills', sections: sections(['Communication']) },
                { name: 'Reasoning', sections: sections(['Logical & Analytical Ability']) },
                { name: 'Decision Making', sections: sections(['Problem Solving']) },
                { name: 'Numeracy', sections: sections(['Basic Mathematics (Class X Level)']) },
                { name: 'Data Interpretation', sections: sections(['Charts, Graphs, Tables']) },
              ],
            },
            {
              name: 'Mains (Language)',
              chapters: [
                { name: 'Indian Language', sections: sections(['Comprehension, Essay, Translation']) },
                { name: 'English', sections: sections(['Comprehension, Precis, Writing']) },
              ],
            },
            {
              name: 'Mains (Essay)',
              chapters: [{ name: 'Essay Writing', sections: sections(['Philosophical, Social, Economic Topics']) }],
            },
            {
              name: 'Mains (GS I)',
              chapters: [
                { name: 'Culture', sections: sections(['Indian Heritage & Art Forms']) },
                { name: 'History', sections: sections(['Modern India, Freedom Struggle', 'World History']) },
                { name: 'Society', sections: sections(['Indian Society & Diversity']) },
                { name: 'Geography', sections: sections(['Physical & Human Geography']) },
              ],
            },
            {
              name: 'Mains (GS II)',
              chapters: [
                { name: 'Polity', sections: sections(['Constitution, Amendments, Bodies']) },
                { name: 'Governance', sections: sections(['Policies, Welfare Schemes']) },
                { name: 'Social Justice', sections: sections(['Health, Education, Welfare']) },
                { name: 'International Relations', sections: sections(['India & World Relations']) },
              ],
            },
            {
              name: 'Mains (GS III)',
              chapters: [
                { name: 'Economy', sections: sections(['Growth, Development, Budget']) },
                { name: 'Agriculture', sections: sections(['Farming, Subsidies, MSP']) },
                { name: 'Science & Technology', sections: sections(['Developments & Applications']) },
                { name: 'Environment', sections: sections(['Biodiversity, Climate Change']) },
                { name: 'Disaster Management', sections: sections(['Policies & Response']) },
                { name: 'Security', sections: sections(['Internal Security Challenges']) },
              ],
            },
            {
              name: 'Mains (GS IV)',
              chapters: [
                { name: 'Ethics', sections: sections(['Ethics & Human Interface']) },
                { name: 'Integrity', sections: sections(['Values & Attitude']) },
                { name: 'Aptitude', sections: sections(['Emotional Intelligence']) },
                { name: 'Case Studies', sections: sections(['Ethical Decision Making']) },
              ],
            },
            {
              name: 'Interview (Personality Test)',
              chapters: [
                { name: 'Assessment', sections: sections(['Personality Traits', 'Decision Making & Awareness', 'Communication Skills']) },
              ],
            },
          ],
        },
      },
      {
        name: 'UPSC NDA',
        code: 'UPSC_NDA',
        syllabus: {
          subjects: [
            {
              name: 'Mathematics (Algebra)',
              chapters: [
                { name: 'Sets', sections: sections(['Sets & Operations']) },
                { name: 'Relations & Functions', sections: sections(['Concepts']) },
                { name: 'Complex Numbers', sections: sections(['Basic Operations']) },
                { name: 'Quadratic Equations', sections: sections(['Solutions & Roots']) },
                { name: 'Logarithms', sections: sections(['Laws & Applications']) },
              ],
            },
            {
              name: 'Mathematics (Matrices & Determinants)',
              chapters: [
                { name: 'Matrices', sections: sections(['Types & Operations']) },
                { name: 'Determinants', sections: sections(['Properties']) },
              ],
            },
            {
              name: 'Mathematics (Trigonometry)',
              chapters: [
                { name: 'Angles', sections: sections(['Measurement']) },
                { name: 'Identities', sections: sections(['Trigonometric Identities']) },
                { name: 'Heights & Distances', sections: sections(['Applications']) },
              ],
            },
            {
              name: 'Mathematics (Analytical Geometry)',
              chapters: [
                { name: 'Lines', sections: sections(['Straight Lines']) },
                { name: 'Conic Sections', sections: sections(['Circle, Parabola, Ellipse, Hyperbola']) },
              ],
            },
            {
              name: 'Mathematics (Differential Calculus)',
              chapters: [
                { name: 'Limits', sections: sections(['Concepts']) },
                { name: 'Derivatives', sections: sections(['Applications']) },
              ],
            },
            {
              name: 'Mathematics (Integral Calculus)',
              chapters: [
                { name: 'Integration', sections: sections(['Basic Integration']) },
                { name: 'Applications', sections: sections(['Area Under Curve']) },
              ],
            },
            {
              name: 'Mathematics (Vector Algebra)',
              chapters: [{ name: 'Vectors', sections: sections(['Basic Operations']) }],
            },
            {
              name: 'Mathematics (Statistics)',
              chapters: [{ name: 'Data Analysis', sections: sections(['Mean, Median, Mode']) }],
            },
            {
              name: 'Mathematics (Probability)',
              chapters: [{ name: 'Probability', sections: sections(['Basic Concepts']) }],
            },
            {
              name: 'General Ability (English)',
              chapters: [
                { name: 'Grammar', sections: sections(['Usage & Rules']) },
                { name: 'Vocabulary', sections: sections(['Word Meaning']) },
                { name: 'Comprehension', sections: sections(['Passage Based']) },
              ],
            },
            {
              name: 'General Ability (Physics)',
              chapters: [
                { name: 'Mechanics', sections: sections(['Motion & Laws']) },
                { name: 'Work Energy Power', sections: sections(['Concepts']) },
                { name: 'Heat', sections: sections(['Thermodynamics']) },
                { name: 'Light', sections: sections(['Reflection & Refraction']) },
                { name: 'Electricity & Magnetism', sections: sections(['Basics']) },
              ],
            },
            {
              name: 'General Ability (Chemistry)',
              chapters: [
                { name: 'Basic', sections: sections(['Atoms & Molecules']) },
                { name: 'Reactions', sections: sections(['Chemical Reactions']) },
                { name: 'Acids & Bases', sections: sections(['Properties']) },
                { name: 'Periodic Table', sections: sections(['Elements']) },
              ],
            },
            {
              name: 'General Ability (General Science)',
              chapters: [
                { name: 'Biology', sections: sections(['Human Body', 'Plants & Animals']) },
                { name: 'Health', sections: sections(['Diseases & Nutrition']) },
              ],
            },
            {
              name: 'General Ability (History)',
              chapters: [
                { name: 'Ancient', sections: sections(['Early Civilizations']) },
                { name: 'Medieval', sections: sections(['Kingdoms & Empires']) },
                { name: 'Modern', sections: sections(['Freedom Struggle']) },
              ],
            },
            {
              name: 'General Ability (Geography)',
              chapters: [
                { name: 'Physical', sections: sections(['Earth & Landforms']) },
                { name: 'Indian', sections: sections(['Resources & Climate']) },
                { name: 'World', sections: sections(['Continents & Oceans']) },
              ],
            },
            {
              name: 'General Ability (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Recent Events']) },
                { name: 'International', sections: sections(['Global Events']) },
                { name: 'Defence', sections: sections(['Military Exercises & Updates']) },
              ],
            },
            {
              name: 'SSB (Screening)',
              chapters: [
                { name: 'OIR Test', sections: sections(['Verbal & Non-Verbal']) },
                { name: 'PPDT', sections: sections(['Picture Perception & Discussion']) },
              ],
            },
            {
              name: 'SSB (Psychology)',
              chapters: [
                { name: 'TAT', sections: sections(['Thematic Apperception Test']) },
                { name: 'WAT', sections: sections(['Word Association Test']) },
                { name: 'SRT', sections: sections(['Situation Reaction Test']) },
                { name: 'SD', sections: sections(['Self Description']) },
              ],
            },
            {
              name: 'SSB (GTO)',
              chapters: [
                { name: 'Group Discussion', sections: sections(['Topics']) },
                { name: 'Group Planning Exercise', sections: sections(['Problem Solving']) },
                { name: 'Outdoor Tasks', sections: sections(['Obstacle Tasks']) },
                { name: 'Command Task', sections: sections(['Leadership']) },
              ],
            },
            {
              name: 'SSB (Interview)',
              chapters: [{ name: 'Personal Interview', sections: sections(['Personality Assessment']) }],
            },
          ],
        },
      },
      {
        name: 'UPSC CDS',
        code: 'UPSC_CDS',
        syllabus: {
          subjects: [
            {
              name: 'English',
              chapters: [
                { name: 'English (Grammar)', sections: sections(['Parts of Speech', 'Tenses', 'Subject-Verb Agreement', 'Articles & Prepositions']) },
                { name: 'English (Vocabulary)', sections: sections(['Synonyms & Antonyms', 'Idioms & Phrases']) },
                { name: 'English (Comprehension)', sections: sections(['Reading Comprehension', 'Error Detection', 'Sentence Improvement', 'Para Jumbles']) },
              ],
            },
            {
              name: 'General Knowledge (Physics)',
              chapters: [
                { name: 'Mechanics', sections: sections(['Motion & Laws']) },
                { name: 'Work Energy Power', sections: sections(['Concepts']) },
                { name: 'Heat', sections: sections(['Thermodynamics']) },
                { name: 'Light', sections: sections(['Reflection & Refraction']) },
                { name: 'Electricity & Magnetism', sections: sections(['Basics']) },
              ],
            },
            {
              name: 'General Knowledge (Chemistry)',
              chapters: [
                { name: 'Basic', sections: sections(['Atoms & Molecules']) },
                { name: 'Reactions', sections: sections(['Chemical Reactions']) },
                { name: 'Acids & Bases', sections: sections(['Properties']) },
                { name: 'Periodic Table', sections: sections(['Elements']) },
              ],
            },
            {
              name: 'General Knowledge (Biology)',
              chapters: [
                { name: 'Human Body', sections: sections(['Organ Systems']) },
                { name: 'Plants', sections: sections(['Botany Basics']) },
                { name: 'Diseases', sections: sections(['Common Diseases']) },
              ],
            },
            {
              name: 'General Knowledge (History)',
              chapters: [
                { name: 'Ancient', sections: sections(['Early Civilizations']) },
                { name: 'Medieval', sections: sections(['Kingdoms & Empires']) },
                { name: 'Modern', sections: sections(['Freedom Struggle']) },
              ],
            },
            {
              name: 'General Knowledge (Geography)',
              chapters: [
                { name: 'Physical', sections: sections(['Earth & Landforms']) },
                { name: 'Indian', sections: sections(['Resources & Climate']) },
                { name: 'World', sections: sections(['Continents & Oceans']) },
              ],
            },
            {
              name: 'General Knowledge (Polity)',
              chapters: [
                { name: 'Indian Constitution', sections: sections(['Basics']) },
                { name: 'Governance', sections: sections(['President, PM']) },
                { name: 'Parliament', sections: sections(['Lok Sabha & Rajya Sabha']) },
              ],
            },
            {
              name: 'General Knowledge (Economics)',
              chapters: [
                { name: 'Basic Concepts', sections: sections(['Demand & Supply']) },
                { name: 'Banking', sections: sections(['RBI Functions']) },
                { name: 'Budget', sections: sections(['Fiscal Policy']) },
              ],
            },
            {
              name: 'General Knowledge (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Recent Events']) },
                { name: 'International', sections: sections(['Global Events']) },
                { name: 'Defence', sections: sections(['Military Updates']) },
              ],
            },
            {
              name: 'Mathematics',
              chapters: [
                { name: 'Mathematics (Arithmetic)', sections: sections(['Number System', 'Percentage', 'Ratio & Proportion', 'Average', 'Time & Work', 'Time, Speed & Distance']) },
                { name: 'Mathematics (Algebra)', sections: sections(['Equations']) },
                { name: 'Mathematics (Trigonometry)', sections: sections(['Identities']) },
                { name: 'Mathematics (Geometry)', sections: sections(['Lines & Angles']) },
                { name: 'Mathematics (Mensuration)', sections: sections(['2D & 3D Figures']) },
                { name: 'Mathematics (Statistics)', sections: sections(['Data Analysis']) },
                { name: 'Mathematics (Probability)', sections: sections(['Probability']) },
              ],
            },
            {
              name: 'SSB (Screening)',
              chapters: [
                { name: 'OIR Test', sections: sections(['Verbal & Non-Verbal']) },
                { name: 'PPDT', sections: sections(['Picture Perception & Discussion']) },
              ],
            },
            {
              name: 'SSB (Psychology)',
              chapters: [
                { name: 'TAT', sections: sections(['Thematic Apperception Test']) },
                { name: 'WAT', sections: sections(['Word Association Test']) },
                { name: 'SRT', sections: sections(['Situation Reaction Test']) },
                { name: 'SD', sections: sections(['Self Description']) },
              ],
            },
            {
              name: 'SSB (GTO)',
              chapters: [
                { name: 'Group Discussion', sections: sections(['Topics']) },
                { name: 'Group Planning Exercise', sections: sections(['Problem Solving']) },
                { name: 'Outdoor Tasks', sections: sections(['Obstacle Tasks']) },
                { name: 'Command Task', sections: sections(['Leadership']) },
              ],
            },
            {
              name: 'SSB (Interview)',
              chapters: [{ name: 'Personal Interview', sections: sections(['Personality Assessment']) }],
            },
          ],
        },
      },
      {
        name: 'UPSC CAPF',
        code: 'UPSC_CAPF',
        syllabus: {
          subjects: [
            {
              name: 'Paper I (General Ability)',
              chapters: [{ name: 'Reasoning', sections: sections(['Logical Reasoning', 'Analytical Ability', 'Quantitative Aptitude']) }],
            },
            {
              name: 'Paper I (General Science)',
              chapters: [
                { name: 'Physics', sections: sections(['Basic Concepts']) },
                { name: 'Chemistry', sections: sections(['Basic Concepts']) },
                { name: 'Biology', sections: sections(['General Awareness']) },
              ],
            },
            {
              name: 'Paper I (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Events']) },
                { name: 'International', sections: sections(['Events']) },
              ],
            },
            {
              name: 'Paper I (Polity)',
              chapters: [
                { name: 'Constitution', sections: sections(['Basics']) },
                { name: 'Governance', sections: sections(['Political System']) },
              ],
            },
            {
              name: 'Paper I (Economy)',
              chapters: [{ name: 'Basic Concepts', sections: sections(['Economic Development']) }],
            },
            {
              name: 'Paper I (History)',
              chapters: [
                { name: 'Ancient', sections: sections(['Early Civilizations']) },
                { name: 'Medieval', sections: sections(['Kingdoms']) },
                { name: 'Modern', sections: sections(['Freedom Struggle']) },
              ],
            },
            {
              name: 'Paper I (Geography)',
              chapters: [
                { name: 'Physical', sections: sections(['Earth & Landforms']) },
                { name: 'Indian', sections: sections(['Resources & Climate']) },
                { name: 'World', sections: sections(['Continents & Oceans']) },
              ],
            },
            {
              name: 'Paper II (Essay)',
              chapters: [{ name: 'Topics', sections: sections(['Security, Society, Polity']) }],
            },
            {
              name: 'Paper II (Comprehension)',
              chapters: [{ name: 'Reading Comprehension', sections: sections(['Passage Based']) }],
            },
            {
              name: 'Paper II (Language)',
              chapters: [
                { name: 'Grammar', sections: sections(['Basic Rules']) },
                { name: 'Vocabulary', sections: sections(['Usage']) },
                { name: 'Precis Writing', sections: sections(['Summary']) },
              ],
            },
            {
              name: 'Physical (Standards)',
              chapters: [{ name: 'Height & Chest', sections: sections(['Measurements']) }],
            },
            {
              name: 'Physical (Efficiency)',
              chapters: [
                { name: 'Running', sections: sections(['100m, 800m']) },
                { name: 'Long Jump', sections: sections(['Distance']) },
                { name: 'Shot Put', sections: sections(['Throw']) },
              ],
            },
            {
              name: 'Interview (Personality Test)',
              chapters: [{ name: 'Assessment', sections: sections(['Personality Traits', 'Leadership & Decision Making', 'General Awareness']) }],
            },
          ],
        },
      },
      {
        name: 'UPSC ESE',
        code: 'UPSC_ESE',
        syllabus: {
          subjects: [
            {
              name: 'Prelims (Engineering Aptitude)',
              chapters: [
                { name: 'Engineering Mathematics', sections: sections(['Linear Algebra', 'Calculus', 'Differential Equations', 'Probability & Statistics']) },
                { name: 'General Studies', sections: sections(['Current Affairs', 'Engineering Ethics', 'Quality & Reliability', 'Engineering Drawing', 'Basics of Energy & Environment', 'Project Management', 'ICT']) },
              ],
            },
            {
              name: 'Prelims (Civil Engineering)',
              chapters: [
                { name: 'Engineering Mechanics', sections: sections(['Forces & Laws']) },
                { name: 'Structural Analysis', sections: sections(['Beams & Frames']) },
                { name: 'Geotechnical Engineering', sections: sections(['Soil Mechanics']) },
                { name: 'Environmental Engineering', sections: sections(['Water & Waste']) },
                { name: 'Transportation Engineering', sections: sections(['Highways & Railways']) },
                { name: 'Hydrology', sections: sections(['Water Flow']) },
              ],
            },
            {
              name: 'Prelims (Mechanical Engineering)',
              chapters: [
                { name: 'Engineering Mechanics', sections: sections(['Statics & Dynamics']) },
                { name: 'Thermodynamics', sections: sections(['Laws']) },
                { name: 'Fluid Mechanics', sections: sections(['Properties of Fluids']) },
                { name: 'Strength of Materials', sections: sections(['Stress & Strain']) },
                { name: 'Theory of Machines', sections: sections(['Kinematics']) },
                { name: 'Production Engineering', sections: sections(['Manufacturing']) },
              ],
            },
            {
              name: 'Prelims (Electrical Engineering)',
              chapters: [
                { name: 'Basic Electrical', sections: sections(['Ohm’s Law']) },
                { name: 'Electrical Machines', sections: sections(['Transformers']) },
                { name: 'Power Systems', sections: sections(['Generation & Transmission']) },
                { name: 'Control Systems', sections: sections(['Basics']) },
                { name: 'Measurements', sections: sections(['Instruments']) },
              ],
            },
            {
              name: 'Prelims (Electronics)',
              chapters: [
                { name: 'Basic Electronics', sections: sections(['Diodes & Transistors']) },
                { name: 'Digital Electronics', sections: sections(['Logic Gates']) },
                { name: 'Communication', sections: sections(['Signals & Systems']) },
                { name: 'Control Systems', sections: sections(['Basics']) },
                { name: 'Microprocessors', sections: sections(['Basics']) },
              ],
            },
            {
              name: 'Mains (Civil Engineering)',
              chapters: [
                { name: 'Structural Engineering', sections: sections(['Design Concepts']) },
                { name: 'Geotechnical Engineering', sections: sections(['Advanced Soil Mechanics']) },
                { name: 'Environmental Engineering', sections: sections(['Water Supply Systems']) },
                { name: 'Transportation Engineering', sections: sections(['Traffic Engineering']) },
                { name: 'Hydrology', sections: sections(['Advanced Topics']) },
              ],
            },
            {
              name: 'Mains (Mechanical Engineering)',
              chapters: [
                { name: 'Thermodynamics', sections: sections(['Advanced Concepts']) },
                { name: 'Fluid Mechanics', sections: sections(['Advanced Problems']) },
                { name: 'Strength of Materials', sections: sections(['Advanced Analysis']) },
                { name: 'Theory of Machines', sections: sections(['Dynamics']) },
                { name: 'Production Engineering', sections: sections(['Advanced Manufacturing']) },
              ],
            },
            {
              name: 'Mains (Electrical Engineering)',
              chapters: [
                { name: 'Electrical Machines', sections: sections(['Advanced']) },
                { name: 'Power Systems', sections: sections(['Load Flow']) },
                { name: 'Control Systems', sections: sections(['Advanced']) },
                { name: 'Measurements', sections: sections(['Advanced Instruments']) },
              ],
            },
            {
              name: 'Mains (Electronics)',
              chapters: [
                { name: 'Analog Electronics', sections: sections(['Advanced Circuits']) },
                { name: 'Digital Electronics', sections: sections(['Advanced Logic']) },
                { name: 'Communication', sections: sections(['Advanced Systems']) },
                { name: 'Microprocessors', sections: sections(['Advanced Concepts']) },
              ],
            },
            {
              name: 'Interview (Personality Test)',
              chapters: [{ name: 'Assessment', sections: sections(['Technical Knowledge', 'Personality Traits', 'Decision Making']) }],
            },
          ],
        },
      },
      {
        name: 'UPSC CMS',
        code: 'UPSC_CMS',
        syllabus: {
          subjects: [
            {
              name: 'Paper I (General Medicine)',
              chapters: [
                { name: 'Medicine', sections: sections(['Cardiology', 'Respiratory System', 'Gastrointestinal System', 'Neurology', 'Endocrinology', 'Infectious Diseases']) },
                { name: 'Dermatology', sections: sections(['Skin Diseases']) },
                { name: 'Psychiatry', sections: sections(['Mental Disorders']) },
              ],
            },
            {
              name: 'Paper I (Pediatrics)',
              chapters: [
                { name: 'Neonatology', sections: sections(['Newborn Care']) },
                { name: 'Growth & Development', sections: sections(['Milestones']) },
                { name: 'Diseases', sections: sections(['Common Pediatric Diseases']) },
                { name: 'Immunization', sections: sections(['Vaccination Schedule']) },
              ],
            },
            {
              name: 'Paper II (Surgery)',
              chapters: [
                { name: 'General Surgery', sections: sections(['Basic Principles']) },
                { name: 'Orthopedics', sections: sections(['Bones & Joints']) },
                { name: 'Anesthesia', sections: sections(['Basics']) },
                { name: 'Radiology', sections: sections(['Imaging Techniques']) },
              ],
            },
            {
              name: 'Paper II (G&O)',
              chapters: [
                { name: 'Obstetrics', sections: sections(['Pregnancy & Delivery']) },
                { name: 'Gynecology', sections: sections(['Reproductive System']) },
                { name: 'Family Planning', sections: sections(['Methods']) },
                { name: 'Diseases', sections: sections(['Common Disorders']) },
              ],
            },
            {
              name: 'Paper II (PSM)',
              chapters: [
                { name: 'Epidemiology', sections: sections(['Disease Distribution']) },
                { name: 'Biostatistics', sections: sections(['Basic Concepts']) },
                { name: 'Public Health', sections: sections(['Programs & Policies']) },
                { name: 'Nutrition', sections: sections(['Health & Diet']) },
                { name: 'Environmental Health', sections: sections(['Sanitation']) },
              ],
            },
            {
              name: 'Interview (Personality Test)',
              chapters: [{ name: 'Assessment', sections: sections(['Medical Knowledge', 'Decision Making', 'Communication Skills']) }],
            },
          ],
        },
      },
      {
        name: 'IES',
        code: 'UPSC_IES',
        syllabus: {
          subjects: [
            {
              name: 'General English',
              chapters: [
                { name: 'General English (Writing)', sections: sections(['Essay Writing']) },
                { name: 'General English (Comprehension)', sections: sections(['Reading Comprehension']) },
                { name: 'General English (Precis)', sections: sections(['Precis Writing']) },
              ],
            },
            {
              name: 'General Studies',
              chapters: [
                { name: 'General Studies (Polity)', sections: sections(['Indian Constitution']) },
                { name: 'General Studies (Economy)', sections: sections(['Indian Economy']) },
                { name: 'General Studies (History)', sections: sections(['Modern India']) },
                { name: 'General Studies (Geography)', sections: sections(['Indian Geography']) },
                { name: 'General Studies (Current Affairs)', sections: sections(['National & International']) },
              ],
            },
            {
              name: 'Economics I (Microeconomics)',
              chapters: [
                { name: 'Consumer Theory', sections: sections(['Utility']) },
                { name: 'Production', sections: sections(['Functions']) },
                { name: 'Market Structure', sections: sections(['Perfect & Imperfect Competition']) },
                { name: 'Welfare Economics', sections: sections(['Concepts']) },
              ],
            },
            {
              name: 'Economics II (Macroeconomics)',
              chapters: [
                { name: 'National Income', sections: sections(['Measurement']) },
                { name: 'Money & Banking', sections: sections(['Concepts']) },
                { name: 'Inflation', sections: sections(['Types']) },
                { name: 'IS-LM Model', sections: sections(['Analysis']) },
              ],
            },
            {
              name: 'Economics III',
              chapters: [
                { name: 'Public Economics', sections: sections(['Fiscal Policy']) },
                { name: 'International Economics', sections: sections(['Trade Theory']) },
                { name: 'Growth & Development', sections: sections(['Models']) },
                { name: 'Environmental Economics', sections: sections(['Sustainability']) },
              ],
            },
            {
              name: 'Economics IV (Indian Economy)',
              chapters: [
                { name: 'Planning', sections: sections(['Five Year Plans']) },
                { name: 'Agriculture', sections: sections(['Policies']) },
                { name: 'Industry', sections: sections(['Development']) },
                { name: 'External Sector', sections: sections(['Balance of Payments']) },
              ],
            },
            {
              name: 'Interview (Personality Test)',
              chapters: [{ name: 'Assessment', sections: sections(['Economic Knowledge', 'Decision Making', 'Communication Skills']) }],
            },
          ],
        },
      },
      {
        name: 'ISS',
        code: 'UPSC_ISS',
        syllabus: {
          subjects: [
            {
              name: 'General English',
              chapters: [
                { name: 'General English (Writing)', sections: sections(['Essay Writing']) },
                { name: 'General English (Comprehension)', sections: sections(['Reading Comprehension']) },
                { name: 'General English (Precis)', sections: sections(['Precis Writing']) },
              ],
            },
            {
              name: 'General Studies',
              chapters: [
                { name: 'General Studies (Polity)', sections: sections(['Indian Constitution']) },
                { name: 'General Studies (Economy)', sections: sections(['Indian Economy']) },
                { name: 'General Studies (Current Affairs)', sections: sections(['National & International']) },
              ],
            },
            {
              name: 'Statistics I',
              chapters: [
                { name: 'Probability', sections: sections(['Probability Theory']) },
                { name: 'Distribution', sections: sections(['Random Variables']) },
                { name: 'Moments', sections: sections(['Expectation']) },
              ],
            },
            {
              name: 'Statistics II',
              chapters: [
                { name: 'Statistical Inference', sections: sections(['Estimation']) },
                { name: 'Hypothesis Testing', sections: sections(['Tests']) },
                { name: 'Sampling', sections: sections(['Sampling Techniques']) },
              ],
            },
            {
              name: 'Statistics III',
              chapters: [
                { name: 'Regression', sections: sections(['Linear Regression']) },
                { name: 'Time Series', sections: sections(['Analysis']) },
                { name: 'Multivariate Analysis', sections: sections(['Concepts']) },
              ],
            },
            {
              name: 'Statistics IV',
              chapters: [
                { name: 'Operations Research', sections: sections(['Linear Programming']) },
                { name: 'Demography', sections: sections(['Population Studies']) },
                { name: 'Econometrics', sections: sections(['Models']) },
              ],
            },
            {
              name: 'Interview (Personality Test)',
              chapters: [{ name: 'Assessment', sections: sections(['Statistical Knowledge', 'Analytical Ability', 'Communication Skills']) }],
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

