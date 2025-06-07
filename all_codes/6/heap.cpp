#include <iostream>
#include <queue>
#include <vector>
#include <string>
#include <utility>

// Problem: Delays in ranking prevent timely promotion of top content
// Solution: Max-heap maintains dynamic leaderboard with O(logN) updates

class ContentRanker {
public:
    void add_content(const std::string& id, double score) {
        ranking.emplace(score, id);
    }
    
    void update_score(const std::string& id, double new_score) {
        // In a real system, we'd need a more sophisticated update mechanism
        // This simplified version just pushes the new score
        add_content(id, new_score);
    }
    
    std::vector<std::string> get_top_k(int k) {
        std::vector<std::string> result;
        auto temp = ranking;
        
        while (!temp.empty() && result.size() < k) {
            result.push_back(temp.top().second);
            temp.pop();
        }
        return result;
    }

private:
    // Max-heap based on score
    std::priority_queue<std::pair<double, std::string>> ranking;
};

int main() {
    ContentRanker ranker;
    
    // Simulate real-time score updates
    ranker.add_content("article1", 45.2);
    ranker.add_content("article2", 78.9);
    ranker.add_content("article3", 32.1);
    ranker.update_score("article1", 50.5); // Article gets more engagement
    
    // Get current top performers in O(k logN) time
    auto top = ranker.get_top_k(2);
    std::cout << "Top performing articles:\n";
    for (const auto& id : top) {
        std::cout << id << "\n";
    }
    
    return 0;
}