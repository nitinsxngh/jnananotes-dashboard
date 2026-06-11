export function formatExamDisplayName(input: string | null | undefined): string {
  const value = (input ?? '').trim();
  if (!value) return '';

  // Normalize whitespace and force a single consistent display style: ALL CAPS.
  // This avoids any mismatch between stored casing for major exams vs exams.
  return value.replaceAll(/\s+/g, ' ').toUpperCase();
}

