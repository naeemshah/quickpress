#!/bin/sh

git  filter-branch --env-filter '
CORRECT_NAME="Your Correct Name"
CORRECT_EMAIL="your-correct-email@example.com"
if [ "$GIT_COMMITTER_NAME" = "naeemshah" ]
then
    export GIT_COMMITTER_NAME="Naeem Shah"
    export GIT_COMMITTER_EMAIL="naeemshah45@gamil.com"
fi
if [ "$GIT_AUTHOR_NAME" = "naeemshah" ]
then
    export GIT_AUTHOR_NAME="Naeem Shah"
    export GIT_AUTHOR_EMAIL="naeemshah45@gamil.com"
fi
' -f  --tag-name-filter cat -- --branches --tags