-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'public',
    `arab_status` VARCHAR(191) NOT NULL DEFAULT 'عام',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bio` VARCHAR(191) NOT NULL DEFAULT 'good day',
    `arab_bio` VARCHAR(191) NOT NULL DEFAULT 'يوم جيد',
    `email` VARCHAR(191) NOT NULL,
    `pass` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `hash_token` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_hash_token_key`(`hash_token`),
    INDEX `Session_user_id_idx`(`user_id`),
    UNIQUE INDEX `Session_user_id_hash_token_key`(`user_id`, `hash_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RegisterVerification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hash_token` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `pass` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RegisterVerification_hash_token_key`(`hash_token`),
    INDEX `RegisterVerification_email_idx`(`email`),
    INDEX `RegisterVerification_expires_at_idx`(`expires_at`),
    UNIQUE INDEX `RegisterVerification_email_expires_at_key`(`email`, `expires_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LoginVerification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `hash_token` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `LoginVerification_hash_token_key`(`hash_token`),
    INDEX `LoginVerification_user_id_idx`(`user_id`),
    UNIQUE INDEX `LoginVerification_user_id_expires_at_key`(`user_id`, `expires_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Verse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorshipSchedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `english_title` VARCHAR(191) NOT NULL,
    `arab_title` VARCHAR(191) NOT NULL,
    `speaker` VARCHAR(191) NOT NULL,
    `time_start` DATETIME(3) NOT NULL,
    `time_end` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lessons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `category` ENUM('aqidah', 'hadith', 'fiqh', 'interpretation', 'morals', 'arabic') NOT NULL,
    `english_title` VARCHAR(191) NOT NULL,
    `english_chapter` VARCHAR(191) NOT NULL,
    `english_content` VARCHAR(191) NOT NULL,
    `arab_title` VARCHAR(191) NOT NULL,
    `arab_chapter` VARCHAR(191) NOT NULL,
    `arab_content` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `time_start` DATETIME(3) NOT NULL,
    `time_end` DATETIME(3) NOT NULL,
    `visitor` INTEGER NOT NULL,
    `read_time` INTEGER NOT NULL,

    INDEX `Lessons_visitor_idx`(`visitor`),
    INDEX `Lessons_read_time_idx`(`read_time`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserLessons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `lessons_id` INTEGER NOT NULL,
    `progress` DECIMAL(3, 2) NOT NULL,

    INDEX `UserLessons_user_id_idx`(`user_id`),
    INDEX `UserLessons_lessons_id_idx`(`lessons_id`),
    UNIQUE INDEX `UserLessons_user_id_lessons_id_key`(`user_id`, `lessons_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LessonsComments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `lessons_id` INTEGER NOT NULL,
    `comment` TEXT NOT NULL,
    `image` VARCHAR(191) NOT NULL DEFAULT '/Placeholder/profile_image.jpeg',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `LessonsComments_user_id_idx`(`user_id`),
    INDEX `LessonsComments_lessons_id_idx`(`lessons_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `english_title` VARCHAR(191) NOT NULL,
    `english_description` VARCHAR(191) NOT NULL,
    `english_content` TEXT NOT NULL,
    `arab_title` VARCHAR(191) NOT NULL,
    `arab_description` VARCHAR(191) NOT NULL,
    `arab_content` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `duration` INTEGER NOT NULL,
    `visitor` INTEGER NOT NULL,
    `read_time` INTEGER NOT NULL,
    `image` VARCHAR(191) NOT NULL DEFAULT '/Placeholder/event_image.png',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArticleComments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `article_id` INTEGER NOT NULL,
    `comment` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ArticleComments_user_id_idx`(`user_id`),
    INDEX `ArticleComments_article_id_idx`(`article_id`),
    INDEX `ArticleComments_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lectures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `english_title` VARCHAR(191) NOT NULL,
    `english_description` VARCHAR(191) NOT NULL,
    `arab_title` VARCHAR(191) NOT NULL,
    `arab_description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `duration` INTEGER NOT NULL,
    `visitor` INTEGER NOT NULL,
    `image` VARCHAR(191) NOT NULL DEFAULT '/Placeholder/event_image.png',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LecturesComments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `lectures_id` INTEGER NOT NULL,
    `comment` TEXT NOT NULL,
    `image` VARCHAR(191) NOT NULL DEFAULT '/Placeholder/profile_image.jpeg',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `LecturesComments_user_id_idx`(`user_id`),
    INDEX `LecturesComments_lectures_id_idx`(`lectures_id`),
    INDEX `LecturesComments_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fatwa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `english_title` VARCHAR(191) NOT NULL,
    `english_desc` VARCHAR(191) NOT NULL,
    `english_content` TEXT NOT NULL,
    `arab_title` VARCHAR(191) NOT NULL,
    `arab_desc` VARCHAR(191) NOT NULL,
    `arab_content` TEXT NOT NULL,
    `questioner` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL DEFAULT '/Placeholder/event_image.png',
    `visitor` INTEGER NOT NULL,
    `read_time` INTEGER NOT NULL,
    `duration` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FatwaComments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `fatwa_id` INTEGER NOT NULL,
    `comment` TEXT NOT NULL,
    `image` VARCHAR(191) NOT NULL DEFAULT '/Placeholder/profile_image.jpeg',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `FatwaComments_user_id_idx`(`user_id`),
    INDEX `FatwaComments_fatwa_id_idx`(`fatwa_id`),
    INDEX `FatwaComments_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EBook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `english_title` VARCHAR(191) NOT NULL,
    `english_desc` VARCHAR(191) NOT NULL,
    `english_author` VARCHAR(191) NOT NULL,
    `english_page` JSON NOT NULL,
    `arab_title` VARCHAR(191) NOT NULL,
    `arab_desc` VARCHAR(191) NOT NULL,
    `arab_author` VARCHAR(191) NOT NULL,
    `arab_page` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EbookChapter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ebook_id` INTEGER NOT NULL,
    `english_chapter_tag` VARCHAR(191) NOT NULL,
    `english_chapter_title` VARCHAR(191) NOT NULL,
    `english_page_number` INTEGER NOT NULL,
    `arab_chapter_tag` VARCHAR(191) NOT NULL,
    `arab_chapter_title` VARCHAR(191) NOT NULL,
    `arab_page_number` INTEGER NOT NULL,

    INDEX `EbookChapter_ebook_id_idx`(`ebook_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Live` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `english_title` VARCHAR(191) NOT NULL,
    `arab_title` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL DEFAULT '/Placeholder/event_image.png',
    `link` VARCHAR(255) NOT NULL,
    `status` ENUM('ended', 'live', 'comingSoon') NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `type` ENUM('video', 'sound') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LoginVerification` ADD CONSTRAINT `LoginVerification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLessons` ADD CONSTRAINT `UserLessons_lessons_id_fkey` FOREIGN KEY (`lessons_id`) REFERENCES `Lessons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLessons` ADD CONSTRAINT `UserLessons_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LessonsComments` ADD CONSTRAINT `LessonsComments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LessonsComments` ADD CONSTRAINT `LessonsComments_lessons_id_fkey` FOREIGN KEY (`lessons_id`) REFERENCES `Lessons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticleComments` ADD CONSTRAINT `ArticleComments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticleComments` ADD CONSTRAINT `ArticleComments_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LecturesComments` ADD CONSTRAINT `LecturesComments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LecturesComments` ADD CONSTRAINT `LecturesComments_lectures_id_fkey` FOREIGN KEY (`lectures_id`) REFERENCES `Lectures`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FatwaComments` ADD CONSTRAINT `FatwaComments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FatwaComments` ADD CONSTRAINT `FatwaComments_fatwa_id_fkey` FOREIGN KEY (`fatwa_id`) REFERENCES `Fatwa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EbookChapter` ADD CONSTRAINT `EbookChapter_ebook_id_fkey` FOREIGN KEY (`ebook_id`) REFERENCES `EBook`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
