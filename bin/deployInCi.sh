if [ "$CIRCLECI" == "true" ] && [ "$CIRCLE_BRANCH" == "master" ] ; then
    NODE_ENV=development npm run start
fi
if [ "$CIRCLECI" == "true" ] && [ "$CIRCLE_BRANCH" == "production" ] ; then
    NODE_ENV=production npm run start
fi
