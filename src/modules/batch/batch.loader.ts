import { getBatchPage } from "./batch.service";

export async function loadBatchPage(
  instituteId: string,
) {
  return getBatchPage(instituteId);
}