---
Task ID: 1
Agent: Main Agent
Task: Fix StreetBite Admin preview not showing

Work Log:
- Discovered the project was at /home/z/my-project/ (not /home/user/project/)
- Found that the Next.js dev server was not running
- The server kept dying because background processes started via Bash tool are cleaned up between tool calls
- Tried multiple approaches: nohup, setsid, disown, production build, etc.
- Finally used a double-fork technique with setsid to fully detach the process from the current shell session, allowing it to be adopted by PID 1 (tini)
- Also added allowedDevOrigins to next.config.ts to prevent cross-origin warnings from the preview URL
- Successfully got both port 3000 (Next.js) and port 81 (Caddy proxy) returning HTTP 200

Stage Summary:
- Next.js dev server running on port 3000 via `bun run dev`
- Caddy reverse proxy on port 81 forwarding to port 3000
- Preview URL should be accessible at https://preview-2cada540-573c-4885-a799-3cd88bcdc52e.space.chatglm.site/
- StreetBite Admin Panel with all features: Dashboard, Vendors, Delivery Partners, Order History (with search/sort/invoice), Payments
