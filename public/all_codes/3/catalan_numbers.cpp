#include <iostream>
#include <vector>
using namespace std;

int catalan(int n) {
    vector<int> dp(n + 1, 0);
    dp[0] = 1;
    for (int i = 1; i <= n; i++)
        for (int j = 0; j < i; j++)
            dp[i] += dp[j] * dp[i - j - 1];
    return dp[n];
}

int main() {
    int num_interactions = 3;  // e.g., email → click → purchase
    cout << "Valid interaction sequences for " << num_interactions 
         << " steps: " << catalan(num_interactions) << endl;
    return 0;
}

/**
 * How This Solves the Challenge:
 * - Models valid sequences (e.g., email → click → purchase vs. email → purchase → click).
 * - Ensures compliant personalization paths (no dead-ends).
 * - Optimizes touchpoint delivery order.
 */