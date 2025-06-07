#include <iostream>
#include <vector>
using namespace std;

class EngagementTracker {
    vector<int> fenwickTree;
    int n;
    
    void updateUtil(int index, int delta) {
        while (index <= n) {
            fenwickTree[index] += delta;
            index += index & -index;
        }
    }
    
    int queryUtil(int index) {
        int sum = 0;
        while (index > 0) {
            sum += fenwickTree[index];
            index -= index & -index;
        }
        return sum;
    }
    
public:
    EngagementTracker(int size) : n(size), fenwickTree(size + 1, 0) {}
    
    // Record a user interaction (click, scroll, etc.)
    void recordInteraction(int userId, int interactionType) {
        updateUtil(userId % n + 1, 1); // Simple hash for demo
        cout << "Recorded interaction type " << interactionType 
             << " for user " << userId << endl;
    }
    
    // Get total interactions in last N users
    int getRecentInteractions(int lastNUsers) {
        int total = queryUtil(n) - queryUtil(n - lastNUsers);
        cout << "Recent " << lastNUsers << " users had " 
             << total << " interactions" << endl;
        return total;
    }
    
    // Get cumulative interactions up to user
    int getCumulativeInteractions(int upToUser) {
        return queryUtil(upToUser % n + 1);
    }
};

int main() {
    EngagementTracker tracker(1000); // Track last 1000 users
    
    // Simulate user interactions
    for (int i = 0; i < 1500; i++) {
        tracker.recordInteraction(i, i % 3); // 3 interaction types
    }
    
    // Get recent engagement
    int recentEngagement = tracker.getRecentInteractions(500);
    
    // Dynamic content adjustment based on engagement
    if (recentEngagement > 300) {
        cout << "High engagement detected! Serving richer content." << endl;
    } else {
        cout << "Normal engagement. Serving standard content." << endl;
    }
    
    return 0;
}