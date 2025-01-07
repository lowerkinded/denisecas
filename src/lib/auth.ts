"use server";

import { neon } from "@neondatabase/serverless";
import { randomUUID } from "node:crypto";
import { Resend } from "resend";

export async function sendLoginLink() {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const resend = new Resend(process.env.RESEND_API_KEY);

    const token = randomUUID();
    await sql`INSERT INTO admin_login_token (token, timestamp) VALUES (${token}, NOW())`;

    await resend.emails.send({
        from: "auth@denisecas.eu",
        to: "cas@denise.espritscholen.nl",
        subject: "Your login link",
        text: `Here is your login link for the DENISE CAS admin panel:

https://denisecas.eu/login/${token}`,
    });
}

export async function checkToken(token: string): Promise<boolean> {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const response =
        await sql`SELECT * FROM admin_login_token WHERE token = ${token}`;

    return response.length === 1;
}
