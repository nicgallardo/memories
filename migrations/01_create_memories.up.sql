DROP TABLE if exists memories;
CREATE TABLE memories(
  id serial primary key,
  old_days text,
  these_days text,
  year numeric
);
