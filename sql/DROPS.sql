-- DROP DATABASE IF EXISTS coursettes;
-- -- --------------------------------------------------------------------------
-- CREATE DATABASE coursettes;

-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/* Ref tables for many to many relationships */ 
DROP TABLE IF EXISTS decks_ref CASCADE; 
DROP TABLE IF EXISTS colors_ref CASCADE; 
DROP TABLE IF EXISTS colors CASCADE; 
DROP TABLE IF EXISTS user_notes CASCADE; 
DROP TABLE IF EXISTS cards_info CASCADE; 
DROP TABLE IF EXISTS users CASCADE; 
DROP TABLE IF EXISTS roles CASCADE; 
DROP TABLE IF EXISTS card_notes_ref CASCADE; 
DROP TABLE IF EXISTS card_to_decks_ref CASCADE; 
DROP TABLE IF EXISTS decks CASCADE; 
DROP TABLE IF EXISTS decks_to_users_ref CASCADE; 
DROP TABLE IF EXISTS user_deck_library_ref CASCADE; 