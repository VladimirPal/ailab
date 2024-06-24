CREATE extension pg_hashids;

CREATE DATABASE "ailab-test";
GRANT ALL PRIVILEGES ON DATABASE "ailab-test" TO ailab;
\c "ailab-test"
CREATE EXTENSION pg_hashids;
