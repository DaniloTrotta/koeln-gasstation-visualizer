ALTER TABLE "gas_stations" ADD COLUMN "text_search" "tsvector" GENERATED ALWAYS AS ((
		to_tsvector('simple', coalesce("gas_stations"."adresse", ''))
		)) STORED;