mod lib;
mod router;

use axum::{
    routing::{get, post},
    Router,
    Json,
    extract::State,
};
use std::net::SocketAddr;
use sqlx::{postgres::PgPoolOptions, Pool, Postgres};
use dotenvy::dotenv;
use std::env;
use tower_http::cors::{CorsLayer, Any};
use tower_http::trace::TraceLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
use router::{auth::auth_routes, webhooks::webhook_routes};

#[derive(Clone)]
pub struct AppState {
    db: Pool<Postgres>,
}

#[tokio::main]
async fn main() {
    // 1. Load environment variables
    dotenv().ok();

    // 2. Initialize Tracing
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(
            env::var("RUST_LOG").unwrap_or_else(|_| "api=debug,tower_http=debug".into()),
        ))
        .with(tracing_subscriber::fmt::layer())
        .init();

    // 3. Database Connection
    // Fallback URL for development if env not set, though production should assert
    let database_url = env::var("DATABASE_URL").unwrap_or("postgres://monterin_user:monterin_password@localhost:5432/monterin_db".to_string());
    
    // We use a simplified connect logic here to prevent crash if DB is down during scaffolding
    // In production, we'd want to fail hard.
    let pool = PgPoolOptions::new()
        .max_connections(50)
        .connect_lazy(&database_url) 
        .expect("Failed to create pool");

    let state = AppState { db: pool };

    // 4. Router Setup
    let app = Router::new()
        .route("/health", get(health_check))
        .route("/api/v1/products", get(list_products))
        .nest("/api/v1/auth", auth_routes())
        .nest("/api/v1/webhooks", webhook_routes())
        .layer(CorsLayer::new().allow_origin(Any))
        .layer(TraceLayer::new_for_http())
        .with_state(state);

    // 5. Start Server
    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));
    tracing::info!("listening on {}", addr);
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn health_check() -> &'static str {
    "Montérin System Operational"
}

// Placeholder for Product Handler
async fn list_products() -> Json<serde_json::Value> {
    Json(serde_json::json!([
        {
            "id": "1",
            "name": "The Ethereal Solitaire",
            "price": 45000,
            "currency": "USD"
        }
    ]))
}
