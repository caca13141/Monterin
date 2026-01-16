-- Enable TimescaleDB extension
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- 1. Users & Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'customer', -- 'customer', 'admin', 'stylist'
    marketing_consent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User Profiles (Personalization)
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    zodiac_sign VARCHAR(20),
    ring_size_us DECIMAL(4, 2),
    wrist_size_cm DECIMAL(4, 2),
    preferences JSONB DEFAULT '{}' -- Stores style preferences, metal choices
);

-- 3. Products (Inventory)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    stock_quantity INT DEFAULT 0,
    category VARCHAR(50), -- 'ring', 'necklace', 'earring'
    metadata JSONB DEFAULT '{}', -- 3D model URLs, specs
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Custom Designs (Saved 3D Configurations)
CREATE TABLE custom_designs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(100),
    configuration JSONB NOT NULL, -- The full JSON state of the 3D customizer
    preview_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'crafting', 'shipped'
    total_amount DECIMAL(12, 2) NOT NULL,
    payment_intent_id VARCHAR(255),
    shipping_address JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    custom_design_id UUID REFERENCES custom_designs(id), -- Optional link if custom
    quantity INT DEFAULT 1,
    unit_price DECIMAL(12, 2) NOT NULL
);

-- 6. Gemstone Analytics (TimescaleDB Hypertable)
-- Tracks price fluctuations of raw materials or generic diamond prices
CREATE TABLE market_prices (
    time TIMESTAMPTZ NOT NULL,
    material VARCHAR(50) NOT NULL, -- 'gold_24k', 'diamond_1ct_vvs1'
    price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD'
);

-- Convert to hypertable for efficient time-series queries
SELECT create_hypertable('market_prices', 'time');

-- 7. User Activity / Analytics (Clickstream)
CREATE TABLE user_events (
    id UUID DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    session_id VARCHAR(100),
    event_type VARCHAR(50) NOT NULL, -- 'view_product', 'add_to_cart', 'customize_start'
    payload JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for Speed
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_events_user ON user_events(user_id);
CREATE INDEX idx_events_time ON user_events(created_at);
