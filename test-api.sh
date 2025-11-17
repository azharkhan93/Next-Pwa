#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Testing POST /api/records with SINGLE test result ===${NC}\n"

# Test 1: Single test result
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
  -s | jq '.' || echo "Response received (jq not installed, showing raw response)"

echo -e "\n${YELLOW}Press Enter to continue with multiple test results test...${NC}"
read

echo -e "\n${BLUE}=== Testing POST /api/records with MULTIPLE test results ===${NC}\n"

# Test 2: Multiple test results
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
  -s | jq '.' || echo "Response received (jq not installed, showing raw response)"

echo -e "\n${GREEN}=== Tests completed ===${NC}\n"
