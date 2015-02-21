#!/usr/bin/env bash

#
# Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
#

if [ $1 == 'i' ]
then
  echo    "************************************"
  echo    "*     Running Tests for IMAGES     *"
  echo -e "************************************\n\n"

  grunt karma:image_smgr

elif [ $1 == 'p' ]
then
  echo    "************************************"
  echo    "*     Running Tests for PACKAGES   *"
  echo -e "************************************\n\n"

  grunt karma:package_smgr

else
  echo "Running NO TESTS"
fi