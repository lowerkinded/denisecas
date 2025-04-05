-- CreateEnum
CREATE TYPE "ExperienceType" AS ENUM ('CREATIVITY', 'ACTIVITY', 'SERVICE');

-- CreateTable
CREATE TABLE "AdminLoginToken" (
    "token" UUID NOT NULL DEFAULT gen_random_uuid(),
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminLoginToken_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "author_email" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "author_picture_url" TEXT,
    "type" "ExperienceType" NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,
    "to_date" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,
    "cover_url" TEXT,
    "main_image_urls" TEXT[],
    "title" TEXT NOT NULL,
    "md_description" TEXT NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FrontPageExperience" (
    "id" SERIAL NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "FrontPageExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarouselExperience" (
    "id" SERIAL NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "CarouselExperience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FrontPageExperience" ADD CONSTRAINT "FrontPageExperience_id_fkey" FOREIGN KEY ("id") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarouselExperience" ADD CONSTRAINT "CarouselExperience_id_fkey" FOREIGN KEY ("id") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
