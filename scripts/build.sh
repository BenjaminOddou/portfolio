#!/usr/bin/env bash

# Check if we're running in a Netlify environment
# See https://www.netlify.com/docs/continuous-deployment/#environment-variables
if [ ! -z "${DEPLOY_PRIME_URL}" ]; then

    # Init .ssh dir and expand $SSH_KEY
    mkdir -p ~/.ssh
    echo -e "${SSH_KEY//_/\\n}" > ~/.ssh/id_ed25519
    chmod og-rwx ~/.ssh/id_ed25519

    # Uncomment to debug
    # ls -la ~/.ssh
    # cat ~/.ssh/id_ed25519

    # Add host keys, comment out if not needed
    ssh-keyscan -H github.com >> ~/.ssh/known_hosts
    # ssh-keyscan -H bitbucket.org >> ~/.ssh/known_hosts

fi;