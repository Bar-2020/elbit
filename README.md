# Elbit Flight API Assignment

## Running the Application

### Dockerized:

1. Make sure Docker and Docker Compose are installed on your machine.
2. In the project directory, run the command:
   ```
   docker-compose up -d
   ```
3. Once the build is complete, the container will be available at `http://localhost:8080`.

### Non-Dockerized:

1. Navigate to the `app` directory.
2. Install dependencies by running:
   ```
   npm install
   ```
3. Start the application with:
   ```
   npm start
   ```

## API Routes Documentation

### 1. Number of Flights (Inbound & Outbound)

**Endpoint:** `GET /api/total`

**Input:**

- None

**Output:**

- Numeric value [0 - ∞] representing the total number of flights.

**Example:**

- **Output:** `192`

### 2. Number of Outbound Flights

**Endpoint:** `GET /api/outbound`

**Input:**

- None

**Output:**

- Numeric value [0 - ∞] representing the total number of outbound flights.

**Example:**

- **Output:** `64`

### 3. Number of Inbound Flights

**Endpoint:** `GET /api/inbound`

**Input:**

- None

**Output:**

- Numeric value [0 - ∞] representing the total number of inbound flights.

**Example:**

- **Output:** `128`

### 4. Number of Flights from a Specific Country (Inbound & Outbound)

**Endpoint:** `GET /api/total/by-country`

**Input:**

- `country`: The name of the country (string).

**Output:**

- Numeric value [0 - ∞] representing the total number of flights from the specified country.

**Example:**

- **Input:** `{country: "Japan"}`
- **Output:** `68`

### 5. Number of Outbound Flights from a Specific Country

**Endpoint:** `GET /api/outbound/by-country`

**Input:**

- `country`: The name of the country (string).

**Output:**

- Numeric value [0 - ∞] representing the total number of outbound flights from the specified country.

**Example:**

- **Input:** `{country: "Japan"}`
- **Output:** `16`

### 6. Number of Inbound Flights from a Specific Country

**Endpoint:** `GET /api/inbound/by-country`

**Input:**

- `country`: The name of the country (string).

**Output:**

- Numeric value [0 - ∞] representing the total number of inbound flights from the specified country.

**Example:**

- **Input:** `{country: "Japan"}`
- **Output:** `52`

### 7. Number of Delayed Flights

**Endpoint:** `GET /api/delayed`

**Input:**

- None

**Output:**

- Numeric value [0 - ∞] representing the total number of delayed flights.

**Example:**

- **Output:** `200`

### 8. Most Popular Destination (City with the Highest Number of Outbound Flights)

**Endpoint:** `GET /api/most-popular`

**Input:**

- None

**Output:**

- City name (string) representing the destination with the highest number of outbound flights.

**Example:**

- **Output:** `"AMSTERDAM"`

### 9. Quick Getaway (Bonus Feature)

**Endpoint:** `GET /api/quick-getaway`

**Input:**

- None

**Output:**

- A JSON object with:
  - `departure`: Flight Number (code and number) - string.
  - `arrival`: Flight Number (code and number) - string.
  - If no suitable flights found, an empty object `{}` is returned.

**Example:**

- **Output:** `{departure: "LX2526", arrival: "LX257"} / {}`
