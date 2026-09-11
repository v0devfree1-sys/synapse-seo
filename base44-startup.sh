#!/bin/sh
set -e

cd /app

# Install Deno (required by base44 dev for the local backend)
DENO_BIN="$HOME/.deno/bin/deno"
if [ ! -f "$DENO_BIN" ]; then
  echo "[startup] Installing Deno..."
  mkdir -p "$HOME/.deno/bin"
  # Download Deno binary directly (skip the install script's shell-setup step which hangs)
  curl -fsSL "https://github.com/denoland/deno/releases/latest/download/deno-x86_64-unknown-linux-gnu.zip" -o /tmp/deno.zip
  cd "$HOME/.deno/bin"
  unzip -o /tmp/deno.zip
  rm /tmp/deno.zip
  cd /app
fi
export PATH="$HOME/.deno/bin:$PATH"

# Install npm dependencies
if [ ! -d node_modules/react ]; then
  echo "[startup] Installing npm dependencies..."
  npm install --legacy-peer-deps
fi

# Install base44 CLI globally
if ! command -v base44 >/dev/null 2>&1; then
  echo "[startup] Installing base44 CLI..."
  npm install -g base44@latest
fi

# Authenticate if not already logged in
AUTH_FILE="$HOME/.base44/auth/auth.json"
if [ ! -f "$AUTH_FILE" ]; then
  echo ""
  echo "============================================"
  echo "[startup] Base44 authentication required."
  echo "[startup] A device code will appear below."
  echo "[startup] Visit the URL and confirm the code"
  echo "[startup] in your browser to authenticate."
  echo "============================================"
  echo ""
  # Run login — device code appears in the logs
  base44 login
fi

# Link project if not already linked
if [ ! -f /app/base44/.app.jsonc ]; then
  echo "[startup] Linking Base44 project..."
  base44 link --create --name "untitled"
fi

echo "[startup] Starting base44 dev..."
exec base44 dev
