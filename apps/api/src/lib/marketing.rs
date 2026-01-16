use serde::Serialize;
use std::env;

pub struct MarketingService;

#[derive(Serialize)]
struct KlaviyoEventPayload {
    data: KlaviyoEventData,
}

#[derive(Serialize)]
struct KlaviyoEventData {
    r#type: String,
    attributes: KlaviyoAttributes,
}

#[derive(Serialize)]
struct KlaviyoAttributes {
    metric: KlaviyoMetric,
    profile: KlaviyoProfile,
    properties: serde_json::Value,
}

#[derive(Serialize)]
struct KlaviyoMetric {
    name: String,
}

#[derive(Serialize)]
struct KlaviyoProfile {
    email: String,
}

impl MarketingService {
    /// Tracks an event in Klaviyo (e.g. "Placed Order", "Viewed Product")
    pub async fn track_event(email: &str, event_name: &str, properties: serde_json::Value) -> Result<(), String> {
        let api_key = env::var("KLAVIYO_PUBLIC_KEY").map_err(|_| "KLAVIYO_PUBLIC_KEY not set")?;
        
        // Note: For server-side events, we usually use the Events API.
        // This is a simplified payload structure for the 'Create Event' endpoint.
        
        let payload = KlaviyoEventPayload {
            data: KlaviyoEventData {
                r#type: "event".to_string(),
                attributes: KlaviyoAttributes {
                    metric: KlaviyoMetric { name: event_name.to_string() },
                    profile: KlaviyoProfile { email: email.to_string() },
                    properties,
                }
            }
        };

        let client = reqwest::Client::new();
        let res = client.post("https://a.klaviyo.com/api/events/")
            .header("Authorization", format!("Klaviyo-API-Key {}", api_key))
            .header("revision", "2023-02-22")
            .json(&payload)
            .send()
            .await
            .map_err(|e| e.to_string())?;

        if !res.status().is_success() {
            return Err(format!("Klaviyo API Error: {}", res.status()));
        }

        Ok(())
    }
}
