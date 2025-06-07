// all_codes/2/sliding_window.cpp
#include <iostream>
#include <deque>
#include <ctime>

using namespace std;

// Simulates real-time click stream and sliding window logic
int main() {
    deque<time_t> window;
    int timeFrame = 10; // 10-second sliding window
    int simulatedEvents[] = {1, 3, 5, 12, 13, 20}; // event timestamps in seconds

    cout << "✅ Tracking recent events in Sliding Window:\n";
    for (int t : simulatedEvents) {
        // Remove expired events
        while (!window.empty() && t - window.front() > timeFrame)
            window.pop_front();

        // Add current event
        window.push_back(t);

        cout << "→ Event at " << t << " sec | Window Size: " << window.size() << endl;
    }

    return 0;
}
