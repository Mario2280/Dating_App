-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Purpose" AS ENUM ('RELATIONSHIP', 'FRIENDSHIP', 'FLIRTING', 'DECIDEWHENMEET');

-- CreateEnum
CREATE TYPE "Education" AS ENUM ('SECONDARY', 'SPECIALIZED_SECONDARY', 'INCOMPLETE_HIGHER', 'HIGHER', 'BACHELOR', 'MASTER', 'PHD', 'MBA');

-- CreateEnum
CREATE TYPE "Income" AS ENUM ('BELOW_AVERAGE', 'AVERAGE', 'ABOVE_AVERAGE', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "LivingConditions" AS ENUM ('WITH_PARENTS', 'RENT', 'OWN_HOUSE', 'OWN_APARTMENT', 'COMMUNAL', 'DORMITORY');

-- CreateEnum
CREATE TYPE "Kids" AS ENUM ('NONE', 'HAVE', 'HAVE_AND_WANT_MORE', 'DONT_WANT', 'WANT');

-- CreateEnum
CREATE TYPE "Smoking" AS ENUM ('NEVER', 'SOMETIMES', 'REGULARLY', 'QUIT');

-- CreateEnum
CREATE TYPE "Alcohol" AS ENUM ('NEVER', 'RARELY', 'OFTEN', 'QUIT');

-- CreateEnum
CREATE TYPE "SexualOrientation" AS ENUM ('HETEROSEXUAL', 'HOMOSEXUAL', 'BISEXUAL', 'PANSEXUAL', 'ASEXUAL', 'DEMISEXUAL');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('RUSSIAN', 'ENGLISH', 'SPANISH', 'FRENCH', 'GERMAN', 'CHINESE', 'JAPANESE', 'OTHER');

-- CreateEnum
CREATE TYPE "Build" AS ENUM ('SLIM', 'ATHLETIC', 'AVERAGE', 'STOCKY', 'MUSCULAR', 'OVERWEIGHT');

-- CreateEnum
CREATE TYPE "PhotosPresence" AS ENUM ('WITH', 'SOME');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('Video', 'Image');

-- CreateTable
CREATE TABLE "Profile" (
    "id" BIGSERIAL NOT NULL,
    "telegram_id" BIGINT NOT NULL,
    "name" VARCHAR NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender",
    "bio" TEXT,
    "purpose" "Purpose",
    "weight" INTEGER,
    "height" INTEGER,
    "build" "Build",
    "language" "Language",
    "orientation" "SexualOrientation",
    "alcohol" "Alcohol",
    "smoking" "Smoking",
    "kids" "Kids",
    "living_condition" "LivingConditions",
    "income" "Income",
    "education" "Education",
    "interests" JSONB,
    "location" TEXT NOT NULL,
    "is_visible" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_active" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" BIGSERIAL NOT NULL,
    "message_id" UUID,
    "aws_file_key" VARCHAR NOT NULL,
    "type" "MediaType" NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat" (
    "id" UUID NOT NULL,
    "user1_id" BIGINT NOT NULL,
    "user2_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_message_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" UUID NOT NULL,
    "chat_id" UUID NOT NULL,
    "sender_id" BIGINT NOT NULL,
    "content" TEXT NOT NULL,
    "sent_at" TIMESTAMP(6) NOT NULL,
    "is_read" BOOLEAN NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "swipe" (
    "swiper_id" BIGINT NOT NULL,
    "target_id" BIGINT NOT NULL,
    "is_like" BOOLEAN NOT NULL,
    "is_mutual" BOOLEAN NOT NULL,
    "swiped_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "swipe_pkey" PRIMARY KEY ("swiper_id","target_id")
);

-- CreateTable
CREATE TABLE "subscription_plan" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "type" VARCHAR NOT NULL,
    "features" JSONB NOT NULL,
    "price" DECIMAL NOT NULL,
    "duration_days" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "subscription_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_subscription" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "plan_code" INTEGER NOT NULL,
    "starts_at" TIMESTAMP(6) NOT NULL,
    "expires_at" TIMESTAMP(6) NOT NULL,
    "auto_renew" BOOLEAN NOT NULL,
    "status" VARCHAR NOT NULL,
    "payment_id" TEXT,

    CONSTRAINT "user_subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" VARCHAR NOT NULL,
    "user_id" BIGINT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "currency" VARCHAR NOT NULL,
    "payment_method" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moderator" (
    "user_id" BIGINT NOT NULL,
    "permission_level" INTEGER NOT NULL,
    "assigned_categories" JSONB NOT NULL,

    CONSTRAINT "moderator_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "moderation_report" (
    "reporter_id" BIGINT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "target_id" BIGINT NOT NULL,
    "content_type" VARCHAR NOT NULL,
    "reason" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "moderation_report_pkey" PRIMARY KEY ("reporter_id","sequence")
);

-- CreateTable
CREATE TABLE "user_gallery" (
    "user_id" BIGINT NOT NULL,
    "media_id" BIGINT NOT NULL,

    CONSTRAINT "user_gallery_pkey" PRIMARY KEY ("user_id","media_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_telegram_id_key" ON "Profile"("telegram_id");

-- CreateIndex
CREATE INDEX "Profile_location_idx" ON "Profile"("location");

-- CreateIndex
CREATE INDEX "Profile_is_visible_last_active_idx" ON "Profile"("is_visible", "last_active");

-- CreateIndex
CREATE INDEX "Profile_age_idx" ON "Profile"("age");

-- CreateIndex
CREATE INDEX "Profile_gender_idx" ON "Profile"("gender");

-- CreateIndex
CREATE INDEX "Profile_purpose_idx" ON "Profile"("purpose");

-- CreateIndex
CREATE INDEX "Profile_height_idx" ON "Profile"("height");

-- CreateIndex
CREATE INDEX "Profile_build_idx" ON "Profile"("build");

-- CreateIndex
CREATE INDEX "Profile_orientation_idx" ON "Profile"("orientation");

-- CreateIndex
CREATE INDEX "Profile_alcohol_idx" ON "Profile"("alcohol");

-- CreateIndex
CREATE INDEX "Profile_smoking_idx" ON "Profile"("smoking");

-- CreateIndex
CREATE INDEX "Profile_kids_idx" ON "Profile"("kids");

-- CreateIndex
CREATE INDEX "Profile_living_condition_idx" ON "Profile"("living_condition");

-- CreateIndex
CREATE INDEX "Profile_income_idx" ON "Profile"("income");

-- CreateIndex
CREATE INDEX "Profile_education_idx" ON "Profile"("education");

-- CreateIndex
CREATE INDEX "Profile_is_visible_last_active_gender_idx" ON "Profile"("is_visible", "last_active", "gender");

-- CreateIndex
CREATE INDEX "Profile_is_visible_purpose_idx" ON "Profile"("is_visible", "purpose");

-- CreateIndex
CREATE INDEX "media_message_id_idx" ON "media"("message_id");

-- CreateIndex
CREATE INDEX "chat_user1_id_idx" ON "chat"("user1_id");

-- CreateIndex
CREATE INDEX "chat_user2_id_idx" ON "chat"("user2_id");

-- CreateIndex
CREATE INDEX "chat_last_message_at_idx" ON "chat"("last_message_at");

-- CreateIndex
CREATE UNIQUE INDEX "chat_user1_id_user2_id_key" ON "chat"("user1_id", "user2_id");

-- CreateIndex
CREATE INDEX "swipe_target_id_is_mutual_idx" ON "swipe"("target_id", "is_mutual");

-- CreateIndex
CREATE INDEX "user_subscription_user_id_status_expires_at_idx" ON "user_subscription"("user_id", "status", "expires_at");

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swipe" ADD CONSTRAINT "swipe_swiper_id_fkey" FOREIGN KEY ("swiper_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swipe" ADD CONSTRAINT "swipe_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscription" ADD CONSTRAINT "user_subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscription" ADD CONSTRAINT "user_subscription_plan_code_fkey" FOREIGN KEY ("plan_code") REFERENCES "subscription_plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscription" ADD CONSTRAINT "user_subscription_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moderator" ADD CONSTRAINT "moderator_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moderation_report" ADD CONSTRAINT "moderation_report_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moderation_report" ADD CONSTRAINT "moderation_report_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_gallery" ADD CONSTRAINT "user_gallery_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_gallery" ADD CONSTRAINT "user_gallery_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
