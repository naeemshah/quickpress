#!/bin/bash
prettier --single-quote --trailing-comma es5 --write "{app,__{tests,mocks}__}/**/*.js"

