#include <iostream>
#include <vector>

using namespace std;

int main() {
    // Add-on offers: [cost, value]
    vector<int> cost = {2, 3, 4};         // Car, Insurance, Tour Guide
    vector<int> value = {40, 50, 60};     // Engagement scores
    int budget = 5;
    int n = cost.size();

    vector<int> dp(budget + 1, 0);

    // 0/1 Knapsack-style DP
    for (int i = 0; i < n; i++)
        for (int j = budget; j >= cost[i]; j--)
            dp[j] = max(dp[j], dp[j - cost[i]] + value[i]);

    cout << "✅ Max engagement value under budget: " << dp[budget] << endl;

    return 0;
}
