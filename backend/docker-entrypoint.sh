#!/bin/bash
set -e

node init-db.js

exec "$@"