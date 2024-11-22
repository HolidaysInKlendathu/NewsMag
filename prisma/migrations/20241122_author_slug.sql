-- Add the column as nullable first
ALTER TABLE `Author`
ADD COLUMN `slug` VARCHAR(191) UNIQUE;
-- Update existing records with generated slugs
UPDATE `Author`
SET `slug` = LOWER(
        REGEXP_REPLACE(
            REGEXP_REPLACE(
                name,
                '[^a-zA-Z0-9]+',
                '-'
            ),
            '^-|-$',
            ''
        )
    );
-- Make the column required after populating it
ALTER TABLE `Author`
MODIFY COLUMN `slug` VARCHAR(191) NOT NULL;