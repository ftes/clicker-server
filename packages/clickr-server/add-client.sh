VERSION=$1
REPO=$2

# -O for overwrite
wget -O $REPO.zip https://github.com/ftes/clickr-$REPO/releases/download/$VERSION/$REPO.zip
rm -rf public/$REPO/*
unzip $REPO.zip -d public/$REPO/
rm $REPO.zip