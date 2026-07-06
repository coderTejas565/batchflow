import { db } from "@/db";
import { institute, instituteMember } from "@/db/schema/institute";
import { eq } from "drizzle-orm";
import { generateId } from "@/lib/id";
import slugify from "slugify";

type CreateInstituteInput = {
  userId: string;
  name: string;
};

async function createInstitute({
  userId,
  name,
}: CreateInstituteInput) {
  try {
    const baseSlug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = baseSlug;
    let count = 1;

    while (true) {
      const [existingInstitute] = await db
        .select()
        .from(institute)
        .where(eq(institute.slug, slug))
        .limit(1);

      if (!existingInstitute) break;

      slug = `${baseSlug}-${count}`;
      count++;
    }

    const result = await db.transaction(async (tx) => {
      const instituteId = generateId();

      await tx.insert(institute).values({
        id: instituteId,
        name,
        slug,
        createdBy: userId,
      });

      await tx.insert(instituteMember).values({
        id: generateId(),
        instituteId,
        userId,
        role: "owner",
      });

      return {
        id: instituteId,
        name,
        slug,
      };
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Create institute failed:", error);

    return {
      success: false,
      error: "Failed to create institute.",
    };
  }
}

async function getUserInstitutes(userId: string) {
  return db
    .select({
      instituteId: institute.id,
      name: institute.name,
      slug: institute.slug,
      logo: institute.logo,
      role: instituteMember.role,
      joinedAt: instituteMember.joinedAt,
    })
    .from(instituteMember)
    .innerJoin(
      institute,
      eq(institute.id, instituteMember.instituteId)
    )
    .where(eq(instituteMember.userId, userId));
}

export const instituteService = {
  createInstitute,
  getUserInstitutes,
};