'use client';

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { UploadSimpleIcon } from '@phosphor-icons/react/dist/ssr/UploadSimple';

import { formatExamDisplayName } from '@/lib/format-exam-display-name';

type Section = { _id: string; name: string };
type Chapter = { _id: string; name: string; sections: Section[] };
type Subject = { _id: string; name: string; chapters: Chapter[] };
type Syllabus = { subjects: Subject[] };
type Exam = { _id: string; name: string; code?: string; syllabus?: Syllabus };
type MajorExam = { _id: string; name: string; code?: string; logoUrl?: string; exams: Exam[] };

const MAX_NAME_LENGTH = 60;
const MAX_LOGO_BYTES = 2 * 1024 * 1024; // 2MB

export function ExamManagement(): React.JSX.Element {
  const [majorExams, setMajorExams] = React.useState<MajorExam[]>([]);
  const [selectedMajorId, setSelectedMajorId] = React.useState<string>('');
  const [selectedExamId, setSelectedExamId] = React.useState<string>('');
  const [majorName, setMajorName] = React.useState('');
  const [examName, setExamName] = React.useState('');
  const [subjectName, setSubjectName] = React.useState('');
  const [chapterInputs, setChapterInputs] = React.useState<Record<string, string>>({});
  const [sectionInputs, setSectionInputs] = React.useState<Record<string, string>>({});

  const refresh = React.useCallback(async () => {
    const response = await fetch('/api/major-exams');
    if (!response.ok) {
      return;
    }
    const data = (await response.json()) as MajorExam[];
    setMajorExams(data);
  }, []);

  React.useEffect(() => {
    void refresh();
  }, [refresh]);

  React.useEffect(() => {
    if (majorExams.length > 0 && !majorExams.some((major) => major._id === selectedMajorId)) {
      setSelectedMajorId(majorExams[0]._id);
    }
  }, [majorExams, selectedMajorId]);

  const selectedMajor = majorExams.find((major) => major._id === selectedMajorId) ?? null;
  const exams = selectedMajor?.exams ?? [];

  React.useEffect(() => {
    if (selectedMajor && selectedMajor.exams.length > 0 && !selectedMajor.exams.some((exam) => exam._id === selectedExamId)) {
      setSelectedExamId(selectedMajor.exams[0]._id);
    }
  }, [selectedMajor, selectedExamId]);

  const selectedExam = exams.find((exam) => exam._id === selectedExamId) ?? null;
  const syllabus = selectedExam?.syllabus ?? { subjects: [] };

  const addMajor = async (): Promise<void> => {
    const name = majorName.trim().slice(0, MAX_NAME_LENGTH);
    if (!name) return;
    await fetch('/api/major-exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setMajorName('');
    await refresh();
  };

  const renameMajor = async (major: MajorExam): Promise<void> => {
    const name = globalThis.prompt('Enter major exam name', major.name);
    if (!name) return;
    await fetch(`/api/major-exams/${major._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.slice(0, MAX_NAME_LENGTH) }),
    });
    await refresh();
  };

  const deleteMajor = async (major: MajorExam): Promise<void> => {
    if (!globalThis.confirm(`Delete ${major.name}?`)) return;
    await fetch(`/api/major-exams/${major._id}`, { method: 'DELETE' });
    setSelectedMajorId('');
    setSelectedExamId('');
    await refresh();
  };

  const uploadMajorLogo = async (major: MajorExam, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`/api/major-exams/${major._id}/logo`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const payload: unknown = await response.json().catch(() => null);
      const message =
        payload && typeof payload === 'object' && 'error' in payload && typeof payload.error === 'string'
          ? payload.error
          : 'Logo upload failed';
      throw new Error(message);
    }
    await refresh();
  };

  const addExam = async (): Promise<void> => {
    const name = examName.trim().slice(0, MAX_NAME_LENGTH);
    if (!name || !selectedMajor) return;
    await fetch(`/api/major-exams/${selectedMajor._id}/exams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setExamName('');
    await refresh();
  };

  const renameExam = async (exam: Exam): Promise<void> => {
    if (!selectedMajor) return;
    const name = globalThis.prompt('Enter exam name', exam.name);
    if (!name) return;
    await fetch(`/api/major-exams/${selectedMajor._id}/exams/${exam._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.slice(0, MAX_NAME_LENGTH) }),
    });
    await refresh();
  };

  const deleteExam = async (exam: Exam): Promise<void> => {
    if (!selectedMajor) return;
    if (!globalThis.confirm(`Delete ${exam.name}?`)) return;
    await fetch(`/api/major-exams/${selectedMajor._id}/exams/${exam._id}`, { method: 'DELETE' });
    setSelectedExamId('');
    await refresh();
  };

  const addSubject = async (): Promise<void> => {
    const name = subjectName.trim().slice(0, MAX_NAME_LENGTH);
    if (!name || !selectedMajor || !selectedExam) return;
    await fetch(`/api/major-exams/${selectedMajor._id}/exams/${selectedExam._id}/subjects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setSubjectName('');
    await refresh();
  };

  const renameSubject = async (subject: Subject): Promise<void> => {
    if (!selectedMajor || !selectedExam) return;
    const name = globalThis.prompt('Enter subject name', subject.name);
    if (!name) return;
    await fetch(
      `/api/major-exams/${selectedMajor._id}/exams/${selectedExam._id}/subjects/${subject._id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.slice(0, MAX_NAME_LENGTH) }),
      }
    );
    await refresh();
  };

  const deleteSubject = async (subject: Subject): Promise<void> => {
    if (!selectedMajor || !selectedExam) return;
    if (!globalThis.confirm(`Delete ${subject.name}?`)) return;
    await fetch(
      `/api/major-exams/${selectedMajor._id}/exams/${selectedExam._id}/subjects/${subject._id}`,
      { method: 'DELETE' }
    );
    await refresh();
  };

  const addChapter = async (subject: Subject): Promise<void> => {
    if (!selectedMajor || !selectedExam) return;
    const name = chapterInputs[subject._id]?.trim().slice(0, MAX_NAME_LENGTH);
    if (!name) return;
    await fetch(
      `/api/major-exams/${selectedMajor._id}/exams/${selectedExam._id}/subjects/${subject._id}/chapters`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      }
    );
    setChapterInputs((prev) => ({ ...prev, [subject._id]: '' }));
    await refresh();
  };

  const renameChapter = async (subject: Subject, chapter: Chapter): Promise<void> => {
    if (!selectedMajor || !selectedExam) return;
    const name = globalThis.prompt('Enter chapter name', chapter.name);
    if (!name) return;
    await fetch(
      `/api/major-exams/${selectedMajor._id}/exams/${selectedExam._id}/subjects/${subject._id}/chapters/${chapter._id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.slice(0, MAX_NAME_LENGTH) }),
      }
    );
    await refresh();
  };

  const deleteChapter = async (subject: Subject, chapter: Chapter): Promise<void> => {
    if (!selectedMajor || !selectedExam) return;
    if (!globalThis.confirm(`Delete ${chapter.name}?`)) return;
    await fetch(
      `/api/major-exams/${selectedMajor._id}/exams/${selectedExam._id}/subjects/${subject._id}/chapters/${chapter._id}`,
      { method: 'DELETE' }
    );
    await refresh();
  };

  const addSection = async (subject: Subject, chapter: Chapter): Promise<void> => {
    if (!selectedMajor || !selectedExam) return;
    const key = `${subject._id}-${chapter._id}`;
    const name = sectionInputs[key]?.trim().slice(0, MAX_NAME_LENGTH);
    if (!name) return;
    await fetch(
      `/api/major-exams/${selectedMajor._id}/exams/${selectedExam._id}/subjects/${subject._id}/chapters/${chapter._id}/sections`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      }
    );
    setSectionInputs((prev) => ({ ...prev, [key]: '' }));
    await refresh();
  };

  const renameSection = async (subject: Subject, chapter: Chapter, section: Section): Promise<void> => {
    if (!selectedMajor || !selectedExam) return;
    const name = globalThis.prompt('Enter section name', section.name);
    if (!name) return;
    await fetch(
      `/api/major-exams/${selectedMajor._id}/exams/${selectedExam._id}/subjects/${subject._id}/chapters/${chapter._id}/sections/${section._id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.slice(0, MAX_NAME_LENGTH) }),
      }
    );
    await refresh();
  };

  const deleteSection = async (subject: Subject, chapter: Chapter, section: Section): Promise<void> => {
    if (!selectedMajor || !selectedExam) return;
    if (!globalThis.confirm(`Delete ${section.name}?`)) return;
    await fetch(
      `/api/major-exams/${selectedMajor._id}/exams/${selectedExam._id}/subjects/${subject._id}/chapters/${chapter._id}/sections/${section._id}`,
      { method: 'DELETE' }
    );
    await refresh();
  };

  return (
    <Grid container spacing={3}>
      <Grid
        size={{
          lg: 3,
          xs: 12,
        }}
      >
        <MajorExamList
          majors={majorExams}
          selectedId={selectedMajorId}
          onSelect={setSelectedMajorId}
          onAdd={addMajor}
          onRename={renameMajor}
          onDelete={deleteMajor}
          onUploadLogo={uploadMajorLogo}
          value={majorName}
          onValueChange={setMajorName}
        />
      </Grid>
      <Grid
        size={{
          lg: 3,
          xs: 12,
        }}
      >
        <ExamList
          exams={exams}
          selectedId={selectedExamId}
          onSelect={setSelectedExamId}
          onAdd={addExam}
          onRename={renameExam}
          onDelete={deleteExam}
          value={examName}
          onValueChange={setExamName}
          disabled={!selectedMajor}
          majorLabel={selectedMajor?.name}
        />
      </Grid>
      <Grid
        size={{
          lg: 6,
          xs: 12,
        }}
      >
        <SyllabusView
          title={selectedExam ? `${formatExamDisplayName(selectedExam.name)} Syllabus` : 'Syllabus'}
          subjects={syllabus.subjects}
          onAddSubject={addSubject}
          subjectValue={subjectName}
          onSubjectValueChange={setSubjectName}
          onRenameSubject={renameSubject}
          onDeleteSubject={deleteSubject}
          onAddChapter={addChapter}
          chapterInputs={chapterInputs}
          onChapterInputChange={setChapterInputs}
          onRenameChapter={renameChapter}
          onDeleteChapter={deleteChapter}
          onAddSection={addSection}
          sectionInputs={sectionInputs}
          onSectionInputChange={setSectionInputs}
          onRenameSection={renameSection}
          onDeleteSection={deleteSection}
          disabled={!selectedExam}
        />
      </Grid>
    </Grid>
  );
}

function MajorExamList({
  majors,
  selectedId,
  onSelect,
  onAdd,
  onRename,
  onDelete,
  onUploadLogo,
  value,
  onValueChange,
}: {
  majors: MajorExam[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onRename: (major: MajorExam) => void;
  onDelete: (major: MajorExam) => void;
  onUploadLogo: (major: MajorExam, file: File) => void;
  value: string;
  onValueChange: (value: string) => void;
}): React.JSX.Element {
  const [uploadingMajorId, setUploadingMajorId] = React.useState<string | null>(null);
  const [snackbar, setSnackbar] = React.useState<
    | { open: false; severity?: never; message?: never }
    | { open: true; severity: 'success' | 'error'; message: string }
  >({ open: false });

  const handleCloseSnackbar = React.useCallback(() => {
    setSnackbar({ open: false });
  }, []);

  const handleUploadLogo = React.useCallback(
    async (major: MajorExam, file: File): Promise<void> => {
      if (!file.type.startsWith('image/')) {
        setSnackbar({ open: true, severity: 'error', message: 'Please select an image file.' });
        return;
      }
      if (file.size > MAX_LOGO_BYTES) {
        setSnackbar({ open: true, severity: 'error', message: 'Image is too large. Max size is 2MB.' });
        return;
      }

      setUploadingMajorId(major._id);
      try {
        await onUploadLogo(major, file);
        setSnackbar({ open: true, severity: 'success', message: 'Logo updated.' });
      } catch (error) {
        setSnackbar({
          open: true,
          severity: 'error',
          message: error instanceof Error ? error.message : 'Logo upload failed.',
        });
      } finally {
        setUploadingMajorId(null);
      }
    },
    [onUploadLogo]
  );

  return (
    <Card>
      <CardHeader
        title="Major Exams"
        subheader="Upload a square image (max 2MB). Changes may take a moment to appear in the app."
      />
      <CardContent sx={{ p: 2 }}>
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            label="Add major exam"
            value={value}
            onChange={(event): void => onValueChange(event.target.value)}
            fullWidth
            inputProps={{ maxLength: MAX_NAME_LENGTH }}
          />
          <Button variant="contained" onClick={onAdd}>
            Add
          </Button>
        </Stack>
      </CardContent>
      <Divider />
      <CardContent sx={{ p: 0 }}>
        <List disablePadding>
          {majors.map((major) => (
            <Box key={major._id}>
              <ListItemButton selected={major._id === selectedId} onClick={(): void => onSelect(major._id)}>
                <Avatar
                  alt={formatExamDisplayName(major.name)}
                  src={major.logoUrl}
                  sx={{ bgcolor: 'var(--mui-palette-neutral-200)', color: 'var(--mui-palette-text-primary)', mr: 1 }}
                >
                  {formatExamDisplayName(major.name).slice(0, 1).toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <ListItemText primary={formatExamDisplayName(major.name)} />
                </Box>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <LogoUploadIconButton
                    disabled={uploadingMajorId === major._id}
                    loading={uploadingMajorId === major._id}
                    onFileSelected={(file) => {
                      void handleUploadLogo(major, file);
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  />
                  <IconButton aria-label="Rename major exam" size="small" onClick={(): void => onRename(major)}>
                    <PencilSimpleIcon fontSize="var(--icon-fontSize-md)" />
                  </IconButton>
                  <IconButton
                    aria-label="Delete major exam"
                    size="small"
                    color="error"
                    onClick={(): void => onDelete(major)}
                  >
                    <TrashIcon fontSize="var(--icon-fontSize-md)" />
                  </IconButton>
                </Stack>
              </ListItemButton>
              <Divider />
            </Box>
          ))}
        </List>
      </CardContent>
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        open={snackbar.open}
      >
        {snackbar.open ? (
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        ) : (
          <span />
        )}
      </Snackbar>
    </Card>
  );
}

function LogoUploadIconButton({
  disabled,
  loading,
  onFileSelected,
  onClick,
}: {
  disabled: boolean;
  loading: boolean;
  onFileSelected: (file: File) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}): React.JSX.Element {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <React.Fragment>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(event): void => {
          const file = event.target.files?.[0];
          if (file) {
            onFileSelected(file);
          }
          event.target.value = '';
        }}
      />
      <Tooltip title={disabled ? 'Uploading…' : 'Upload logo'}>
        <span>
          <IconButton
            aria-label="Upload major exam logo"
            size="small"
            disabled={disabled}
            onClick={(event): void => {
              onClick(event);
              inputRef.current?.click();
            }}
          >
            {loading ? (
              <CircularProgress color="inherit" size={18} thickness={5} />
            ) : (
              <UploadSimpleIcon fontSize="var(--icon-fontSize-md)" />
            )}
          </IconButton>
        </span>
      </Tooltip>
    </React.Fragment>
  );
}

function ExamList({
  exams,
  selectedId,
  onSelect,
  onAdd,
  onRename,
  onDelete,
  value,
  onValueChange,
  disabled,
  majorLabel,
}: {
  exams: Exam[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onRename: (exam: Exam) => void;
  onDelete: (exam: Exam) => void;
  value: string;
  onValueChange: (value: string) => void;
  disabled: boolean;
  majorLabel?: string;
}): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant="h6">Exams</Typography>
            {majorLabel ? (
              <Typography color="text.secondary" variant="caption">
                {formatExamDisplayName(majorLabel)}
              </Typography>
            ) : null}
          </Stack>
        }
      />
      <CardContent sx={{ p: 2 }}>
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            label="Add exam"
            value={value}
            onChange={(event): void => onValueChange(event.target.value)}
            fullWidth
            disabled={disabled}
            inputProps={{ maxLength: MAX_NAME_LENGTH }}
          />
          <Button variant="contained" onClick={onAdd} disabled={disabled}>
            Add
          </Button>
        </Stack>
      </CardContent>
      <Divider />
      <CardContent sx={{ p: 0 }}>
        <List disablePadding>
          {exams.map((exam) => (
            <Box key={exam._id}>
              <ListItemButton selected={exam._id === selectedId} onClick={(): void => onSelect(exam._id)}>
                <Box sx={{ flex: 1 }}>
                  <ListItemText primary={formatExamDisplayName(exam.name)} />
                </Box>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <IconButton aria-label="Rename exam" size="small" onClick={(): void => onRename(exam)}>
                    <PencilSimpleIcon fontSize="var(--icon-fontSize-md)" />
                  </IconButton>
                  <IconButton aria-label="Delete exam" size="small" color="error" onClick={(): void => onDelete(exam)}>
                    <TrashIcon fontSize="var(--icon-fontSize-md)" />
                  </IconButton>
                </Stack>
              </ListItemButton>
              <Divider />
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

function SyllabusView({
  title,
  subjects,
  onAddSubject,
  subjectValue,
  onSubjectValueChange,
  onRenameSubject,
  onDeleteSubject,
  onAddChapter,
  chapterInputs,
  onChapterInputChange,
  onRenameChapter,
  onDeleteChapter,
  onAddSection,
  sectionInputs,
  onSectionInputChange,
  onRenameSection,
  onDeleteSection,
  disabled,
}: {
  title: string;
  subjects: Subject[];
  onAddSubject: () => void;
  subjectValue: string;
  onSubjectValueChange: (value: string) => void;
  onRenameSubject: (subject: Subject) => void;
  onDeleteSubject: (subject: Subject) => void;
  onAddChapter: (subject: Subject) => void;
  chapterInputs: Record<string, string>;
  onChapterInputChange: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onRenameChapter: (subject: Subject, chapter: Chapter) => void;
  onDeleteChapter: (subject: Subject, chapter: Chapter) => void;
  onAddSection: (subject: Subject, chapter: Chapter) => void;
  sectionInputs: Record<string, string>;
  onSectionInputChange: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onRenameSection: (subject: Subject, chapter: Chapter, section: Section) => void;
  onDeleteSection: (subject: Subject, chapter: Chapter, section: Section) => void;
  disabled: boolean;
}): React.JSX.Element {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <TextField
            size="small"
            label="Add subject"
            value={subjectValue}
            onChange={(event): void => onSubjectValueChange(event.target.value)}
            fullWidth
            disabled={disabled}
            inputProps={{ maxLength: MAX_NAME_LENGTH }}
          />
          <Button variant="contained" onClick={onAddSubject} disabled={disabled}>
            Add
          </Button>
        </Stack>
        {subjects.length > 0 ? (
          <Stack spacing={2}>
            {subjects.map((subject) => (
              <Accordion key={subject._id} disableGutters>
                <AccordionSummary expandIcon={<CaretDownIcon />}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', width: '100%' }}>
                    <Typography variant="subtitle1" sx={{ flex: 1 }}>
                      {subject.name}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        aria-label="Rename subject"
                        size="small"
                        component="span"
                        onClick={(event): void => {
                          event.stopPropagation();
                          onRenameSubject(subject);
                        }}
                      >
                        <PencilSimpleIcon fontSize="var(--icon-fontSize-md)" />
                      </IconButton>
                      <IconButton
                        aria-label="Delete subject"
                        size="small"
                        color="error"
                        component="span"
                        onClick={(event): void => {
                          event.stopPropagation();
                          onDeleteSubject(subject);
                        }}
                      >
                        <TrashIcon fontSize="var(--icon-fontSize-md)" />
                      </IconButton>
                    </Stack>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1}>
                      <TextField
                        size="small"
                        label="Add chapter"
                        value={chapterInputs[subject._id] ?? ''}
                        onChange={(event): void =>
                          onChapterInputChange((prev) => ({ ...prev, [subject._id]: event.target.value }))
                        }
                        fullWidth
                        inputProps={{ maxLength: MAX_NAME_LENGTH }}
                      />
                      <Button variant="outlined" onClick={(): void => onAddChapter(subject)}>
                        Add
                      </Button>
                    </Stack>
                    <Stack
                      spacing={2}
                      sx={{
                        borderLeft: '2px solid var(--mui-palette-divider)',
                        pl: 2,
                      }}
                    >
                      {subject.chapters.map((chapter) => (
                        <ChapterBlock
                          key={chapter._id}
                          subject={subject}
                          chapter={chapter}
                          sectionInputs={sectionInputs}
                          onSectionInputChange={onSectionInputChange}
                          onAddSection={onAddSection}
                          onRenameChapter={onRenameChapter}
                          onDeleteChapter={onDeleteChapter}
                          onRenameSection={onRenameSection}
                          onDeleteSection={onDeleteSection}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        ) : (
          <Typography color="text.secondary" variant="body2">
            No syllabus details available for this exam.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

function ChapterBlock({
  subject,
  chapter,
  sectionInputs,
  onSectionInputChange,
  onAddSection,
  onRenameChapter,
  onDeleteChapter,
  onRenameSection,
  onDeleteSection,
}: {
  subject: Subject;
  chapter: Chapter;
  sectionInputs: Record<string, string>;
  onSectionInputChange: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onAddSection: (subject: Subject, chapter: Chapter) => void;
  onRenameChapter: (subject: Subject, chapter: Chapter) => void;
  onDeleteChapter: (subject: Subject, chapter: Chapter) => void;
  onRenameSection: (subject: Subject, chapter: Chapter, section: Section) => void;
  onDeleteSection: (subject: Subject, chapter: Chapter, section: Section) => void;
}): React.JSX.Element {
  const inputKey = `${subject._id}-${chapter._id}`;
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Typography variant="subtitle2" sx={{ flex: 1 }}>
          {chapter.name}
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label="Rename chapter"
            size="small"
            onClick={(): void => onRenameChapter(subject, chapter)}
          >
            <PencilSimpleIcon fontSize="var(--icon-fontSize-md)" />
          </IconButton>
          <IconButton
            aria-label="Delete chapter"
            size="small"
            color="error"
            onClick={(): void => onDeleteChapter(subject, chapter)}
          >
            <TrashIcon fontSize="var(--icon-fontSize-md)" />
          </IconButton>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1}>
        <TextField
          size="small"
          label="Add section"
          value={sectionInputs[inputKey] ?? ''}
          onChange={(event): void =>
            onSectionInputChange((prev) => ({ ...prev, [inputKey]: event.target.value }))
          }
          fullWidth
          inputProps={{ maxLength: MAX_NAME_LENGTH }}
        />
        <Button variant="text" onClick={(): void => onAddSection(subject, chapter)}>
          Add
        </Button>
      </Stack>
      {chapter.sections.length > 0 ? (
        <Stack
          spacing={0.5}
          sx={{
            borderLeft: '2px solid var(--mui-palette-divider)',
            pl: 2,
          }}
        >
          {renderSections(chapter.sections, subject, chapter, onRenameSection, onDeleteSection)}
        </Stack>
      ) : (
        <Typography color="text.secondary" variant="body2">
          No sections available.
        </Typography>
      )}
    </Stack>
  );
}

function renderSections(
  sections: Section[],
  subject: Subject,
  chapter: Chapter,
  onRenameSection: (subject: Subject, chapter: Chapter, section: Section) => void,
  onDeleteSection: (subject: Subject, chapter: Chapter, section: Section) => void
): React.JSX.Element {
  return (
    <List dense disablePadding sx={{ pl: 2 }}>
      {sections.map((section) => (
        <Stack key={section._id} direction="row" spacing={1} sx={{ alignItems: 'center', py: 0.5 }}>
          <Typography color="text.secondary" variant="body2" sx={{ flex: 1 }}>
            {section.name}
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label="Rename section"
              size="small"
              onClick={(): void => onRenameSection(subject, chapter, section)}
            >
              <PencilSimpleIcon fontSize="var(--icon-fontSize-md)" />
            </IconButton>
            <IconButton
              aria-label="Delete section"
              size="small"
              color="error"
              onClick={(): void => onDeleteSection(subject, chapter, section)}
            >
              <TrashIcon fontSize="var(--icon-fontSize-md)" />
            </IconButton>
          </Stack>
        </Stack>
      ))}
    </List>
  );
}
