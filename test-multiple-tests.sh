#!/bin/bash

# Test POST /api/records with MULTIPLE test results
echo "Testing POST /api/records with MULTIPLE test results..."
echo ""

curl -X POST http://localhost:3001/api/records \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "parentage": "Mother Name",
    "address": "456 Oak Avenue",
    "district": "Test District 2",
    "pinCode": "654321",
    "phoneNo": "9876543211",
    "adharNo": "9876-5432-1098",
    "khasraNo": "KH-002",
    "latitude": "28.7041",
    "longitude": "77.1025",
    "location": "Gurgaon",
    "city": "Gurgaon",
    "stateVal": "Haryana",
    "crop": "rice",
    "cropOther": "",
    "plantationType": "rainfed",
    "plantationTypeOther": "",
    "age": 3,
    "noTrees": 200,
    "area": 5.0,
    "noOfSamples": 3,
    "soilDepth": "0-30cm",
    "soilType": "sandy",
    "soilTypeOther": "",
    "drainage": "moderate",
    "drainageOther": "",
    "irrigationMethod": "sprinkler",
    "irrigationMethodOther": "",
    "paramPh": true,
    "paramDl": true,
    "paramCl": false,
    "testResults": [
      {
        "id": "test-1",
        "ph": "6.8",
        "organicCarbon": "0.6",
        "nitrogen": "150",
        "phosphorus": "8",
        "potassium": "100",
        "calcium": "1000",
        "magnesium": "250"
      },
      {
        "id": "test-2",
        "ph": "7.0",
        "organicCarbon": "0.7",
        "nitrogen": "180",
        "phosphorus": "12",
        "potassium": "120",
        "calcium": "1100",
        "magnesium": "280"
      },
      {
        "id": "test-3",
        "ph": "7.5",
        "organicCarbon": "0.9",
        "nitrogen": "250",
        "phosphorus": "20",
        "potassium": "200",
        "calcium": "1300",
        "magnesium": "320"
      }
    ]
  }' \
  -w "\n\nHTTP Status: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || echo "Note: Install 'jq' for formatted JSON output"

