#!/bin/bash

# Set up SSH key
echo "$GITHUB_TOKEN" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh -vT git@github.com
git --no-replace-objects ls-remote ssh://git@github.com/BenjaminOddou/gsap-shockingly-green.git
