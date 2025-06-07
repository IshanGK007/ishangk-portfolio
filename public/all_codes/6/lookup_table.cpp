#include <iostream>
#include <unordered_map>
#include <string>

// Problem: Slow access to real-time performance metrics hinders live decisions
// Solution: Look-up tables provide instant O(1) access to content metrics

class ContentMetrics {
public:
    void update_metric(const std::string& content_id, const std::string& attribute, double value) {
        // Real-time update of metrics
        metrics[content_id][attribute] = value;
    }
    
    double get_metric(const std::string& content_id, const std::string& attribute) {
        // Instant lookup for decision-making
        return metrics[content_id][attribute];
    }
    
    std::string get_best_performing(const std::string& attribute) {
        // Find best performing content for an attribute
        std::string best_id;
        double max_val = -1;
        for (const auto& [id, attrs] : metrics) {
            if (attrs.count(attribute) && attrs.at(attribute) > max_val) {
                max_val = attrs.at(attribute);
                best_id = id;
            }
        }
        return best_id;
    }

private:
    std::unordered_map<std::string, std::unordered_map<std::string, double>> metrics;
};

int main() {
    ContentMetrics analytics;
    
    // Simulate real-time updates
    analytics.update_metric("article123", "click_rate", 0.15);
    analytics.update_metric("article123", "read_time", 45.2);
    analytics.update_metric("article456", "click_rate", 0.22);
    
    // Instant access for real-time decisions
    std::cout << "Best performing article for clicks: " 
              << analytics.get_best_performing("click_rate") << "\n";
    
    return 0;
}