use argon2::{
    password_hash::{
        rand_core::OsRng,
        PasswordHash, PasswordHasher, PasswordVerifier, SaltString
    },
    Argon2
};
use jsonwebtoken::{encode, decode, Header, Algorithm, Validation, EncodingKey, DecodingKey};
use serde::{Deserialize, Serialize};
use std::time::{SystemTime, UNIX_EPOCH};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String, // Subject (User ID)
    pub exp: usize,  // Expiration
    pub role: String, // User Role
}

pub struct Security;

impl Security {
    /// Hashes a password using Argon2
    pub fn hash_password(password: &[u8]) -> Result<String, argon2::password_hash::Error> {
        let salt = SaltString::generate(&mut OsRng);
        let argon2 = Argon2::default();
        let password_hash = argon2.hash_password(password, &salt)?.to_string();
        Ok(password_hash)
    }

    /// Verifies a password against a hash
    pub fn verify_password(password: &[u8], hash: &str) -> bool {
        let parsed_hash = match PasswordHash::new(hash) {
            Ok(h) => h,
            Err(_) => return false,
        };
        Argon2::default().verify_password(password, &parsed_hash).is_ok()
    }

    /// Generates a JWT token
    pub fn generate_token(user_id: &str, role: &str) -> Result<String, jsonwebtoken::errors::Error> {
        let expiration = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs() as usize + 3600 * 24; // 24 hours

        let claims = Claims {
            sub: user_id.to_owned(),
            exp: expiration,
            role: role.to_owned(),
        };

        let secret = env::var("JWT_SECRET").unwrap_or_else(|_| "secret".to_string());
        encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_bytes()))
    }
}
