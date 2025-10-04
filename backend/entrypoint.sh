#!/bin/sh

/wait-for-it.sh db:3306 -- echo "Database is up"

exec uvicorn main:app --host=0.0.0.0 --port=8000 --reload