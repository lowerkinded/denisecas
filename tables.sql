CREATE TABLE
    admin_login_token (
        token UUID PRIMARY KEY,
        timestamp TIMESTAMPTZ NOT NULL
    );

CREATE TABLE
    experience (
        id SERIAL PRIMARY KEY,
        author_email TEXT NOT NULL,
        author_name TEXT NOT NULL,
        author_picture_url TEXT,
        type TEXT NOT NULL,
        from_date TIMESTAMPTZ NOT NULL,
        to_date TIMESTAMPTZ NOT NULL,
        summary TEXT NOT NULL,
        cover_url TEXT,
        main_image_urls TEXT[] NOT NULL,
        title TEXT NOT NULL,
        md_description TEXT NOT NULL,
        front_page_position INTEGER,
        carousel_position INTEGER
    );
