#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

APPS=(obsidian mail notes terminal games music)
VARIANTS=(default "${APPS[@]}")
PORT="${SMOKE_PORT:-4173}"
BASE="http://127.0.0.1:${PORT}"
SERVER_PID=""
TMP_DIR=""

cleanup() {
  if [[ -n "${SERVER_PID}" ]]; then
    kill "${SERVER_PID}" 2>/dev/null || true
    wait "${SERVER_PID}" 2>/dev/null || true
    SERVER_PID=""
  fi
  if [[ -n "${TMP_DIR}" ]]; then
    rm -rf "${TMP_DIR}"
    TMP_DIR=""
  fi
}
trap cleanup EXIT INT TERM

for disabled in "${VARIANTS[@]}"; do
  echo "==> Smoke test: ${disabled}"

  destination="_site-smoke-${disabled}"
  rm -rf "${destination}"

  if [[ "${disabled}" == "default" ]]; then
    bundle exec jekyll build --destination "${destination}" --trace
  else
    temp_root="${TMPDIR:-/tmp}"
    TMP_DIR="$(mktemp -d "${temp_root%/}/ephemeris-smoke.XXXXXX")"
    override="${TMP_DIR}/config.yml"

    {
      echo "desktop:"
      echo "  apps:"
      for app in "${APPS[@]}"; do
        if [[ "${app}" == "${disabled}" ]]; then
          echo "    ${app}: false"
        else
          echo "    ${app}: true"
        fi
      done
    } > "${override}"

    bundle exec jekyll build \
      --config "_config.yml,${override}" \
      --destination "${destination}" \
      --trace
  fi

  python3 -m http.server "${PORT}" \
    --bind 127.0.0.1 \
    --directory "${destination}" \
    >"${TMPDIR:-/tmp}/ephemeris-${disabled}.log" 2>&1 &
  SERVER_PID=$!

  ready=0
  for _ in {1..50}; do
    if curl -fsS "${BASE}/" >/dev/null; then
      ready=1
      break
    fi
    sleep 0.2
  done

  if [[ "${ready}" -ne 1 ]]; then
    cat "${TMPDIR:-/tmp}/ephemeris-${disabled}.log"
    exit 1
  fi

  node tools/demo/smoke.mjs --base "${BASE}" --disabled "${disabled}"

  cleanup
done

echo "All browser smoke configurations passed."
