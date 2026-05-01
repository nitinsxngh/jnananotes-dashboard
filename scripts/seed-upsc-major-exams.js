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
                {
                  name: 'Current Affairs',
                  sections: sections([
                    'National Events',
                    'International Events',
                    'Government Schemes & Policies',
                    'Reports & Indices',
                    'Summits & International Groupings',
                    'Science & Tech in News',
                    'Environment in News',
                    'Awards, Appointments & Obituaries',
                  ]),
                },
                {
                  name: 'Ancient History',
                  sections: sections([
                    'Prehistoric & Indus Valley Civilization',
                    'Vedic Period (Society, Polity, Economy)',
                    'Mahajanapadas & Rise of Magadha',
                    'Mauryan Empire (Administration, Ashoka)',
                    'Post-Mauryan Period (Shungas, Kushanas, Satavahanas)',
                    'Gupta Age (Art, Culture, Administration)',
                    'Post-Gupta & Early Medieval India',
                    'Buddhism & Jainism (Doctrines, Councils)',
                    'Ancient Literature (Vedas, Epics, Sangam)',
                    'Ancient Science & Technology (Metallurgy, Maths, Medicine)',
                    'Art & Architecture (Stupa, Temple, Rock-cut)',
                    'South India: Cholas, Cheras, Pandyas (Basics)',
                  ]),
                },
                {
                  name: 'Medieval History',
                  sections: sections([
                    'Early Medieval India (Regional Kingdoms)',
                    'Delhi Sultanate (Administration, Society, Economy)',
                    'Vijayanagara & Bahmani Kingdoms',
                    'Mughal Empire (Polity, Economy, Culture)',
                    'Marathas (Rise & Administration - Basics)',
                    'Bhakti Movement',
                    'Sufi Movement',
                    'Medieval Art & Architecture',
                    'Medieval Literature & Languages (Basics)',
                    'Society & Economy in Medieval India (Basics)',
                  ]),
                },
                {
                  name: 'Modern History',
                  sections: sections([
                    'Advent of Europeans & Expansion of British Power',
                    'Economic Impact of British Rule',
                    'Socio-Religious Reform Movements',
                    'Peasant & Tribal Movements',
                    '1857 Revolt',
                    'Moderates, Extremists & Revolutionary Nationalism',
                    'Gandhian Era (Major Movements)',
                    'Constitutional Developments (1773–1947)',
                    'Quit India Movement & INA (Basics)',
                    'Partition & Independence (Basics)',
                    'Post-Independence Consolidation (Integration, Reorganization - Basics)',
                  ]),
                },
                {
                  name: 'Art & Culture',
                  sections: sections([
                    'Indian Architecture (Ancient to Modern - Overview)',
                    'Sculpture & Pottery Traditions',
                    'Paintings (Cave, Mughal, Rajput - Basics)',
                    'Music (Classical, Folk - Basics)',
                    'Dance Forms (Classical, Folk - Basics)',
                    'Theatre & Puppetry (Basics)',
                    'UNESCO World Heritage Sites (India - Basics)',
                    'Religious & Cultural Traditions (Basics)',
                    'Indian Literature (Overview)',
                    'Fairs, Festivals & Cultural Practices (Basics)',
                  ]),
                },
                {
                  name: 'Physical Geography',
                  sections: sections([
                    'Geomorphology (Landforms, Plate Tectonics)',
                    'Climatology (Atmosphere, Winds, Rainfall)',
                    'Oceanography (Currents, El Niño/La Niña)',
                    'Biogeography (Ecosystems - Basics)',
                    'Soils (Types, Formation - Basics)',
                    'Natural Vegetation (Types - Basics)',
                    'Natural Hazards (Earthquakes, Cyclones - Basics)',
                  ]),
                },
                {
                  name: 'Indian Geography',
                  sections: sections([
                    'Physiographic Divisions of India',
                    'Drainage Systems (Himalayan & Peninsular Rivers)',
                    'Indian Climate (Monsoon, Western Disturbances)',
                    'Soils of India',
                    'Natural Vegetation & Wildlife (Basics)',
                    'Minerals & Energy Resources (Distribution)',
                    'Agriculture (Crops, Irrigation - Basics)',
                    'Industries (Location Factors - Basics)',
                    'Population Distribution & Migration (Basics)',
                    'Urbanization & Smart Cities (Basics)',
                  ]),
                },
                {
                  name: 'World Geography',
                  sections: sections([
                    'Continents & Major Physical Features',
                    'Climate Regions (Köppen - Basics)',
                    'Ocean Currents & Climate Linkages',
                    'Natural Resources (Global Distribution - Basics)',
                    'Important Straits, Passes & Canals',
                    'Mapping: Latitudes, Longitudes, Time Zones',
                  ]),
                },
                {
                  name: 'Constitution',
                  sections: sections([
                    'Preamble, Fundamental Rights & Duties',
                    'Directive Principles of State Policy',
                    'Union & State Executive (Basics)',
                    'Parliament & State Legislatures (Basics)',
                    'Judiciary (Supreme Court, High Courts - Basics)',
                    'Federalism & Centre-State Relations (Basics)',
                    'Emergency Provisions (Basics)',
                    'Amendment Procedure (Basics)',
                    'Schedules & Important Articles (Basics)',
                  ]),
                },
                {
                  name: 'Governance',
                  sections: sections([
                    'Public Policy (Basics)',
                    'Transparency & Accountability (Basics)',
                    'E-Governance (Basics)',
                    'Citizen Charters & Service Delivery (Basics)',
                    'RTI (Basics)',
                    'Role of Civil Services in Democracy (Basics)',
                  ]),
                },
                {
                  name: 'Political System',
                  sections: sections([
                    'Elections & Representation (Basics)',
                    'Political Parties & Party System (Basics)',
                    'Pressure Groups & Associations (Basics)',
                    'Local Governance (Panchayati Raj, Municipalities - Basics)',
                    'Constitutional Bodies (ECI, CAG, UPSC - Basics)',
                    'Statutory Bodies (NHRC, CIC - Basics)',
                  ]),
                },
                {
                  name: 'Rights Issues',
                  sections: sections([
                    'Women, Children & Vulnerable Sections (Basics)',
                    'Minority Rights (Basics)',
                    'Disability & Inclusion (Basics)',
                    'Human Rights Institutions (Basics)',
                  ]),
                },
                {
                  name: 'Basic Concepts',
                  sections: sections([
                    'Demand & Supply (Basics)',
                    'Market Structures (Basics)',
                    'GDP/GNP, Inflation, Unemployment (Basics)',
                    'Money, Banking & Credit (Basics)',
                    'Fiscal Deficit & Debt (Basics)',
                    'Balance of Payments (Basics)',
                  ]),
                },
                {
                  name: 'Economic Development',
                  sections: sections([
                    'Poverty & Inequality (Basics)',
                    'Inclusive Growth (Basics)',
                    'Sustainable Development (Basics)',
                    'Human Development Indicators (Basics)',
                    'Employment & Demography (Basics)',
                  ]),
                },
                {
                  name: 'Ecology',
                  sections: sections([
                    'Ecosystem Structure & Function',
                    'Food Chains, Food Webs & Ecological Pyramids',
                    'Biomes (Basics)',
                    'Ecological Succession (Basics)',
                  ]),
                },
                {
                  name: 'Biodiversity',
                  sections: sections([
                    'Levels of Biodiversity & Hotspots (Basics)',
                    'Protected Areas (National Parks, Sanctuaries)',
                    'Endangered Species (India - Basics)',
                    'Invasive Species (Basics)',
                  ]),
                },
                {
                  name: 'Climate Change',
                  sections: sections([
                    'Greenhouse Effect & Global Warming (Basics)',
                    'Climate Mitigation & Adaptation (Basics)',
                    'Carbon Markets (Basics)',
                    'International Agreements (UNFCCC, Paris - Basics)',
                  ]),
                },
                {
                  name: 'Basic Science',
                  sections: sections([
                    'Physics (Basics)',
                    'Chemistry (Basics)',
                    'Biology (Basics)',
                    'Everyday Science (Basics)',
                  ]),
                },
                {
                  name: 'Technology Developments',
                  sections: sections([
                    'Space Technology (Basics)',
                    'Biotechnology (Basics)',
                    'IT & Communication (Basics)',
                    'Defence Technology (Basics)',
                    'Health Tech (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Prelims (CSAT)',
              chapters: [
                { name: 'Comprehension', sections: sections(['Reading Comprehension', 'Passage-Based Questions', 'Vocabulary in Context']) },
                { name: 'Interpersonal Skills', sections: sections(['Communication', 'Conflict Resolution (Basics)']) },
                { name: 'Logical Reasoning', sections: sections(['Analytical Ability', 'Syllogism', 'Seating & Arrangements (Basics)', 'Coding-Decoding (Basics)']) },
                { name: 'Decision Making', sections: sections(['Problem Solving', 'Situational Judgement (Basics)']) },
                {
                  name: 'Numeracy',
                  sections: sections([
                    'Number System',
                    'Percentages',
                    'Ratio & Proportion',
                    'Average',
                    'Simple & Compound Interest',
                    'Profit & Loss',
                    'Time & Work',
                    'Time, Speed & Distance',
                    'Algebra (Basics)',
                    'Geometry (Basics)',
                  ]),
                },
                { name: 'Data Interpretation', sections: sections(['Data Interpretation', 'Tables', 'Bar Graphs', 'Line Graphs', 'Pie Charts']) },
              ],
            },
            {
              name: 'GS1',
              chapters: [
                {
                  name: 'History',
                  sections: sections([
                    'Indian Culture',
                    'Modern India',
                    'World History',
                    'Salient Features of Indian Society',
                    'Role of Women & Women’s Organization',
                    'Population & Associated Issues',
                    'Poverty & Developmental Issues',
                    'Urbanization, Problems & Remedies',
                    'Social Empowerment',
                    'Communalism, Regionalism & Secularism',
                  ]),
                },
                {
                  name: 'Geography',
                  sections: sections([
                    'Physical Geography',
                    'Resource Distribution',
                    'Important Geophysical Phenomena',
                    'Changes in Critical Geographical Features',
                    'Factors for Location of Industries',
                  ]),
                },
                { name: 'Society', sections: sections(['Indian Society', 'Diversity Issues', 'Globalization & its Effects', 'Social Issues & Challenges']) },
              ],
            },
            {
              name: 'GS2',
              chapters: [
                {
                  name: 'Polity',
                  sections: sections([
                    'Constitution',
                    'Governance',
                    'Parliament',
                    'Functions & Responsibilities of Union and States',
                    'Separation of Powers',
                    'Judiciary',
                    'Representation of People’s Act (Basics)',
                    'Statutory, Regulatory & Quasi-Judicial Bodies',
                    'Pressure Groups & Formal/Informal Associations',
                  ]),
                },
                {
                  name: 'Social Justice',
                  sections: sections([
                    'Welfare Schemes',
                    'Education & Health',
                    'Vulnerable Sections',
                    'Poverty & Hunger',
                    'Issues Relating to Development & Management of Social Sector',
                    'Role of NGOs, SHGs, Pressure Groups & Associations',
                  ]),
                },
                {
                  name: 'International Relations',
                  sections: sections([
                    'Bilateral Relations',
                    'Global Institutions',
                    'India and its Neighbourhood Relations',
                    'Agreements involving India',
                    'Effect of Policies of Developed/Developing Countries',
                    'Indian Diaspora',
                  ]),
                },
              ],
            },
            {
              name: 'GS3',
              chapters: [
                {
                  name: 'Economy',
                  sections: sections([
                    'Growth & Development',
                    'Budgeting',
                    'Inclusive Growth',
                    'Government Budgeting',
                    'Major Crops & Cropping Patterns (Overview)',
                    'Land Reforms (Basics)',
                    'Infrastructure (Energy, Ports, Roads, Airports, Railways)',
                    'Investment Models',
                  ]),
                },
                {
                  name: 'Agriculture',
                  sections: sections([
                    'Cropping Patterns',
                    'Irrigation',
                    'E-Technology in Aid of Farmers',
                    'Food Processing & Related Industries',
                    'Farm Subsidies & MSP (Basics)',
                    'Buffer Stocks & Food Security (Basics)',
                  ]),
                },
                { name: 'Science & Tech', sections: sections(['Developments', 'Indigenization of Technology', 'Awareness in IT, Space, Computers, Robotics, Nanotech, Biotech']) },
                {
                  name: 'Environment',
                  sections: sections([
                    'Conservation',
                    'Environmental Pollution & Degradation',
                    'Environmental Impact Assessment (Basics)',
                  ]),
                },
                {
                  name: 'Security',
                  sections: sections([
                    'Internal Security',
                    'Linkages of Organized Crime with Terrorism',
                    'Role of External State and Non-State Actors',
                    'Cyber Security',
                    'Border Management',
                    'Money Laundering',
                    'Security Challenges & their Management',
                  ]),
                },
                {
                  name: 'Disaster Management',
                  sections: sections([
                    'Preparedness',
                    'Disaster Risk Reduction',
                    'Institutional Mechanisms (Basics)',
                    'Response & Rehabilitation (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'GS4',
              chapters: [
                {
                  name: 'Ethics',
                  sections: sections([
                    'Human Values',
                    'Attitude',
                    'Emotional Intelligence',
                    'Public Service Values',
                    'Case Studies',
                    'Ethics and Human Interface',
                    'Aptitude and Foundational Values for Civil Service',
                    'Probity in Governance',
                  ]),
                },
              ],
            },
            {
              name: 'Essay',
              chapters: [{ name: 'Topics', sections: sections(['Philosophical Essays', 'Social Issues', 'Governance']) }],
            },
            {
              name: 'Optional',
              chapters: [
                { name: 'Paper I', sections: sections(['Subject Topics']) },
                { name: 'Paper II', sections: sections(['Subject Topics']) },
              ],
            },
            {
              name: 'Interview',
              chapters: [
                { name: 'Personality', sections: sections(['Decision Making', 'Awareness', 'Communication']) },
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
                {
                  name: 'Sets',
                  sections: sections([
                    'Sets & Operations',
                    'Union, Intersection, Difference, Complement',
                    'Venn Diagrams (Basics)',
                  ]),
                },
                {
                  name: 'Relations & Functions',
                  sections: sections([
                    'Concepts',
                    'Types of Relations (Reflexive, Symmetric, Transitive)',
                    'Types of Functions (One-One, Onto, Many-One)',
                    'Graphs of Simple Functions (Basics)',
                  ]),
                },
                {
                  name: 'Complex Numbers',
                  sections: sections([
                    'Basic Operations',
                    'Modulus & Argument (Basics)',
                    'Conjugate & Properties',
                    'Polar Form (Basics)',
                  ]),
                },
                {
                  name: 'Quadratic Equations',
                  sections: sections([
                    'Solutions & Roots',
                    'Nature of Roots (Discriminant)',
                    'Relation Between Roots & Coefficients',
                    'Quadratic Inequalities (Basics)',
                  ]),
                },
                {
                  name: 'Logarithms',
                  sections: sections([
                    'Laws & Applications',
                    'Change of Base (Basics)',
                    'Exponents & Surds (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Mathematics (Matrices & Determinants)',
              chapters: [
                {
                  name: 'Matrices',
                  sections: sections([
                    'Types & Operations',
                    'Addition, Subtraction, Multiplication',
                    'Transpose & Symmetric Matrices (Basics)',
                    'Inverse of a Matrix (Basics)',
                  ]),
                },
                {
                  name: 'Determinants',
                  sections: sections([
                    'Properties',
                    'Evaluation of Determinants (2x2, 3x3)',
                    'Cofactors & Adjoint (Basics)',
                    'System of Linear Equations (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Mathematics (Trigonometry)',
              chapters: [
                { name: 'Angles', sections: sections(['Measurement', 'Degree-Radian Conversion', 'Trigonometric Ratios (Basics)']) },
                { name: 'Identities', sections: sections(['Trigonometric Identities', 'Compound Angles (Basics)', 'Transformation Formulae (Basics)']) },
                { name: 'Heights & Distances', sections: sections(['Applications', 'Angle of Elevation & Depression']) },
              ],
            },
            {
              name: 'Mathematics (Analytical Geometry)',
              chapters: [
                { name: 'Lines', sections: sections(['Straight Lines', 'Slope & Intercepts', 'Distance Formula', 'Section Formula (Basics)']) },
                { name: 'Conic Sections', sections: sections(['Circle, Parabola, Ellipse, Hyperbola', 'Standard Equations (Basics)', 'Tangent & Normal (Basics)']) },
              ],
            },
            {
              name: 'Mathematics (Differential Calculus)',
              chapters: [
                { name: 'Limits', sections: sections(['Concepts', 'Standard Limits (Basics)', 'Continuity (Basics)']) },
                { name: 'Derivatives', sections: sections(['Applications', 'Derivatives of Standard Functions', 'Maxima & Minima (Basics)', 'Rate of Change (Basics)']) },
              ],
            },
            {
              name: 'Mathematics (Integral Calculus)',
              chapters: [
                { name: 'Integration', sections: sections(['Basic Integration', 'Substitution (Basics)', 'Integration by Parts (Basics)']) },
                { name: 'Applications', sections: sections(['Area Under Curve', 'Definite Integrals (Basics)']) },
              ],
            },
            {
              name: 'Mathematics (Vector Algebra)',
              chapters: [{ name: 'Vectors', sections: sections(['Basic Operations', 'Dot Product (Basics)', 'Cross Product (Basics)', 'Applications (Basics)']) }],
            },
            {
              name: 'Mathematics (Statistics)',
              chapters: [{ name: 'Data Analysis', sections: sections(['Mean, Median, Mode', 'Variance & Standard Deviation (Basics)', 'Measures of Dispersion (Basics)']) }],
            },
            {
              name: 'Mathematics (Probability)',
              chapters: [{ name: 'Probability', sections: sections(['Basic Concepts', 'Conditional Probability (Basics)', 'Independent Events (Basics)', 'Bayes’ Theorem (Basics)']) }],
            },
            {
              name: 'Mathematics (Arithmetic)',
              chapters: [
                {
                  name: 'Number System',
                  sections: sections([
                    'Natural Numbers, Integers, Rational & Irrational',
                    'Factors & Multiples (HCF/LCM)',
                    'Divisibility Rules',
                    'Remainders (Basics)',
                  ]),
                },
                {
                  name: 'Percentages',
                  sections: sections([
                    'Percentage Change',
                    'Successive Percentages',
                    'Applications in Profit/Loss & SI/CI',
                  ]),
                },
                {
                  name: 'Ratio & Proportion',
                  sections: sections([
                    'Direct & Inverse Proportion',
                    'Partnership (Basics)',
                    'Mixtures & Alligation (Basics)',
                  ]),
                },
                {
                  name: 'Average',
                  sections: sections([
                    'Mean & Weighted Average (Basics)',
                    'Average Speed (Basics)',
                  ]),
                },
                {
                  name: 'Profit & Loss',
                  sections: sections([
                    'Discount, Marked Price & Selling Price',
                    'Successive Discounts (Basics)',
                  ]),
                },
                {
                  name: 'Simple & Compound Interest',
                  sections: sections([
                    'Simple Interest',
                    'Compound Interest (Basics)',
                    'Growth/Depreciation (Basics)',
                  ]),
                },
                {
                  name: 'Time & Work',
                  sections: sections([
                    'Work-Efficiency Concept',
                    'Pipes & Cisterns (Basics)',
                  ]),
                },
                {
                  name: 'Time, Speed & Distance',
                  sections: sections([
                    'Relative Speed (Basics)',
                    'Trains (Basics)',
                    'Boats & Streams (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Mathematics (Geometry)',
              chapters: [
                {
                  name: 'Lines & Angles',
                  sections: sections([
                    'Angle Properties',
                    'Parallel Lines & Transversals',
                  ]),
                },
                {
                  name: 'Triangles',
                  sections: sections([
                    'Congruence & Similarity',
                    'Pythagoras Theorem (Basics)',
                    'Properties of Triangles',
                  ]),
                },
                {
                  name: 'Circles',
                  sections: sections([
                    'Chord, Tangent & Secant (Basics)',
                    'Angles in a Circle',
                    'Cyclic Quadrilaterals (Basics)',
                  ]),
                },
                {
                  name: 'Polygons',
                  sections: sections([
                    'Quadrilaterals (Basics)',
                    'Regular Polygons (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Mathematics (Mensuration)',
              chapters: [
                {
                  name: '2D Figures',
                  sections: sections([
                    'Perimeter & Area of Triangles',
                    'Area of Quadrilaterals (Basics)',
                    'Circles (Area, Circumference)',
                    'Sector & Segment (Basics)',
                  ]),
                },
                {
                  name: '3D Figures',
                  sections: sections([
                    'Surface Area & Volume of Cube/Cuboid',
                    'Cylinder, Cone & Sphere (Basics)',
                    'Frustum (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'General Ability (English)',
              chapters: [
                { name: 'Grammar', sections: sections(['Usage & Rules', 'Tenses', 'Active & Passive Voice', 'Direct & Indirect Speech', 'Articles & Prepositions']) },
                { name: 'Vocabulary', sections: sections(['Word Meaning', 'Synonyms & Antonyms', 'Idioms & Phrases', 'One Word Substitution (Basics)']) },
                { name: 'Comprehension', sections: sections(['Passage Based', 'Cloze Test (Basics)', 'Sentence Improvement (Basics)']) },
              ],
            },
            {
              name: 'General Ability (Polity)',
              chapters: [
                {
                  name: 'Indian Constitution',
                  sections: sections([
                    'Preamble, Fundamental Rights & Duties (Basics)',
                    'Directive Principles (Basics)',
                    'Union Executive (President, PM - Basics)',
                    'Parliament (Lok Sabha, Rajya Sabha - Basics)',
                    'Judiciary (SC/HC - Basics)',
                    'Constitutional Bodies (ECI, CAG, UPSC - Basics)',
                  ]),
                },
                {
                  name: 'Governance',
                  sections: sections([
                    'Central & State Government (Basics)',
                    'Local Self-Government (Panchayati Raj, Municipalities - Basics)',
                    'Important Acts & Policies (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'General Ability (Economics)',
              chapters: [
                {
                  name: 'Basic Concepts',
                  sections: sections([
                    'Demand & Supply (Basics)',
                    'National Income (Basics)',
                    'Inflation (Basics)',
                    'Budget & Fiscal Policy (Basics)',
                    'Banking & RBI (Basics)',
                  ]),
                },
                {
                  name: 'Indian Economy',
                  sections: sections([
                    'Agriculture & Industry (Basics)',
                    'Economic Planning (Basics)',
                    'Poverty & Employment (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'General Ability (Physics)',
              chapters: [
                { name: 'Mechanics', sections: sections(['Motion & Laws', 'Newton’s Laws', 'Friction (Basics)', 'Circular Motion (Basics)']) },
                { name: 'Work Energy Power', sections: sections(['Concepts', 'Conservation of Energy (Basics)']) },
                { name: 'Heat', sections: sections(['Thermodynamics', 'Temperature & Heat Transfer (Basics)', 'Gas Laws (Basics)']) },
                { name: 'Light', sections: sections(['Reflection & Refraction', 'Lenses & Mirrors (Basics)', 'Optical Instruments (Basics)']) },
                { name: 'Electricity & Magnetism', sections: sections(['Basics', 'Current Electricity (Basics)', 'Magnetism (Basics)']) },
              ],
            },
            {
              name: 'General Ability (Chemistry)',
              chapters: [
                { name: 'Basic', sections: sections(['Atoms & Molecules', 'States of Matter (Basics)', 'Atomic Structure (Basics)']) },
                { name: 'Reactions', sections: sections(['Chemical Reactions', 'Oxidation-Reduction (Basics)', 'Chemical Bonding (Basics)']) },
                { name: 'Acids & Bases', sections: sections(['Properties', 'Salts (Basics)', 'pH Scale (Basics)']) },
                { name: 'Periodic Table', sections: sections(['Elements', 'Periodic Trends (Basics)']) },
              ],
            },
            {
              name: 'General Ability (General Science)',
              chapters: [
                { name: 'Biology', sections: sections(['Human Body', 'Plants & Animals', 'Cell & Tissues (Basics)', 'Reproduction (Basics)', 'Genetics (Basics)']) },
                { name: 'Health', sections: sections(['Diseases & Nutrition', 'Immunity & Vaccines (Basics)', 'Hygiene & Public Health (Basics)']) },
              ],
            },
            {
              name: 'General Ability (History)',
              chapters: [
                { name: 'Ancient', sections: sections(['Early Civilizations', 'Vedic Period (Basics)', 'Mauryan & Gupta (Basics)', 'Buddhism & Jainism (Basics)']) },
                { name: 'Medieval', sections: sections(['Kingdoms & Empires', 'Delhi Sultanate (Basics)', 'Mughal Empire (Basics)', 'Bhakti & Sufi (Basics)']) },
                { name: 'Modern', sections: sections(['Freedom Struggle', 'British Expansion (Basics)', 'Socio-Religious Reforms (Basics)', 'Constitutional Developments (Basics)']) },
              ],
            },
            {
              name: 'General Ability (Geography)',
              chapters: [
                { name: 'Physical', sections: sections(['Earth & Landforms', 'Atmosphere & Climate (Basics)', 'Oceans & Currents (Basics)']) },
                { name: 'Indian', sections: sections(['Resources & Climate', 'Rivers & Dams (Basics)', 'Soils & Agriculture (Basics)', 'Minerals & Industries (Basics)']) },
                { name: 'World', sections: sections(['Continents & Oceans', 'Important Straits & Canals (Basics)', 'World Climatic Regions (Basics)']) },
              ],
            },
            {
              name: 'General Ability (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Recent Events', 'Government Schemes & Policies', 'Awards & Appointments']) },
                { name: 'International', sections: sections(['Global Events', 'International Organizations (Basics)', 'Summits & Groupings']) },
                { name: 'Defence', sections: sections(['Military Exercises & Updates', 'Defence Technology (Basics)', 'Ranks & Commands (Basics)']) },
              ],
            },
            {
              name: 'SSB (Screening)',
              chapters: [
                { name: 'OIR Test', sections: sections(['Verbal Reasoning', 'Non-Verbal Reasoning', 'Series & Patterns (Basics)']) },
                { name: 'PPDT', sections: sections(['Picture Perception & Discussion', 'Story Writing Practice (Basics)', 'Group Discussion Basics']) },
              ],
            },
            {
              name: 'SSB (Psychology)',
              chapters: [
                { name: 'TAT', sections: sections(['Thematic Apperception Test', 'Story Structure & Themes (Basics)']) },
                { name: 'WAT', sections: sections(['Word Association Test', 'Response Framing (Basics)']) },
                { name: 'SRT', sections: sections(['Situation Reaction Test', 'Time Management (Basics)']) },
                { name: 'SD', sections: sections(['Self Description', 'Strengths & Weaknesses (Basics)']) },
              ],
            },
            {
              name: 'SSB (GTO)',
              chapters: [
                { name: 'Group Discussion', sections: sections(['Topics', 'Communication & Listening (Basics)']) },
                { name: 'Group Planning Exercise', sections: sections(['Problem Solving', 'Prioritization (Basics)']) },
                { name: 'Outdoor Tasks', sections: sections(['Obstacle Tasks', 'Teamwork & Coordination (Basics)']) },
                { name: 'Command Task', sections: sections(['Leadership', 'Delegation (Basics)']) },
              ],
            },
            {
              name: 'SSB (Interview)',
              chapters: [{ name: 'Personal Interview', sections: sections(['Personality Assessment', 'General Awareness (Basics)', 'Situation Handling (Basics)']) }],
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
                {
                  name: 'English (Grammar)',
                  sections: sections([
                    'Parts of Speech',
                    'Tenses',
                    'Subject-Verb Agreement',
                    'Articles & Prepositions',
                    'Active & Passive Voice',
                    'Direct & Indirect Speech',
                    'Phrases & Clauses (Basics)',
                    'Modifiers & Parallelism (Basics)',
                  ]),
                },
                {
                  name: 'English (Vocabulary)',
                  sections: sections([
                    'Synonyms & Antonyms',
                    'Idioms & Phrases',
                    'One Word Substitution',
                    'Spelling & Common Errors',
                    'Word Usage in Context (Basics)',
                  ]),
                },
                {
                  name: 'English (Comprehension)',
                  sections: sections([
                    'Reading Comprehension',
                    'Cloze Test (Basics)',
                    'Sentence Improvement',
                    'Error Detection',
                    'Para Jumbles',
                    'Fill in the Blanks (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'General Knowledge (Physics)',
              chapters: [
                { name: 'Mechanics', sections: sections(['Motion & Laws', 'Newton’s Laws', 'Friction (Basics)', 'Circular Motion (Basics)']) },
                { name: 'Work Energy Power', sections: sections(['Concepts', 'Conservation of Energy (Basics)']) },
                { name: 'Heat', sections: sections(['Thermodynamics', 'Temperature & Heat Transfer (Basics)', 'Gas Laws (Basics)']) },
                { name: 'Light', sections: sections(['Reflection & Refraction', 'Lenses & Mirrors (Basics)', 'Optical Instruments (Basics)']) },
                { name: 'Electricity & Magnetism', sections: sections(['Basics', 'Current Electricity (Basics)', 'Magnetism (Basics)']) },
              ],
            },
            {
              name: 'General Knowledge (Chemistry)',
              chapters: [
                { name: 'Basic', sections: sections(['Atoms & Molecules', 'States of Matter (Basics)', 'Atomic Structure (Basics)']) },
                { name: 'Reactions', sections: sections(['Chemical Reactions', 'Oxidation-Reduction (Basics)', 'Chemical Bonding (Basics)']) },
                { name: 'Acids & Bases', sections: sections(['Properties', 'Salts (Basics)', 'pH Scale (Basics)']) },
                { name: 'Periodic Table', sections: sections(['Elements', 'Periodic Trends (Basics)']) },
              ],
            },
            {
              name: 'General Knowledge (Biology)',
              chapters: [
                { name: 'Human Body', sections: sections(['Organ Systems', 'Digestive System (Basics)', 'Respiratory System (Basics)', 'Circulatory System (Basics)', 'Nervous System (Basics)']) },
                { name: 'Plants', sections: sections(['Botany Basics', 'Plant Tissues (Basics)', 'Photosynthesis (Basics)']) },
                { name: 'Diseases', sections: sections(['Common Diseases', 'Immunity & Vaccines (Basics)', 'Nutrition & Deficiency Diseases (Basics)']) },
              ],
            },
            {
              name: 'General Knowledge (History)',
              chapters: [
                { name: 'Ancient', sections: sections(['Early Civilizations', 'Vedic Period (Basics)', 'Mauryan & Gupta (Basics)', 'Buddhism & Jainism (Basics)', 'Art & Culture (Basics)']) },
                { name: 'Medieval', sections: sections(['Kingdoms & Empires', 'Delhi Sultanate (Basics)', 'Mughal Empire (Basics)', 'Bhakti & Sufi (Basics)']) },
                { name: 'Modern', sections: sections(['Freedom Struggle', 'British Expansion (Basics)', 'Socio-Religious Reforms (Basics)', 'Constitutional Developments (Basics)', 'Post-Independence (Basics)']) },
              ],
            },
            {
              name: 'General Knowledge (Geography)',
              chapters: [
                { name: 'Physical', sections: sections(['Earth & Landforms', 'Atmosphere & Climate (Basics)', 'Oceans & Currents (Basics)', 'Soils & Vegetation (Basics)']) },
                { name: 'Indian', sections: sections(['Resources & Climate', 'Rivers & Dams (Basics)', 'Monsoon (Basics)', 'Minerals & Industries (Basics)', 'Agriculture (Basics)']) },
                { name: 'World', sections: sections(['Continents & Oceans', 'Important Straits & Canals (Basics)', 'World Climatic Regions (Basics)', 'Mapping Basics']) },
              ],
            },
            {
              name: 'General Knowledge (Polity)',
              chapters: [
                { name: 'Indian Constitution', sections: sections(['Preamble, Fundamental Rights & Duties (Basics)', 'Directive Principles (Basics)', 'Amendment Procedure (Basics)']) },
                { name: 'Governance', sections: sections(['President, PM', 'Council of Ministers (Basics)', 'Federalism (Basics)', 'Local Self-Government (Basics)']) },
                { name: 'Parliament', sections: sections(['Lok Sabha & Rajya Sabha', 'Law Making Process (Basics)', 'Parliamentary Committees (Basics)']) },
              ],
            },
            {
              name: 'General Knowledge (Economics)',
              chapters: [
                { name: 'Basic Concepts', sections: sections(['Demand & Supply', 'National Income (Basics)', 'Inflation (Basics)']) },
                { name: 'Banking', sections: sections(['RBI Functions', 'Money & Credit (Basics)', 'Monetary Policy (Basics)']) },
                { name: 'Budget', sections: sections(['Fiscal Policy', 'Taxation (Basics)', 'Deficit Concepts (Basics)']) },
              ],
            },
            {
              name: 'General Knowledge (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Recent Events', 'Government Schemes & Policies', 'Awards & Appointments']) },
                { name: 'International', sections: sections(['Global Events', 'International Organizations (Basics)', 'Summits & Groupings']) },
                { name: 'Defence', sections: sections(['Military Updates', 'Defence Exercises (Basics)', 'Defence Technology (Basics)']) },
              ],
            },
            {
              name: 'Mathematics',
              chapters: [
                {
                  name: 'Mathematics (Arithmetic)',
                  sections: sections([
                    'Number System',
                    'HCF/LCM (Basics)',
                    'Percentages',
                    'Ratio & Proportion',
                    'Average',
                    'Profit & Loss (Basics)',
                    'Simple & Compound Interest (Basics)',
                    'Time & Work',
                    'Time, Speed & Distance',
                    'Mixtures & Alligation (Basics)',
                  ]),
                },
                { name: 'Mathematics (Algebra)', sections: sections(['Equations', 'Quadratic Equations (Basics)', 'Indices & Surds (Basics)', 'Logarithms (Basics)']) },
                { name: 'Mathematics (Trigonometry)', sections: sections(['Identities', 'Angles & Ratios (Basics)', 'Heights & Distances (Basics)']) },
                { name: 'Mathematics (Geometry)', sections: sections(['Lines & Angles', 'Triangles (Basics)', 'Circles (Basics)', 'Polygons (Basics)']) },
                { name: 'Mathematics (Mensuration)', sections: sections(['2D & 3D Figures', 'Area & Volume (Basics)']) },
                { name: 'Mathematics (Statistics)', sections: sections(['Data Analysis', 'Mean/Median/Mode', 'Standard Deviation (Basics)']) },
                { name: 'Mathematics (Probability)', sections: sections(['Probability', 'Conditional Probability (Basics)']) },
              ],
            },
            {
              name: 'SSB (Screening)',
              chapters: [
                { name: 'OIR Test', sections: sections(['Verbal Reasoning', 'Non-Verbal Reasoning', 'Series & Patterns (Basics)']) },
                { name: 'PPDT', sections: sections(['Picture Perception & Discussion', 'Story Writing Practice (Basics)', 'Group Discussion Basics']) },
              ],
            },
            {
              name: 'SSB (Psychology)',
              chapters: [
                { name: 'TAT', sections: sections(['Thematic Apperception Test', 'Story Structure & Themes (Basics)']) },
                { name: 'WAT', sections: sections(['Word Association Test', 'Response Framing (Basics)']) },
                { name: 'SRT', sections: sections(['Situation Reaction Test', 'Time Management (Basics)']) },
                { name: 'SD', sections: sections(['Self Description', 'Strengths & Weaknesses (Basics)']) },
              ],
            },
            {
              name: 'SSB (GTO)',
              chapters: [
                { name: 'Group Discussion', sections: sections(['Topics', 'Communication & Listening (Basics)']) },
                { name: 'Group Planning Exercise', sections: sections(['Problem Solving', 'Prioritization (Basics)']) },
                { name: 'Outdoor Tasks', sections: sections(['Obstacle Tasks', 'Teamwork & Coordination (Basics)']) },
                { name: 'Command Task', sections: sections(['Leadership', 'Delegation (Basics)']) },
              ],
            },
            {
              name: 'SSB (Interview)',
              chapters: [{ name: 'Personal Interview', sections: sections(['Personality Assessment', 'General Awareness (Basics)', 'Situation Handling (Basics)']) }],
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
              chapters: [
                {
                  name: 'Reasoning',
                  sections: sections([
                    'Logical Reasoning',
                    'Analytical Ability',
                    'Quantitative Aptitude',
                    'Number Series (Basics)',
                    'Coding-Decoding (Basics)',
                    'Blood Relations (Basics)',
                    'Direction Sense (Basics)',
                    'Syllogism (Basics)',
                    'Venn Diagrams (Basics)',
                    'Seating Arrangement (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Paper I (General Science)',
              chapters: [
                { name: 'Physics', sections: sections(['Basic Concepts', 'Motion & Laws (Basics)', 'Work-Energy-Power (Basics)', 'Heat (Basics)', 'Light (Basics)', 'Electricity & Magnetism (Basics)']) },
                { name: 'Chemistry', sections: sections(['Basic Concepts', 'Atoms & Molecules (Basics)', 'Chemical Reactions (Basics)', 'Acids-Bases-Salts (Basics)', 'Periodic Table (Basics)']) },
                { name: 'Biology', sections: sections(['General Awareness', 'Human Body (Basics)', 'Diseases & Nutrition (Basics)', 'Plants & Animals (Basics)', 'Immunity & Vaccines (Basics)']) },
              ],
            },
            {
              name: 'Paper I (Current Affairs)',
              chapters: [
                { name: 'National', sections: sections(['Events', 'Government Schemes & Policies', 'Reports & Indices', 'Awards & Appointments']) },
                { name: 'International', sections: sections(['Events', 'International Organizations (Basics)', 'Summits & Groupings', 'Reports & Indices (Global)']) },
              ],
            },
            {
              name: 'Paper I (Polity)',
              chapters: [
                { name: 'Constitution', sections: sections(['Basics', 'Fundamental Rights & Duties (Basics)', 'Directive Principles (Basics)', 'Union & State (Basics)', 'Judiciary (Basics)']) },
                { name: 'Governance', sections: sections(['Political System', 'Parliament (Basics)', 'Federalism (Basics)', 'Local Governance (Basics)', 'Constitutional Bodies (Basics)']) },
              ],
            },
            {
              name: 'Paper I (Economy)',
              chapters: [
                {
                  name: 'Basic Concepts',
                  sections: sections([
                    'Economic Development',
                    'Demand & Supply (Basics)',
                    'National Income (Basics)',
                    'Inflation (Basics)',
                    'Budget & Fiscal Policy (Basics)',
                    'Banking & RBI (Basics)',
                    'Poverty & Employment (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Paper I (History)',
              chapters: [
                { name: 'Ancient', sections: sections(['Early Civilizations', 'Vedic Period (Basics)', 'Mauryan & Gupta (Basics)', 'Buddhism & Jainism (Basics)', 'Art & Culture (Basics)']) },
                { name: 'Medieval', sections: sections(['Kingdoms', 'Delhi Sultanate (Basics)', 'Mughal Empire (Basics)', 'Bhakti & Sufi (Basics)']) },
                { name: 'Modern', sections: sections(['Freedom Struggle', 'British Expansion (Basics)', 'Socio-Religious Reforms (Basics)', 'Constitutional Developments (Basics)', 'Post-Independence (Basics)']) },
              ],
            },
            {
              name: 'Paper I (Geography)',
              chapters: [
                { name: 'Physical', sections: sections(['Earth & Landforms', 'Atmosphere & Climate (Basics)', 'Oceans & Currents (Basics)', 'Soils & Vegetation (Basics)', 'Natural Hazards (Basics)']) },
                { name: 'Indian', sections: sections(['Resources & Climate', 'Rivers & Dams (Basics)', 'Monsoon (Basics)', 'Minerals & Industries (Basics)', 'Agriculture (Basics)', 'Population & Urbanization (Basics)']) },
                { name: 'World', sections: sections(['Continents & Oceans', 'Important Straits & Canals (Basics)', 'World Climatic Regions (Basics)', 'Mapping Basics']) },
              ],
            },
            {
              name: 'Paper II (Essay)',
              chapters: [
                {
                  name: 'Topics',
                  sections: sections([
                    'Security',
                    'Society',
                    'Polity',
                    'Economy (Basics)',
                    'Internal Security & Challenges',
                    'Disaster Management (Basics)',
                    'Ethics in Public Life (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Paper II (Comprehension)',
              chapters: [{ name: 'Reading Comprehension', sections: sections(['Passage Based', 'Inference Questions (Basics)', 'Vocabulary in Context (Basics)']) }],
            },
            {
              name: 'Paper II (Language)',
              chapters: [
                { name: 'Grammar', sections: sections(['Basic Rules', 'Sentence Correction (Basics)', 'Punctuation (Basics)']) },
                { name: 'Vocabulary', sections: sections(['Usage', 'Synonyms & Antonyms (Basics)', 'Idioms & Phrases (Basics)']) },
                { name: 'Precis Writing', sections: sections(['Summary', 'Report Writing (Basics)', 'Letter/Application Writing (Basics)']) },
              ],
            },
            {
              name: 'Physical (Standards)',
              chapters: [
                {
                  name: 'Height & Chest',
                  sections: sections([
                    'Measurements',
                    'Medical Standards (Basics)',
                    'Vision Standards (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Physical (Efficiency)',
              chapters: [
                { name: 'Running', sections: sections(['100m, 800m', 'Endurance Preparation (Basics)']) },
                { name: 'Long Jump', sections: sections(['Distance', 'Technique (Basics)']) },
                { name: 'Shot Put', sections: sections(['Throw', 'Technique (Basics)']) },
              ],
            },
            {
              name: 'Interview (Personality Test)',
              chapters: [
                {
                  name: 'Assessment',
                  sections: sections([
                    'Personality Traits',
                    'Leadership & Decision Making',
                    'General Awareness',
                    'Communication Skills (Basics)',
                    'Service Suitability (Basics)',
                    'Situational Judgement (Basics)',
                  ]),
                },
              ],
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
                {
                  name: 'Engineering Mathematics',
                  sections: sections([
                    'Linear Algebra',
                    'Calculus',
                    'Differential Equations',
                    'Probability & Statistics',
                    'Vector Calculus (Basics)',
                    'Numerical Methods (Basics)',
                    'Complex Variables (Basics)',
                    'Fourier Series (Basics)',
                    'Laplace Transform (Basics)',
                    'Partial Differential Equations (Basics)',
                  ]),
                },
                {
                  name: 'General Studies',
                  sections: sections([
                    'Current Affairs',
                    'Engineering Ethics',
                    'Quality & Reliability',
                    'Engineering Drawing',
                    'Basics of Energy & Environment',
                    'Project Management',
                    'ICT',
                    'Standards & Codes (Basics)',
                    'Safety & Risk (Basics)',
                    'Sustainable Development (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Prelims (Civil Engineering)',
              chapters: [
                {
                  name: 'Engineering Mechanics',
                  sections: sections([
                    'Forces & Laws',
                    'Free Body Diagrams (Basics)',
                    'Friction (Basics)',
                    'Centroid & Moment of Inertia (Basics)',
                    'Kinematics & Kinetics (Basics)',
                  ]),
                },
                {
                  name: 'Structural Analysis',
                  sections: sections([
                    'Beams & Frames',
                    'Trusses (Basics)',
                    'Bending Moment & Shear Force (Basics)',
                    'Deflection of Beams (Basics)',
                    'Influence Lines (Basics)',
                  ]),
                },
                {
                  name: 'Geotechnical Engineering',
                  sections: sections([
                    'Soil Mechanics',
                    'Soil Properties & Classification (Basics)',
                    'Compaction & Consolidation (Basics)',
                    'Shear Strength of Soil (Basics)',
                    'Foundations (Basics)',
                    'Earth Pressure & Retaining Walls (Basics)',
                  ]),
                },
                {
                  name: 'Environmental Engineering',
                  sections: sections([
                    'Water & Waste',
                    'Water Supply & Treatment (Basics)',
                    'Wastewater Engineering (Basics)',
                    'Solid Waste Management (Basics)',
                    'Air & Noise Pollution (Basics)',
                    'Environmental Impact Assessment (Basics)',
                  ]),
                },
                {
                  name: 'Transportation Engineering',
                  sections: sections([
                    'Highways & Railways',
                    'Highway Materials (Basics)',
                    'Traffic Engineering (Basics)',
                    'Geometric Design (Basics)',
                    'Railway Engineering (Basics)',
                    'Airport & Harbour Basics',
                  ]),
                },
                {
                  name: 'Hydrology',
                  sections: sections([
                    'Water Flow',
                    'Hydrologic Cycle (Basics)',
                    'Runoff & Hydrographs (Basics)',
                    'Groundwater (Basics)',
                    'Flood Routing (Basics)',
                    'Irrigation Engineering (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Prelims (Mechanical Engineering)',
              chapters: [
                { name: 'Engineering Mechanics', sections: sections(['Statics & Dynamics', 'Friction (Basics)', 'Kinematics (Basics)', 'Work-Energy (Basics)']) },
                { name: 'Thermodynamics', sections: sections(['Laws', 'Power Cycles (Basics)', 'Refrigeration & Air-Conditioning (Basics)', 'Properties of Steam (Basics)']) },
                { name: 'Fluid Mechanics', sections: sections(['Properties of Fluids', 'Fluid Statics (Basics)', 'Bernoulli Equation (Basics)', 'Flow Measurement (Basics)']) },
                { name: 'Strength of Materials', sections: sections(['Stress & Strain', 'Bending & Torsion (Basics)', 'Deflection of Beams (Basics)', 'Columns & Buckling (Basics)']) },
                { name: 'Theory of Machines', sections: sections(['Kinematics', 'Dynamics of Machines (Basics)', 'Gears (Basics)', 'Governors (Basics)', 'Vibrations (Basics)']) },
                { name: 'Production Engineering', sections: sections(['Manufacturing', 'Casting & Welding (Basics)', 'Machining (Basics)', 'Metrology (Basics)', 'CAD/CAM Basics']) },
              ],
            },
            {
              name: 'Prelims (Electrical Engineering)',
              chapters: [
                { name: 'Basic Electrical', sections: sections(['Ohm’s Law', 'AC/DC Circuits (Basics)', 'Network Theorems (Basics)', 'Magnetic Circuits (Basics)']) },
                { name: 'Electrical Machines', sections: sections(['Transformers', 'DC Machines (Basics)', 'Induction Machines (Basics)', 'Synchronous Machines (Basics)']) },
                { name: 'Power Systems', sections: sections(['Generation & Transmission', 'Power System Components (Basics)', 'Fault Analysis (Basics)', 'Protection (Basics)', 'Distribution (Basics)']) },
                { name: 'Control Systems', sections: sections(['Basics', 'Transfer Functions (Basics)', 'Stability (Basics)', 'Time/Frequency Response (Basics)']) },
                { name: 'Measurements', sections: sections(['Instruments', 'Sensors & Transducers (Basics)', 'Error Analysis (Basics)']) },
              ],
            },
            {
              name: 'Prelims (Electronics)',
              chapters: [
                { name: 'Basic Electronics', sections: sections(['Diodes & Transistors', 'Amplifiers (Basics)', 'Op-Amps (Basics)', 'Oscillators (Basics)']) },
                { name: 'Digital Electronics', sections: sections(['Logic Gates', 'Boolean Algebra (Basics)', 'Combinational Circuits (Basics)', 'Sequential Circuits (Basics)']) },
                { name: 'Communication', sections: sections(['Signals & Systems', 'Analog Communication (Basics)', 'Digital Communication (Basics)', 'Modulation (Basics)']) },
                { name: 'Control Systems', sections: sections(['Basics', 'Block Diagrams (Basics)', 'Stability (Basics)']) },
                { name: 'Microprocessors', sections: sections(['Basics', 'Microcontrollers (Basics)', 'Memory & IO (Basics)', 'Instruction Set Basics']) },
              ],
            },
            {
              name: 'Mains (Civil Engineering)',
              chapters: [
                { name: 'Structural Engineering', sections: sections(['Design Concepts', 'RCC Design (Basics)', 'Steel Design (Basics)', 'Structural Dynamics (Basics)', 'Earthquake Engineering (Basics)']) },
                { name: 'Geotechnical Engineering', sections: sections(['Advanced Soil Mechanics', 'Foundation Engineering (Basics)', 'Ground Improvement (Basics)', 'Slope Stability (Basics)']) },
                { name: 'Environmental Engineering', sections: sections(['Water Supply Systems', 'Wastewater Treatment (Basics)', 'Solid Waste Management (Basics)', 'Air Pollution (Basics)']) },
                { name: 'Transportation Engineering', sections: sections(['Traffic Engineering', 'Pavement Design (Basics)', 'Transport Planning (Basics)', 'Railway Engineering (Basics)']) },
                { name: 'Hydrology', sections: sections(['Advanced Topics', 'Irrigation (Basics)', 'Hydraulic Structures (Basics)', 'Flood Control (Basics)']) },
              ],
            },
            {
              name: 'Mains (Mechanical Engineering)',
              chapters: [
                { name: 'Thermodynamics', sections: sections(['Advanced Concepts', 'IC Engines (Basics)', 'Gas Turbines (Basics)', 'Heat Transfer (Basics)']) },
                { name: 'Fluid Mechanics', sections: sections(['Advanced Problems', 'Turbomachinery (Basics)', 'Hydraulic Machines (Basics)', 'Compressible Flow (Basics)']) },
                { name: 'Strength of Materials', sections: sections(['Advanced Analysis', 'Failure Theories (Basics)', 'Fatigue (Basics)', 'Fracture Mechanics (Basics)']) },
                { name: 'Theory of Machines', sections: sections(['Dynamics', 'Vibrations (Basics)', 'Mechanisms & Kinematics (Advanced Basics)']) },
                { name: 'Production Engineering', sections: sections(['Advanced Manufacturing', 'Metal Cutting (Basics)', 'Metrology (Basics)', 'Industrial Engineering (Basics)', 'Operations Research (Basics)']) },
              ],
            },
            {
              name: 'Mains (Electrical Engineering)',
              chapters: [
                { name: 'Electrical Machines', sections: sections(['Advanced', 'Machine Dynamics (Basics)', 'Special Machines (Basics)']) },
                { name: 'Power Systems', sections: sections(['Load Flow', 'Economic Dispatch (Basics)', 'Stability (Basics)', 'Power System Protection (Advanced Basics)']) },
                { name: 'Control Systems', sections: sections(['Advanced', 'State Space (Basics)', 'Compensators (Basics)', 'Digital Control (Basics)']) },
                { name: 'Measurements', sections: sections(['Advanced Instruments', 'Instrumentation Systems (Basics)', 'Data Acquisition (Basics)']) },
              ],
            },
            {
              name: 'Mains (Electronics)',
              chapters: [
                { name: 'Analog Electronics', sections: sections(['Advanced Circuits', 'Analog ICs (Basics)', 'Power Electronics (Basics)']) },
                { name: 'Digital Electronics', sections: sections(['Advanced Logic', 'Digital ICs (Basics)', 'Microprocessors & Microcontrollers (Basics)']) },
                { name: 'Communication', sections: sections(['Advanced Systems', 'Information Theory (Basics)', 'EM Theory (Basics)', 'Microwave Engineering (Basics)']) },
                { name: 'Microprocessors', sections: sections(['Advanced Concepts', 'Embedded Systems (Basics)', 'Interfacing (Basics)']) },
              ],
            },
            {
              name: 'Interview (Personality Test)',
              chapters: [
                {
                  name: 'Assessment',
                  sections: sections([
                    'Technical Knowledge',
                    'Personality Traits',
                    'Decision Making',
                    'Project Discussion (Basics)',
                    'Industry Awareness (Basics)',
                    'Communication Skills (Basics)',
                  ]),
                },
              ],
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
                {
                  name: 'Medicine',
                  sections: sections([
                    'Cardiology',
                    'Respiratory System',
                    'Gastrointestinal System',
                    'Neurology',
                    'Endocrinology',
                    'Infectious Diseases',
                    'Hematology (Basics)',
                    'Nephrology (Basics)',
                    'Rheumatology (Basics)',
                    'Emergency Medicine (Basics)',
                    'Clinical Pharmacology (Basics)',
                  ]),
                },
                {
                  name: 'Dermatology',
                  sections: sections([
                    'Skin Diseases',
                    'Infections (Bacterial, Viral, Fungal - Basics)',
                    'Eczema & Dermatitis (Basics)',
                    'Psoriasis (Basics)',
                    'Acne & Hair Disorders (Basics)',
                    'STDs in Dermatology (Basics)',
                  ]),
                },
                {
                  name: 'Psychiatry',
                  sections: sections([
                    'Mental Disorders',
                    'Anxiety & Depression (Basics)',
                    'Psychosis (Basics)',
                    'Substance Use Disorders (Basics)',
                    'Personality Disorders (Basics)',
                    'Psychiatric Emergencies (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Paper I (Pediatrics)',
              chapters: [
                {
                  name: 'Neonatology',
                  sections: sections([
                    'Newborn Care',
                    'Neonatal Resuscitation (Basics)',
                    'Low Birth Weight & Prematurity (Basics)',
                    'Neonatal Jaundice (Basics)',
                    'Neonatal Infections (Basics)',
                  ]),
                },
                {
                  name: 'Growth & Development',
                  sections: sections([
                    'Milestones',
                    'Growth Charts (Basics)',
                    'Developmental Delay (Basics)',
                    'Nutrition in Children (Basics)',
                  ]),
                },
                {
                  name: 'Diseases',
                  sections: sections([
                    'Common Pediatric Diseases',
                    'Respiratory Infections (Basics)',
                    'Diarrheal Diseases (Basics)',
                    'Congenital Disorders (Basics)',
                    'Pediatric Emergencies (Basics)',
                  ]),
                },
                {
                  name: 'Immunization',
                  sections: sections([
                    'Vaccination Schedule',
                    'Cold Chain (Basics)',
                    'Adverse Events Following Immunization (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Paper II (Surgery)',
              chapters: [
                {
                  name: 'General Surgery',
                  sections: sections([
                    'Basic Principles',
                    'Wound Healing (Basics)',
                    'Shock & Fluid Management (Basics)',
                    'Surgical Infections (Basics)',
                    'Trauma (Basics)',
                    'Abdominal Emergencies (Basics)',
                  ]),
                },
                {
                  name: 'Orthopedics',
                  sections: sections([
                    'Bones & Joints',
                    'Fractures & Dislocations (Basics)',
                    'Osteomyelitis (Basics)',
                    'Arthritis (Basics)',
                    'Spine Disorders (Basics)',
                  ]),
                },
                {
                  name: 'Anesthesia',
                  sections: sections([
                    'Basics',
                    'Pre-Anesthetic Evaluation (Basics)',
                    'Airway Management (Basics)',
                    'Regional Anesthesia (Basics)',
                    'Post-Operative Care (Basics)',
                  ]),
                },
                {
                  name: 'Radiology',
                  sections: sections([
                    'Imaging Techniques',
                    'X-Ray Basics',
                    'Ultrasound Basics',
                    'CT & MRI Basics',
                    'Contrast Studies (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Paper II (G&O)',
              chapters: [
                {
                  name: 'Obstetrics',
                  sections: sections([
                    'Pregnancy & Delivery',
                    'Antenatal Care (Basics)',
                    'Normal Labour (Basics)',
                    'Complications in Pregnancy (Basics)',
                    'Postpartum Care (Basics)',
                  ]),
                },
                {
                  name: 'Gynecology',
                  sections: sections([
                    'Reproductive System',
                    'Menstrual Disorders (Basics)',
                    'Fibroids & Ovarian Cysts (Basics)',
                    'Infertility (Basics)',
                    'STIs (Basics)',
                  ]),
                },
                {
                  name: 'Family Planning',
                  sections: sections([
                    'Methods',
                    'Contraceptive Counseling (Basics)',
                    'Emergency Contraception (Basics)',
                  ]),
                },
                {
                  name: 'Diseases',
                  sections: sections([
                    'Common Disorders',
                    'Anemia in Pregnancy (Basics)',
                    'Hypertensive Disorders (Basics)',
                    'Gestational Diabetes (Basics)',
                    'Cervical Cancer Screening (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Paper II (PSM)',
              chapters: [
                {
                  name: 'Epidemiology',
                  sections: sections([
                    'Disease Distribution',
                    'Measures of Disease Frequency (Basics)',
                    'Study Designs (Basics)',
                    'Screening Tests (Basics)',
                    'Outbreak Investigation (Basics)',
                  ]),
                },
                {
                  name: 'Biostatistics',
                  sections: sections([
                    'Basic Concepts',
                    'Mean/Median/Mode (Basics)',
                    'Standard Deviation (Basics)',
                    'Correlation & Regression (Basics)',
                    'Hypothesis Testing (Basics)',
                  ]),
                },
                {
                  name: 'Public Health',
                  sections: sections([
                    'Programs & Policies',
                    'Primary Health Care (Basics)',
                    'National Health Programs (Basics)',
                    'Health Indicators (Basics)',
                    'Health Planning & Management (Basics)',
                  ]),
                },
                {
                  name: 'Nutrition',
                  sections: sections([
                    'Health & Diet',
                    'Nutritional Deficiencies (Basics)',
                    'Maternal & Child Nutrition (Basics)',
                    'Food Safety (Basics)',
                  ]),
                },
                {
                  name: 'Environmental Health',
                  sections: sections([
                    'Sanitation',
                    'Water Supply & Purification (Basics)',
                    'Waste Management (Basics)',
                    'Air Pollution (Basics)',
                    'Occupational Health (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'Interview (Personality Test)',
              chapters: [
                {
                  name: 'Assessment',
                  sections: sections([
                    'Medical Knowledge',
                    'Decision Making',
                    'Communication Skills',
                    'Ethics & Professionalism (Basics)',
                    'Clinical Scenario Discussion (Basics)',
                  ]),
                },
              ],
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
                {
                  name: 'General English (Writing)',
                  sections: sections([
                    'Essay Writing',
                    'Report Writing (Basics)',
                    'Letter/Application Writing (Basics)',
                    'Grammar-Based Writing (Basics)',
                  ]),
                },
                {
                  name: 'General English (Comprehension)',
                  sections: sections([
                    'Reading Comprehension',
                    'Inference Questions (Basics)',
                    'Vocabulary in Context (Basics)',
                  ]),
                },
                {
                  name: 'General English (Precis)',
                  sections: sections([
                    'Precis Writing',
                    'Summarization Techniques (Basics)',
                    'Paraphrasing (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'General Studies',
              chapters: [
                {
                  name: 'General Studies (Polity)',
                  sections: sections([
                    'Indian Constitution',
                    'Fundamental Rights & Duties (Basics)',
                    'Directive Principles (Basics)',
                    'Union Executive & Parliament (Basics)',
                    'Judiciary (Basics)',
                    'Federalism & Local Governance (Basics)',
                    'Constitutional Bodies (Basics)',
                  ]),
                },
                {
                  name: 'General Studies (Economy)',
                  sections: sections([
                    'Indian Economy',
                    'National Income (Basics)',
                    'Inflation (Basics)',
                    'Budget & Fiscal Policy (Basics)',
                    'Banking & RBI (Basics)',
                    'Poverty & Employment (Basics)',
                  ]),
                },
                {
                  name: 'General Studies (History)',
                  sections: sections([
                    'Modern India',
                    'Freedom Struggle (Basics)',
                    'Socio-Religious Reforms (Basics)',
                    'Post-Independence (Basics)',
                  ]),
                },
                {
                  name: 'General Studies (Geography)',
                  sections: sections([
                    'Indian Geography',
                    'Physical Features (Basics)',
                    'Climate & Monsoon (Basics)',
                    'Rivers & Resources (Basics)',
                    'Population & Urbanization (Basics)',
                  ]),
                },
                {
                  name: 'General Studies (Current Affairs)',
                  sections: sections([
                    'National',
                    'International',
                    'Government Schemes & Policies',
                    'Reports & Indices',
                    'Awards & Appointments',
                  ]),
                },
              ],
            },
            {
              name: 'Economics I (Microeconomics)',
              chapters: [
                { name: 'Consumer Theory', sections: sections(['Utility', 'Indifference Curves (Basics)', 'Budget Constraint (Basics)', 'Demand (Basics)', 'Elasticity (Basics)']) },
                { name: 'Production', sections: sections(['Functions', 'Costs (Basics)', 'Short Run vs Long Run (Basics)', 'Returns to Scale (Basics)']) },
                { name: 'Market Structure', sections: sections(['Perfect & Imperfect Competition', 'Monopoly (Basics)', 'Monopolistic Competition (Basics)', 'Oligopoly (Basics)']) },
                { name: 'Welfare Economics', sections: sections(['Concepts', 'Pareto Efficiency (Basics)', 'Market Failure (Basics)', 'Externalities (Basics)', 'Public Goods (Basics)']) },
              ],
            },
            {
              name: 'Economics II (Macroeconomics)',
              chapters: [
                { name: 'National Income', sections: sections(['Measurement', 'Circular Flow (Basics)', 'National Income Identities (Basics)']) },
                { name: 'Money & Banking', sections: sections(['Concepts', 'RBI & Monetary Policy (Basics)', 'Commercial Banking (Basics)', 'Financial Markets (Basics)']) },
                { name: 'Inflation', sections: sections(['Types', 'Causes & Control (Basics)', 'Deflation & Stagflation (Basics)']) },
                { name: 'IS-LM Model', sections: sections(['Analysis', 'Fiscal vs Monetary Policy (Basics)', 'Aggregate Demand (Basics)']) },
              ],
            },
            {
              name: 'Economics III',
              chapters: [
                { name: 'Public Economics', sections: sections(['Fiscal Policy', 'Taxation (Basics)', 'Public Expenditure (Basics)', 'Public Debt (Basics)', 'Deficit Concepts (Basics)']) },
                { name: 'International Economics', sections: sections(['Trade Theory', 'Balance of Payments (Basics)', 'Exchange Rate (Basics)', 'Trade Policy (Basics)']) },
                { name: 'Growth & Development', sections: sections(['Models', 'Development Indicators (Basics)', 'Poverty & Inequality (Basics)', 'Employment (Basics)']) },
                { name: 'Environmental Economics', sections: sections(['Sustainability', 'Externalities (Basics)', 'Climate Policy (Basics)', 'Carbon Markets (Basics)']) },
              ],
            },
            {
              name: 'Economics IV (Indian Economy)',
              chapters: [
                { name: 'Planning', sections: sections(['Five Year Plans', 'NITI Aayog (Basics)', 'Economic Reforms (Basics)']) },
                { name: 'Agriculture', sections: sections(['Policies', 'Irrigation (Basics)', 'MSP & Subsidies (Basics)', 'Food Security (Basics)']) },
                { name: 'Industry', sections: sections(['Development', 'Industrial Policy (Basics)', 'Infrastructure (Basics)', 'MSMEs (Basics)']) },
                { name: 'External Sector', sections: sections(['Balance of Payments', 'Foreign Exchange (Basics)', 'Trade & WTO (Basics)', 'FDI/FPI (Basics)']) },
              ],
            },
            {
              name: 'Interview (Personality Test)',
              chapters: [
                {
                  name: 'Assessment',
                  sections: sections([
                    'Economic Knowledge',
                    'Decision Making',
                    'Communication Skills',
                    'Situational Judgement (Basics)',
                    'Ethics & Integrity (Basics)',
                  ]),
                },
              ],
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
                {
                  name: 'General English (Writing)',
                  sections: sections([
                    'Essay Writing',
                    'Report Writing (Basics)',
                    'Letter/Application Writing (Basics)',
                    'Grammar-Based Writing (Basics)',
                  ]),
                },
                {
                  name: 'General English (Comprehension)',
                  sections: sections([
                    'Reading Comprehension',
                    'Inference Questions (Basics)',
                    'Vocabulary in Context (Basics)',
                  ]),
                },
                {
                  name: 'General English (Precis)',
                  sections: sections([
                    'Precis Writing',
                    'Summarization Techniques (Basics)',
                    'Paraphrasing (Basics)',
                  ]),
                },
              ],
            },
            {
              name: 'General Studies',
              chapters: [
                {
                  name: 'General Studies (Polity)',
                  sections: sections([
                    'Indian Constitution',
                    'Fundamental Rights & Duties (Basics)',
                    'Directive Principles (Basics)',
                    'Union Executive & Parliament (Basics)',
                    'Judiciary (Basics)',
                    'Federalism & Local Governance (Basics)',
                    'Constitutional Bodies (Basics)',
                  ]),
                },
                {
                  name: 'General Studies (Economy)',
                  sections: sections([
                    'Indian Economy',
                    'National Income (Basics)',
                    'Inflation (Basics)',
                    'Budget & Fiscal Policy (Basics)',
                    'Banking & RBI (Basics)',
                    'Poverty & Employment (Basics)',
                  ]),
                },
                {
                  name: 'General Studies (Current Affairs)',
                  sections: sections([
                    'National',
                    'International',
                    'Government Schemes & Policies',
                    'Reports & Indices',
                    'Awards & Appointments',
                  ]),
                },
              ],
            },
            {
              name: 'Statistics I',
              chapters: [
                { name: 'Probability', sections: sections(['Probability Theory', 'Axioms & Theorems (Basics)', 'Conditional Probability (Basics)', 'Independence (Basics)', 'Bayes’ Theorem (Basics)']) },
                { name: 'Distribution', sections: sections(['Random Variables', 'Discrete Distributions (Basics)', 'Continuous Distributions (Basics)', 'Normal Distribution (Basics)', 'Sampling Distributions (Basics)']) },
                { name: 'Moments', sections: sections(['Expectation', 'Moments & Moment Generating Functions (Basics)', 'Skewness & Kurtosis (Basics)']) },
              ],
            },
            {
              name: 'Statistics II',
              chapters: [
                { name: 'Statistical Inference', sections: sections(['Estimation', 'Point & Interval Estimation (Basics)', 'Properties of Estimators (Basics)', 'Maximum Likelihood (Basics)']) },
                { name: 'Hypothesis Testing', sections: sections(['Tests', 'Neyman-Pearson (Basics)', 't/z/Chi-square/F Tests (Basics)', 'p-value & Confidence Intervals (Basics)']) },
                { name: 'Sampling', sections: sections(['Sampling Techniques', 'Simple Random Sampling (Basics)', 'Stratified Sampling (Basics)', 'Systematic Sampling (Basics)', 'Cluster Sampling (Basics)', 'Sampling Errors (Basics)']) },
              ],
            },
            {
              name: 'Statistics III',
              chapters: [
                { name: 'Regression', sections: sections(['Linear Regression', 'Multiple Regression (Basics)', 'Correlation (Basics)', 'Diagnostics (Basics)', 'ANOVA in Regression (Basics)']) },
                { name: 'Time Series', sections: sections(['Analysis', 'Trend & Seasonality (Basics)', 'Moving Averages (Basics)', 'AR/MA/ARMA (Basics)', 'Forecasting (Basics)']) },
                { name: 'Multivariate Analysis', sections: sections(['Concepts', 'PCA (Basics)', 'Factor Analysis (Basics)', 'Cluster Analysis (Basics)', 'Discriminant Analysis (Basics)']) },
              ],
            },
            {
              name: 'Statistics IV',
              chapters: [
                { name: 'Operations Research', sections: sections(['Linear Programming', 'Transportation Problem (Basics)', 'Assignment Problem (Basics)', 'Queuing Theory (Basics)', 'Inventory Models (Basics)', 'Game Theory (Basics)']) },
                { name: 'Demography', sections: sections(['Population Studies', 'Fertility & Mortality (Basics)', 'Migration (Basics)', 'Population Projections (Basics)', 'Life Tables (Basics)']) },
                { name: 'Econometrics', sections: sections(['Models', 'OLS Assumptions (Basics)', 'Hypothesis Testing in Regression (Basics)', 'Autocorrelation & Heteroskedasticity (Basics)', 'Time Series Econometrics (Basics)']) },
              ],
            },
            {
              name: 'Interview (Personality Test)',
              chapters: [
                {
                  name: 'Assessment',
                  sections: sections([
                    'Statistical Knowledge',
                    'Analytical Ability',
                    'Communication Skills',
                    'Problem Solving (Basics)',
                    'Situational Judgement (Basics)',
                  ]),
                },
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

