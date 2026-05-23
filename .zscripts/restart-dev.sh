#!/bin/bash
cd /home/z/my-project
# Kill any existing next process
pkill -f "next dev" 2>/dev/null
sleep 2
# Start fresh
exec bun run dev
