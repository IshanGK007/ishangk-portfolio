#include <iostream>
#include <queue>
#include <string>

using namespace std;

// Struct to define tasks with urgency
struct Task {
    int priority; // Lower number = higher urgency
    string name;
    bool operator<(const Task &t) const {
        return priority > t.priority;
    }
};

int main() {
    priority_queue<Task> pq;

    // Add tasks with varying urgency
    pq.push({2, "Suggest Hotels"});
    pq.push({1, "Flight Change - URGENT"});
    pq.push({3, "Suggest Car Rentals"});

    cout << "✅ Handling tasks by urgency:\n";
    while (!pq.empty()) {
        cout << "→ " << pq.top().name << endl;
        pq.pop();
    }

    return 0;
}
