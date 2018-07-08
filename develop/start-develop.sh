#!/bin/bash
set -x
set -e
cd $SOURCE_DIR
npm install
npm run hot
