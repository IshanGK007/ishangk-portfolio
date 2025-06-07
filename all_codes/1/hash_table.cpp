#include <iostream>
#include <unordered_map>

using namespace std;

int main() {
    unordered_map<string, string> customerPrefs;

    // Simulated stored preferences
    customerPrefs["SeatPreference"] = "Window";
    customerPrefs["Meal"] = "Vegetarian";
    customerPrefs["HotelType"] = "Luxury";

    // Instant lookup for personalization
    cout << "✅ Fetching customer preferences in real-time:\n";
    cout << "→ Seat: " << customerPrefs["SeatPreference"] << endl;
    cout << "→ Meal: " << customerPrefs["Meal"] << endl;
    cout << "→ Hotel: " << customerPrefs["HotelType"] << endl;

    return 0;
}
