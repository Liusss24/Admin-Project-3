export function buildFieldHintId(fieldId: string): string {
  return `${fieldId}-hint`;
}

export function buildFieldErrorId(fieldId: string): string {
  return `${fieldId}-error`;
}

export function buildFieldDescribedBy(
  fieldId: string,
  hasError: boolean,
): string | undefined {
  return hasError ? buildFieldErrorId(fieldId) : undefined;
}
