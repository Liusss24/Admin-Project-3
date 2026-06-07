export function hasErrors(
  errors: Record<string, string | undefined>,
): boolean {
  return Object.values(errors).some((value) => Boolean(value));
}
