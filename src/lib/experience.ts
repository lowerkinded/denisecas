"use server";

import { neon } from "@neondatabase/serverless";

export async function getExperience(
    id: string,
): Promise<
    {
        id: number;
        author_email: string;
        author_name: string;
        author_picture_url: string;
        type: "creativity" | "activity" | "service";
        from_date: Date;
        to_date: Date;
        summary: string;
        cover_url?: string;
        title: string;
        md_description: string;
        front_page_position?: number;
        carousel_position?: number;
    } | undefined
> {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`SELECT * FROM experience WHERE id = ${id}`;

    return response[0] as any;
}

export async function getExperiences(): Promise<
    {
        id: number;
        author_email: string;
        author_name: string;
        author_picture_url: string;
        type: "creativity" | "activity" | "service";
        from_date: Date;
        to_date: Date;
        summary: string;
        cover_url?: string;
        title: string;
        md_description: string;
        front_page_position?: number;
        carousel_position?: number;
    }[]
> {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response =
        await sql`SELECT * FROM experience ORDER BY author_name ASC`;

    return response as any;
}

export async function insertExperience(experience: {
    author_email: string;
    author_name: string;
    // author_picture_url: string;
    type: "creativity" | "activity" | "service";
    from_date: Date;
    to_date: Date;
    summary: string;
    // cover_url?: string;
    title: string;
    md_description: string;
}): Promise<{ id: number }> {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const response = await sql`
    INSERT INTO experience (
        author_email,
        author_name,
        type,
        from_date,
        to_date,
        summary,
        title,
        md_description
    ) VALUES (
        ${experience.author_email},
        ${experience.author_name},
        ${experience.type},
        ${experience.from_date},
        ${experience.to_date},
        ${experience.summary},
        ${experience.title},
        ${experience.md_description}
    ) RETURNING id`;

    return response[0] as any;
}

export async function updateExperience(id: number, experience: {
    author_email: string;
    author_name: string;
    // author_picture_url: string;
    type: "creativity" | "activity" | "service";
    from_date: Date;
    to_date: Date;
    summary: string;
    // cover_url?: string;
    title: string;
    md_description: string;
}): Promise<void> {
    const sql = neon(`${process.env.DATABASE_URL}`);

    await sql`
    UPDATE experience 
    SET author_email = ${experience.author_email},
        author_name = ${experience.author_name},
        type = ${experience.type},
        from_date = ${experience.from_date},
        to_date = ${experience.to_date},
        summary = ${experience.summary},
        title = ${experience.title},
        md_description = ${experience.md_description}
    WHERE id = ${id}`;
}

export async function deleteExperience(id: string): Promise<void> {
    const sql = neon(`${process.env.DATABASE_URL}`);

    await sql`DELETE FROM experience WHERE id = ${id}`;
}