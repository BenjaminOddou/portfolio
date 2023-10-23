#!/usr/bin/env bash
mkdir -p ~/.ssh
echo -e "${SSH_KEY//_/\\n}" > ~/.ssh/id_ed25519
chmod 600 ~/.ssh/id_ed25519
ssh-keyscan -H github.com >> ~/.ssh/known_hosts
ssh -vT git@github.com
git --no-replace-objects ls-remote ssh://git@github.com/BenjaminOddou/gsap-shockingly-green.git