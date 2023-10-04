# Receipt Processor

This repository contains a solution for the Receipt Processor challenge. The challenge involves building a web service that processes receipts and awards points based on specific rules. Below are the details of the solution and instructions for running the application.

## Solution Overview

The solution consists of a web service that exposes two endpoints:

1. **Process Receipts Endpoint (`/receipts/process`)**: This endpoint allows you to submit a JSON receipt, and it returns a JSON object with a generated ID for the receipt. The ID can be used to query the number of points awarded to the receipt.

2. **Get Points Endpoint (`/receipts/{id}/points`)**: This endpoint allows you to retrieve the number of points awarded for a given receipt ID.

The points awarded to a receipt are determined based on a set of rules, as described in the challenge instructions.

## Language Selection

You can run this solution using JavaScript and Docker. We have provided a Dockerfile for easy setup. If you prefer to use a different language, you can also run the application in a Docker container.