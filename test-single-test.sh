#!/bin/bash

# Test POST /api/records with SINGLE test result
echo "Testing POST /api/records with SINGLE test result..."
echo ""

curl -X POST http://localhost:3001/api/records \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "parentage": "Father Name",
    "address": "123 Main Street",
    "district": "Test District",
    "pinCode": "123456",
    "phoneNo": "9876543210",
    "adharNo": "1234-5678-9012",
    "khasraNo": "KH-001",
    "latitude": "28.6139",
    "longitude": "77.2090",
    "location": "New Delhi",
    "city": "Delhi",
    "stateVal": "Delhi",
    "crop": "wheat",
    "plantationType": "irrigated",
    "age": 5,
    "noTrees": 100,
    "area": 2.5,
    "noOfSamples": 1,
    "soilDepth": "0-30cm",
    "soilType": "loam",
    "drainage": "good",
    "irrigationMethod": "drip",
    "paramPh": true,
    "paramDl": false,
    "paramCl": false,
    "testResults": [
      {
        "id": "test-1",
        "ph": "7.2",
        "organicCarbon": "0.8",
        "nitrogen": "200",
        "phosphorus": "15",
        "potassium": "150",
        "calcium": "1200",
        "magnesium": "300"
      }
    ]
  }' \
  -w "\n\nHTTP Status: %{http_code}\n" \
  -s | jq '.' 2>/dev/null || echo "Note: Install 'jq' for formatted JSON output"

