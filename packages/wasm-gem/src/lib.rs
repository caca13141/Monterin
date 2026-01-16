use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn calculate_light_return(cut_grade: &str) -> f64 {
    match cut_grade {
        "Ideal" => 100.0,
        "Deep" => 80.0,
        _ => 50.0,
    }
}
