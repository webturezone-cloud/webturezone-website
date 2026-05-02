-- Mobile typography CMS defaults (idempotent inserts)
INSERT INTO site_settings (key, value) VALUES
  ('mobile_hero_headline_size', 'clamp(0.85rem,4.5vw,6rem)'),
  ('mobile_section_heading_size', 'clamp(1.8rem,5vw,3rem)'),
  ('mobile_body_text_size', 'text-sm'),
  ('mobile_card_title_size', 'text-xl'),
  ('mobile_subtext_size', 'text-sm')
ON CONFLICT (key) DO NOTHING;
