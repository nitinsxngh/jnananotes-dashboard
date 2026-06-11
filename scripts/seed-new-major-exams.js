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
    name: 'Railway',
    code: 'RAILWAY',
    exams: [
      {
        name: 'RRB NTPC',
        code: 'RRB_NTPC',
        syllabus: {
          subjects: [
            {
              name: 'Mathematics (Arithmetic)',
              chapters: [
                { name: 'Number System', sections: sections(['Integers, Fractions, Decimals']) },
                { name: 'BODMAS', sections: sections(['Order of Operations']) },
                { name: 'LCM & HCF', sections: sections(['Prime Factorization, Applications']) },
                { name: 'Percentage', sections: sections(['Basic & Applications']) },
                { name: 'Ratio & Proportion', sections: sections(['Partnership, Mixtures']) },
                { name: 'Average', sections: sections(['Basic & Weighted Average']) },
                { name: 'Simple Interest', sections: sections(['Formula & Problems']) },
                { name: 'Compound Interest', sections: sections(['Annual & Compound Calculations']) },
                { name: 'Profit & Loss', sections: sections(['Discount, Marked Price']) },
                { name: 'Time & Work', sections: sections(['Work Efficiency, Pipes & Cistern']) },
                { name: 'Time, Speed & Distance', sections: sections(['Trains, Boats & Streams']) },
                { name: 'Algebra', sections: sections(['Linear Equations, Basic Identities']) },
                { name: 'Geometry', sections: sections(['Lines, Angles, Triangles, Circles']) },
                { name: 'Mensuration', sections: sections(['2D & 3D Figures']) },
                { name: 'Trigonometry', sections: sections(['Basic Identities, Heights & Distances']) },
                { name: 'Elementary Statistics', sections: sections(['Mean, Median, Mode']) },
              ],
            },
            {
              name: 'General Intelligence & Reasoning (Verbal)',
              chapters: [
                { name: 'Analogies', sections: sections(['Number, Alphabet, Word']) },
                { name: 'Classification', sections: sections(['Odd One Out']) },
                { name: 'Series', sections: sections(['Number, Alphabet, Missing Terms']) },
                { name: 'Coding-Decoding', sections: sections(['Letter & Number Coding']) },
                { name: 'Blood Relations', sections: sections(['Family Tree Problems']) },
                { name: 'Direction Sense', sections: sections(['Distance & Direction']) },
                { name: 'Ordering & Ranking', sections: sections(['Position Based Problems']) },
                { name: 'Venn Diagrams', sections: sections(['Set Representation']) },
                { name: 'Syllogism', sections: sections(['Logical Deduction']) },
                { name: 'Statement & Conclusion', sections: sections(['Inference']) },
                { name: 'Decision Making', sections: sections(['Situational Problems']) },
              ],
            },
            {
              name: 'General Intelligence & Reasoning (Non-Verbal)',
              chapters: [
                { name: 'Mirror Images', sections: sections(['Reflection']) },
                { name: 'Water Images', sections: sections(['Inversion']) },
                { name: 'Paper Folding', sections: sections(['Pattern Analysis']) },
                { name: 'Paper Cutting', sections: sections(['Figure Formation']) },
                { name: 'Embedded Figures', sections: sections(['Hidden Shapes']) },
                { name: 'Figure Series', sections: sections(['Pattern Completion']) },
              ],
            },
            {
              name: 'General Awareness (History)',
              chapters: [
                { name: 'Ancient', sections: sections(['Indus Valley Civilization', 'Vedic Period', 'Buddhism & Jainism', 'Maurya Empire', 'Gupta Empire']) },
                { name: 'Medieval', sections: sections(['Delhi Sultanate', 'Mughal Empire']) },
                { name: 'Modern', sections: sections(['Advent of Europeans', 'Revolt of 1857', 'Indian National Movement', 'Important Personalities']) },
              ],
            },
            {
              name: 'General Awareness (Geography)',
              chapters: [
                { name: 'Physical', sections: sections(['Earth Structure', 'Landforms', 'Rivers & Oceans']) },
                { name: 'Indian', sections: sections(['Climate of India', 'Soils of India', 'Agriculture', 'Mineral Resources']) },
                { name: 'World', sections: sections(['Continents & Oceans']) },
              ],
            },
            {
              name: 'General Awareness (Polity)',
              chapters: [
                { name: 'Indian Constitution', sections: sections(['Preamble', 'Fundamental Rights', 'Directive Principles', 'Fundamental Duties']) },
                { name: 'Governance', sections: sections(['President', 'Prime Minister & Council of Ministers']) },
                { name: 'Parliament', sections: sections(['Lok Sabha & Rajya Sabha']) },
                { name: 'Judiciary', sections: sections(['Supreme Court & High Courts']) },
              ],
            },
            {
              name: 'General Awareness (Economics)',
              chapters: [
                { name: 'Basic Concepts', sections: sections(['Demand & Supply', 'Inflation']) },
                { name: 'Banking', sections: sections(['RBI Functions', 'Monetary Policy']) },
                { name: 'Budget', sections: sections(['Fiscal Policy']) },
                { name: 'Schemes', sections: sections(['Government Schemes']) },
              ],
            },
            {
              name: 'General Awareness (Science-Physics)',
              chapters: [
                { name: 'Mechanics', sections: sections(['Motion', 'Laws of Motion']) },
                { name: 'Work Energy Power', sections: sections(['Concepts']) },
                { name: 'Heat', sections: sections(['Thermodynamics Basics']) },
                { name: 'Light', sections: sections(['Reflection & Refraction']) },
                { name: 'Electricity', sections: sections(['Current, Circuits']) },
              ],
            },
            {
              name: 'General Awareness (Science-Chemistry)',
              chapters: [
                { name: 'Basic', sections: sections(['Atoms & Molecules']) },
                { name: 'Reactions', sections: sections(['Chemical Reactions']) },
                { name: 'Periodic Table', sections: sections(['Elements & Properties']) },
                { name: 'Acids & Bases', sections: sections(['Properties']) },
              ],
            },
            {
              name: 'General Awareness (Science-Biology)',
              chapters: [
                { name: 'Human Body', sections: sections(['Organ Systems']) },
                { name: 'Nutrition', sections: sections(['Human Nutrition']) },
                { name: 'Plants', sections: sections(['Photosynthesis']) },
                { name: 'Diseases', sections: sections(['Common Diseases']) },
              ],
            },
            {
              name: 'General Awareness (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Government Programs']) },
                { name: 'International', sections: sections(['Global Events']) },
                { name: 'Sports', sections: sections(['Events & Winners']) },
                { name: 'Awards', sections: sections(['National & International Awards']) },
                { name: 'Books & Authors', sections: sections(['Recent Publications']) },
              ],
            },
          ],
        },
      },
      {
        name: 'RRB Group D',
        code: 'RRB_GROUP_D',
        syllabus: {
          subjects: [
            {
              name: 'Mathematics (Arithmetic)',
              chapters: [
                { name: 'Number System', sections: sections(['Integers, Fractions, Decimals']) },
                { name: 'BODMAS', sections: sections(['Order of Operations']) },
                { name: 'LCM & HCF', sections: sections(['Prime Factorization, Applications']) },
                { name: 'Percentage', sections: sections(['Basic & Applications']) },
                { name: 'Ratio & Proportion', sections: sections(['Basic Concepts']) },
                { name: 'Average', sections: sections(['Basic Problems']) },
                { name: 'Simple Interest', sections: sections(['Formula & Problems']) },
                { name: 'Profit & Loss', sections: sections(['Discount, Marked Price']) },
                { name: 'Time & Work', sections: sections(['Basic Problems']) },
                { name: 'Time, Speed & Distance', sections: sections(['Basic Problems']) },
                { name: 'Algebra', sections: sections(['Basic Equations']) },
                { name: 'Geometry', sections: sections(['Lines, Angles, Triangles']) },
                { name: 'Mensuration', sections: sections(['2D Figures']) },
                { name: 'Trigonometry', sections: sections(['Basic Ratios']) },
                { name: 'Elementary Statistics', sections: sections(['Mean, Median, Mode']) },
              ],
            },
            {
              name: 'General Intelligence & Reasoning (Verbal)',
              chapters: [
                { name: 'Analogies', sections: sections(['Number & Alphabet']) },
                { name: 'Classification', sections: sections(['Odd One Out']) },
                { name: 'Series', sections: sections(['Number & Alphabet Series']) },
                { name: 'Coding-Decoding', sections: sections(['Basic Coding']) },
                { name: 'Blood Relations', sections: sections(['Basic Problems']) },
                { name: 'Direction Sense', sections: sections(['Basic Directions']) },
                { name: 'Ordering & Ranking', sections: sections(['Positions']) },
                { name: 'Venn Diagrams', sections: sections(['Basic Sets']) },
                { name: 'Syllogism', sections: sections(['Basic Logic']) },
              ],
            },
            {
              name: 'General Intelligence & Reasoning (Non-Verbal)',
              chapters: [
                { name: 'Mirror Images', sections: sections(['Reflection']) },
                { name: 'Water Images', sections: sections(['Inversion']) },
                { name: 'Paper Folding', sections: sections(['Pattern']) },
                { name: 'Paper Cutting', sections: sections(['Figure Formation']) },
                { name: 'Embedded Figures', sections: sections(['Hidden Shapes']) },
                { name: 'Figure Series', sections: sections(['Pattern Completion']) },
              ],
            },
            {
              name: 'General Science (Physics)',
              chapters: [
                { name: 'Mechanics', sections: sections(['Motion', 'Laws of Motion']) },
                { name: 'Work Energy Power', sections: sections(['Basic Concepts']) },
                { name: 'Heat', sections: sections(['Temperature & Heat']) },
                { name: 'Light', sections: sections(['Reflection & Refraction']) },
                { name: 'Electricity', sections: sections(['Current & Circuits']) },
              ],
            },
            {
              name: 'General Science (Chemistry)',
              chapters: [
                { name: 'Basic', sections: sections(['Atoms & Molecules']) },
                { name: 'Reactions', sections: sections(['Chemical Reactions']) },
                { name: 'Periodic Table', sections: sections(['Elements']) },
                { name: 'Acids & Bases', sections: sections(['Properties']) },
              ],
            },
            {
              name: 'General Science (Biology)',
              chapters: [
                { name: 'Human Body', sections: sections(['Organ Systems']) },
                { name: 'Nutrition', sections: sections(['Human Nutrition']) },
                { name: 'Plants', sections: sections(['Photosynthesis']) },
                { name: 'Diseases', sections: sections(['Common Diseases']) },
              ],
            },
            {
              name: 'General Awareness (Static GK)',
              chapters: [
                { name: 'History', sections: sections(['Ancient, Medieval, Modern']) },
                { name: 'Geography', sections: sections(['India & World']) },
                { name: 'Polity', sections: sections(['Indian Constitution Basics']) },
                { name: 'Economics', sections: sections(['Basic Concepts']) },
              ],
            },
            {
              name: 'General Awareness (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Government Programs']) },
                { name: 'International', sections: sections(['Global Events']) },
                { name: 'Sports', sections: sections(['Events & Winners']) },
                { name: 'Awards', sections: sections(['National & International Awards']) },
                { name: 'Books & Authors', sections: sections(['Recent Publications']) },
              ],
            },
          ],
        },
      },
      {
        name: 'RRB JE',
        code: 'RRB_JE',
        syllabus: {
          subjects: [
            {
              name: 'Mathematics (Arithmetic)',
              chapters: [
                { name: 'Number System', sections: sections(['Integers, Fractions, Decimals']) },
                { name: 'BODMAS', sections: sections(['Order of Operations']) },
                { name: 'LCM & HCF', sections: sections(['Prime Factorization']) },
                { name: 'Percentage', sections: sections(['Basic & Applications']) },
                { name: 'Ratio & Proportion', sections: sections(['Basic Concepts']) },
                { name: 'Average', sections: sections(['Basic Problems']) },
                { name: 'Simple Interest', sections: sections(['Formula & Problems']) },
                { name: 'Compound Interest', sections: sections(['Basic Concepts']) },
                { name: 'Profit & Loss', sections: sections(['Discount, Marked Price']) },
                { name: 'Time & Work', sections: sections(['Basic Problems']) },
                { name: 'Time, Speed & Distance', sections: sections(['Basic Problems']) },
                { name: 'Algebra', sections: sections(['Basic Equations']) },
                { name: 'Geometry', sections: sections(['Lines, Angles, Triangles']) },
                { name: 'Mensuration', sections: sections(['2D & 3D Figures']) },
                { name: 'Trigonometry', sections: sections(['Basic Ratios']) },
                { name: 'Elementary Statistics', sections: sections(['Mean, Median, Mode']) },
              ],
            },
            {
              name: 'General Intelligence & Reasoning (Verbal)',
              chapters: [
                { name: 'Analogies', sections: sections(['Number & Alphabet']) },
                { name: 'Classification', sections: sections(['Odd One Out']) },
                { name: 'Series', sections: sections(['Number & Alphabet Series']) },
                { name: 'Coding-Decoding', sections: sections(['Basic Coding']) },
                { name: 'Blood Relations', sections: sections(['Basic Problems']) },
                { name: 'Direction Sense', sections: sections(['Basic Directions']) },
                { name: 'Ordering & Ranking', sections: sections(['Positions']) },
                { name: 'Venn Diagrams', sections: sections(['Basic Sets']) },
                { name: 'Syllogism', sections: sections(['Basic Logic']) },
              ],
            },
            {
              name: 'General Intelligence & Reasoning (Non-Verbal)',
              chapters: [
                { name: 'Mirror Images', sections: sections(['Reflection']) },
                { name: 'Water Images', sections: sections(['Inversion']) },
                { name: 'Paper Folding', sections: sections(['Pattern']) },
                { name: 'Paper Cutting', sections: sections(['Figure Formation']) },
                { name: 'Embedded Figures', sections: sections(['Hidden Shapes']) },
                { name: 'Figure Series', sections: sections(['Pattern Completion']) },
              ],
            },
            {
              name: 'General Awareness (Static GK)',
              chapters: [
                { name: 'History', sections: sections(['Ancient, Medieval, Modern']) },
                { name: 'Geography', sections: sections(['India & World']) },
                { name: 'Polity', sections: sections(['Indian Constitution Basics']) },
                { name: 'Economics', sections: sections(['Basic Concepts']) },
              ],
            },
            {
              name: 'General Awareness (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Government Programs']) },
                { name: 'International', sections: sections(['Global Events']) },
                { name: 'Sports', sections: sections(['Events & Winners']) },
                { name: 'Awards', sections: sections(['National & International Awards']) },
                { name: 'Books & Authors', sections: sections(['Recent Publications']) },
              ],
            },
            {
              name: 'General Science (Physics)',
              chapters: [
                { name: 'Mechanics', sections: sections(['Motion', 'Laws of Motion']) },
                { name: 'Work Energy Power', sections: sections(['Concepts']) },
                { name: 'Heat', sections: sections(['Thermodynamics Basics']) },
                { name: 'Light', sections: sections(['Reflection & Refraction']) },
                { name: 'Electricity', sections: sections(['Current & Circuits']) },
              ],
            },
            {
              name: 'General Science (Chemistry)',
              chapters: [
                { name: 'Basic', sections: sections(['Atoms & Molecules']) },
                { name: 'Reactions', sections: sections(['Chemical Reactions']) },
                { name: 'Periodic Table', sections: sections(['Elements']) },
                { name: 'Acids & Bases', sections: sections(['Properties']) },
              ],
            },
            {
              name: 'General Science (Biology)',
              chapters: [
                { name: 'Human Body', sections: sections(['Organ Systems']) },
                { name: 'Nutrition', sections: sections(['Human Nutrition']) },
                { name: 'Plants', sections: sections(['Photosynthesis']) },
                { name: 'Diseases', sections: sections(['Common Diseases']) },
              ],
            },
            {
              name: 'Technical (Engineering Basics)',
              chapters: [
                { name: 'Engineering Mechanics', sections: sections(['Forces & Laws']) },
                { name: 'Engineering Drawing', sections: sections(['Basics']) },
                { name: 'Units & Measurements', sections: sections(['SI Units']) },
                { name: 'Material Science', sections: sections(['Properties of Materials']) },
              ],
            },
            {
              name: 'Technical (Civil Engineering)',
              chapters: [
                { name: 'Building Materials', sections: sections(['Cement, Steel, Bricks']) },
                { name: 'Surveying', sections: sections(['Chain & Compass Survey']) },
                { name: 'Structural Engineering', sections: sections(['Beams & Columns']) },
                { name: 'Geotechnical Engineering', sections: sections(['Soil Mechanics']) },
                { name: 'Environmental Engineering', sections: sections(['Water Supply']) },
                { name: 'Transportation Engineering', sections: sections(['Railways & Highways']) },
              ],
            },
            {
              name: 'Technical (Mechanical Engineering)',
              chapters: [
                { name: 'Thermodynamics', sections: sections(['Laws & Systems']) },
                { name: 'Fluid Mechanics', sections: sections(['Properties of Fluids']) },
                { name: 'Strength of Materials', sections: sections(['Stress & Strain']) },
                { name: 'Theory of Machines', sections: sections(['Kinematics']) },
                { name: 'Production Engineering', sections: sections(['Manufacturing Processes']) },
              ],
            },
            {
              name: 'Technical (Electrical Engineering)',
              chapters: [
                { name: 'Basic Electrical', sections: sections(['Ohm’s Law']) },
                { name: 'Electrical Machines', sections: sections(['Transformers']) },
                { name: 'Power Systems', sections: sections(['Generation & Transmission']) },
                { name: 'Control Systems', sections: sections(['Basics']) },
              ],
            },
            {
              name: 'Technical (Electronics Engineering)',
              chapters: [
                { name: 'Basic Electronics', sections: sections(['Diodes & Transistors']) },
                { name: 'Digital Electronics', sections: sections(['Logic Gates']) },
                { name: 'Communication', sections: sections(['Signals & Systems']) },
                { name: 'Microprocessors', sections: sections(['Basics']) },
              ],
            },
          ],
        },
      },
      {
        name: 'RRB SSE',
        code: 'RRB_SSE',
        syllabus: {
          subjects: [
            {
              name: 'Mathematics (Arithmetic)',
              chapters: [
                { name: 'Number System', sections: sections(['Integers, Fractions, Decimals']) },
                { name: 'BODMAS', sections: sections(['Order of Operations']) },
                { name: 'LCM & HCF', sections: sections(['Prime Factorization']) },
                { name: 'Percentage', sections: sections(['Basic & Applications']) },
                { name: 'Ratio & Proportion', sections: sections(['Basic Concepts']) },
                { name: 'Average', sections: sections(['Basic Problems']) },
                { name: 'Simple Interest', sections: sections(['Formula & Problems']) },
                { name: 'Compound Interest', sections: sections(['Basic Concepts']) },
                { name: 'Profit & Loss', sections: sections(['Discount, Marked Price']) },
                { name: 'Time & Work', sections: sections(['Basic Problems']) },
                { name: 'Time, Speed & Distance', sections: sections(['Basic Problems']) },
                { name: 'Algebra', sections: sections(['Basic Equations']) },
                { name: 'Geometry', sections: sections(['Lines, Angles, Triangles']) },
                { name: 'Mensuration', sections: sections(['2D & 3D Figures']) },
                { name: 'Trigonometry', sections: sections(['Basic Ratios']) },
                { name: 'Elementary Statistics', sections: sections(['Mean, Median, Mode']) },
              ],
            },
            {
              name: 'General Intelligence & Reasoning (Verbal)',
              chapters: [
                { name: 'Analogies', sections: sections(['Number & Alphabet']) },
                { name: 'Classification', sections: sections(['Odd One Out']) },
                { name: 'Series', sections: sections(['Number & Alphabet Series']) },
                { name: 'Coding-Decoding', sections: sections(['Basic Coding']) },
                { name: 'Blood Relations', sections: sections(['Basic Problems']) },
                { name: 'Direction Sense', sections: sections(['Basic Directions']) },
                { name: 'Ordering & Ranking', sections: sections(['Positions']) },
                { name: 'Venn Diagrams', sections: sections(['Basic Sets']) },
                { name: 'Syllogism', sections: sections(['Basic Logic']) },
              ],
            },
            {
              name: 'General Intelligence & Reasoning (Non-Verbal)',
              chapters: [
                { name: 'Mirror Images', sections: sections(['Reflection']) },
                { name: 'Water Images', sections: sections(['Inversion']) },
                { name: 'Paper Folding', sections: sections(['Pattern']) },
                { name: 'Paper Cutting', sections: sections(['Figure Formation']) },
                { name: 'Embedded Figures', sections: sections(['Hidden Shapes']) },
                { name: 'Figure Series', sections: sections(['Pattern Completion']) },
              ],
            },
            {
              name: 'General Awareness (Static GK)',
              chapters: [
                { name: 'History', sections: sections(['Ancient, Medieval, Modern']) },
                { name: 'Geography', sections: sections(['India & World']) },
                { name: 'Polity', sections: sections(['Indian Constitution Basics']) },
                { name: 'Economics', sections: sections(['Basic Concepts']) },
              ],
            },
            {
              name: 'General Awareness (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Government Programs']) },
                { name: 'International', sections: sections(['Global Events']) },
                { name: 'Sports', sections: sections(['Events & Winners']) },
                { name: 'Awards', sections: sections(['National & International Awards']) },
                { name: 'Books & Authors', sections: sections(['Recent Publications']) },
              ],
            },
            {
              name: 'General Science (Physics)',
              chapters: [
                { name: 'Mechanics', sections: sections(['Motion', 'Laws of Motion']) },
                { name: 'Work Energy Power', sections: sections(['Concepts']) },
                { name: 'Heat', sections: sections(['Thermodynamics Basics']) },
                { name: 'Light', sections: sections(['Reflection & Refraction']) },
                { name: 'Electricity', sections: sections(['Current & Circuits']) },
              ],
            },
            {
              name: 'General Science (Chemistry)',
              chapters: [
                { name: 'Basic', sections: sections(['Atoms & Molecules']) },
                { name: 'Reactions', sections: sections(['Chemical Reactions']) },
                { name: 'Periodic Table', sections: sections(['Elements']) },
                { name: 'Acids & Bases', sections: sections(['Properties']) },
              ],
            },
            {
              name: 'General Science (Biology)',
              chapters: [
                { name: 'Human Body', sections: sections(['Organ Systems']) },
                { name: 'Nutrition', sections: sections(['Human Nutrition']) },
                { name: 'Plants', sections: sections(['Photosynthesis']) },
                { name: 'Diseases', sections: sections(['Common Diseases']) },
              ],
            },
            {
              name: 'Technical (Engineering Basics)',
              chapters: [
                { name: 'Engineering Mechanics', sections: sections(['Forces & Laws']) },
                { name: 'Engineering Drawing', sections: sections(['Basics']) },
                { name: 'Units & Measurements', sections: sections(['SI Units']) },
                { name: 'Material Science', sections: sections(['Properties of Materials']) },
              ],
            },
            {
              name: 'Technical (Civil Engineering)',
              chapters: [
                { name: 'Building Materials', sections: sections(['Cement, Steel, Bricks']) },
                { name: 'Surveying', sections: sections(['Chain & Compass Survey']) },
                { name: 'Structural Engineering', sections: sections(['Beams & Columns']) },
                { name: 'Geotechnical Engineering', sections: sections(['Soil Mechanics']) },
                { name: 'Environmental Engineering', sections: sections(['Water Supply']) },
                { name: 'Transportation Engineering', sections: sections(['Railways & Highways']) },
              ],
            },
            {
              name: 'Technical (Mechanical Engineering)',
              chapters: [
                { name: 'Thermodynamics', sections: sections(['Laws & Systems']) },
                { name: 'Fluid Mechanics', sections: sections(['Properties of Fluids']) },
                { name: 'Strength of Materials', sections: sections(['Stress & Strain']) },
                { name: 'Theory of Machines', sections: sections(['Kinematics']) },
                { name: 'Production Engineering', sections: sections(['Manufacturing Processes']) },
              ],
            },
            {
              name: 'Technical (Electrical Engineering)',
              chapters: [
                { name: 'Basic Electrical', sections: sections(['Ohm’s Law']) },
                { name: 'Electrical Machines', sections: sections(['Transformers']) },
                { name: 'Power Systems', sections: sections(['Generation & Transmission']) },
                { name: 'Control Systems', sections: sections(['Basics']) },
              ],
            },
            {
              name: 'Technical (Electronics Engineering)',
              chapters: [
                { name: 'Basic Electronics', sections: sections(['Diodes & Transistors']) },
                { name: 'Digital Electronics', sections: sections(['Logic Gates']) },
                { name: 'Communication', sections: sections(['Signals & Systems']) },
                { name: 'Microprocessors', sections: sections(['Basics']) },
              ],
            },
          ],
        },
      },
      {
        name: 'RPF',
        code: 'RPF',
        syllabus: {
          subjects: [
            {
              name: 'Mathematics (Arithmetic)',
              chapters: [
                { name: 'Number System', sections: sections(['Integers, Fractions, Decimals']) },
                { name: 'BODMAS', sections: sections(['Order of Operations']) },
                { name: 'LCM & HCF', sections: sections(['Prime Factorization']) },
                { name: 'Percentage', sections: sections(['Basic & Applications']) },
                { name: 'Ratio & Proportion', sections: sections(['Basic Concepts']) },
                { name: 'Average', sections: sections(['Basic Problems']) },
                { name: 'Simple Interest', sections: sections(['Formula & Problems']) },
                { name: 'Profit & Loss', sections: sections(['Discount, Marked Price']) },
                { name: 'Time & Work', sections: sections(['Basic Problems']) },
                { name: 'Time, Speed & Distance', sections: sections(['Basic Problems']) },
                { name: 'Algebra', sections: sections(['Basic Equations']) },
                { name: 'Geometry', sections: sections(['Lines, Angles, Triangles']) },
                { name: 'Mensuration', sections: sections(['2D Figures']) },
                { name: 'Trigonometry', sections: sections(['Basic Ratios']) },
                { name: 'Elementary Statistics', sections: sections(['Mean, Median, Mode']) },
              ],
            },
            {
              name: 'General Intelligence & Reasoning (Verbal)',
              chapters: [
                { name: 'Analogies', sections: sections(['Number & Alphabet']) },
                { name: 'Classification', sections: sections(['Odd One Out']) },
                { name: 'Series', sections: sections(['Number & Alphabet Series']) },
                { name: 'Coding-Decoding', sections: sections(['Basic Coding']) },
                { name: 'Blood Relations', sections: sections(['Basic Problems']) },
                { name: 'Direction Sense', sections: sections(['Basic Directions']) },
                { name: 'Ordering & Ranking', sections: sections(['Positions']) },
                { name: 'Venn Diagrams', sections: sections(['Basic Sets']) },
                { name: 'Syllogism', sections: sections(['Basic Logic']) },
                { name: 'Decision Making', sections: sections(['Situational Problems']) },
              ],
            },
            {
              name: 'General Intelligence & Reasoning (Non-Verbal)',
              chapters: [
                { name: 'Mirror Images', sections: sections(['Reflection']) },
                { name: 'Water Images', sections: sections(['Inversion']) },
                { name: 'Paper Folding', sections: sections(['Pattern']) },
                { name: 'Paper Cutting', sections: sections(['Figure Formation']) },
                { name: 'Embedded Figures', sections: sections(['Hidden Shapes']) },
                { name: 'Figure Series', sections: sections(['Pattern Completion']) },
              ],
            },
            {
              name: 'General Awareness (History)',
              chapters: [
                { name: 'Ancient', sections: sections(['Indus Valley Civilization', 'Vedic Period', 'Buddhism & Jainism', 'Maurya Empire', 'Gupta Empire']) },
                { name: 'Medieval', sections: sections(['Delhi Sultanate', 'Mughal Empire']) },
                { name: 'Modern', sections: sections(['Revolt of 1857', 'Indian National Movement']) },
              ],
            },
            {
              name: 'General Awareness (Geography)',
              chapters: [
                { name: 'Physical', sections: sections(['Earth Structure', 'Landforms', 'Rivers & Oceans']) },
                { name: 'Indian', sections: sections(['Climate of India', 'Soils of India', 'Agriculture']) },
                { name: 'World', sections: sections(['Continents & Oceans']) },
              ],
            },
            {
              name: 'General Awareness (Polity)',
              chapters: [
                { name: 'Indian Constitution', sections: sections(['Preamble', 'Fundamental Rights', 'Directive Principles']) },
                { name: 'Governance', sections: sections(['President', 'Prime Minister']) },
                { name: 'Parliament', sections: sections(['Lok Sabha & Rajya Sabha']) },
              ],
            },
            {
              name: 'General Awareness (Economics)',
              chapters: [
                { name: 'Basic Concepts', sections: sections(['Demand & Supply', 'Inflation']) },
                { name: 'Banking', sections: sections(['RBI Functions']) },
                { name: 'Budget', sections: sections(['Fiscal Policy']) },
                { name: 'Schemes', sections: sections(['Government Schemes']) },
              ],
            },
            {
              name: 'General Science (Physics)',
              chapters: [
                { name: 'Mechanics', sections: sections(['Motion', 'Laws of Motion']) },
                { name: 'Work Energy Power', sections: sections(['Concepts']) },
                { name: 'Heat', sections: sections(['Temperature & Heat']) },
                { name: 'Light', sections: sections(['Reflection & Refraction']) },
                { name: 'Electricity', sections: sections(['Current & Circuits']) },
              ],
            },
            {
              name: 'General Science (Chemistry)',
              chapters: [
                { name: 'Basic', sections: sections(['Atoms & Molecules']) },
                { name: 'Reactions', sections: sections(['Chemical Reactions']) },
                { name: 'Periodic Table', sections: sections(['Elements']) },
                { name: 'Acids & Bases', sections: sections(['Properties']) },
              ],
            },
            {
              name: 'General Science (Biology)',
              chapters: [
                { name: 'Human Body', sections: sections(['Organ Systems']) },
                { name: 'Nutrition', sections: sections(['Human Nutrition']) },
                { name: 'Plants', sections: sections(['Photosynthesis']) },
                { name: 'Diseases', sections: sections(['Common Diseases']) },
              ],
            },
            {
              name: 'General Awareness (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Government Programs']) },
                { name: 'International', sections: sections(['Global Events']) },
                { name: 'Sports', sections: sections(['Events & Winners']) },
                { name: 'Awards', sections: sections(['National & International Awards']) },
                { name: 'Books & Authors', sections: sections(['Recent Publications']) },
              ],
            },
          ],
        },
      },
      {
        name: 'RRB ALP',
        code: 'RRB_ALP',
        syllabus: {
          subjects: [
            {
              name: 'Mathematics (Arithmetic)',
              chapters: [
                { name: 'Number System', sections: sections(['Integers, Fractions, Decimals']) },
                { name: 'BODMAS', sections: sections(['Order of Operations']) },
                { name: 'LCM & HCF', sections: sections(['Prime Factorization']) },
                { name: 'Percentage', sections: sections(['Basic & Applications']) },
                { name: 'Ratio & Proportion', sections: sections(['Basic Concepts']) },
                { name: 'Average', sections: sections(['Basic Problems']) },
                { name: 'Simple Interest', sections: sections(['Formula & Problems']) },
                { name: 'Profit & Loss', sections: sections(['Discount, Marked Price']) },
                { name: 'Time & Work', sections: sections(['Basic Problems']) },
                { name: 'Time, Speed & Distance', sections: sections(['Basic Problems']) },
                { name: 'Algebra', sections: sections(['Basic Equations']) },
                { name: 'Geometry', sections: sections(['Lines, Angles, Triangles']) },
                { name: 'Mensuration', sections: sections(['2D Figures']) },
                { name: 'Trigonometry', sections: sections(['Basic Ratios']) },
                { name: 'Elementary Statistics', sections: sections(['Mean, Median, Mode']) },
              ],
            },
            {
              name: 'General Intelligence & Reasoning (Verbal)',
              chapters: [
                { name: 'Analogies', sections: sections(['Number & Alphabet']) },
                { name: 'Classification', sections: sections(['Odd One Out']) },
                { name: 'Series', sections: sections(['Number & Alphabet Series']) },
                { name: 'Coding-Decoding', sections: sections(['Basic Coding']) },
                { name: 'Blood Relations', sections: sections(['Basic Problems']) },
                { name: 'Direction Sense', sections: sections(['Basic Directions']) },
                { name: 'Ordering & Ranking', sections: sections(['Positions']) },
                { name: 'Venn Diagrams', sections: sections(['Basic Sets']) },
                { name: 'Syllogism', sections: sections(['Basic Logic']) },
              ],
            },
            {
              name: 'General Intelligence & Reasoning (Non-Verbal)',
              chapters: [
                { name: 'Mirror Images', sections: sections(['Reflection']) },
                { name: 'Water Images', sections: sections(['Inversion']) },
                { name: 'Paper Folding', sections: sections(['Pattern']) },
                { name: 'Paper Cutting', sections: sections(['Figure Formation']) },
                { name: 'Embedded Figures', sections: sections(['Hidden Shapes']) },
                { name: 'Figure Series', sections: sections(['Pattern Completion']) },
              ],
            },
            {
              name: 'General Science (Physics)',
              chapters: [
                { name: 'Mechanics', sections: sections(['Motion', 'Laws of Motion']) },
                { name: 'Work Energy Power', sections: sections(['Concepts']) },
                { name: 'Heat', sections: sections(['Temperature & Heat']) },
                { name: 'Light', sections: sections(['Reflection & Refraction']) },
                { name: 'Electricity', sections: sections(['Current & Circuits']) },
              ],
            },
            {
              name: 'General Science (Chemistry)',
              chapters: [
                { name: 'Basic', sections: sections(['Atoms & Molecules']) },
                { name: 'Reactions', sections: sections(['Chemical Reactions']) },
                { name: 'Periodic Table', sections: sections(['Elements']) },
                { name: 'Acids & Bases', sections: sections(['Properties']) },
              ],
            },
            {
              name: 'General Science (Biology)',
              chapters: [
                { name: 'Human Body', sections: sections(['Organ Systems']) },
                { name: 'Nutrition', sections: sections(['Human Nutrition']) },
                { name: 'Plants', sections: sections(['Photosynthesis']) },
                { name: 'Diseases', sections: sections(['Common Diseases']) },
              ],
            },
            {
              name: 'General Awareness (Static GK)',
              chapters: [
                { name: 'History', sections: sections(['Ancient, Medieval, Modern']) },
                { name: 'Geography', sections: sections(['India & World']) },
                { name: 'Polity', sections: sections(['Indian Constitution Basics']) },
                { name: 'Economics', sections: sections(['Basic Concepts']) },
              ],
            },
            {
              name: 'General Awareness (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Government Programs']) },
                { name: 'International', sections: sections(['Global Events']) },
                { name: 'Sports', sections: sections(['Events & Winners']) },
                { name: 'Awards', sections: sections(['National & International Awards']) },
                { name: 'Books & Authors', sections: sections(['Recent Publications']) },
              ],
            },
            {
              name: 'Technical (Electrical)',
              chapters: [
                { name: 'Basic Electrical', sections: sections(['Ohm’s Law']) },
                { name: 'Electrical Machines', sections: sections(['Motors & Generators']) },
                { name: 'Wiring', sections: sections(['House Wiring']) },
                { name: 'Measurement', sections: sections(['Electrical Instruments']) },
              ],
            },
            {
              name: 'Technical (Mechanical)',
              chapters: [
                { name: 'Engineering Mechanics', sections: sections(['Basic Concepts']) },
                { name: 'Thermodynamics', sections: sections(['Basic Laws']) },
                { name: 'Workshop', sections: sections(['Tools & Machines']) },
                { name: 'Production', sections: sections(['Manufacturing Processes']) },
              ],
            },
            {
              name: 'Technical (Electronics)',
              chapters: [
                { name: 'Basic Electronics', sections: sections(['Diodes & Transistors']) },
                { name: 'Digital Electronics', sections: sections(['Logic Gates']) },
                { name: 'Communication', sections: sections(['Basic Signals']) },
                { name: 'Measurement', sections: sections(['Electronic Instruments']) },
              ],
            },
          ],
        },
      },
      {
        name: 'RRB Technician',
        code: 'RRB_TECHNICIAN',
        syllabus: {
          subjects: [
            {
              name: 'Mathematics (Arithmetic)',
              chapters: [
                { name: 'Number System', sections: sections(['Integers, Fractions, Decimals']) },
                { name: 'BODMAS', sections: sections(['Order of Operations']) },
                { name: 'LCM & HCF', sections: sections(['Prime Factorization']) },
                { name: 'Percentage', sections: sections(['Basic & Applications']) },
                { name: 'Ratio & Proportion', sections: sections(['Basic Concepts']) },
                { name: 'Average', sections: sections(['Basic Problems']) },
                { name: 'Simple Interest', sections: sections(['Formula & Problems']) },
                { name: 'Profit & Loss', sections: sections(['Discount, Marked Price']) },
                { name: 'Time & Work', sections: sections(['Basic Problems']) },
                { name: 'Time, Speed & Distance', sections: sections(['Basic Problems']) },
                { name: 'Algebra', sections: sections(['Basic Equations']) },
                { name: 'Geometry', sections: sections(['Lines, Angles, Triangles']) },
                { name: 'Mensuration', sections: sections(['2D Figures']) },
                { name: 'Trigonometry', sections: sections(['Basic Ratios']) },
                { name: 'Elementary Statistics', sections: sections(['Mean, Median, Mode']) },
              ],
            },
            {
              name: 'General Intelligence & Reasoning (Verbal)',
              chapters: [
                { name: 'Analogies', sections: sections(['Number & Alphabet']) },
                { name: 'Classification', sections: sections(['Odd One Out']) },
                { name: 'Series', sections: sections(['Number & Alphabet Series']) },
                { name: 'Coding-Decoding', sections: sections(['Basic Coding']) },
                { name: 'Blood Relations', sections: sections(['Basic Problems']) },
                { name: 'Direction Sense', sections: sections(['Basic Directions']) },
                { name: 'Ordering & Ranking', sections: sections(['Positions']) },
                { name: 'Venn Diagrams', sections: sections(['Basic Sets']) },
                { name: 'Syllogism', sections: sections(['Basic Logic']) },
              ],
            },
            {
              name: 'General Intelligence & Reasoning (Non-Verbal)',
              chapters: [
                { name: 'Mirror Images', sections: sections(['Reflection']) },
                { name: 'Water Images', sections: sections(['Inversion']) },
                { name: 'Paper Folding', sections: sections(['Pattern']) },
                { name: 'Paper Cutting', sections: sections(['Figure Formation']) },
                { name: 'Embedded Figures', sections: sections(['Hidden Shapes']) },
                { name: 'Figure Series', sections: sections(['Pattern Completion']) },
              ],
            },
            {
              name: 'General Science (Physics)',
              chapters: [
                { name: 'Mechanics', sections: sections(['Motion', 'Laws of Motion']) },
                { name: 'Work Energy Power', sections: sections(['Concepts']) },
                { name: 'Heat', sections: sections(['Temperature & Heat']) },
                { name: 'Light', sections: sections(['Reflection & Refraction']) },
                { name: 'Electricity', sections: sections(['Current & Circuits']) },
              ],
            },
            {
              name: 'General Science (Chemistry)',
              chapters: [
                { name: 'Basic', sections: sections(['Atoms & Molecules']) },
                { name: 'Reactions', sections: sections(['Chemical Reactions']) },
                { name: 'Periodic Table', sections: sections(['Elements']) },
                { name: 'Acids & Bases', sections: sections(['Properties']) },
              ],
            },
            {
              name: 'General Science (Biology)',
              chapters: [
                { name: 'Human Body', sections: sections(['Organ Systems']) },
                { name: 'Nutrition', sections: sections(['Human Nutrition']) },
                { name: 'Plants', sections: sections(['Photosynthesis']) },
                { name: 'Diseases', sections: sections(['Common Diseases']) },
              ],
            },
            {
              name: 'General Awareness (Static GK)',
              chapters: [
                { name: 'History', sections: sections(['Ancient, Medieval, Modern']) },
                { name: 'Geography', sections: sections(['India & World']) },
                { name: 'Polity', sections: sections(['Indian Constitution Basics']) },
                { name: 'Economics', sections: sections(['Basic Concepts']) },
              ],
            },
            {
              name: 'General Awareness (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Government Programs']) },
                { name: 'International', sections: sections(['Global Events']) },
                { name: 'Sports', sections: sections(['Events & Winners']) },
                { name: 'Awards', sections: sections(['National & International Awards']) },
                { name: 'Books & Authors', sections: sections(['Recent Publications']) },
              ],
            },
            {
              name: 'Technical (Electrical)',
              chapters: [
                { name: 'Basic Electrical', sections: sections(['Ohm’s Law']) },
                { name: 'Electrical Machines', sections: sections(['Motors & Generators']) },
                { name: 'Wiring', sections: sections(['House Wiring']) },
                { name: 'Measurement', sections: sections(['Electrical Instruments']) },
              ],
            },
            {
              name: 'Technical (Mechanical)',
              chapters: [
                { name: 'Engineering Mechanics', sections: sections(['Basic Concepts']) },
                { name: 'Thermodynamics', sections: sections(['Basic Laws']) },
                { name: 'Workshop', sections: sections(['Tools & Machines']) },
                { name: 'Production', sections: sections(['Manufacturing Processes']) },
              ],
            },
            {
              name: 'Technical (Electronics)',
              chapters: [
                { name: 'Basic Electronics', sections: sections(['Diodes & Transistors']) },
                { name: 'Digital Electronics', sections: sections(['Logic Gates']) },
                { name: 'Communication', sections: sections(['Basic Signals']) },
                { name: 'Measurement', sections: sections(['Electronic Instruments']) },
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

