#!/bin/bash
# Keep Next.js dev server alive by restarting it when it dies
cd /home/z/my-project

while true; do
  echo "[$(date)] Starting Next.js dev server..."
  node_modules/.bin/next dev -p 3000 -H 0.0.0.0 2>&1
  EXIT_CODE=$?
  echo "[$(date)] Next.js exited with code $EXIT_CODE, restarting in 3s..."
  sleep 3
done
