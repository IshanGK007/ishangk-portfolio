#include <iostream>
#include <vector>
#include <algorithm>

// Problem: Manual analysis of successful attributes is slow and unscalable
// Solution: LCS automatically identifies common patterns in top-performing content

std::string longest_common_substring(const std::string& s1, const std::string& s2) {
    int m = s1.length(), n = s2.length();
    std::vector<std::vector<int>> dp(m+1, std::vector<int>(n+1, 0));
    int max_len = 0, end_pos = 0;
    
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
                if (dp[i][j] > max_len) {
                    max_len = dp[i][j];
                    end_pos = i;
                }
            }
        }
    }
    
    return max_len ? s1.substr(end_pos - max_len, max_len) : "";
}

std::string analyze_headline_patterns(const std::vector<std::string>& top_headlines) {
    if (top_headlines.empty()) return "";
    
    std::string common = top_headlines[0];
    for (size_t i = 1; i < top_headlines.size(); ++i) {
        common = longest_common_substring(common, top_headlines[i]);
        if (common.empty()) break;
    }
    
    return common;
}

int main() {
    // Top performing headlines
    std::vector<std::string> headlines = {
        "10 Ways to Boost Your Productivity Today",
        "Productivity Hacks: 10 Tips for Busy Professionals",
        "The Ultimate 10-Step Productivity Guide"
    };
    
    // Automatically find common patterns
    std::string common_pattern = analyze_headline_patterns(headlines);
    std::cout << "Common successful pattern in headlines: \"" 
              << common_pattern << "\"\n";
    
    return 0;
}