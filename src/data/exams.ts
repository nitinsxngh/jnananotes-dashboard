export type Exam = {
  id: string;
  name: string;
};

export type ExamCategory = {
  id: string;
  name: string;
  icon: string;
  exams: Exam[];
};

export type Chapter = { id: string; name: string } | string;
export type Subsection = { id: string; name: string; chapters: Chapter[] };
export type Section = { id: string; name: string; chapters?: Chapter[]; subsections?: Subsection[] };
export type Subject = { id: string; name: string; icon: string; sections: Section[] };
export type Syllabus = { subjects: Subject[] };

// Exam categories and their exams
export const EXAM_CATEGORIES: Record<string, ExamCategory> = {
  SSC: {
    id: 'SSC',
    name: 'SSC',
    icon: 'SSC',
    exams: [
      {
        id: 'SSC_CGL',
        name: 'SSC-CGL',
      },
      {
        id: 'SSC_GD',
        name: 'SSC-GD',
      },
      {
        id: 'SSC_CHSL',
        name: 'SSC-CHSL',
      },
      {
        id: 'SSC_MTS',
        name: 'SSC-MTS',
      },
      {
        id: 'SSC_CPO',
        name: 'SSC-CPO',
      },
    ],
  },
  RAILWAY: {
    id: 'RAILWAY',
    name: 'Railways',
    icon: 'RRB',
    exams: [
      {
        id: 'RRB_NTPC',
        name: 'RRB NTPC',
      },
      {
        id: 'RRB_GROUP_D',
        name: 'RRB Group D',
      },
      {
        id: 'RRB_ALP',
        name: 'RRB ALP',
      },
      {
        id: 'RRB_JE',
        name: 'RRB JE',
      },
    ],
  },
  DEFENCE: {
    id: 'DEFENCE',
    name: 'Defence',
    icon: 'DEFENCE',
    exams: [
      {
        id: 'NDA',
        name: 'NDA',
      },
      {
        id: 'CDS',
        name: 'CDS',
      },
      {
        id: 'AFCAT',
        name: 'AFCAT',
      },
      {
        id: 'SSB',
        name: 'SSB',
      },
    ],
  },
  UPSC: {
    id: 'UPSC',
    name: 'UPSC Civil Service',
    icon: 'UPSC',
    exams: [
      {
        id: 'UPSC_CSE',
        name: 'UPSC CSE',
      },
      {
        id: 'UPSC_IES',
        name: 'UPSC IES',
      },
      {
        id: 'UPSC_CAPF',
        name: 'UPSC CAPF',
      },
    ],
  },
  BANKING: {
    id: 'BANKING',
    name: 'Banking',
    icon: 'BANKING',
    exams: [
      {
        id: 'IBPS_PO',
        name: 'IBPS PO',
      },
      {
        id: 'IBPS_CLERK',
        name: 'IBPS Clerk',
      },
      {
        id: 'SBI_PO',
        name: 'SBI PO',
      },
      {
        id: 'SBI_CLERK',
        name: 'SBI Clerk',
      },
      {
        id: 'RBI_GRADE_B',
        name: 'RBI Grade B',
      },
    ],
  },
  KPSC_KEA: {
    id: 'KPSC_KEA',
    name: 'KPSC / KEA',
    icon: 'KPSC',
    exams: [
      {
        id: 'KPSC',
        name: 'KPSC',
      },
      {
        id: 'KEA',
        name: 'KEA',
      },
    ],
  },
};

export const getExamCategories = (): ExamCategory[] => Object.values(EXAM_CATEGORIES);

export const getExamsForCategory = (categoryId: string): Exam[] => {
  const category = EXAM_CATEGORIES[categoryId];
  return category ? category.exams : [];
};

export const getExamById = (examId: string): (Exam & { categoryId: string; categoryName: string }) | null => {
  for (const category of Object.values(EXAM_CATEGORIES)) {
    const exam = category.exams.find((item) => item.id === examId);
    if (exam) {
      return {
        ...exam,
        categoryId: category.id,
        categoryName: category.name,
      };
    }
  }
  return null;
};

// SSC syllabus
export const SSC_SYLLABUS: Syllabus = {
  subjects: [
    {
      id: 'general_awareness',
      name: 'General Awareness',
      icon: 'globe',
      sections: [
        {
          id: 'history',
          name: 'History',
          subsections: [
            {
              id: 'ancient_indian_history',
              name: 'Ancient Indian History',
              chapters: [
                { id: 'prehistoric_age', name: 'Prehistoric Age' },
                { id: 'indus_valley_civilization', name: 'Indus Valley Civilization' },
                { id: 'vedic_period', name: 'Vedic Period' },
                { id: 'religious_movements', name: 'Religious Movements (Buddhism & Jainism)' },
                { id: 'mauryan_empire', name: 'Mauryan Empire' },
                { id: 'post_mauryan_period', name: 'Post-Mauryan Period' },
                { id: 'gupta_empire', name: 'Gupta Empire' },
                { id: 'ancient_indian_art_architecture', name: 'Ancient Indian Art & Architecture' },
              ],
            },
            {
              id: 'medieval_indian_history',
              name: 'Medieval Indian History',
              chapters: [
                { id: 'delhi_sultanate', name: 'Delhi Sultanate' },
                { id: 'mughal_empire', name: 'Mughal Empire' },
                { id: 'bhakti_movement', name: 'Bhakti Movement' },
                { id: 'sufi_movement', name: 'Sufi Movement' },
              ],
            },
            {
              id: 'modern_indian_history',
              name: 'Modern Indian History',
              chapters: [
                { id: 'advent_of_europeans', name: 'Advent of Europeans' },
                { id: 'british_expansion_india', name: 'British Expansion in India' },
                { id: 'revolt_1857', name: 'Revolt of 1857' },
                { id: 'indian_national_movement', name: 'Indian National Movement' },
                { id: 'constitutional_development', name: 'Constitutional Development' },
              ],
            },
            {
              id: 'world_history',
              name: 'World History',
              chapters: [],
            },
          ],
        },
        {
          id: 'geography',
          name: 'Geography',
          subsections: [
            {
              id: 'physical_geography',
              name: 'Physical Geography',
              chapters: [
                { id: 'earth_structure', name: 'Earth Structure' },
                { id: 'rocks', name: 'Rocks' },
                { id: 'volcanoes_earthquakes', name: 'Volcanoes & Earthquakes' },
                { id: 'atmosphere', name: 'Atmosphere' },
                { id: 'climate', name: 'Climate' },
                { id: 'winds_rainfall', name: 'Winds & Rainfall' },
              ],
            },
            {
              id: 'indian_geography',
              name: 'Indian Geography',
              chapters: [
                { id: 'physiographic_divisions', name: 'Physiographic Divisions' },
                { id: 'rivers', name: 'Rivers' },
                { id: 'soils', name: 'Soils' },
                { id: 'climate_of_india', name: 'Climate of India' },
                { id: 'natural_vegetation', name: 'Natural Vegetation' },
                { id: 'agriculture', name: 'Agriculture' },
                { id: 'minerals_industries', name: 'Minerals & Industries' },
              ],
            },
            {
              id: 'world_geography',
              name: 'World Geography',
              chapters: [
                { id: 'continents', name: 'Continents' },
                { id: 'oceans', name: 'Oceans' },
                { id: 'important_straits', name: 'Important Straits' },
                { id: 'deserts', name: 'Deserts' },
              ],
            },
          ],
        },
        {
          id: 'polity',
          name: 'Polity',
          subsections: [
            {
              id: 'constitution',
              name: 'Constitution',
              chapters: [
                { id: 'making_of_constitution', name: 'Making of the Constitution' },
                { id: 'preamble', name: 'Preamble' },
              ],
            },
            {
              id: 'fundamental_rights_duties',
              name: 'Fundamental Rights & Duties',
              chapters: [
                { id: 'fundamental_rights', name: 'Fundamental Rights' },
                { id: 'fundamental_duties', name: 'Fundamental Duties' },
                { id: 'directive_principles', name: 'Directive Principles of State Policy' },
              ],
            },
            {
              id: 'parliament_judiciary',
              name: 'Parliament & Judiciary',
              chapters: [
                { id: 'union_government', name: 'Union Government' },
                { id: 'state_government', name: 'State Government' },
                { id: 'parliament', name: 'Parliament' },
                { id: 'judiciary', name: 'Judiciary' },
              ],
            },
            {
              id: 'constitutional_bodies',
              name: 'Constitutional Bodies',
              chapters: [
                { id: 'constitutional_bodies_list', name: 'Constitutional Bodies' },
                { id: 'local_self_government', name: 'Local Self Government' },
              ],
            },
          ],
        },
        {
          id: 'economy',
          name: 'Economy',
          subsections: [
            {
              id: 'basic_economics',
              name: 'Basic Economics',
              chapters: [
                { id: 'basic_economic_concepts', name: 'Basic Economic Concepts' },
                { id: 'national_income_concepts', name: 'National Income' },
                { id: 'inflation', name: 'Inflation' },
              ],
            },
            {
              id: 'national_income',
              name: 'National Income',
              chapters: [
                { id: 'indian_economy_overview', name: 'Indian Economy Overview' },
                { id: 'agriculture_sector', name: 'Agriculture Sector' },
                { id: 'industrial_sector', name: 'Industrial Sector' },
                { id: 'service_sector', name: 'Service Sector' },
              ],
            },
            {
              id: 'banking_rbi',
              name: 'Banking & RBI',
              chapters: [
                { id: 'banking_system', name: 'Banking System' },
                { id: 'rbi', name: 'RBI' },
              ],
            },
            {
              id: 'budget_policies',
              name: 'Budget & Policies',
              chapters: [
                { id: 'budget', name: 'Budget' },
                { id: 'taxation', name: 'Taxation' },
              ],
            },
          ],
        },
        {
          id: 'science',
          name: 'Science',
          subsections: [
            {
              id: 'physics',
              name: 'Physics',
              chapters: [
                { id: 'motion', name: 'Motion' },
                { id: 'force', name: 'Force' },
                { id: 'work_energy', name: 'Work & Energy' },
                { id: 'light', name: 'Light' },
                { id: 'sound', name: 'Sound' },
              ],
            },
            {
              id: 'chemistry',
              name: 'Chemistry',
              chapters: [
                { id: 'matter', name: 'Matter' },
                { id: 'acids_bases_salts', name: 'Acids, Bases & Salts' },
                { id: 'metals_non_metals', name: 'Metals & Non-Metals' },
                { id: 'chemical_reactions', name: 'Chemical Reactions' },
              ],
            },
            {
              id: 'biology',
              name: 'Biology',
              chapters: [
                { id: 'cell', name: 'Cell' },
                { id: 'human_body_systems', name: 'Human Body Systems' },
                { id: 'nutrition', name: 'Nutrition' },
                { id: 'diseases', name: 'Diseases' },
                { id: 'plants', name: 'Plants' },
                { id: 'environment', name: 'Environment' },
              ],
            },
          ],
        },
        {
          id: 'current_affairs',
          name: 'Current Affairs',
          subsections: [
            { id: 'national', name: 'National', chapters: [] },
            { id: 'international', name: 'International', chapters: [] },
            { id: 'awards_sports', name: 'Awards & Sports', chapters: [] },
            { id: 'schemes_reports', name: 'Schemes & Reports', chapters: [] },
          ],
        },
      ],
    },
    {
      id: 'quantitative_aptitude',
      name: 'Quantitative Aptitude',
      icon: 'numbers',
      sections: [
        {
          id: 'arithmetic',
          name: 'Arithmetic',
          chapters: [
            { id: 'number_system', name: 'Number System' },
            { id: 'simplification', name: 'Simplification' },
            { id: 'percentage', name: 'Percentage' },
            { id: 'ratio_proportion', name: 'Ratio & Proportion' },
            { id: 'average', name: 'Average' },
            { id: 'profit_loss', name: 'Profit & Loss' },
            { id: 'simple_interest', name: 'Simple Interest' },
            { id: 'compound_interest', name: 'Compound Interest' },
            { id: 'time_work', name: 'Time & Work' },
            { id: 'pipes_cisterns', name: 'Pipes & Cisterns' },
            { id: 'time_speed_distance', name: 'Time, Speed & Distance' },
            { id: 'boat_stream', name: 'Boat & Stream' },
            { id: 'mixture_alligation', name: 'Mixture & Alligation' },
          ],
        },
        {
          id: 'advanced_maths',
          name: 'Advance Maths',
          chapters: [
            { id: 'algebra', name: 'Algebra' },
            { id: 'geometry', name: 'Geometry' },
            { id: 'trigonometry', name: 'Trigonometry' },
            { id: 'height_distance', name: 'Height & Distance' },
            { id: 'coordinate_geometry', name: 'Coordinate Geometry' },
          ],
        },
        {
          id: 'data_interpretation',
          name: 'Data Interpretation',
          chapters: [
            { id: 'table_di', name: 'Table DI' },
            { id: 'bar_graph', name: 'Bar Graph' },
            { id: 'line_graph', name: 'Line Graph' },
            { id: 'pie_chart', name: 'Pie Chart' },
            { id: 'caselet_di', name: 'Caselet DI' },
          ],
        },
        {
          id: 'mensuration',
          name: 'Mensuration',
          chapters: [
            { id: 'mensuration_2d', name: 'Mensuration (2D)' },
            { id: 'mensuration_3d', name: 'Mensuration (3D)' },
          ],
        },
      ],
    },
    {
      id: 'reasoning',
      name: 'General Intelligence & Reasoning',
      icon: 'logic',
      sections: [
        {
          id: 'verbal_reasoning',
          name: 'Verbal Reasoning',
          chapters: [
            { id: 'analogy', name: 'Analogy' },
            { id: 'classification', name: 'Classification' },
            { id: 'series', name: 'Series' },
            { id: 'coding_decoding', name: 'Coding-Decoding' },
            { id: 'blood_relations', name: 'Blood Relations' },
            { id: 'direction_sense', name: 'Direction Sense' },
            { id: 'order_ranking', name: 'Order & Ranking' },
            { id: 'venn_diagrams', name: 'Venn Diagrams' },
            { id: 'syllogism', name: 'Syllogism' },
            { id: 'statement_conclusion', name: 'Statement & Conclusion' },
            { id: 'statement_assumption', name: 'Statement & Assumption' },
            { id: 'statement_argument', name: 'Statement & Argument' },
            { id: 'cause_effect', name: 'Cause & Effect' },
            { id: 'mathematical_operations', name: 'Mathematical Operations' },
          ],
        },
        {
          id: 'non_verbal_reasoning',
          name: 'Non-Verbal Reasoning',
          chapters: [
            { id: 'figure_analogy', name: 'Figure Analogy' },
            { id: 'figure_classification', name: 'Figure Classification' },
            { id: 'figure_series', name: 'Figure Series' },
            { id: 'mirror_image', name: 'Mirror Image' },
            { id: 'water_image', name: 'Water Image' },
            { id: 'paper_folding', name: 'Paper Folding' },
            { id: 'paper_cutting', name: 'Paper Cutting' },
            { id: 'embedded_figures', name: 'Embedded Figures' },
            { id: 'counting_figures', name: 'Counting of Figures' },
            { id: 'cubes_dice', name: 'Cubes & Dice' },
            { id: 'pattern_completion', name: 'Pattern Completion' },
          ],
        },
        {
          id: 'logical_reasoning',
          name: 'Logical Reasoning',
          chapters: [
            { id: 'puzzles', name: 'Puzzles' },
            { id: 'seating_arrangement', name: 'Seating Arrangement' },
            { id: 'data_sufficiency', name: 'Data Sufficiency' },
            { id: 'logical_sequence', name: 'Logical Sequence' },
            { id: 'inequalities', name: 'Inequalities' },
          ],
        },
        {
          id: 'analytical_reasoning',
          name: 'Analytical Reasoning',
          chapters: [
            { id: 'decision_making', name: 'Decision Making' },
            { id: 'critical_reasoning', name: 'Critical Reasoning' },
            { id: 'assertion_reason', name: 'Assertion & Reason' },
            { id: 'course_of_action', name: 'Course of Action' },
          ],
        },
      ],
    },
    {
      id: 'english',
      name: 'English Language',
      icon: 'books',
      sections: [
        {
          id: 'grammar',
          name: 'Grammar',
          chapters: [
            { id: 'parts_of_speech', name: 'Parts of Speech' },
            { id: 'noun', name: 'Noun' },
            { id: 'pronoun', name: 'Pronoun' },
            { id: 'verb', name: 'Verb' },
            { id: 'tense', name: 'Tense' },
            { id: 'subject_verb_agreement', name: 'Subject-Verb Agreement' },
            { id: 'articles', name: 'Articles' },
            { id: 'prepositions', name: 'Prepositions' },
            { id: 'conjunctions', name: 'Conjunctions' },
            { id: 'adjectives', name: 'Adjectives' },
            { id: 'adverbs', name: 'Adverbs' },
            { id: 'active_passive_voice', name: 'Active & Passive Voice' },
            { id: 'direct_indirect_speech', name: 'Direct & Indirect Speech' },
            { id: 'error_detection', name: 'Error Detection' },
            { id: 'sentence_improvement', name: 'Sentence Improvement' },
            { id: 'sentence_correction', name: 'Sentence Correction' },
          ],
        },
        {
          id: 'vocabulary',
          name: 'Vocabulary',
          chapters: [
            { id: 'synonyms', name: 'Synonyms' },
            { id: 'antonyms', name: 'Antonyms' },
            { id: 'one_word_substitution', name: 'One Word Substitution' },
            { id: 'idioms_phrases', name: 'Idioms & Phrases' },
            { id: 'phrasal_verbs', name: 'Phrasal Verbs' },
            { id: 'spellings', name: 'Spellings' },
            { id: 'homophones', name: 'Homophones' },
            { id: 'foreign_words', name: 'Foreign Words' },
          ],
        },
        {
          id: 'comprehension',
          name: 'Comprehension',
          chapters: [
            { id: 'reading_comprehension', name: 'Reading Comprehension' },
            { id: 'cloze_test', name: 'Cloze Test' },
            { id: 'fill_in_blanks', name: 'Fill in the Blanks' },
            { id: 'para_jumbles', name: 'Para Jumbles' },
            { id: 'sentence_arrangement', name: 'Sentence Arrangement' },
          ],
        },
        {
          id: 'writing_skills',
          name: 'Writing Skills',
          chapters: [
            { id: 'sentence_formation', name: 'Sentence Formation' },
            { id: 'paragraph_writing', name: 'Paragraph Writing' },
            { id: 'precis_writing', name: 'Precis Writing' },
            { id: 'letter_writing', name: 'Letter Writing' },
            { id: 'essay_writing', name: 'Essay Writing' },
            { id: 'report_writing', name: 'Report Writing' },
          ],
        },
      ],
    },
  ],
};

// Banking syllabus
export const BANKING_SYLLABUS: Syllabus = {
  subjects: [
    {
      id: 'reasoning',
      name: 'Reasoning Ability',
      icon: 'logic',
      sections: [
        {
          id: 'verbal',
          name: 'Verbal',
          chapters: [
            'Syllogism',
            'Inequality',
            'Seating Arrangement',
            'Puzzles (floor, box, month)',
            'Coding-Decoding',
            'Blood Relations',
            'Direction',
            'Data Sufficiency',
          ],
        },
        {
          id: 'logical',
          name: 'Logical',
          chapters: [
            'Statement & Assumptions',
            'Statement & Arguments',
            'Statement & Conclusions',
            'Course of Action',
            'Logical Sequences',
          ],
        },
        {
          id: 'puzzles',
          name: 'Puzzles',
          chapters: [
            'Floor Puzzle',
            'Box Puzzle',
            'Month Puzzle',
            'Day Puzzle',
            'Linear Arrangement',
            'Circular Arrangement',
          ],
        },
      ],
    },
    {
      id: 'quantitative',
      name: 'Quantitative Aptitude',
      icon: 'numbers',
      sections: [
        {
          id: 'arithmetic',
          name: 'Arithmetic',
          chapters: [
            'Simplification',
            'Percentage',
            'Ratio',
            'Profit & Loss',
            'SI & CI',
            'Time & Work',
            'Speed & Distance',
            'Quadratic Equations',
            'Probability',
          ],
        },
        {
          id: 'advanced_maths',
          name: 'Advanced Maths',
          chapters: ['Algebra', 'Geometry', 'Trigonometry', 'Mensuration'],
        },
        {
          id: 'data_interpretation',
          name: 'Data Interpretation',
          chapters: ['DI (table, bar, pie, caselet)'],
        },
      ],
    },
    {
      id: 'english',
      name: 'English Language',
      icon: 'books',
      sections: [
        {
          id: 'grammar',
          name: 'Grammar',
          chapters: [
            'Parts of Speech',
            'Tenses',
            'Articles',
            'Prepositions',
            'Conjunctions',
            'Subject Verb Agreement',
            'Active & Passive Voice',
            'Direct & Indirect Speech',
            'Error Detection',
          ],
        },
        {
          id: 'vocabulary',
          name: 'Vocabulary',
          chapters: [
            'Synonyms',
            'Antonyms',
            'One-Word Substitution',
            'Idioms & Phrases',
            'Spelling Errors',
          ],
        },
        {
          id: 'rc',
          name: 'RC',
          chapters: ['Reading Comprehension', 'Cloze Test', 'Para Jumbles', 'Sentence Improvement'],
        },
      ],
    },
    {
      id: 'banking_awareness',
      name: 'General / Banking Awareness',
      icon: 'money',
      sections: [
        {
          id: 'banking',
          name: 'Banking',
          chapters: [
            'Banking History',
            'RBI & Monetary Policy',
            'Banking Terms',
            'Financial Institutions',
            'Budget & Economic Survey',
          ],
        },
        {
          id: 'economy',
          name: 'Economy',
          chapters: [
            'Basic Economic Concepts',
            'National Income',
            'Banking System',
            'Monetary Policy',
            'Fiscal Policy',
            'Budget',
            'Economic Survey',
          ],
        },
        {
          id: 'current_affairs',
          name: 'Current Affairs',
          chapters: [
            'National Affairs',
            'International Affairs',
            'Banking & Finance News',
            'Government Schemes',
            'Appointments',
            'Awards & Honours',
          ],
        },
      ],
    },
    {
      id: 'computer',
      name: 'Computer Awareness',
      icon: 'computer',
      sections: [
        {
          id: 'computer_basics',
          name: 'Computer Basics',
          chapters: ['Computer Basics', 'MS Office', 'Internet', 'Networking', 'Cyber Security'],
        },
      ],
    },
  ],
};

// Railway syllabus
export const RAILWAY_SYLLABUS: Syllabus = {
  subjects: [
    {
      id: 'general_awareness',
      name: 'General Awareness',
      icon: 'globe',
      sections: [
        { id: 'history', name: 'History', chapters: ['Indian History'] },
        { id: 'geography', name: 'Geography', chapters: ['Indian Geography'] },
        { id: 'polity', name: 'Polity', chapters: ['Constitution'] },
        { id: 'economy', name: 'Economy', chapters: ['Economy Basics'] },
        {
          id: 'science',
          name: 'Science',
          chapters: ['Physics (motion, electricity)', 'Chemistry (metals, acids)', 'Biology (human body)'],
        },
        {
          id: 'current_affairs',
          name: 'Current Affairs',
          chapters: ['National Affairs', 'International Affairs', 'Awards & Sports', 'Government Schemes'],
        },
      ],
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: 'numbers',
      sections: [
        {
          id: 'arithmetic',
          name: 'Arithmetic',
          chapters: [
            'BODMAS',
            'Fractions & Decimals',
            'Percentage',
            'Ratio',
            'Profit & Loss',
            'SI',
            'Time & Work',
            'Time & Distance',
          ],
        },
        { id: 'mensuration', name: 'Mensuration', chapters: ['Mensuration (2D & 3D)'] },
        {
          id: 'algebra',
          name: 'Algebra',
          chapters: ['Linear Equations', 'Quadratic Equations', 'Polynomials', 'Basic Algebraic Identities'],
        },
      ],
    },
    {
      id: 'reasoning',
      name: 'Reasoning',
      icon: 'logic',
      sections: [
        {
          id: 'verbal',
          name: 'Verbal',
          chapters: [
            'Analogy',
            'Series',
            'Coding-Decoding',
            'Blood Relations',
            'Direction Test',
            'Venn Diagram',
            'Statement & Conclusion',
          ],
        },
        {
          id: 'non_verbal',
          name: 'Non-verbal',
          chapters: [
            'Figure Analogy',
            'Figure Classification',
            'Mirror Images',
            'Water Images',
            'Pattern Completion',
          ],
        },
      ],
    },
  ],
};

// UPSC syllabus
export const UPSC_SYLLABUS: Syllabus = {
  subjects: [
    {
      id: 'general_studies',
      name: 'General Studies',
      icon: 'books',
      sections: [
        { id: 'history', name: 'History', chapters: ['Ancient', 'Medieval', 'Modern', 'World'] },
        { id: 'geography', name: 'Geography', chapters: ['Physical', 'Indian', 'World'] },
        { id: 'polity', name: 'Polity', chapters: ['Constitution', 'Governance', 'Federalism', 'Judiciary'] },
        { id: 'economy', name: 'Economy', chapters: ['Growth', 'Inflation', 'Banking', 'Budget'] },
        { id: 'environment', name: 'Environment', chapters: ['Ecology', 'Climate Change', 'Biodiversity'] },
        {
          id: 'current_affairs',
          name: 'Current Affairs',
          chapters: [
            'National Affairs',
            'International Affairs',
            'Government Schemes',
            'Awards & Honours',
            'Sports',
            'Science & Technology',
          ],
        },
      ],
    },
    {
      id: 'csat',
      name: 'CSAT',
      icon: 'notes',
      sections: [
        {
          id: 'quantitative',
          name: 'Quantitative',
          chapters: [
            'Number System',
            'Percentage',
            'Ratio & Proportion',
            'Profit & Loss',
            'SI & CI',
            'Time & Work',
            'Time & Distance',
            'Algebra',
            'Geometry',
            'Mensuration',
            'Data Interpretation',
          ],
        },
        {
          id: 'reasoning',
          name: 'Reasoning',
          chapters: [
            'Analogy',
            'Classification',
            'Series',
            'Coding-Decoding',
            'Blood Relations',
            'Direction Sense',
            'Ranking & Order',
            'Venn Diagrams',
            'Syllogism',
            'Seating Arrangement',
            'Puzzles',
          ],
        },
        {
          id: 'comprehension',
          name: 'Comprehension',
          chapters: ['Reading Comprehension', 'Passage Analysis', 'Critical Reasoning'],
        },
      ],
    },
  ],
};

// KPSC syllabus
export const KPSC_SYLLABUS: Syllabus = {
  subjects: [
    {
      id: 'general_studies',
      name: 'General Studies',
      icon: 'books',
      sections: [
        { id: 'history', name: 'History', chapters: ['State History'] },
        { id: 'geography', name: 'Geography', chapters: ['State Geography'] },
        { id: 'polity', name: 'Polity', chapters: ['State Polity', 'Constitution'] },
        { id: 'economy', name: 'Economy', chapters: ['State Economy'] },
        {
          id: 'science',
          name: 'Science',
          chapters: ['Physics Basics', 'Chemistry Basics', 'Biology Basics', 'Environmental Science'],
        },
        { id: 'current_affairs', name: 'State Current Affairs', chapters: ['State Schemes'] },
      ],
    },
    {
      id: 'language',
      name: 'Language',
      icon: 'books',
      sections: [
        {
          id: 'language_basics',
          name: 'Language Basics',
          chapters: ['Grammar', 'Vocabulary', 'Comprehension', 'Writing Skills', 'Translation'],
        },
      ],
    },
  ],
};

// Defence syllabus
export const DEFENCE_SYLLABUS: Syllabus = {
  subjects: [
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: 'numbers',
      sections: [{ id: 'maths', name: 'Maths', chapters: ['Algebra', 'Trigonometry', 'Mensuration'] }],
    },
    {
      id: 'general_ability',
      name: 'General Ability',
      icon: 'globe',
      sections: [
        {
          id: 'science',
          name: 'Science',
          chapters: ['Physics: Mechanics, Electricity', 'Chemistry: Basics', 'Biology: Human Body'],
        },
        { id: 'social_studies', name: 'Social Studies', chapters: ['History', 'Geography', 'Polity'] },
      ],
    },
    {
      id: 'english',
      name: 'English',
      icon: 'books',
      sections: [
        {
          id: 'english_basics',
          name: 'English Basics',
          chapters: ['Grammar', 'Vocabulary', 'Comprehension', 'Sentence Formation', 'Error Detection'],
        },
      ],
    },
  ],
};

// Map of exams to syllabi
export const EXAM_SYLLABUS_MAP: Record<string, Syllabus> = {
  SSC_CGL: SSC_SYLLABUS,
  SSC_GD: SSC_SYLLABUS,
  SSC_CHSL: SSC_SYLLABUS,
  SSC_MTS: SSC_SYLLABUS,
  SSC_CPO: SSC_SYLLABUS,

  IBPS_PO: BANKING_SYLLABUS,
  IBPS_CLERK: BANKING_SYLLABUS,
  SBI_PO: BANKING_SYLLABUS,
  SBI_CLERK: BANKING_SYLLABUS,
  RBI_GRADE_B: BANKING_SYLLABUS,

  RRB_NTPC: RAILWAY_SYLLABUS,
  RRB_GROUP_D: RAILWAY_SYLLABUS,
  RRB_ALP: RAILWAY_SYLLABUS,
  RRB_JE: RAILWAY_SYLLABUS,

  UPSC_CSE: UPSC_SYLLABUS,
  UPSC_IES: UPSC_SYLLABUS,
  UPSC_CAPF: UPSC_SYLLABUS,

  KPSC: KPSC_SYLLABUS,
  KEA: KPSC_SYLLABUS,

  NDA: DEFENCE_SYLLABUS,
  CDS: DEFENCE_SYLLABUS,
  AFCAT: DEFENCE_SYLLABUS,
  SSB: DEFENCE_SYLLABUS,
};

export const getSyllabusForExam = (examId: string): Syllabus => {
  return EXAM_SYLLABUS_MAP[examId] ?? SSC_SYLLABUS;
};

type SyllabusStats = { sectionCount: number; chapterCount: number };

function countSyllabus(syllabus: Syllabus): SyllabusStats {
  let sectionCount = 0;
  let chapterCount = 0;

  for (const subject of syllabus.subjects) {
    for (const section of subject.sections) {
      if (section.subsections?.length) {
        chapterCount += section.subsections.length;
        for (const subsection of section.subsections) {
          sectionCount += subsection.chapters.length;
        }
        continue;
      }

      if (section.chapters?.length) {
        chapterCount += 1;
        sectionCount += section.chapters.length;
      }
    }
  }

  return { sectionCount, chapterCount };
}

export const getExamStats = (): { examCount: number; sectionCount: number; chapterCount: number } => {
  const examCount = Object.values(EXAM_CATEGORIES).reduce((sum, category) => sum + category.exams.length, 0);
  const uniqueSyllabi = [...new Set(Object.values(EXAM_SYLLABUS_MAP))];

  const totals = uniqueSyllabi.reduce(
    (acc, syllabus) => {
      const counts = countSyllabus(syllabus);
      return {
        sectionCount: acc.sectionCount + counts.sectionCount,
        chapterCount: acc.chapterCount + counts.chapterCount,
      };
    },
    { sectionCount: 0, chapterCount: 0 }
  );

  return { examCount, sectionCount: totals.sectionCount, chapterCount: totals.chapterCount };
};
