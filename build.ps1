npm run build
cp -Path 'package.json' -Destination './build'
cp -Path 'package-lock.json' -Destination './build'
cp -Path './static/db.json' -Destination './build'