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

const seedData = [
  {
    name: 'SSC',
    code: 'SSC',
    exams: [
      {
        name: 'SSC-CGL',
        code: 'SSC_CGL',
        syllabus: {
          subjects: [
            {
              name: 'General Awareness',
              chapters: [
                {
                  name: 'History',
                  sections: ['Ancient', 'Medieval', 'Modern'].map((name) => ({ name })),
                },
                {
                  name: 'Geography',
                  sections: ['Physical', 'Indian', 'World'].map((name) => ({ name })),
                },
              ],
            },
            {
              name: 'Quantitative Aptitude',
              chapters: [
                {
                  name: 'Arithmetic',
                  sections: ['Number System', 'Percentage', 'Ratio & Proportion'].map((name) => ({ name })),
                },
                {
                  name: 'Advanced Maths',
                  sections: ['Algebra', 'Geometry'].map((name) => ({ name })),
                },
              ],
            },
          ],
        },
      },
      {
        name: 'SSC-GD',
        code: 'SSC_GD',
        syllabus: {
          subjects: [
            {
              name: 'General Awareness',
              chapters: [
                {
                  name: 'Current Affairs',
                  sections: ['National', 'International'].map((name) => ({ name })),
                },
              ],
            },
            {
              name: 'Reasoning',
              chapters: [
                {
                  name: 'Verbal Reasoning',
                  sections: ['Analogy', 'Series', 'Coding-Decoding'].map((name) => ({ name })),
                },
              ],
            },
          ],
        },
      },
      {
        name: 'SSC-CHSL',
        code: 'SSC_CHSL',
        syllabus: {
          subjects: [
            {
              name: 'English Language',
              chapters: [
                {
                  name: 'Grammar',
                  sections: ['Parts of Speech', 'Tenses'].map((name) => ({ name })),
                },
              ],
            },
          ],
        },
      },
    ],
  },
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
              name: 'General Studies',
              chapters: [
                {
                  name: 'Polity',
                  sections: ['Constitution', 'Governance'].map((name) => ({ name })),
                },
                {
                  name: 'Economy',
                  sections: ['Growth', 'Inflation'].map((name) => ({ name })),
                },
              ],
            },
            {
              name: 'CSAT',
              chapters: [
                {
                  name: 'Comprehension',
                  sections: ['Passage Analysis'].map((name) => ({ name })),
                },
              ],
            },
          ],
        },
      },
    ],
  },
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
              name: 'General Awareness',
              chapters: [
                {
                  name: 'Science',
                  sections: ['Physics', 'Chemistry', 'Biology'].map((name) => ({ name })),
                },
              ],
            },
            {
              name: 'Mathematics',
              chapters: [
                {
                  name: 'Arithmetic',
                  sections: ['BODMAS', 'Time & Work', 'Time & Distance'].map((name) => ({ name })),
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
      { name: major.name },
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
