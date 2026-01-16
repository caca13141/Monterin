use axum::{
    routing::post,
    Router,
    Json,
    extract::State,
    http::StatusCode,
    response::IntoResponse,
};
use serde::{Deserialize, Serialize};
use crate::lib::security::Security;
use crate::AppState;
// use sqlx::Row; // Uncomment when DB is connected

#[derive(Deserialize)]
pub struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Deserialize)]
pub struct RegisterRequest {
    email: String,
    password: String,
    full_name: Option<String>,
}

#[derive(Serialize)]
pub struct AuthResponse {
    token: String,
}

pub fn auth_routes() -> Router<AppState> {
    Router::new()
        .route("/login", post(login))
        .route("/register", post(register))
}

async fn login(
    State(_state): State<AppState>,
    Json(payload): Json<LoginRequest>,
) -> impl IntoResponse {
    // TODO: Fetch user from DB
    // let user = sqlx::query("SELECT * FROM users WHERE email = $1")
    //     .bind(&payload.email)
    //     ...
    
    // MOCK: Verify password
    if payload.email == "admin@monterin.com" && payload.password == "password" {
         let token = Security::generate_token("mock-uuid-123", "admin").unwrap();
         return (StatusCode::OK, Json(AuthResponse { token })).into_response();
    }

    (StatusCode::UNAUTHORIZED, "Invalid credentials").into_response()
}

async fn register(
    State(_state): State<AppState>,
    Json(payload): Json<RegisterRequest>,
) -> impl IntoResponse {
    let _hashed_password = Security::hash_password(payload.password.as_bytes()).unwrap();

    // TODO: Insert into DB
    // sqlx::query("INSERT INTO users ...")
    
    (StatusCode::CREATED, "User registered").into_response()
}
