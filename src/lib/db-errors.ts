type PostgresError = {
  code?: string;
};

export function isUniqueViolation(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as PostgresError).code === "23505";
}
