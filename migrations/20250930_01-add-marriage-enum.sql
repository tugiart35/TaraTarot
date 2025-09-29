-- Evlilik açılımı için yeni enum değeri ekleme
ALTER TYPE reading_type_enum ADD VALUE IF NOT EXISTS 'marriage';

-- Relationship Analysis için yeni enum değeri ekleme
ALTER TYPE reading_type_enum ADD VALUE IF NOT EXISTS 'relationship-analysis';

-- Relationship Problems için yeni enum değeri ekleme
ALTER TYPE reading_type_enum ADD VALUE IF NOT EXISTS 'relationship-problems';

-- Situation Analysis için yeni enum değeri ekleme
ALTER TYPE reading_type_enum ADD VALUE IF NOT EXISTS 'situation-analysis';

-- Money için yeni enum değeri ekleme
ALTER TYPE reading_type_enum ADD VALUE IF NOT EXISTS 'money';

-- Problem Solving için yeni enum değeri ekleme
ALTER TYPE reading_type_enum ADD VALUE IF NOT EXISTS 'problem-solving';

-- New Lover için yeni enum değeri ekleme
ALTER TYPE reading_type_enum ADD VALUE IF NOT EXISTS 'new-lover';
