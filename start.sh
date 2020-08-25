#!/usr/bin/env bash

echo "Setting Mailgun Api key"

export ICROWD_MAILGUN_API_KEY=256e8b54207bcab1e65572bef52ca8ee-4d640632-94de8df5

echo "starting server"
nodemon app.js