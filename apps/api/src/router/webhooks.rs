use axum::{
    routing::post,
    Router,
    extract::{State, Request},
    http::{HeaderMap, StatusCode},
    response::IntoResponse,
    body::Bytes,
};
use crate::AppState;
use tracing::{info, error};

pub fn webhook_routes() -> Router<AppState> {
    Router::new()
        .route("/stripe", post(stripe_webhook))
}

async fn stripe_webhook(
    headers: HeaderMap,
    body: Bytes,
) -> impl IntoResponse {
    let signature = headers.get("stripe-signature").map(|v| v.to_str().unwrap_or(""));
    
    // In production, verify signature using stripe-rust crate or manual HMAC
    if let Some(sig) = signature {
        info!("Received Stripe Webhook with signature: {}", sig);
        // Process event...
        // let event: serde_json::Value = serde_json::from_slice(&body).unwrap();
        // match event["type"] ...
        
        (StatusCode::OK, "Webhook processed")
    } else {
        error!("Missing stripe-signature");
        (StatusCode::BAD_REQUEST, "Missing signature")
    }
}
