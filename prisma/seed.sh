#!/bin/sh
# -e Exit immediately when a command returns a non-zero status.
# -x Print commands before they are executed
set -ex
# Seeding command
psql -f supabase/seed.sql -d postgres -p 54322 -h localhost -U postgres
