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

**Endpoint:** `GET /flights/total`

**Input:**

- None

**Output:**

- Numeric value [0 - ∞] representing the total number of flights.

**Example:**

- **Input:** `{}`
- **Output:** `192`

### 2. Number of Outbound Flights

**Endpoint:** `GET /flights/outbound`

**Input:**

- None

**Output:**

- Numeric value [0 - ∞] representing the total number of outbound flights.

**Example:**

- **Input:** `{}`
- **Output:** `64`

### 3. Number of Inbound Flights

**Endpoint:** `GET /flights/inbound`

**Input:**

- None

**Output:**

- Numeric value [0 - ∞] representing the total number of inbound flights.

**Example:**

- **Input:** `{}`
- **Output:** `128`

### 4. Number of Flights from a Specific City (Inbound & Outbound)

**Endpoint:** `GET /flights/by-city`

**Input:**

- `city`: The name of the city (string).

**Output:**

- Numeric value [0 - ∞] representing the total number of flights from the specified city.

**Example:**

- **Input:** `{city: "Berlin"}`
- **Output:** `68`

### 5. Number of Outbound Flights from a Specific City

**Endpoint:** `GET /flights/outbound/by-city`

**Input:**

- `city`: The name of the city (string).

**Output:**

- Numeric value [0 - ∞] representing the total number of outbound flights from the specified city.

**Example:**

- **Input:** `{city: "Berlin"}`
- **Output:** `16`

### 6. Number of Inbound Flights from a Specific City

**Endpoint:** `GET /flights/inbound/by-city`

**Input:**

- `city`: The name of the city (string).

**Output:**

- Numeric value [0 - ∞] representing the total number of inbound flights from the specified city.

**Example:**

- **Input:** `{city: "Berlin"}`
- **Output:** `52`

### 7. Number of Delayed Flights

**Endpoint:** `GET /flights/delayed`

**Input:**

- None

**Output:**

- Numeric value [0 - ∞] representing the total number of delayed flights.

**Example:**

- **Input:** `{}`
- **Output:** `200`

### 8. Most Popular Destination (City with the Highest Number of Outbound Flights)

**Endpoint:** `GET /flights/most-popular`

**Input:**

- None

**Output:**

- City name (string) representing the destination with the highest number of outbound flights.

**Example:**

- **Input:** `{}`
- **Output:** `"AMSTERDAM"`

### 9. Quick Getaway (Bonus Feature)

**Endpoint:** `GET /flights/quick-getaway`

**Input:**

- None

**Output:**

- A JSON object with:
  - `departure`: Flight Number (code and number) - string.
  - `arrival`: Flight Number (code and number) - string.
  - If no suitable flights found, an empty object `{}` is returned.

**Example:**

- **Input:** `{}`
- **Output:** `{departure: "LX2526", arrival: "LX257"} / {}`
