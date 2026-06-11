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
    name: 'Banking',
    code: 'BANKING',
    exams: [
      {
        name: 'IBPS PO',
        code: 'IBPS_PO',
        syllabus: {
          subjects: [
            {
              name: 'Quantitative Aptitude (Arithmetic)',
              chapters: [
                { name: 'Number System', sections: sections(['Integers, Fractions, Decimals']) },
                { name: 'Simplification', sections: sections(['Approximation, BODMAS']) },
                { name: 'Percentage', sections: sections(['Basic & Applications']) },
                { name: 'Ratio & Proportion', sections: sections(['Mixtures, Partnership']) },
                { name: 'Average', sections: sections(['Weighted Average']) },
                { name: 'Simple Interest', sections: sections(['Formula & Problems']) },
                { name: 'Compound Interest', sections: sections(['Growth & Depreciation']) },
                { name: 'Profit & Loss', sections: sections(['Discount, Marked Price']) },
                { name: 'Time & Work', sections: sections(['Work Efficiency, Pipes']) },
                { name: 'Time, Speed & Distance', sections: sections(['Trains, Boats']) },
                { name: 'Mensuration', sections: sections(['2D & 3D']) },
                { name: 'Data Interpretation', sections: sections(['Tables, Pie Charts']) },
              ],
            },
            {
              name: 'Quantitative Aptitude (Advanced)',
              chapters: [
                { name: 'Algebra', sections: sections(['Linear & Quadratic Equations']) },
                { name: 'Data Sufficiency', sections: sections(['2 Statement Problems']) },
                { name: 'Probability', sections: sections(['Basic Concepts']) },
                { name: 'Permutation & Combination', sections: sections(['Arrangements']) },
              ],
            },
            {
              name: 'Reasoning Ability (Verbal)',
              chapters: [
                { name: 'Puzzles', sections: sections(['Seating Arrangement, Floor-Based']) },
                { name: 'Inequality', sections: sections(['Direct & Coded']) },
                { name: 'Syllogism', sections: sections(['Logical Deduction']) },
                { name: 'Coding-Decoding', sections: sections(['New Pattern']) },
                { name: 'Blood Relations', sections: sections(['Family Tree']) },
                { name: 'Direction Sense', sections: sections(['Distance & Direction']) },
                { name: 'Order & Ranking', sections: sections(['Position Based']) },
                { name: 'Input-Output', sections: sections(['Machine Arrangement']) },
                { name: 'Data Sufficiency', sections: sections(['Logical Problems']) },
              ],
            },
            {
              name: 'Reasoning Ability (Non-Verbal)',
              chapters: [
                { name: 'Series', sections: sections(['Figure Series']) },
                { name: 'Analogy', sections: sections(['Pattern Recognition']) },
              ],
            },
            {
              name: 'English Language (Grammar)',
              chapters: [
                { name: 'Parts of Speech', sections: sections(['Noun, Pronoun, Verb']) },
                { name: 'Tenses', sections: sections(['Basic Rules']) },
                { name: 'Subject-Verb Agreement', sections: sections(['Rules']) },
                { name: 'Articles & Prepositions', sections: sections(['Usage']) },
              ],
            },
            {
              name: 'English Language (Vocabulary)',
              chapters: [
                { name: 'Synonyms & Antonyms', sections: sections(['Word Meaning']) },
                { name: 'Idioms & Phrases', sections: sections(['Usage']) },
                { name: 'One Word Substitution', sections: sections(['Vocabulary']) },
              ],
            },
            {
              name: 'English Language (Comprehension)',
              chapters: [
                { name: 'Reading Comprehension', sections: sections(['Passage Based']) },
                { name: 'Cloze Test', sections: sections(['Fill in the Blanks']) },
                { name: 'Para Jumbles', sections: sections(['Sentence Arrangement']) },
                { name: 'Error Detection', sections: sections(['Grammar Errors']) },
              ],
            },
            {
              name: 'General Awareness (Banking Awareness)',
              chapters: [
                { name: 'Banking Terms', sections: sections(['Basic Terminology']) },
                { name: 'Financial Awareness', sections: sections(['RBI Functions']) },
                { name: 'Monetary Policy', sections: sections(['Rates & Tools']) },
                { name: 'Banking System', sections: sections(['Types of Banks']) },
                { name: 'Financial Institutions', sections: sections(['IMF, World Bank']) },
              ],
            },
            {
              name: 'General Awareness (Static GK)',
              chapters: [
                { name: 'History', sections: sections(['Ancient, Medieval, Modern']) },
                { name: 'Geography', sections: sections(['India & World']) },
                { name: 'Polity', sections: sections(['Indian Constitution']) },
                { name: 'Economics', sections: sections(['Basic Concepts']) },
              ],
            },
            {
              name: 'General Awareness (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Government Schemes']) },
                { name: 'International', sections: sections(['Global Events']) },
                { name: 'Sports', sections: sections(['Events & Winners']) },
                { name: 'Awards', sections: sections(['National & International Awards']) },
                { name: 'Banking & Economy', sections: sections(['Recent Updates']) },
              ],
            },
            {
              name: 'Computer Knowledge (Basics)',
              chapters: [
                { name: 'Computer Fundamentals', sections: sections(['Hardware & Software']) },
                { name: 'Operating System', sections: sections(['Windows Basics']) },
                { name: 'MS Office', sections: sections(['Word, Excel, PowerPoint']) },
                { name: 'Internet', sections: sections(['Basics & Applications']) },
                { name: 'Networking', sections: sections(['LAN, WAN']) },
                { name: 'Cyber Security', sections: sections(['Basic Concepts']) },
              ],
            },
            {
              name: 'Descriptive (English Writing)',
              chapters: [
                { name: 'Essay Writing', sections: sections(['Current Topics']) },
                { name: 'Letter Writing', sections: sections(['Formal & Informal']) },
              ],
            },
          ],
        },
      },
      {
        name: 'IBPS Clerk',
        code: 'IBPS_CLERK',
        syllabus: {
          subjects: [
            {
              name: 'Quantitative Aptitude (Arithmetic)',
              chapters: [
                { name: 'Number System', sections: sections(['Integers, Fractions, Decimals']) },
                { name: 'Simplification', sections: sections(['Approximation, BODMAS']) },
                { name: 'Percentage', sections: sections(['Basic & Applications']) },
                { name: 'Ratio & Proportion', sections: sections(['Mixtures, Partnership']) },
                { name: 'Average', sections: sections(['Basic & Weighted Average']) },
                { name: 'Simple Interest', sections: sections(['Formula & Problems']) },
                { name: 'Compound Interest', sections: sections(['Growth & Depreciation']) },
                { name: 'Profit & Loss', sections: sections(['Discount, Marked Price']) },
                { name: 'Time & Work', sections: sections(['Work Efficiency, Pipes']) },
                { name: 'Time, Speed & Distance', sections: sections(['Trains, Boats']) },
                { name: 'Mensuration', sections: sections(['2D & 3D']) },
                { name: 'Data Interpretation', sections: sections(['Tables, Pie Charts']) },
              ],
            },
            {
              name: 'Reasoning Ability (Verbal)',
              chapters: [
                { name: 'Puzzles', sections: sections(['Seating Arrangement, Floor-Based']) },
                { name: 'Inequality', sections: sections(['Direct & Coded']) },
                { name: 'Syllogism', sections: sections(['Logical Deduction']) },
                { name: 'Coding-Decoding', sections: sections(['New Pattern']) },
                { name: 'Blood Relations', sections: sections(['Family Tree']) },
                { name: 'Direction Sense', sections: sections(['Distance & Direction']) },
                { name: 'Order & Ranking', sections: sections(['Position Based']) },
              ],
            },
            {
              name: 'Reasoning Ability (Non-Verbal)',
              chapters: [
                { name: 'Series', sections: sections(['Figure Series']) },
                { name: 'Analogy', sections: sections(['Pattern Recognition']) },
              ],
            },
            {
              name: 'English Language (Grammar)',
              chapters: [
                { name: 'Parts of Speech', sections: sections(['Noun, Pronoun, Verb']) },
                { name: 'Tenses', sections: sections(['Basic Rules']) },
                { name: 'Subject-Verb Agreement', sections: sections(['Rules']) },
                { name: 'Articles & Prepositions', sections: sections(['Usage']) },
              ],
            },
            {
              name: 'English Language (Vocabulary)',
              chapters: [
                { name: 'Synonyms & Antonyms', sections: sections(['Word Meaning']) },
                { name: 'Idioms & Phrases', sections: sections(['Usage']) },
              ],
            },
            {
              name: 'English Language (Comprehension)',
              chapters: [
                { name: 'Reading Comprehension', sections: sections(['Passage Based']) },
                { name: 'Cloze Test', sections: sections(['Fill in the Blanks']) },
                { name: 'Para Jumbles', sections: sections(['Sentence Arrangement']) },
                { name: 'Error Detection', sections: sections(['Grammar Errors']) },
              ],
            },
            {
              name: 'General Awareness (Banking Awareness)',
              chapters: [
                { name: 'Banking Terms', sections: sections(['Basic Terminology']) },
                { name: 'Financial Awareness', sections: sections(['RBI Functions']) },
                { name: 'Monetary Policy', sections: sections(['Rates & Tools']) },
                { name: 'Banking System', sections: sections(['Types of Banks']) },
              ],
            },
            {
              name: 'General Awareness (Static GK)',
              chapters: [
                { name: 'History', sections: sections(['Ancient, Medieval, Modern']) },
                { name: 'Geography', sections: sections(['India & World']) },
                { name: 'Polity', sections: sections(['Indian Constitution']) },
                { name: 'Economics', sections: sections(['Basic Concepts']) },
              ],
            },
            {
              name: 'General Awareness (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Government Schemes']) },
                { name: 'International', sections: sections(['Global Events']) },
                { name: 'Sports', sections: sections(['Events & Winners']) },
                { name: 'Awards', sections: sections(['National & International Awards']) },
                { name: 'Banking & Economy', sections: sections(['Recent Updates']) },
              ],
            },
            {
              name: 'Computer Knowledge (Basics)',
              chapters: [
                { name: 'Computer Fundamentals', sections: sections(['Hardware & Software']) },
                { name: 'Operating System', sections: sections(['Windows Basics']) },
                { name: 'MS Office', sections: sections(['Word, Excel, PowerPoint']) },
                { name: 'Internet', sections: sections(['Basics & Applications']) },
                { name: 'Networking', sections: sections(['LAN, WAN']) },
                { name: 'Cyber Security', sections: sections(['Basic Concepts']) },
              ],
            },
          ],
        },
      },
      {
        name: 'IBPS SO',
        code: 'IBPS_SO',
        syllabus: {
          subjects: [
            {
              name: 'Quantitative Aptitude (Arithmetic)',
              chapters: [
                { name: 'Number System', sections: sections(['Integers, Fractions, Decimals']) },
                { name: 'Simplification', sections: sections(['Approximation, BODMAS']) },
                { name: 'Percentage', sections: sections(['Basic & Applications']) },
                { name: 'Ratio & Proportion', sections: sections(['Basic Concepts']) },
                { name: 'Average', sections: sections(['Basic Problems']) },
                { name: 'Simple Interest', sections: sections(['Formula & Problems']) },
                { name: 'Compound Interest', sections: sections(['Basic Concepts']) },
                { name: 'Profit & Loss', sections: sections(['Discount, Marked Price']) },
                { name: 'Time & Work', sections: sections(['Basic Problems']) },
                { name: 'Time, Speed & Distance', sections: sections(['Basic Problems']) },
                { name: 'Data Interpretation', sections: sections(['Tables, Charts']) },
              ],
            },
            {
              name: 'Reasoning Ability (Verbal)',
              chapters: [
                { name: 'Puzzles', sections: sections(['Seating Arrangement']) },
                { name: 'Inequality', sections: sections(['Direct & Coded']) },
                { name: 'Syllogism', sections: sections(['Logical Deduction']) },
                { name: 'Coding-Decoding', sections: sections(['Pattern Based']) },
                { name: 'Blood Relations', sections: sections(['Family Tree']) },
                { name: 'Direction Sense', sections: sections(['Distance & Direction']) },
                { name: 'Order & Ranking', sections: sections(['Position Based']) },
              ],
            },
            {
              name: 'Reasoning Ability (Non-Verbal)',
              chapters: [
                { name: 'Series', sections: sections(['Figure Series']) },
                { name: 'Analogy', sections: sections(['Pattern Recognition']) },
              ],
            },
            {
              name: 'English Language (Grammar)',
              chapters: [
                { name: 'Parts of Speech', sections: sections(['Noun, Pronoun, Verb']) },
                { name: 'Tenses', sections: sections(['Basic Rules']) },
                { name: 'Subject-Verb Agreement', sections: sections(['Rules']) },
                { name: 'Articles & Prepositions', sections: sections(['Usage']) },
              ],
            },
            {
              name: 'English Language (Vocabulary)',
              chapters: [
                { name: 'Synonyms & Antonyms', sections: sections(['Word Meaning']) },
                { name: 'Idioms & Phrases', sections: sections(['Usage']) },
              ],
            },
            {
              name: 'English Language (Comprehension)',
              chapters: [
                { name: 'Reading Comprehension', sections: sections(['Passage Based']) },
                { name: 'Cloze Test', sections: sections(['Fill in the Blanks']) },
                { name: 'Para Jumbles', sections: sections(['Sentence Arrangement']) },
                { name: 'Error Detection', sections: sections(['Grammar Errors']) },
              ],
            },
            {
              name: 'General Awareness (Banking Awareness)',
              chapters: [
                { name: 'Banking Terms', sections: sections(['Basic Terminology']) },
                { name: 'Financial Awareness', sections: sections(['RBI Functions']) },
                { name: 'Monetary Policy', sections: sections(['Rates & Tools']) },
                { name: 'Banking System', sections: sections(['Types of Banks']) },
              ],
            },
            {
              name: 'General Awareness (Static GK)',
              chapters: [
                { name: 'History', sections: sections(['Ancient, Medieval, Modern']) },
                { name: 'Geography', sections: sections(['India & World']) },
                { name: 'Polity', sections: sections(['Indian Constitution']) },
                { name: 'Economics', sections: sections(['Basic Concepts']) },
              ],
            },
            {
              name: 'General Awareness (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Government Schemes']) },
                { name: 'International', sections: sections(['Global Events']) },
                { name: 'Sports', sections: sections(['Events & Winners']) },
                { name: 'Awards', sections: sections(['National & International Awards']) },
                { name: 'Banking & Economy', sections: sections(['Recent Updates']) },
              ],
            },
            {
              name: 'Professional Knowledge (IT Officer)',
              chapters: [
                { name: 'Computer Fundamentals', sections: sections(['Hardware & Software']) },
                { name: 'Networking', sections: sections(['LAN, WAN']) },
                { name: 'Database', sections: sections(['DBMS Basics']) },
                { name: 'Programming', sections: sections(['Basics of C, Java']) },
                { name: 'Operating Systems', sections: sections(['Windows, Linux']) },
              ],
            },
            {
              name: 'Professional Knowledge (Agriculture)',
              chapters: [
                { name: 'Agronomy', sections: sections(['Crops & Soil']) },
                { name: 'Horticulture', sections: sections(['Fruits & Vegetables']) },
                { name: 'Animal Husbandry', sections: sections(['Livestock']) },
                { name: 'Agricultural Economics', sections: sections(['Basics']) },
              ],
            },
            {
              name: 'Professional Knowledge (Rajbhasha)',
              chapters: [
                { name: 'Hindi Grammar', sections: sections(['Basic Rules']) },
                { name: 'Translation', sections: sections(['Hindi-English']) },
                { name: 'Vocabulary', sections: sections(['Word Usage']) },
              ],
            },
            {
              name: 'Professional Knowledge (Law)',
              chapters: [
                { name: 'Constitutional Law', sections: sections(['Basics']) },
                { name: 'Banking Law', sections: sections(['Negotiable Instruments Act']) },
                { name: 'Company Law', sections: sections(['Basics']) },
                { name: 'Contract Law', sections: sections(['Indian Contract Act']) },
              ],
            },
            {
              name: 'Professional Knowledge (HR)',
              chapters: [
                { name: 'HR Management', sections: sections(['Functions']) },
                { name: 'Organizational Behaviour', sections: sections(['Concepts']) },
                { name: 'Labour Laws', sections: sections(['Basics']) },
              ],
            },
            {
              name: 'Professional Knowledge (Marketing)',
              chapters: [
                { name: 'Marketing Management', sections: sections(['Concepts']) },
                { name: 'Consumer Behaviour', sections: sections(['Basics']) },
                { name: 'Advertising', sections: sections(['Strategies']) },
              ],
            },
          ],
        },
      },
      {
        name: 'RBI Assistant',
        code: 'RBI_ASSISTANT',
        syllabus: {
          subjects: [
            {
              name: 'Quantitative Aptitude (Arithmetic)',
              chapters: [
                { name: 'Number System', sections: sections(['Integers, Fractions, Decimals']) },
                { name: 'Simplification', sections: sections(['Approximation, BODMAS']) },
                { name: 'Percentage', sections: sections(['Basic & Applications']) },
                { name: 'Ratio & Proportion', sections: sections(['Mixtures, Partnership']) },
                { name: 'Average', sections: sections(['Basic & Weighted Average']) },
                { name: 'Simple Interest', sections: sections(['Formula & Problems']) },
                { name: 'Compound Interest', sections: sections(['Basic Concepts']) },
                { name: 'Profit & Loss', sections: sections(['Discount, Marked Price']) },
                { name: 'Time & Work', sections: sections(['Work Efficiency']) },
                { name: 'Time, Speed & Distance', sections: sections(['Trains, Boats']) },
                { name: 'Mensuration', sections: sections(['2D & 3D']) },
                { name: 'Data Interpretation', sections: sections(['Tables, Graphs']) },
              ],
            },
            {
              name: 'Reasoning Ability (Verbal)',
              chapters: [
                { name: 'Puzzles', sections: sections(['Seating Arrangement']) },
                { name: 'Inequality', sections: sections(['Direct & Coded']) },
                { name: 'Syllogism', sections: sections(['Logical Deduction']) },
                { name: 'Coding-Decoding', sections: sections(['Pattern Based']) },
                { name: 'Blood Relations', sections: sections(['Family Tree']) },
                { name: 'Direction Sense', sections: sections(['Distance & Direction']) },
                { name: 'Order & Ranking', sections: sections(['Position Based']) },
              ],
            },
            {
              name: 'Reasoning Ability (Non-Verbal)',
              chapters: [
                { name: 'Series', sections: sections(['Figure Series']) },
                { name: 'Analogy', sections: sections(['Pattern Recognition']) },
              ],
            },
            {
              name: 'English Language (Grammar)',
              chapters: [
                { name: 'Parts of Speech', sections: sections(['Noun, Pronoun, Verb']) },
                { name: 'Tenses', sections: sections(['Rules']) },
                { name: 'Subject-Verb Agreement', sections: sections(['Rules']) },
                { name: 'Articles & Prepositions', sections: sections(['Usage']) },
              ],
            },
            {
              name: 'English Language (Vocabulary)',
              chapters: [
                { name: 'Synonyms & Antonyms', sections: sections(['Word Meaning']) },
                { name: 'Idioms & Phrases', sections: sections(['Usage']) },
              ],
            },
            {
              name: 'English Language (Comprehension)',
              chapters: [
                { name: 'Reading Comprehension', sections: sections(['Passage Based']) },
                { name: 'Cloze Test', sections: sections(['Fill in the Blanks']) },
                { name: 'Para Jumbles', sections: sections(['Sentence Arrangement']) },
                { name: 'Error Detection', sections: sections(['Grammar Errors']) },
              ],
            },
            {
              name: 'General Awareness (Banking Awareness)',
              chapters: [
                { name: 'Banking Terms', sections: sections(['Basic Terminology']) },
                { name: 'Financial Awareness', sections: sections(['RBI Functions']) },
                { name: 'Monetary Policy', sections: sections(['Rates & Tools']) },
                { name: 'Banking System', sections: sections(['Types of Banks']) },
              ],
            },
            {
              name: 'General Awareness (Static GK)',
              chapters: [
                { name: 'History', sections: sections(['Ancient, Medieval, Modern']) },
                { name: 'Geography', sections: sections(['India & World']) },
                { name: 'Polity', sections: sections(['Indian Constitution']) },
                { name: 'Economics', sections: sections(['Basic Concepts']) },
              ],
            },
            {
              name: 'General Awareness (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Government Schemes']) },
                { name: 'International', sections: sections(['Global Events']) },
                { name: 'Sports', sections: sections(['Events & Winners']) },
                { name: 'Awards', sections: sections(['National & International Awards']) },
                { name: 'Banking & Economy', sections: sections(['Recent Updates']) },
              ],
            },
            {
              name: 'Computer Knowledge (Basics)',
              chapters: [
                { name: 'Computer Fundamentals', sections: sections(['Hardware & Software']) },
                { name: 'Operating System', sections: sections(['Windows Basics']) },
                { name: 'MS Office', sections: sections(['Word, Excel, PowerPoint']) },
                { name: 'Internet', sections: sections(['Basics & Applications']) },
                { name: 'Networking', sections: sections(['LAN, WAN']) },
                { name: 'Cyber Security', sections: sections(['Basic Concepts']) },
              ],
            },
          ],
        },
      },
      {
        name: 'NABARD Grade A & B',
        code: 'NABARD_GRADE_A_B',
        syllabus: {
          subjects: [
            {
              name: 'Quantitative Aptitude (Arithmetic)',
              chapters: [
                { name: 'Number System', sections: sections(['Integers, Fractions, Decimals']) },
                { name: 'Simplification', sections: sections(['Approximation, BODMAS']) },
                { name: 'Percentage', sections: sections(['Basic & Applications']) },
                { name: 'Ratio & Proportion', sections: sections(['Mixtures, Partnership']) },
                { name: 'Average', sections: sections(['Weighted Average']) },
                { name: 'Simple Interest', sections: sections(['Formula & Problems']) },
                { name: 'Compound Interest', sections: sections(['Growth & Depreciation']) },
                { name: 'Profit & Loss', sections: sections(['Discount, Marked Price']) },
                { name: 'Time & Work', sections: sections(['Work Efficiency']) },
                { name: 'Time, Speed & Distance', sections: sections(['Trains, Boats']) },
                { name: 'Mensuration', sections: sections(['2D & 3D']) },
                { name: 'Data Interpretation', sections: sections(['Tables, Graphs']) },
              ],
            },
            {
              name: 'Reasoning Ability (Verbal)',
              chapters: [
                { name: 'Puzzles', sections: sections(['Seating Arrangement']) },
                { name: 'Inequality', sections: sections(['Direct & Coded']) },
                { name: 'Syllogism', sections: sections(['Logical Deduction']) },
                { name: 'Coding-Decoding', sections: sections(['Pattern Based']) },
                { name: 'Blood Relations', sections: sections(['Family Tree']) },
                { name: 'Direction Sense', sections: sections(['Distance & Direction']) },
                { name: 'Order & Ranking', sections: sections(['Position Based']) },
              ],
            },
            {
              name: 'Reasoning Ability (Non-Verbal)',
              chapters: [
                { name: 'Series', sections: sections(['Figure Series']) },
                { name: 'Analogy', sections: sections(['Pattern Recognition']) },
              ],
            },
            {
              name: 'English Language (Grammar)',
              chapters: [
                { name: 'Parts of Speech', sections: sections(['Noun, Pronoun, Verb']) },
                { name: 'Tenses', sections: sections(['Rules']) },
                { name: 'Subject-Verb Agreement', sections: sections(['Rules']) },
                { name: 'Articles & Prepositions', sections: sections(['Usage']) },
              ],
            },
            {
              name: 'English Language (Vocabulary)',
              chapters: [
                { name: 'Synonyms & Antonyms', sections: sections(['Word Meaning']) },
                { name: 'Idioms & Phrases', sections: sections(['Usage']) },
              ],
            },
            {
              name: 'English Language (Comprehension)',
              chapters: [
                { name: 'Reading Comprehension', sections: sections(['Passage Based']) },
                { name: 'Cloze Test', sections: sections(['Fill in the Blanks']) },
                { name: 'Para Jumbles', sections: sections(['Sentence Arrangement']) },
                { name: 'Error Detection', sections: sections(['Grammar Errors']) },
              ],
            },
            {
              name: 'General Awareness (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Government Policies']) },
                { name: 'International', sections: sections(['Global Events']) },
                { name: 'Agriculture & Rural Development', sections: sections(['Updates']) },
                { name: 'Reports & Indices', sections: sections(['Economic Reports']) },
              ],
            },
            {
              name: 'Computer Knowledge (Basics)',
              chapters: [
                { name: 'Computer Fundamentals', sections: sections(['Hardware & Software']) },
                { name: 'Operating System', sections: sections(['Windows Basics']) },
                { name: 'MS Office', sections: sections(['Word, Excel, PowerPoint']) },
                { name: 'Internet', sections: sections(['Basics & Applications']) },
                { name: 'Networking', sections: sections(['LAN, WAN']) },
                { name: 'Cyber Security', sections: sections(['Basic Concepts']) },
              ],
            },
            {
              name: 'Economic & Social Issues (Economics)',
              chapters: [
                { name: 'Growth & Development', sections: sections(['Concepts']) },
                { name: 'Poverty & Unemployment', sections: sections(['Indian Context']) },
                { name: 'Inflation', sections: sections(['Types & Control']) },
                { name: 'Monetary Policy', sections: sections(['Tools & Instruments']) },
                { name: 'Fiscal Policy', sections: sections(['Budget & Deficit']) },
                { name: 'Indian Economy', sections: sections(['Structure']) },
                { name: 'Globalization', sections: sections(['Impact']) },
                { name: 'Sustainable Development', sections: sections(['Concepts']) },
              ],
            },
            {
              name: 'Economic & Social Issues (Social Issues)',
              chapters: [
                { name: 'Education', sections: sections(['Policies']) },
                { name: 'Health', sections: sections(['Public Health']) },
                { name: 'Demographics', sections: sections(['Population']) },
              ],
            },
            {
              name: 'Agriculture & Rural Development (Agriculture)',
              chapters: [
                { name: 'Agronomy', sections: sections(['Crops & Soil']) },
                { name: 'Horticulture', sections: sections(['Fruits & Vegetables']) },
                { name: 'Animal Husbandry', sections: sections(['Livestock']) },
                { name: 'Fisheries', sections: sections(['Aquaculture']) },
              ],
            },
            {
              name: 'Agriculture & Rural Development (Rural Development)',
              chapters: [
                { name: 'Rural Economy', sections: sections(['Concepts']) },
                { name: 'Rural Development Schemes', sections: sections(['Government Programs']) },
                { name: 'SHGs & Microfinance', sections: sections(['Concepts']) },
              ],
            },
            {
              name: 'Finance & Management (Finance)',
              chapters: [
                { name: 'Financial System', sections: sections(['Structure']) },
                { name: 'Financial Markets', sections: sections(['Money & Capital Market']) },
                { name: 'Banking System', sections: sections(['Functions']) },
                { name: 'Risk Management', sections: sections(['Basics']) },
                { name: 'Corporate Governance', sections: sections(['Concepts']) },
              ],
            },
            {
              name: 'Finance & Management (Management)',
              chapters: [
                { name: 'Management Theories', sections: sections(['Classical & Modern']) },
                { name: 'Leadership', sections: sections(['Theories']) },
                { name: 'Motivation', sections: sections(['Theories']) },
                { name: 'Communication', sections: sections(['Process']) },
                { name: 'Human Resource Management', sections: sections(['Functions']) },
              ],
            },
            {
              name: 'English (Descriptive)',
              chapters: [
                { name: 'Essay Writing', sections: sections(['Economic & Rural Topics']) },
                { name: 'Precis Writing', sections: sections(['Summary Writing']) },
                { name: 'Reading Comprehension', sections: sections(['Analytical Questions']) },
              ],
            },
          ],
        },
      },
      {
        name: 'NABARD Assistant',
        code: 'NABARD_ASSISTANT',
        syllabus: {
          subjects: [
            {
              name: 'Quantitative Aptitude (Arithmetic)',
              chapters: [
                { name: 'Number System', sections: sections(['Integers, Fractions, Decimals']) },
                { name: 'Simplification', sections: sections(['Approximation, BODMAS']) },
                { name: 'Percentage', sections: sections(['Basic & Applications']) },
                { name: 'Ratio & Proportion', sections: sections(['Basic Concepts']) },
                { name: 'Average', sections: sections(['Basic & Weighted Average']) },
                { name: 'Simple Interest', sections: sections(['Formula & Problems']) },
                { name: 'Compound Interest', sections: sections(['Basic Concepts']) },
                { name: 'Profit & Loss', sections: sections(['Discount, Marked Price']) },
                { name: 'Time & Work', sections: sections(['Work Efficiency']) },
                { name: 'Time, Speed & Distance', sections: sections(['Trains, Boats']) },
                { name: 'Mensuration', sections: sections(['2D & 3D']) },
                { name: 'Data Interpretation', sections: sections(['Tables, Graphs']) },
              ],
            },
            {
              name: 'Reasoning Ability (Verbal)',
              chapters: [
                { name: 'Puzzles', sections: sections(['Seating Arrangement']) },
                { name: 'Inequality', sections: sections(['Direct & Coded']) },
                { name: 'Syllogism', sections: sections(['Logical Deduction']) },
                { name: 'Coding-Decoding', sections: sections(['Pattern Based']) },
                { name: 'Blood Relations', sections: sections(['Family Tree']) },
                { name: 'Direction Sense', sections: sections(['Distance & Direction']) },
                { name: 'Order & Ranking', sections: sections(['Position Based']) },
              ],
            },
            {
              name: 'Reasoning Ability (Non-Verbal)',
              chapters: [
                { name: 'Series', sections: sections(['Figure Series']) },
                { name: 'Analogy', sections: sections(['Pattern Recognition']) },
              ],
            },
            {
              name: 'English Language (Grammar)',
              chapters: [
                { name: 'Parts of Speech', sections: sections(['Noun, Pronoun, Verb']) },
                { name: 'Tenses', sections: sections(['Rules']) },
                { name: 'Subject-Verb Agreement', sections: sections(['Rules']) },
                { name: 'Articles & Prepositions', sections: sections(['Usage']) },
              ],
            },
            {
              name: 'English Language (Vocabulary)',
              chapters: [
                { name: 'Synonyms & Antonyms', sections: sections(['Word Meaning']) },
                { name: 'Idioms & Phrases', sections: sections(['Usage']) },
              ],
            },
            {
              name: 'English Language (Comprehension)',
              chapters: [
                { name: 'Reading Comprehension', sections: sections(['Passage Based']) },
                { name: 'Cloze Test', sections: sections(['Fill in the Blanks']) },
                { name: 'Para Jumbles', sections: sections(['Sentence Arrangement']) },
                { name: 'Error Detection', sections: sections(['Grammar Errors']) },
              ],
            },
            {
              name: 'General Awareness (Banking Awareness)',
              chapters: [
                { name: 'Banking Terms', sections: sections(['Basic Terminology']) },
                { name: 'Financial Awareness', sections: sections(['RBI Functions']) },
                { name: 'Monetary Policy', sections: sections(['Rates & Tools']) },
                { name: 'Banking System', sections: sections(['Types of Banks']) },
              ],
            },
            {
              name: 'General Awareness (Static GK)',
              chapters: [
                { name: 'History', sections: sections(['Ancient, Medieval, Modern']) },
                { name: 'Geography', sections: sections(['India & World']) },
                { name: 'Polity', sections: sections(['Indian Constitution']) },
                { name: 'Economics', sections: sections(['Basic Concepts']) },
              ],
            },
            {
              name: 'General Awareness (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Government Schemes']) },
                { name: 'International', sections: sections(['Global Events']) },
                { name: 'Agriculture & Rural Development', sections: sections(['Updates']) },
                { name: 'Reports & Indices', sections: sections(['Economic Reports']) },
              ],
            },
            {
              name: 'Computer Knowledge (Basics)',
              chapters: [
                { name: 'Computer Fundamentals', sections: sections(['Hardware & Software']) },
                { name: 'Operating System', sections: sections(['Windows Basics']) },
                { name: 'MS Office', sections: sections(['Word, Excel, PowerPoint']) },
                { name: 'Internet', sections: sections(['Basics & Applications']) },
                { name: 'Networking', sections: sections(['LAN, WAN']) },
                { name: 'Cyber Security', sections: sections(['Basic Concepts']) },
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
      {
        name: major.name,
        code: major.code,
        exams: major.exams,
      },
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

