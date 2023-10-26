#!/usr/bin/env bash

mkdir -p ~/.ssh
echo -e "${SSH_KEY//_/\\n}" > ~/.ssh/id_rsa
chmod og-rwx ~/.ssh/id_rsa
ssh-keyscan -H github.com >> ~/.ssh/known_hosts